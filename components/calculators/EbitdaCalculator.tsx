"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

// =============================================================
// EBITDA PRO DASHBOARD
// - Preset CNDCEC (base)
// - Metodo Diretto (civilistico OIC-12) / Indiretto (da EBIT/utile)
// - IFRS16 toggle (effetto sui canoni di leasing operativi)
// - Modulo Adjusted (add-back libreria + righe custom) con note APM
// - KPI: EBITDA%, Debt/EBITDA, EV/EBITDA
// - Multi-periodo (fino a 5 esercizi) + grafici
// - Bridge di riconciliazione + Formula viewer + Tooltip normativi
// - Export CSV + Stampa/PDF + salvataggio scenari (localStorage)
// - Locale IT (punti mila, virgola decimale)
// =============================================================

// ---------------------------
// Helpers: locale & math
// ---------------------------
const IT = "it-IT";
const currencyFmt = new Intl.NumberFormat(IT, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const numberFmt = new Intl.NumberFormat(IT, { maximumFractionDigits: 2 });

function formatMoney(n: number | null | undefined) {
  const v = typeof n === "number" && isFinite(n) ? n : 0;
  return currencyFmt.format(v);
}
function formatNumber(n: number | null | undefined) {
  const v = typeof n === "number" && isFinite(n) ? n : 0;
  return numberFmt.format(v);
}
function parseLocaleNumber(s: string): number {
  if (s == null) return 0;
  // accept both it-IT and plain
  const normalized = s
    .replace(/\s/g, "")
    .replace(/\./g, "") // remove thousand separators
    .replace(/,/, "."); // comma to dot
  const n = Number(normalized);
  return isFinite(n) ? n : 0;
}

// ---------------------------
// Tooltip micro‑component
// ---------------------------
const InfoIcon: React.FC<{ title?: string }> = ({ title }) => (
  <span
    className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold rounded-full bg-gray-200 text-gray-700 ml-1"
    aria-label={title || "informazioni"}
    title={title}
  >
    ?
  </span>
);

// ---------------------------
// Types
// ---------------------------
export type Method = "diretto" | "indiretto";

// Voci civilistiche minime per il conto economico OIC-12 (sezione A e B)
interface OICInputs {
  // A) Valore della produzione
  A1: number; // Ricavi
  A2: number; // Variaz. rimanenze prodotti in lavoraz./finiti
  A3: number; // Variaz. lavori in corso su ordinazione
  A4: number; // Incrementi immobilizzazioni per lavori interni
  A5: number; // Altri ricavi e proventi

  // B) Costi della produzione
  B6: number; // Materie prime, sussidiarie, ecc. (COGS)
  B7: number; // Costi per servizi (Opex esterni)
  B8: number; // Godimento beni di terzi (canoni/affitti)
  B8_leaseComponent: number; // Quota canoni di LEASING operativi compresa in B8 (per IFRS16)
  B9: number; // Personale
  B10a: number; // Ammort. immateriali
  B10b: number; // Ammort. materiali
  B10c: number; // Svalutazioni immobilizzazioni
  B10d: number; // Svalutazioni crediti (⚠️)
  B11: number; // Variazioni rimanenze materie prime
  B12: number; // Accantonamenti per rischi (⚠️)
  B13: number; // Altri oneri (⚠️)
  B14: number; // Oneri diversi di gestione (se applicabile)
}

// Driver operativi per il metodo indiretto (da EBIT)
interface DriverInputs {
  ricavi: number;
  cogs: number;
  opex: number; // servizi, affitti ecc. (esclusi D&A)
  personale: number;
  ammortImmateriali: number; // B10a
  ammortMateriali: number; // B10b
  svalutImmobilizz: number; // B10c
  svalutCrediti: number; // B10d (⚠️)
  accantonamenti: number; // B12 (⚠️)
  altriOneri: number; // B13 (⚠️)
  quotaLeasingOperativo: number; // porzione di canoni operativi assimilabile a leasing (IFRS16)
}

interface AddBackItem {
  id: string;
  label: string;
  importo: number;
  positivo: boolean; // true se +, false se -
  ricorrente: boolean;
  nota?: string;
}

interface PeriodData {
  id: string;
  nome: string; // es. "2024"
  // input mode specific
  oic: OICInputs;
  driver: DriverInputs;
  pfnetta: number; // PFN per Debt/EBITDA
  ev: number; // Enterprise Value per EV/EBITDA (può essere calcolato altrove; qui input libero)
  addBacks: AddBackItem[];
}

// Libreria add-back suggerita (prassi M&A)
const DEFAULT_ADD_BACKS: Omit<AddBackItem, "importo" | "id">[] = [
  { label: "Costi di ristrutturazione una tantum", positivo: true, ricorrente: false },
  { label: "Spese legali straordinarie / contenziosi", positivo: true, ricorrente: false },
  { label: "Compensi amministratore fuori mercato (quota eccedente)", positivo: true, ricorrente: false },
  { label: "Start‑up costs / lancio nuova linea", positivo: true, ricorrente: false },
  { label: "Plus/minusvalenze non ricorrenti", positivo: false, ricorrente: false },
];

// ---------------------------
// Component
// ---------------------------
const EbitdaCalculator: React.FC = () => {
  // ---------------- state di configurazione
  const [method, setMethod] = useState<Method>("diretto");
  const [ifrs16, setIfrs16] = useState<boolean>(false);
  const [adjustedOn, setAdjustedOn] = useState<boolean>(false);

  // multi‑periodo
  const [periods, setPeriods] = useState<PeriodData[]>(() => [
    makeEmptyPeriod("2024"),
    makeEmptyPeriod("2025"),
  ]);

  const canAddPeriod = periods.length < 5;

  // ---------------- derivazioni per periodo
  const results = useMemo(() => periods.map((p) => computeAll(p, { method, ifrs16, adjustedOn })), [periods, method, ifrs16, adjustedOn]);

  // ---------------- util per aggiornare campi
  function updateOIC(index: number, field: keyof OICInputs, value: string) {
    const v = parseLocaleNumber(value);
    setPeriods((prev) => prev.map((p, i) => (i === index ? { ...p, oic: { ...p.oic, [field]: v } } : p)));
  }
  function updateDriver(index: number, field: keyof DriverInputs, value: string) {
    const v = parseLocaleNumber(value);
    setPeriods((prev) => prev.map((p, i) => (i === index ? { ...p, driver: { ...p.driver, [field]: v } } : p)));
  }
  function updateMeta(index: number, field: "pfnetta" | "ev" | "nome", value: string) {
    const v = field === "nome" ? value : parseLocaleNumber(value);
    setPeriods((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: v as any } : p)));
  }

  function addPeriod() {
    const nextName = suggestNextPeriodName(periods);
    setPeriods((prev) => [...prev, makeEmptyPeriod(nextName)]);
  }
  function removePeriod(idx: number) {
    setPeriods((prev) => prev.filter((_, i) => i !== idx));
  }

  // Add-backs
  function addAddBack(idx: number, preset?: Omit<AddBackItem, "importo" | "id">) {
    setPeriods((prev) =>
      prev.map((p, i) => {
        if (i !== idx) return p;
        const item: AddBackItem = {
          id: cryptoId(),
          label: preset?.label || "Rettifica personalizzata",
          importo: 0,
          positivo: preset?.positivo ?? true,
          ricorrente: preset?.ricorrente ?? false,
          nota: "",
        };
        return { ...p, addBacks: [...p.addBacks, item] };
      })
    );
  }
  function updateAddBack(idx: number, id: string, patch: Partial<AddBackItem>) {
    setPeriods((prev) =>
      prev.map((p, i) => {
        if (i !== idx) return p;
        return { ...p, addBacks: p.addBacks.map((ab) => (ab.id === id ? { ...ab, ...patch } : ab)) };
      })
    );
  }
  function removeAddBack(idx: number, id: string) {
    setPeriods((prev) => prev.map((p, i) => (i === idx ? { ...p, addBacks: p.addBacks.filter((ab) => ab.id !== id) } : p)));
  }

  // Export CSV
  function exportCSV() {
    const headers = [
      "Periodo",
      "Metodo",
      "EBITDA base",
      ifrs16 ? "EBITDA Post IFRS16" : undefined,
      adjustedOn ? "EBITDA Adjusted" : undefined,
      "EBITDA %",
      "PFN",
      "Debt/EBITDA",
      "EV",
      "EV/EBITDA",
    ].filter(Boolean) as string[];

    const rows = results.map((r) => [
      r.periodo,
      method,
      r.ebitdaBase.toString(),
      ifrs16 ? r.ebitdaPostIfrs16!.toString() : undefined,
      adjustedOn ? r.ebitdaAdjusted!.toString() : undefined,
      r.margin.toString(),
      r.pfnetta.toString(),
      r.debtEbitda?.toString() || "",
      r.ev.toString(),
      r.evEbitda?.toString() || "",
    ].filter((x) => x !== undefined).join(","));

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ebitda_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Salvataggio scenari (localStorage)
  function saveToLocal() {
    const payload = { method, ifrs16, adjustedOn, periods };
    localStorage.setItem("ebitda_pro_dashboard", JSON.stringify(payload));
    alert("Scenario salvato nel browser (localStorage)");
  }
  function loadFromLocal() {
    const raw = localStorage.getItem("ebitda_pro_dashboard");
    if (!raw) return alert("Nessuno scenario salvato");
    try {
      const parsed = JSON.parse(raw);
      setMethod(parsed.method || "diretto");
      setIfrs16(!!parsed.ifrs16);
      setAdjustedOn(!!parsed.adjustedOn);
      setPeriods(parsed.periods || []);
    } catch (e) {
      alert("Caricamento non riuscito");
    }
  }

  // Grafici: dataset
  const chartData = useMemo(() => {
    return results.map((r) => ({
      name: r.periodo,
      EBITDA: Math.round(r.ebitdaFinale),
      Margin: Math.round(r.margin * 100) / 100,
    }));
  }, [results]);

  // ---------------- RENDER
  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header sticky */}
      <div className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-gray-200 py-3 px-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">EBITDA Workbench · Pro</h1>
            <span className="text-xs text-gray-500">CNDCEC base · APM ready · IFRS16</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn" onClick={() => window.print()}>Stampa / PDF</button>
            <button className="btn" onClick={exportCSV}>Esporta CSV</button>
            <button className="btn" onClick={saveToLocal}>Salva</button>
            <button className="btn" onClick={loadFromLocal}>Carica</button>
          </div>
        </div>
      </div>

      {/* Pannello impostazioni globali */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="label">Metodo di calcolo</label>
            <div className="flex gap-3">
              <label className="radio">
                <input type="radio" name="method" checked={method === "diretto"} onChange={() => setMethod("diretto")} />
                <span>Diretto (civilistico OIC-12)</span>
              </label>
              <label className="radio">
                <input type="radio" name="method" checked={method === "indiretto"} onChange={() => setMethod("indiretto")} />
                <span>Indiretto (da EBIT/utile)</span>
              </label>
            </div>
          </div>
          <div>
            <label className="label">IFRS 16</label>
            <div className="flex items-center gap-2">
              <input id="ifrs16" type="checkbox" checked={ifrs16} onChange={(e) => setIfrs16(e.target.checked)} />
              <label htmlFor="ifrs16" className="text-sm">Considera effetto su canoni leasing operativi (EBITDA ↑)
                <InfoIcon title="Con IFRS16 i canoni operativi (quota leasing) si riclassificano in D&A+interessi: l'EBITDA aumenta di tale quota." />
              </label>
            </div>
          </div>
          <div>
            <label className="label">Adjusted (M&A)</label>
            <div className="flex items-center gap-2">
              <input id="adjusted" type="checkbox" checked={adjustedOn} onChange={(e) => setAdjustedOn(e.target.checked)} />
              <label htmlFor="adjusted" className="text-sm">Abilita rettifiche (APM) con note obbligatorie
                <InfoIcon title="Preset CNDCEC (base): add‑back di B10a/b/c. B10d, B12, B13 esclusi; includili solo come rettifiche non ricorrenti con nota (APM)." />
              </label>
            </div>
          </div>
          <div className="ml-auto text-xs text-gray-500">I dati restano nel tuo browser • Nessun upload</div>
        </div>
      </div>

      {/* Periodi */}
      <div className="space-y-4">
        {periods.map((p, idx) => (
          <div className="card" key={p.id}>
            <div className="flex items-center gap-3 mb-3">
              <input
                className="input w-28"
                value={p.nome}
                onChange={(e) => updateMeta(idx, "nome", e.target.value)}
                aria-label="Nome periodo"
              />
              <div className="ml-auto flex items-center gap-2">
                {periods.length > 1 && (
                  <button className="btn-secondary" onClick={() => removePeriod(idx)}>Rimuovi</button>
                )}
              </div>
            </div>

            {/* Tabs: Bilancio (OIC) / Driver / Rettifiche / Parametri KPI */}
            <Tabs
              tabs={[
                { key: "oic", label: "Bilancio (OIC-12)" },
                { key: "driver", label: "Driver operativi" },
                { key: "rettifiche", label: "Rettifiche (Adjusted)" },
                { key: "kpi", label: "Parametri KPI" },
              ]}
            >
              <div data-tab="oic">
                <OICForm p={p} onChange={(field, val) => updateOIC(idx, field, val)} />
              </div>
              <div data-tab="driver">
                <DriverForm p={p} onChange={(field, val) => updateDriver(idx, field, val)} />
              </div>
              <div data-tab="rettifiche">
                <AdjustedForm
                  items={p.addBacks}
                  onAddPreset={() => addAddBack(idx, DEFAULT_ADD_BACKS[0])}
                  onAddCustom={() => addAddBack(idx)}
                  onRemove={(id) => removeAddBack(idx, id)}
                  onChange={(id, patch) => updateAddBack(idx, id, patch)}
                />
              </div>
              <div data-tab="kpi">
                <KPIParams p={p} onChangeMeta={(field, val) => updateMeta(idx, field as any, val)} />
              </div>
            </Tabs>

            {/* Bridge & KPI */}
            <PeriodSummary r={results[idx]} adjustedOn={adjustedOn} ifrs16={ifrs16} />
          </div>
        ))}
        {canAddPeriod && (
          <div className="flex justify-center">
            <button className="btn" onClick={addPeriod}>+ Aggiungi periodo</button>
          </div>
        )}
      </div>

      {/* Grafici complessivi */}
      <div className="card">
        <h2 className="section">Andamento EBITDA e Margine</h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="EBITDA" />
              <Line yAxisId="right" type="monotone" dataKey="Margin" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fonti & formule */}
      <div className="card">
        <h2 className="section">Formule • Assunzioni • Fonti</h2>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li><b>Preset CNDCEC (base):</b> EBITDA = (A − B) + B10a + B10b + B10c. B10d, B12, B13 esclusi dal perimetro base.</li>
          <li><b>IFRS16:</b> la quota di leasing operativo compresa in B8 viene aggiunta all'EBITDA (riclassificata in D&A+interessi).</li>
          <li><b>Adjusted (APM):</b> add‑back selettivi non ricorrenti con <i>nota obbligatoria</i> e riconciliazione presentata nel bridge.</li>
          <li><b>EBITDA%:</b> EBITDA / Ricavi · 100. <b>Debt/EBITDA:</b> PFN / EBITDA. <b>EV/EBITDA:</b> EV / EBITDA.</li>
          <li><b>Limiti:</b> EBITDA ≠ flusso di cassa, non considera capitale circolante e CapEx; può essere manipolato via rettifiche.</li>
          <li className="text-gray-500">Fonti: CNDCEC (03/2024), ESMA APM Guidelines, OIC‑12, effetti IFRS 16.</li>
        </ul>
      </div>

      <style jsx>{`
        .btn { @apply px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm hover:bg-black transition; }
        .btn-secondary { @apply px-3 py-1.5 rounded-lg bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 transition; }
        .input { @apply px-3 py-1.5 rounded-md border border-gray-300; }
        .label { @apply block text-xs text-gray-500 mb-1; }
        .card { @apply p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100; }
        .section { @apply text-lg font-semibold mb-3; }
        .radio { @apply inline-flex items-center gap-2 text-sm; }
        @media print { .btn, .btn-secondary, .radio input, input[type="checkbox"], .input { display: none !important; } .card { break-inside: avoid; } }
      `}</style>
    </div>
  );
};

// ---------------------------
// Sub‑components
// ---------------------------
const Tabs: React.FC<{ tabs: { key: string; label: string }[]; children: React.ReactNode }> = ({ tabs, children }) => {
  const [active, setActive] = useState<string>(tabs[0].key);
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {tabs.map((t) => (
          <button key={t.key} className={`btn-secondary ${active === t.key ? "!bg-gray-900 !text-white" : ""}`} onClick={() => setActive(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
      <div>
        {React.Children.map(children, (child: any) => child?.props?.["data-tab"] === active ? child : null)}
      </div>
    </div>
  );
};

const OICForm: React.FC<{ p: PeriodData; onChange: (field: keyof OICInputs, value: string) => void }> = ({ p, onChange }) => {
  const F = (k: keyof OICInputs, label: string, hint?: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
      <label className="text-sm text-gray-700">{label}{hint && <InfoIcon title={hint} />}</label>
      <input className="input" inputMode="decimal" value={formatNumber(p.oic[k])} onChange={(e) => onChange(k, e.target.value)} />
    </div>
  );
  return (
    <div className="space-y-3">
      <h3 className="section">A) Valore della produzione</h3>
      {F("A1", "A1 Ricavi")}
      {F("A2", "A2 Variazione rimanenze prodotti finiti / in lavorazione")}
      {F("A3", "A3 Variazione lavori in corso su ordinazione")}
      {F("A4", "A4 Incrementi per lavori interni")}
      {F("A5", "A5 Altri ricavi e proventi")}

      <h3 className="section">B) Costi della produzione</h3>
      {F("B6", "B6 Materie prime, sussidiarie, di consumo", "COGS")}
      {F("B7", "B7 Costi per servizi")}
      {F("B8", "B8 Godimento beni di terzi")}
      {F("B8_leaseComponent", "Quota LEASING operativi (inclusa in B8)", "Usata per IFRS16: aumenta l'EBITDA della quota indicata.")}
      {F("B9", "B9 Costi per il personale")}
      {F("B10a", "B10a Ammortamenti immateriali", "Add‑back nel preset CNDCEC")}
      {F("B10b", "B10b Ammortamenti materiali", "Add‑back nel preset CNDCEC")}
      {F("B10c", "B10c Svalutazioni immobilizzazioni", "Add‑back nel preset CNDCEC")}
      {F("B10d", "B10d Svalutazioni crediti", "Escluso dal base; includibile solo in Adjusted con nota")}
      {F("B11", "B11 Variazione rimanenze materie prime")}
      {F("B12", "B12 Accantonamenti per rischi", "Escluso dal base; includibile solo in Adjusted con nota")}
      {F("B13", "B13 Altri oneri", "Escluso dal base; includibile solo in Adjusted con nota")}
      {F("B14", "B14 Oneri diversi di gestione")}
    </div>
  );
};

const DriverForm: React.FC<{ p: PeriodData; onChange: (field: keyof DriverInputs, value: string) => void }> = ({ p, onChange }) => {
  const F = (k: keyof DriverInputs, label: string, hint?: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
      <label className="text-sm text-gray-700">{label}{hint && <InfoIcon title={hint} />}</label>
      <input className="input" inputMode="decimal" value={formatNumber(p.driver[k])} onChange={(e) => onChange(k, e.target.value)} />
    </div>
  );
  return (
    <div className="space-y-3">
      <h3 className="section">Driver operativi</h3>
      {F("ricavi", "Ricavi totali")}
      {F("cogs", "COGS")}
      {F("opex", "Opex (servizi, affitti, ecc.)", "Esclusi ammortamenti e svalutazioni")}
      {F("personale", "Costi del personale")}
      {F("ammortImmateriali", "Ammortamenti immateriali (B10a)")}
      {F("ammortMateriali", "Ammortamenti materiali (B10b)")}
      {F("svalutImmobilizz", "Svalutazioni immobilizzazioni (B10c)")}
      {F("svalutCrediti", "Svalutazioni crediti (B10d)")}
      {F("accantonamenti", "Accantonamenti (B12)")}
      {F("altriOneri", "Altri oneri (B13)")}
      {F("quotaLeasingOperativo", "Quota LEASING operativi (IFRS16)", "Aggiunge alla riclassifica per EBITDA Post")}
    </div>
  );
};

const AdjustedForm: React.FC<{
  items: AddBackItem[];
  onAddPreset: () => void;
  onAddCustom: () => void;
  onChange: (id: string, patch: Partial<AddBackItem>) => void;
  onRemove: (id: string) => void;
}> = ({ items, onAddPreset, onAddCustom, onChange, onRemove }) => {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button className="btn" onClick={onAddPreset}>+ Aggiungi da libreria</button>
        <button className="btn-secondary" onClick={onAddCustom}>+ Riga personalizzata</button>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-1 pr-2">Rettifica (nota obbligatoria)</th>
              <th className="py-1 pr-2">Segno</th>
              <th className="py-1 pr-2">Importo</th>
              <th className="py-1 pr-2">Ricorrente?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((ab) => (
              <tr key={ab.id} className="border-t">
                <td className="py-1 pr-2">
                  <input className="input w-full" value={ab.label} onChange={(e) => onChange(ab.id, { label: e.target.value })} />
                  <input className="input w-full mt-1" placeholder="Nota (obbligatoria per APM)" value={ab.nota || ""} onChange={(e) => onChange(ab.id, { nota: e.target.value })} />
                </td>
                <td className="py-1 pr-2">
                  <select className="input" value={ab.positivo ? "+" : "-"} onChange={(e) => onChange(ab.id, { positivo: e.target.value === "+" })}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                  </select>
                </td>
                <td className="py-1 pr-2">
                  <input className="input" inputMode="decimal" value={formatNumber(ab.importo)} onChange={(e) => onChange(ab.id, { importo: parseLocaleNumber(e.target.value) })} />
                </td>
                <td className="py-1 pr-2">
                  <input type="checkbox" checked={ab.ricorrente} onChange={(e) => onChange(ab.id, { ricorrente: e.target.checked })} />
                </td>
                <td className="py-1 pr-2">
                  <button className="btn-secondary" onClick={() => onRemove(ab.id)}>Rimuovi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500">Suggerimento: in Adjusted includi solo elementi non ricorrenti (con motivazione). Per default <b>B10d, B12, B13</b> restano esclusi dal perimetro base e si possono gestire qui come add‑back, se appropriato.</p>
    </div>
  );
};

const KPIParams: React.FC<{ p: PeriodData; onChangeMeta: (field: string, value: string) => void }> = ({ p, onChangeMeta }) => {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div>
        <label className="label">PFN (Posizione Finanziaria Netta)
          <InfoIcon title="Usata per Debt/EBITDA. Inserisci PFN consolidata del periodo (debiti finanziari − cassa)." />
        </label>
        <input className="input" inputMode="decimal" value={formatNumber(p.pfnetta)} onChange={(e) => onChangeMeta("pfnetta", e.target.value)} />
      </div>
      <div>
        <label className="label">EV (Enterprise Value)
          <InfoIcon title="Usato per EV/EBITDA. In alternativa puoi calcolarlo esternamente e inserirlo qui." />
        </label>
        <input className="input" inputMode="decimal" value={formatNumber(p.ev)} onChange={(e) => onChangeMeta("ev", e.target.value)} />
      </div>
    </div>
  );
};

const PeriodSummary: React.FC<{ r: ComputedResult; adjustedOn: boolean; ifrs16: boolean }> = ({ r, adjustedOn, ifrs16 }) => {
  return (
    <div className="mt-4 grid md:grid-cols-3 gap-4">
      {/* KPI cards */}
      <div className="space-y-3">
        <KpiCard label="EBITDA base" value={formatMoney(r.ebitdaBase)} />
        {ifrs16 && <KpiCard label="EBITDA Post IFRS16" value={formatMoney(r.ebitdaPostIfrs16!)} />}
        {adjustedOn && <KpiCard label="EBITDA Adjusted" value={formatMoney(r.ebitdaAdjusted!)} />}
      </div>
      <div className="space-y-3">
        <KpiCard label="EBITDA %" value={`${formatNumber(r.margin)}%`} />
        <KpiCard label="Debt/EBITDA" value={r.debtEbitda ? formatNumber(r.debtEbitda) : "—"} />
        <KpiCard label="EV/EBITDA" value={r.evEbitda ? formatNumber(r.evEbitda) : "—"} />
      </div>
      {/* Bridge */}
      <div className="col-span-1 md:col-span-1">
        <div className="p-3 rounded-xl bg-gray-50 border text-sm">
          <div className="font-semibold mb-2">Bridge di riconciliazione</div>
          <ul className="space-y-1">
            <li><b>A − B</b> = {formatMoney(r.AmenoB)}</li>
            <li>+ B10a amm. immateriali = {formatMoney(r.B10a)}</li>
            <li>+ B10b amm. materiali = {formatMoney(r.B10b)}</li>
            <li>+ B10c svalut. immobilizz. = {formatMoney(r.B10c)}</li>
            <li><b>EBITDA base</b> = {formatMoney(r.ebitdaBase)}</li>
            {ifrs16 && <li>+ Quota leasing operativi (IFRS16) = {formatMoney(r.quotaLeasingIfrs16)}</li>}
            {ifrs16 && <li><b>EBITDA Post IFRS16</b> = {formatMoney(r.ebitdaPostIfrs16!)}</li>}
            {adjustedOn && (
              <li>
                ± Rettifiche (APM) = {formatMoney((r.sommaAddBackPos || 0) - (r.sommaAddBackNeg || 0))}
                {r.noteMancanti && <span className="text-red-600 ml-2">(⚠︎ alcune rettifiche senza nota)</span>}
              </li>
            )}
            {adjustedOn && <li><b>EBITDA Adjusted</b> = {formatMoney(r.ebitdaAdjusted!)}</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

const KpiCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="p-3 rounded-xl bg-white border shadow-sm">
    <div className="text-xs text-gray-500">{label}</div>
    <div className="text-lg font-semibold">{value}</div>
  </div>
);

// ---------------------------
// Calcoli
// ---------------------------
interface ComputeOptions { method: Method; ifrs16: boolean; adjustedOn: boolean }
interface ComputedResult {
  periodo: string;
  // inputs chiave usati nel bridge
  AmenoB: number;
  B10a: number; B10b: number; B10c: number;
  quotaLeasingIfrs16: number;
  ebitdaBase: number;
  ebitdaPostIfrs16?: number;
  sommaAddBackPos?: number; sommaAddBackNeg?: number; noteMancanti?: boolean;
  ebitdaAdjusted?: number;
  ebitdaFinale: number; // quello mostrato nei grafici (Adjusted se on, altrimenti Post se ifrs16, altrimenti Base)
  ricavi: number; margin: number; // %
  pfnetta: number; ev: number; debtEbitda?: number | null; evEbitda?: number | null;
}

function computeAll(p: PeriodData, opt: ComputeOptions): ComputedResult {
  // Calcolo base su OIC (per coerenza con preset CNDCEC)
  const A = p.oic.A1 + p.oic.A2 + p.oic.A3 + p.oic.A4 + p.oic.A5;
  const B = p.oic.B6 + p.oic.B7 + p.oic.B8 + p.oic.B9 + p.oic.B10a + p.oic.B10b + p.oic.B10c + p.oic.B10d + p.oic.B11 + p.oic.B12 + p.oic.B13 + p.oic.B14;
  const AmenoB = A - B;
  const ebitdaBase = AmenoB + p.oic.B10a + p.oic.B10b + p.oic.B10c; // CNDCEC base

  // IFRS16: aggiungi la quota leasing operativi (inserita a parte)
  const quotaLeasing = opt.ifrs16 ? Math.max(0, p.oic.B8_leaseComponent || p.driver.quotaLeasingOperativo || 0) : 0;
  const ebitdaPost = opt.ifrs16 ? ebitdaBase + quotaLeasing : undefined;

  // Adjusted: somma add‑backs con nota
  let sommaPos = 0, sommaNeg = 0, noteMancanti = false;
  if (opt.adjustedOn) {
    for (const ab of p.addBacks) {
      const val = ab.importo || 0;
      if ((ab.nota || "").trim().length === 0) noteMancanti = true;
      if (ab.positivo) sommaPos += val; else sommaNeg += val;
    }
  }
  const ebitdaAdj = opt.adjustedOn ? (opt.ifrs16 ? (ebitdaPost! + sommaPos - sommaNeg) : (ebitdaBase + sommaPos - sommaNeg)) : undefined;

  const ebitdaFinale = opt.adjustedOn ? ebitdaAdj! : (opt.ifrs16 ? ebitdaPost! : ebitdaBase);

  const ricavi = A > 0 ? p.oic.A1 : p.driver.ricavi; // preferisci OIC se valorizzato
  const margin = ricavi > 0 ? (ebitdaFinale / ricavi) * 100 : 0;

  const pf = p.pfnetta || 0;
  const ev = p.ev || 0;
  const debtEbitda = ebitdaFinale !== 0 ? pf / ebitdaFinale : null;
  const evEbitda = ebitdaFinale !== 0 ? ev / ebitdaFinale : null;

  return {
    periodo: p.nome,
    AmenoB,
    B10a: p.oic.B10a, B10b: p.oic.B10b, B10c: p.oic.B10c,
    quotaLeasingIfrs16: quotaLeasing,
    ebitdaBase,
    ebitdaPostIfrs16: ebitdaPost,
    sommaAddBackPos: opt.adjustedOn ? sommaPos : undefined,
    sommaAddBackNeg: opt.adjustedOn ? sommaNeg : undefined,
    noteMancanti: opt.adjustedOn ? noteMancanti : undefined,
    ebitdaAdjusted: ebitdaAdj,
    ebitdaFinale,
    ricavi,
    margin,
    pfnetta: pf,
    ev,
    debtEbitda,
    evEbitda,
  };
}

// ---------------------------
// Utils
// ---------------------------
function makeEmptyPeriod(nome: string): PeriodData {
  return {
    id: cryptoId(),
    nome,
    oic: {
      A1: 0, A2: 0, A3: 0, A4: 0, A5: 0,
      B6: 0, B7: 0, B8: 0, B8_leaseComponent: 0, B9: 0,
      B10a: 0, B10b: 0, B10c: 0, B10d: 0,
      B11: 0, B12: 0, B13: 0, B14: 0,
    },
    driver: {
      ricavi: 0, cogs: 0, opex: 0, personale: 0,
      ammortImmateriali: 0, ammortMateriali: 0, svalutImmobilizz: 0,
      svalutCrediti: 0, accantonamenti: 0, altriOneri: 0, quotaLeasingOperativo: 0,
    },
    pfnetta: 0,
    ev: 0,
    addBacks: DEFAULT_ADD_BACKS.map((d) => ({ id: cryptoId(), importo: 0, ...d })),
  };
}

function cryptoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return (crypto as any).randomUUID();
  return Math.random().toString(36).slice(2);
}
function suggestNextPeriodName(periods: PeriodData[]) {
  const last = periods[periods.length - 1]?.nome;
  const n = Number(last);
  if (isFinite(n)) return String(n + 1);
  return `${last || "Nuovo"}*`;
}

export default EbitdaCalculator;
