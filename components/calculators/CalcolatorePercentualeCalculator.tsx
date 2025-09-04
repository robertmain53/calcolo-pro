'use client';

import React, { useEffect, useMemo, useState } from 'react';

/**
 * Calcolatore Percentuale professionale con:
 * - 9 modalità (percentuale, incidenza, totale, aumento, sconto, variazione %, differenza % simmetrica, punti percentuali, inversi)
 * - "Mostra i passaggi" (formula + sostituzione + semplificazione)
 * - parsing numerico locale (virgola o punto) e validazioni
 * - selettore cifre decimali e formato visualizzazione (it-IT / en-US)
 * - deep-link via querystring (?mode=..., campi precompilati)
 * - Copy-to-clipboard
 * - Batch mode (incolla righe o CSV, scegli operazione, scarica CSV risultati)
 *
 * Nessuna dipendenza esterna, solo React + Tailwind.
 */

type Mode =
  | 'percentOf'            // V = N * (P/100)
  | 'ratioOf'              // P = 100 * A / B
  | 'totalFromPart'        // N = 100 * A / P
  | 'increase'             // N * (1 + P/100)
  | 'discount'             // N * (1 - P/100)
  | 'variation'            // ((Xf - Xi)/Xi)*100
  | 'symmetricDiff'        // 100*|a-b| / ((a+b)/2)
  | 'points'               // Δpp = p2 - p1
  | 'inverse';             // pre-sconto / pre-aumento

type LocaleOption = 'it-IT' | 'en-US';

type Step = { label: string; text: string };
type ComputeResult = { value: number | null; unit?: '%' | 'pp' | ''; steps: Step[]; warnings?: string[]; error?: string };

const MODES: { key: Mode; label: string }[] = [
  { key: 'percentOf', label: 'Percentuale di un numero' },
  { key: 'ratioOf', label: 'Incidenza (A è che % di B?)' },
  { key: 'totalFromPart', label: 'Totale da parte e %' },
  { key: 'increase', label: 'Aumento' },
  { key: 'discount', label: 'Sconto' },
  { key: 'variation', label: 'Variazione % (Xi → Xf)' },
  { key: 'symmetricDiff', label: 'Differenza % (simmetrica)' },
  { key: 'points', label: 'Punti percentuali (pp)' },
  { key: 'inverse', label: 'Inversi (pre-sconto / pre-aumento)' },
];

const defaultQueryMode: Mode = 'percentOf';

const InfoIcon = ({ title }: { title: string }) => (
  <span className="inline-flex items-center align-middle" title={title} aria-label={title}>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-gray-400">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  </span>
);

// ---------- Utils numerici ----------

function normalizeNumericInput(raw: string): string {
  let s = (raw || '').toString().trim().replace(/%/g, '');
  // rimuovi spazi/migliaia comuni
  s = s.replace(/\s|’|˙|·| /g, '');
  const hasComma = s.includes(',');
  const hasDot = s.includes('.');
  if (hasComma && hasDot) {
    // Assumi . = migliaia e , = decimale (stile it-IT)
    s = s.replace(/\./g, '').replace(',', '.');
  } else if (hasComma && !hasDot) {
    s = s.replace(',', '.');
  }
  return s;
}

function parseLocaleNumber(raw: string): number | null {
  if (raw === null || raw === undefined) return null;
  const normalized = normalizeNumericInput(raw);
  if (normalized === '' || normalized === '-' || normalized === '+') return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function formatNumber(n: number, decimals: number, locale: LocaleOption): string {
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return formatter.format(n);
}

function roundForDisplay(n: number, decimals: number): number {
  // Arrotondamento solo per il display
  const factor = Math.pow(10, decimals);
  return Math.round((n + Number.EPSILON) * factor) / factor;
}

// ---------- Calcoli ----------

function compute(mode: Mode, inputs: Record<string, string>, inverseType: 'pre_sconto' | 'pre_aumento', decimals: number): ComputeResult {
  const steps: Step[] = [];
  const warnings: string[] = [];
  const val = (k: string) => parseLocaleNumber(inputs[k] ?? '');

  const addStep = (label: string, text: string) => steps.push({ label, text });

  try {
    switch (mode) {
      case 'percentOf': {
        const N = val('N');
        const P = val('P');
        if (N === null || P === null) return { value: null, steps, error: 'Inserisci N e P.' };
        addStep('Formula', 'V = N × (P / 100)');
        addStep('Sostituzione', `V = ${N} × (${P} / 100)`);
        const V = N * (P / 100);
        addStep('Calcolo', `V = ${V}`);
        return { value: V, unit: '', steps, warnings };
      }

      case 'ratioOf': {
        const A = val('A');
        const B = val('B');
        if (A === null || B === null) return { value: null, steps, error: 'Inserisci A e B.' };
        if (B === 0) return { value: null, steps, error: 'Il denominatore (B) non può essere 0.' };
        addStep('Formula', 'P = 100 × A / B');
        addStep('Sostituzione', `P = 100 × ${A} / ${B}`);
        const P = (100 * A) / B;
        addStep('Calcolo', `P = ${P}`);
        return { value: P, unit: '%', steps, warnings };
      }

      case 'totalFromPart': {
        const A = val('A');
        const P = val('P');
        if (A === null || P === null) return { value: null, steps, error: 'Inserisci A e P.' };
        if (P === 0) return { value: null, steps, error: 'La percentuale (P) non può essere 0.' };
        addStep('Formula', 'N = 100 × A / P');
        addStep('Sostituzione', `N = 100 × ${A} / ${P}`);
        const N = (100 * A) / P;
        addStep('Calcolo', `N = ${N}`);
        return { value: N, unit: '', steps, warnings };
      }

      case 'increase': {
        const N = val('N');
        const P = val('P');
        if (N === null || P === null) return { value: null, steps, error: 'Inserisci N e P.' };
        addStep('Formula', 'R = N × (1 + P/100)');
        addStep('Sostituzione', `R = ${N} × (1 + ${P}/100)`);
        const R = N * (1 + P / 100);
        if (1 + P / 100 === 0) warnings.push('Con P = -100% il risultato è 0.');
        addStep('Calcolo', `R = ${R}`);
        return { value: R, unit: '', steps, warnings };
      }

      case 'discount': {
        const N = val('N');
        const P = val('P');
        if (N === null || P === null) return { value: null, steps, error: 'Inserisci N e P.' };
        addStep('Formula', 'R = N × (1 − P/100)');
        addStep('Sostituzione', `R = ${N} × (1 − ${P}/100)`);
        const R = N * (1 - P / 100);
        if (1 - P / 100 === 0) warnings.push('Con P = 100% il risultato è 0.');
        if (1 - P / 100 < 0) warnings.push('Con P > 100% il risultato diventa negativo.');
        addStep('Calcolo', `R = ${R}`);
        return { value: R, unit: '', steps, warnings };
      }

      case 'variation': {
        const Xi = val('Xi');
        const Xf = val('Xf');
        if (Xi === null || Xf === null) return { value: null, steps, error: 'Inserisci Xi e Xf.' };
        if (Xi === 0) return { value: null, steps, error: 'Il valore iniziale (Xi) non può essere 0.' };
        addStep('Formula', 'Var% = ((Xf − Xi) / Xi) × 100');
        addStep('Sostituzione', `Var% = ((${Xf} − ${Xi}) / ${Xi}) × 100`);
        const V = ((Xf - Xi) / Xi) * 100;
        addStep('Calcolo', `Var% = ${V}`);
        return { value: V, unit: '%', steps, warnings };
      }

      case 'symmetricDiff': {
        const a = val('a');
        const b = val('b');
        if (a === null || b === null) return { value: null, steps, error: 'Inserisci a e b.' };
        const denom = (a + b) / 2;
        if (denom === 0) return { value: null, steps, error: 'La media (a+b)/2 è 0, differenza simmetrica non definita.' };
        addStep('Formula', 'Diff% = 100 × |a − b| / ((a + b)/2)');
        addStep('Sostituzione', `Diff% = 100 × |${a} − ${b}| / ((${a} + ${b})/2)`);
        const D = (100 * Math.abs(a - b)) / denom;
        addStep('Calcolo', `Diff% = ${D}`);
        return { value: D, unit: '%', steps, warnings };
      }

      case 'points': {
        const p1 = val('p1');
        const p2 = val('p2');
        if (p1 === null || p2 === null) return { value: null, steps, error: 'Inserisci p1 e p2.' };
        addStep('Formula', 'Δpp = p2 − p1');
        addStep('Sostituzione', `Δpp = ${p2} − ${p1}`);
        const d = p2 - p1;
        addStep('Calcolo', `Δpp = ${d}`);
        return { value: d, unit: 'pp', steps, warnings };
      }

      case 'inverse': {
        const Npost = val('Npost');
        const P = val('P');
        if (Npost === null || P === null) return { value: null, steps, error: 'Inserisci Npost e P.' };
        if (inverseType === 'pre_sconto') {
          const denom = 1 - P / 100;
          if (denom === 0) return { value: null, steps, error: 'Con P = 100% il prezzo pre-sconto non è definibile (divisione per 0).' };
          addStep('Formula', 'Npre = Npost / (1 − P/100)');
          addStep('Sostituzione', `Npre = ${Npost} / (1 − ${P}/100)`);
          const Npre = Npost / denom;
          addStep('Calcolo', `Npre = ${Npre}`);
          if (denom < 0) warnings.push('Con P > 100% il risultato è contro-intuitivo (denominatore negativo).');
          return { value: Npre, unit: '', steps, warnings };
        } else {
          const denom = 1 + P / 100;
          if (denom === 0) return { value: null, steps, error: 'Con P = −100% il valore pre-aumento non è definibile (divisione per 0).' };
          addStep('Formula', 'Npre = Npost / (1 + P/100)');
          addStep('Sostituzione', `Npre = ${Npost} / (1 + ${P}/100)`);
          const Npre = Npost / denom;
          addStep('Calcolo', `Npre = ${Npre}`);
          return { value: Npre, unit: '', steps, warnings };
        }
      }
    }
  } catch (e) {
    return { value: null, steps, error: 'Errore imprevisto nel calcolo.' };
  }
}

// ---------- Component ----------

export default function CalcolatorePercentualeCalculator() {
  // UI state
  const [mode, setMode] = useState<Mode>('percentOf');
  const [inverseType, setInverseType] = useState<'pre_sconto' | 'pre_aumento'>('pre_sconto');
  const [decimals, setDecimals] = useState<number>(2);
  const [locale, setLocale] = useState<LocaleOption>('it-IT');
  const [showSteps, setShowSteps] = useState<boolean>(true);
  const [batchTabOpen, setBatchTabOpen] = useState<boolean>(false);

  // Inputs
  const [inputs, setInputs] = useState<Record<string, string>>({
    N: '', P: '', A: '', B: '', Xi: '', Xf: '', a: '', b: '', p1: '', p2: '', Npost: ''
  });

  // Result
  const result: ComputeResult = useMemo(
    () => compute(mode, inputs, inverseType, decimals),
    [mode, inputs, inverseType, decimals]
  );

  // Deep-link: leggi querystring al primo mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);
    const qMode = (sp.get('mode') as Mode) || defaultQueryMode;
    if (MODES.find(m => m.key === qMode)) setMode(qMode);
    // precompila eventuali campi (usa le stesse key degli input)
    const possible = ['N','P','A','B','Xi','Xf','a','b','p1','p2','Npost'];
    const nextInputs: Record<string,string> = { ...inputs };
    possible.forEach(k => {
      const v = sp.get(k);
      if (v !== null) nextInputs[k] = v;
    });
    setInputs(nextInputs);
    const dec = sp.get('decimals');
    if (dec && !Number.isNaN(Number(dec))) setDecimals(Math.max(0, Math.min(6, Number(dec))));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helpers
  const setField = (k: string, v: string) => setInputs(prev => ({ ...prev, [k]: v }));
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Risultato copiato negli appunti.');
    } catch {
      alert('Copia non disponibile su questo browser.');
    }
  };

  // Batch mode state
  const [batchMode, setBatchMode] = useState<Mode>('percentOf');
  const [batchInverseType, setBatchInverseType] = useState<'pre_sconto'|'pre_aumento'>('pre_sconto');
  const [batchText, setBatchText] = useState<string>('');
  const [batchOutput, setBatchOutput] = useState<string>('');

  const batchColumnsHint = (m: Mode, inv: 'pre_sconto'|'pre_aumento') => {
    switch (m) {
      case 'percentOf': return 'N;P  (es. 500;20)';
      case 'ratioOf': return 'A;B  (es. 100;500)';
      case 'totalFromPart': return 'A;P  (es. 100;20)';
      case 'increase': return 'N;P  (es. 250;12)';
      case 'discount': return 'N;P  (es. 250;12)';
      case 'variation': return 'Xi;Xf  (es. 80;100)';
      case 'symmetricDiff': return 'a;b  (es. 80;100)';
      case 'points': return 'p1;p2  (es. 12;15)';
      case 'inverse': return inv === 'pre_sconto' ? 'Npost;P (es. 220;12)' : 'Npost;P (es. 280;12)';
    }
  };

  const runBatch = () => {
    const lines = batchText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const out: string[] = [];
    out.push('riga;input1;input2;risultato;unità;errore');
    lines.forEach((line, i) => {
      const parts = line.split(/[;,]/).map(s => s.trim());
      const inps: Record<string,string> = {};
      try {
        switch (batchMode) {
          case 'percentOf':
            [inps.N, inps.P] = [parts[0], parts[1]]; break;
          case 'ratioOf':
            [inps.A, inps.B] = [parts[0], parts[1]]; break;
          case 'totalFromPart':
            [inps.A, inps.P] = [parts[0], parts[1]]; break;
          case 'increase':
          case 'discount':
            [inps.N, inps.P] = [parts[0], parts[1]]; break;
          case 'variation':
            [inps.Xi, inps.Xf] = [parts[0], parts[1]]; break;
          case 'symmetricDiff':
            [inps.a, inps.b] = [parts[0], parts[1]]; break;
          case 'points':
            [inps.p1, inps.p2] = [parts[0], parts[1]]; break;
          case 'inverse':
            [inps.Npost, inps.P] = [parts[0], parts[1]]; break;
        }
        const r = compute(batchMode, inps, batchInverseType, decimals);
        if (r.error || r.value === null) {
          out.push(`${i+1};${parts[0] ?? ''};${parts[1] ?? ''};;${r.unit ?? ''};${r.error ?? 'Errore'}`);
        } else {
          const display = roundForDisplay(r.value, decimals);
          out.push(`${i+1};${parts[0] ?? ''};${parts[1] ?? ''};${display};${r.unit ?? ''};`);
        }
      } catch {
        out.push(`${i+1};${parts[0] ?? ''};${parts[1] ?? ''};;;Errore`);
      }
    });
    setBatchOutput(out.join('\n'));
  };

  const downloadBatch = () => {
    const blob = new Blob([batchOutput], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'risultati_percentuale.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  // ------------- Render -------------

  const resultDisplay = (() => {
    if (result.error) return <div className="text-red-600">{result.error}</div>;
    if (result.value === null) return <div className="text-gray-500">Inserisci i dati…</div>;
    const rounded = roundForDisplay(result.value, decimals);
    const formatted = formatNumber(rounded, decimals, locale);
    const unit = result.unit ?? '';
    return (
      <div className="flex items-center gap-3">
        <span className="text-2xl font-semibold" aria-live="polite">{formatted}{unit ? ` ${unit}` : ''}</span>
        <button
          type="button"
          onClick={() => copyToClipboard(`${formatted}${unit ? ` ${unit}` : ''}`)}
          className="text-sm px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-50"
          aria-label="Copia risultato"
        >
          Copia
        </button>
      </div>
    );
  })();

  const field = (name: string, label: string, placeholder = '', help?: string) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {help ? <InfoIcon title={help} /> : null}
      </label>
      <input
        id={name}
        value={inputs[name] ?? ''}
        onChange={e => setField(name, e.target.value)}
        inputMode="decimal"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        aria-describedby={help ? `${name}-help` : undefined}
      />
    </div>
  );

  return (
    <section className="w-full">
      {/* Tabs modalità */}
      <div className="flex flex-wrap gap-2 mb-4">
        {MODES.map(m => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-3 py-1.5 rounded-full border text-sm ${mode === m.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            aria-pressed={mode === m.key}
          >
            {m.label}
          </button>
        ))}
        <button
          onClick={() => setBatchTabOpen(prev => !prev)}
          className={`ml-auto px-3 py-1.5 rounded-full border text-sm ${batchTabOpen ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
          aria-pressed={batchTabOpen}
          title="Elabora molte righe alla volta (CSV/righe incollate)"
        >
          Batch
        </button>
      </div>

      {/* Pannello impostazioni */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Cifre decimali</label>
          <select
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={decimals}
            onChange={e => setDecimals(Math.max(0, Math.min(6, Number(e.target.value))))}
          >
            {[0,1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Formato visualizzazione
            <InfoIcon title="Solo formattazione del numero in uscita. L’input accetta sia virgola sia punto." />
          </label>
          <select
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={locale}
            onChange={e => setLocale(e.target.value as LocaleOption)}
          >
            <option value="it-IT">it-IT (1.234,56)</option>
            <option value="en-US">en-US (1,234.56)</option>
          </select>
        </div>
        <div className="flex items-end">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" className="rounded border-gray-300" checked={showSteps} onChange={e => setShowSteps(e.target.checked)} />
            Mostra i passaggi
          </label>
        </div>
      </div>

      {/* Form dinamico */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {mode === 'percentOf' && (
          <>
            {field('N', 'Numero (N)', 'es. 500')}
            {field('P', 'Percentuale (P, %)', 'es. 20', 'Puoi digitare 20 o 20%')}
          </>
        )}

        {mode === 'ratioOf' && (
          <>
            {field('A', 'Parte (A)', 'es. 100')}
            {field('B', 'Totale (B)', 'es. 500')}
          </>
        )}

        {mode === 'totalFromPart' && (
          <>
            {field('A', 'Parte (A)', 'es. 100')}
            {field('P', 'Percentuale (P, %)', 'es. 20')}
          </>
        )}

        {mode === 'increase' && (
          <>
            {field('N', 'Valore iniziale (N)', 'es. 250')}
            {field('P', 'Aumento (P, %)', 'es. 12')}
          </>
        )}

        {mode === 'discount' && (
          <>
            {field('N', 'Valore iniziale (N)', 'es. 250')}
            {field('P', 'Sconto (P, %)', 'es. 12')}
          </>
        )}

        {mode === 'variation' && (
          <>
            {field('Xi', 'Valore iniziale (Xi)', 'es. 80')}
            {field('Xf', 'Valore finale (Xf)', 'es. 100')}
          </>
        )}

        {mode === 'symmetricDiff' && (
          <>
            {field('a', 'Valore a', 'es. 80')}
            {field('b', 'Valore b', 'es. 100')}
          </>
        )}

        {mode === 'points' && (
          <>
            {field('p1', 'Percentuale iniziale p1 (%)', 'es. 12')}
            {field('p2', 'Percentuale finale p2 (%)', 'es. 15')}
          </>
        )}

        {mode === 'inverse' && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Tipo inverso</label>
              <div className="flex gap-3">
                <label className="inline-flex items-center gap-1 text-sm">
                  <input type="radio" name="inv" checked={inverseType==='pre_sconto'} onChange={() => setInverseType('pre_sconto')} />
                  Pre-sconto
                </label>
                <label className="inline-flex items-center gap-1 text-sm">
                  <input type="radio" name="inv" checked={inverseType==='pre_aumento'} onChange={() => setInverseType('pre_aumento')} />
                  Pre-aumento
                </label>
              </div>
            </div>
            {field('Npost', 'Valore dopo sconto/aumento (Npost)', 'es. 220')}
            {field('P', 'Percentuale (P, %)', 'es. 12')}
          </>
        )}
      </div>

      {/* Risultato */}
      <div className="mt-5 p-4 rounded-xl border bg-gray-50">
        <div className="mb-2 text-sm font-medium text-gray-600">Risultato</div>
        {resultDisplay}
        {!!(result.warnings && result.warnings.length) && (
          <ul className="mt-2 list-disc list-inside text-amber-700 text-sm">
            {result.warnings!.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        )}
        {showSteps && (
          <div className="mt-4">
            <details open>
              <summary className="cursor-pointer text-sm text-gray-700 select-none">Mostra i passaggi</summary>
              <div className="mt-2 space-y-1">
                {result.steps.map((s, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-semibold">{s.label}:</span>{' '}
                    <code className="px-1 py-0.5 rounded bg-white border">{s.text}</code>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </div>

      {/* Batch Mode */}
      {batchTabOpen && (
        <div className="mt-6 p-4 rounded-xl border">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">Operazione</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <select className="rounded-lg border border-gray-300 px-3 py-2" value={batchMode} onChange={e => setBatchMode(e.target.value as Mode)}>
                  {MODES.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
                </select>
                {batchMode === 'inverse' && (
                  <select className="rounded-lg border border-gray-300 px-3 py-2" value={batchInverseType} onChange={e => setBatchInverseType(e.target.value as 'pre_sconto'|'pre_aumento')}>
                    <option value="pre_sconto">Pre-sconto</option>
                    <option value="pre_aumento">Pre-aumento</option>
                  </select>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Colonne attese: <strong>{batchColumnsHint(batchMode, batchInverseType)}</strong> (separa con <code>;</code> o <code>,</code>). Decimali: virgola o punto accettati.
              </p>
            </div>
            <div className="flex items-end gap-2">
              <button className="px-3 py-2 rounded-md border bg-white hover:bg-gray-50" onClick={() => setBatchText('')}>Pulisci</button>
              <button className="px-3 py-2 rounded-md border bg-blue-600 text-white hover:bg-blue-700" onClick={runBatch}>Calcola batch</button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Incolla righe / CSV</label>
              <textarea
                className="rounded-lg border border-gray-300 px-3 py-2 min-h-[160px]"
                value={batchText}
                onChange={e => setBatchText(e.target.value)}
                placeholder="Esempio (percentuale di un numero):&#10;500;20&#10;1200;7,5"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Output CSV</label>
              <textarea
                className="rounded-lg border border-gray-300 px-3 py-2 min-h-[160px]"
                value={batchOutput}
                onChange={e => setBatchOutput(e.target.value)}
                placeholder="Risultati…"
              />
              <div className="mt-2">
                <button disabled={!batchOutput} className={`px-3 py-2 rounded-md border ${batchOutput ? 'bg-white hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`} onClick={downloadBatch}>
                  Scarica CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Esempi rapidi per QA (facoltativi) */}
      <div className="mt-6 text-xs text-gray-500">
        <p><strong>Test rapidi:</strong> 20% di 500 = 100 · “100 è che % di 500?” = 20% · Totale da 100 che è 20% = 500 · Aumento 250 di 12% = 280 · Sconto 250 di 12% = 220 · Variazione 80→100 = 25% · Differenza% simmetrica 80↔100 ≈ 22,222…% · Punti% 12→15 = +3 pp.</p>
      </div>
    </section>
  );
}
