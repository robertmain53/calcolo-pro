"use client";

import React, { useEffect, useMemo, useState } from "react";
import MathBlock from "@/components/ui/MathBlock";

interface WattAmpereCalculatorProps {
  title?: string;
  description?: string;
}

type SystemType = "dc" | "monofase" | "trifase";
type LineType = "LL" | "LN";
type CalcMode = "WtoA" | "AtoW";
type PowerUnit = "W" | "kW" | "MW";
type VoltageUnit = "V" | "kV";

const sqrt3 = Math.sqrt(3);

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const formatNumber = (n: number, digits = 2) =>
  Number.isFinite(n) ? n.toLocaleString("it-IT", { maximumFractionDigits: digits }) : "—";

const toWatts = (value: number, unit: PowerUnit) =>
  unit === "W" ? value : unit === "kW" ? value * 1_000 : value * 1_000_000;

const fromWatts = (watts: number, unit: PowerUnit) =>
  unit === "W" ? watts : unit === "kW" ? watts / 1_000 : watts / 1_000_000;

const toVolts = (value: number, unit: VoltageUnit) => (unit === "V" ? value : value * 1_000);
const fromVolts = (volts: number, unit: VoltageUnit) => (unit === "V" ? volts : volts / 1_000);

const pfTypical: Array<{ label: string; pf: number }> = [
  { label: "Resistivo (stufe, forni)", pf: 1.0 },
  { label: "LED di qualità", pf: 0.95 },
  { label: "UPS on-line", pf: 0.9 },
  { label: "Motore a induzione (pieno carico)", pf: 0.85 },
  { label: "Motore a induzione (parziale)", pf: 0.7 },
];

const miniTablePowersW = [10, 100, 500, 1_000, 3_000, 5_000];

const ProfessionalWattAmpereCalculator: React.FC<WattAmpereCalculatorProps> = ({
  title = "Watt ↔ Ampere (DC / AC 1φ / AC 3φ)",
  description = "Calcolatore professionale con formule live, PF, L-L/L-N, unit switch e Swap.",
}) => {
  // ---- STATE ----
  const [mode, setMode] = useState<CalcMode>("WtoA");
  const [systemType, setSystemType] = useState<SystemType>("monofase");
  const [lineType, setLineType] = useState<LineType>("LL"); // solo per trifase

  const [powerUnit, setPowerUnit] = useState<PowerUnit>("W");
  const [voltageUnit, setVoltageUnit] = useState<VoltageUnit>("V");

  const [powerStr, setPowerStr] = useState<string>("1000"); // input potenza (unit selezionata)
  const [currentStr, setCurrentStr] = useState<string>(""); // input corrente per modalità A→W
  const [voltageStr, setVoltageStr] = useState<string>("230"); // input tensione (unit selezionata)
  const [pfStr, setPfStr] = useState<string>("0.90"); // 0<pf≤1 per AC;=1 forzato per DC

  const [error, setError] = useState<string | null>(null);

  // Preset volt IT quando cambio sistema
  useEffect(() => {
    if (systemType === "dc") return;
    if (systemType === "monofase") {
      setVoltageStr("230");
      setVoltageUnit("V");
    } else {
      // trifase
      setLineType("LL");
      setVoltageStr("400");
      setVoltageUnit("V");
    }
  }, [systemType]);

  // Forza PF=1 in DC
  useEffect(() => {
    if (systemType === "dc") {
      setPfStr("1.00");
    }
  }, [systemType]);

  // ---- PARSING & VALIDAZIONE ----
  const powerVal = useMemo(() => parseFloat(powerStr.replace(",", ".")), [powerStr]);
  const currentVal = useMemo(() => parseFloat(currentStr.replace(",", ".")), [currentStr]);
  const voltageVal = useMemo(() => parseFloat(voltageStr.replace(",", ".")), [voltageStr]);
  const pfValRaw = useMemo(() => parseFloat(pfStr.replace(",", ".")), [pfStr]);
  const pfVal = systemType === "dc" ? 1 : pfValRaw;

  const checkRanges = (): string | null => {
    if (mode === "WtoA") {
      if (!isFinite(powerVal)) return "Inserisci una potenza valida.";
    } else {
      if (!isFinite(currentVal)) return "Inserisci una corrente valida.";
    }
    if (!isFinite(voltageVal)) return "Inserisci una tensione valida.";

    // Range pro (configurabili)
    const V = toVolts(voltageVal, voltageUnit);
    const P = mode === "WtoA" ? toWatts(powerVal, powerUnit) : undefined;
    const Iin = mode === "AtoW" ? currentVal : undefined;

    if (V <= 0 || V > 100_000) return "Tensione fuori range (0.1 V – 100 kV).";
    if (mode === "WtoA") {
      if ((P ?? 0) <= 0 || (P ?? 0) > 10_000_000) return "Potenza fuori range (1 mW – 10 MW).";
    } else {
      if ((Iin ?? 0) <= 0 || (Iin ?? 0) > 10_000) return "Corrente fuori range (0.001 A – 10 kA).";
    }

    if (systemType !== "dc") {
      if (!isFinite(pfValRaw)) return "Inserisci un fattore di potenza valido.";
      if (pfValRaw <= 0 || pfValRaw > 1) return "Il fattore di potenza deve essere compreso (0, 1].";
    }
    return null;
  };

  // ---- CALCOLO ----
  const calc = useMemo(() => {
    const err = checkRanges();
    if (err) {
      return { error: err } as const;
    }

    const V = toVolts(voltageVal, voltageUnit);
    const PF = systemType === "dc" ? 1 : clamp(pfVal, 0.000001, 1);

    let I: number | null = null;
    let P: number | null = null;
    let S_va: number | null = null; // apparent power (solo AC)

    if (mode === "WtoA") {
      const P_w = toWatts(powerVal, powerUnit);
      switch (systemType) {
        case "dc":
          I = P_w / V;
          P = P_w;
          S_va = null;
          break;
        case "monofase":
          I = P_w / (V * PF);
          P = P_w;
          S_va = P_w / PF;
          break;
        case "trifase":
          if (lineType === "LL") {
            I = P_w / (sqrt3 * V * PF);
          } else {
            // L-N
            I = P_w / (3 * V * PF);
          }
          P = P_w;
          S_va = P_w / PF;
          break;
      }
    } else {
      // A → W
      const Iin = currentVal;
      switch (systemType) {
        case "dc":
          P = Iin * V;
          S_va = null;
          I = Iin;
          break;
        case "monofase":
          P = Iin * V * PF;
          S_va = Iin * V; // in monofase S = V*I
          I = Iin;
          break;
        case "trifase":
          if (lineType === "LL") {
            P = Iin * sqrt3 * V * PF;
            S_va = Iin * sqrt3 * V;
          } else {
            P = Iin * 3 * V * PF;
            S_va = Iin * 3 * V;
          }
          I = Iin;
          break;
      }
    }

    return {
      error: null,
      I: I ?? null,
      P: P ?? null,
      S_va,
      V,
      PF,
    } as const;
  }, [mode, systemType, lineType, voltageVal, voltageUnit, pfVal, pfValRaw, powerVal, powerUnit, currentVal]);

  useEffect(() => {
    setError(calc.error);
  }, [calc]);

  // ---- FORMULA LIVE (LaTeX) ----
  const formulaLatex = useMemo(() => {
    const V = toVolts(voltageVal || 0, voltageUnit);
    const P = mode === "WtoA" ? toWatts(powerVal || 0, powerUnit) : calc.P ?? 0;
    const I = mode === "AtoW" ? currentVal || 0 : calc.I ?? 0;
    const PF = systemType === "dc" ? 1 : pfValRaw || 1;

    const fmt = (n: number) => (Number.isFinite(n) && n !== 0 ? n.toPrecision(3) : "…");

    if (mode === "WtoA") {
      if (systemType === "dc") {
        return `I=\\dfrac{P}{V}=\\dfrac{${fmt(P)}}{${fmt(V)}}`;
      }
      if (systemType === "monofase") {
        return `I=\\dfrac{P}{V\\,\\cos\\varphi}=\\dfrac{${fmt(P)}}{${fmt(V)}\\cdot ${fmt(PF)}}`;
      }
      // trifase
      if (lineType === "LL") {
        return `I=\\dfrac{P}{\\sqrt{3}\\,V_{LL}\\,\\cos\\varphi}=\\dfrac{${fmt(P)}}{1.732\\cdot ${fmt(V)}\\cdot ${fmt(PF)}}`;
      }
      return `I=\\dfrac{P}{3\\,V_{LN}\\,\\cos\\varphi}=\\dfrac{${fmt(P)}}{3\\cdot ${fmt(V)}\\cdot ${fmt(PF)}}`;
    } else {
      if (systemType === "dc") {
        return `P=V\\,I=${fmt(V)}\\cdot ${fmt(I)}`;
      }
      if (systemType === "monofase") {
        return `P=V\\,I\\,\\cos\\varphi=${fmt(V)}\\cdot ${fmt(I)}\\cdot ${fmt(PF)}`;
      }
      if (lineType === "LL") {
        return `P=\\sqrt{3}\\,V_{LL}\\,I\\,\\cos\\varphi=1.732\\cdot ${fmt(V)}\\cdot ${fmt(I)}\\cdot ${fmt(PF)}`;
      }
      return `P=3\\,V_{LN}\\,I\\,\\cos\\varphi=3\\cdot ${fmt(V)}\\cdot ${fmt(I)}\\cdot ${fmt(PF)}`;
    }
  }, [mode, systemType, lineType, voltageVal, voltageUnit, pfValRaw, powerVal, powerUnit, currentVal, calc.P, calc.I]);

  // ---- BADGE STATO CORRENTE ----
  const currentBadge = useMemo(() => {
    if (!calc.I || !isFinite(calc.I)) return null;
    const I = calc.I;
    let color = "bg-emerald-100 text-emerald-800 border-emerald-200";
    let label = "Normale";
    if (I >= 40 && I < 100) {
      color = "bg-amber-100 text-amber-800 border-amber-200";
      label = "Attenzione";
    } else if (I >= 100) {
      color = "bg-rose-100 text-rose-800 border-rose-200";
      label = "Critico";
    }
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${color}`}>
        Stato: {label}
      </span>
    );
  }, [calc.I]);

  // ---- ESEMPI RAPIDI ----
  const loadExample = (key: "led" | "motor" | "resistive") => {
    if (key === "led") {
      setMode("WtoA");
      setSystemType("monofase");
      setVoltageUnit("V");
      setVoltageStr("230");
      setPowerUnit("W");
      setPowerStr("100");
      setPfStr("0.95");
    } else if (key === "motor") {
      setMode("WtoA");
      setSystemType("trifase");
      setLineType("LL");
      setVoltageUnit("V");
      setVoltageStr("400");
      setPowerUnit("kW");
      setPowerStr("3");
      setPfStr("0.85");
    } else {
      // resistive
      setMode("WtoA");
      setSystemType("monofase");
      setVoltageUnit("V");
      setVoltageStr("230");
      setPowerUnit("kW");
      setPowerStr("1");
      setPfStr("1.00");
    }
  };

  // ---- MINI TABELLA W→A ----
  const miniRows = useMemo(() => {
    if (mode !== "WtoA") return [];
    const presets: Array<{ label: string; V: number; PF: number }> = [];
    if (systemType === "monofase") {
      presets.push({ label: "230 V, PF 1.0", V: 230, PF: 1.0 });
      presets.push({ label: "230 V, PF 0.9", V: 230, PF: 0.9 });
    } else if (systemType === "trifase") {
      // L-L 400 V
      presets.push({ label: "3φ 400 V L-L, PF 1.0", V: 400, PF: 1.0 });
      presets.push({ label: "3φ 400 V L-L, PF 0.9", V: 400, PF: 0.9 });
    } else {
      presets.push({ label: "DC 230 V", V: 230, PF: 1.0 });
    }

    const rows = presets.map((p) => {
      const amps = miniTablePowersW.map((Pw) => {
        if (systemType === "dc") return Pw / p.V;
        if (systemType === "monofase") return Pw / (p.V * p.PF);
        // trifase L-L (tabella di riferimento rapida su L-L)
        return Pw / (sqrt3 * p.V * p.PF);
      });
      return { preset: p.label, amps };
    });
    return rows;
  }, [mode, systemType]);

  // ---- RENDER ----
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm max-w-3xl mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* MODE & SYSTEM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Modalità</label>
          <div className="flex rounded-lg overflow-hidden border border-gray-300">
            <button
              className={`w-1/2 py-2 text-sm font-semibold ${
                mode === "WtoA" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setMode("WtoA")}
              aria-pressed={mode === "WtoA"}
            >
              Watt → Ampere
            </button>
            <button
              className={`w-1/2 py-2 text-sm font-semibold ${
                mode === "AtoW" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setMode("AtoW")}
              aria-pressed={mode === "AtoW"}
            >
              Ampere → Watt
            </button>
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo di sistema</label>
          <div className="flex rounded-lg overflow-hidden border border-gray-300">
            <button
              className={`w-1/3 py-2 text-sm font-semibold ${
                systemType === "dc" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSystemType("dc")}
            >
              DC
            </button>
            <button
              className={`w-1/3 py-2 text-sm font-semibold ${
                systemType === "monofase" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSystemType("monofase")}
            >
              AC 1φ
            </button>
            <button
              className={`w-1/3 py-2 text-sm font-semibold ${
                systemType === "trifase" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSystemType("trifase")}
            >
              AC 3φ
            </button>
          </div>
        </div>

        {/* L-L / L-N (solo trifase) */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Connessione trifase</label>
          <div className="flex rounded-lg overflow-hidden border border-gray-300">
            <button
              className={`w-1/2 py-2 text-sm font-semibold ${
                systemType === "trifase" && lineType === "LL"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              } ${systemType !== "trifase" ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => systemType === "trifase" && setLineType("LL")}
              disabled={systemType !== "trifase"}
              title="Linea-Linea (es. 400 V in Italia)"
            >
              L-L
            </button>
            <button
              className={`w-1/2 py-2 text-sm font-semibold ${
                systemType === "trifase" && lineType === "LN"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              } ${systemType !== "trifase" ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => systemType === "trifase" && setLineType("LN")}
              disabled={systemType !== "trifase"}
              title="Linea-Neutro (es. 230 V)"
            >
              L-N
            </button>
          </div>
        </div>
      </div>

      {/* INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Potenza o Corrente a seconda della modalità */}
        {mode === "WtoA" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="power">
              Potenza
            </label>
            <div className="mt-1 flex gap-2">
              <input
                id="power"
                type="number"
                inputMode="decimal"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="es. 1000"
                value={powerStr}
                onChange={(e) => setPowerStr(e.target.value)}
              />
              <select
                aria-label="Unità potenza"
                className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                value={powerUnit}
                onChange={(e) => setPowerUnit(e.target.value as PowerUnit)}
              >
                <option>W</option>
                <option>kW</option>
                <option>MW</option>
              </select>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="current">
              Corrente
            </label>
            <div className="mt-1 flex gap-2">
              <input
                id="current"
                type="number"
                inputMode="decimal"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="es. 16"
                value={currentStr}
                onChange={(e) => setCurrentStr(e.target.value)}
              />
              <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">A</div>
            </div>
          </div>
        )}

        {/* Tensione */}
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="voltage">
            Tensione
          </label>
          <div className="mt-1 flex gap-2">
            <input
              id="voltage"
              type="number"
              inputMode="decimal"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder={systemType === "trifase" ? (lineType === "LL" ? "400" : "230") : "230"}
              value={voltageStr}
              onChange={(e) => setVoltageStr(e.target.value)}
            />
            <select
              aria-label="Unità tensione"
              className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
              value={voltageUnit}
              onChange={(e) => setVoltageUnit(e.target.value as VoltageUnit)}
            >
              <option>V</option>
              <option>kV</option>
            </select>
          </div>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="px-2 py-1 text-xs rounded border border-gray-300 hover:bg-gray-50"
              onClick={() => {
                setVoltageUnit("V");
                setVoltageStr(systemType === "trifase" ? (lineType === "LL" ? "400" : "230") : "230");
              }}
              title="Preset Italia"
            >
              Preset IT {systemType === "trifase" ? (lineType === "LL" ? "400 V L-L" : "230 V L-N") : "230 V"}
            </button>
            {systemType === "dc" && (
              <button
                type="button"
                className="px-2 py-1 text-xs rounded border border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  setVoltageUnit("V");
                  setVoltageStr("12");
                }}
              >
                Preset DC 12 V
              </button>
            )}
          </div>
        </div>

        {/* PF (solo AC) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="powerFactor">
            Fattore di Potenza (cos φ)
            <span className="ml-2 text-xs text-gray-500 align-middle" title="Valori tipici disponibili sotto (indicativi)">
              (?)
            </span>
          </label>
          <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <input
              id="powerFactor"
              type="number"
              inputMode="decimal"
              step="0.01"
              min={0}
              max={1}
              className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="es. 0.90"
              value={pfStr}
              onChange={(e) => setPfStr(e.target.value)}
              disabled={systemType === "dc"}
            />
            <input
              type="range"
              min={0.6}
              max={1}
              step={0.01}
              className="w-full"
              value={clamp(systemType === "dc" ? 1 : pfValRaw || 0.9, 0.6, 1)}
              onChange={(e) => setPfStr(String(Number(e.target.value).toFixed(2)))}
              disabled={systemType === "dc"}
            />
            <div className="flex gap-2">
              <button
                type="button"
                className="px-2 py-1 text-xs rounded border border-gray-300 hover:bg-gray-50"
                onClick={() => loadExample("led")}
              >
                Esempio LED
              </button>
              <button
                type="button"
                className="px-2 py-1 text-xs rounded border border-gray-300 hover:bg-gray-50"
                onClick={() => loadExample("motor")}
              >
                Esempio Motore
              </button>
              <button
                type="button"
                className="px-2 py-1 text-xs rounded border border-gray-300 hover:bg-gray-50"
                onClick={() => loadExample("resistive")}
              >
                Resistivo
              </button>
            </div>
          </div>

          {/* PF tipici */}
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
            {pfTypical.map((row) => (
              <button
                key={row.label}
                type="button"
                className={`px-2 py-1 text-xs rounded border ${
                  systemType === "dc" ? "border-gray-200 text-gray-400" : "border-gray-300 hover:bg-gray-50"
                } text-left`}
                onClick={() => systemType !== "dc" && setPfStr(row.pf.toFixed(2))}
                disabled={systemType === "dc"}
                title="Valori indicativi — usare i dati di targa per progetto"
              >
                {row.label}: <span className="font-mono">{row.pf.toFixed(2)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FORMULA LIVE */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700">Formula utilizzata (live)</p>
          <span className="text-xs text-gray-500">
            {systemType === "trifase"
              ? lineType === "LL"
                ? "Usa V_LL (es. 400 V in IT)"
                : "Usa V_LN (230 V)"
              : systemType === "monofase"
              ? "Monofase con cos φ"
              : "DC (cos φ = 1)"}
          </span>
        </div>
        <MathBlock>{formulaLatex}</MathBlock>
      </div>

      {/* RISULTATI */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
        {error ? (
          <p className="text-red-600 font-medium text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <p className="text-xs text-gray-600 mb-1">{mode === "WtoA" ? "Corrente calcolata" : "Corrente (input)"}</p>
              <p className="text-xl font-bold text-blue-700">
                {formatNumber(calc.I ?? NaN, 2)} <span className="text-gray-500 font-normal">A</span>
              </p>
              <p className="text-sm text-gray-700">
                {formatNumber((calc.I ?? 0) * 1000, 0)} <span className="text-gray-500">mA</span>
              </p>
              <div className="mt-2">{currentBadge}</div>
            </div>

            <div>
              <p className="text-xs text-gray-600 mb-1">{mode === "AtoW" ? "Potenza calcolata" : "Potenza (input)"}</p>
              <p className="text-xl font-bold text-gray-900">
                {formatNumber(fromWatts(calc.P ?? NaN, powerUnit), 2)}{" "}
                <span className="text-gray-500 font-normal">{powerUnit}</span>
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-600 mb-1">Potenza apparente</p>
              <p className="text-xl font-bold text-gray-900">
                {systemType === "dc" ? "—" : `${formatNumber((calc.S_va ?? 0) / 1000, 2)} `}
                {systemType === "dc" ? "" : <span className="text-gray-500 font-normal">kVA</span>}
              </p>
            </div>
          </div>
        )}
        {!error && (
          <p className="mt-3 text-xs text-gray-500">
            Nota: i risultati sono calcolati con le formule semplificate (IEC/CEI 60364). Per qualità della tensione di
            rete e tolleranze fare riferimento a <span className="font-medium">CEI EN 50160</span>. I PF “tipici” sono
            indicativi: per progetto usare dati di targa o misure.
          </p>
        )}
      </div>

      {/* MINI TABELLINA RAPIDA W→A */}
      {mode === "WtoA" && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Tabella rapida (W → A) — {systemType === "trifase" ? "3φ (L-L 400 V)" : systemType === "monofase" ? "230 V" : "DC 230 V"}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border border-gray-200 rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Preset</th>
                  {miniTablePowersW.map((w) => (
                    <th key={w} className="px-3 py-2 text-right">
                      {w >= 1000 ? `${w / 1000} kW` : `${w} W`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {miniRows.map((row, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-gray-50">
                    <td className="px-3 py-2">{row.preset}</td>
                    {row.amps.map((a, i) => (
                      <td key={i} className="px-3 py-2 text-right font-mono">
                        {formatNumber(a, 2)} A
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FOOTER / METODOLOGIA */}
      <div className="mt-6 text-xs text-gray-500">
        <p className="mb-1">
          Metodologia: DC {`I=P/V`}. AC 1φ {`I=P/(V·cosφ)`}. AC 3φ L-L {`I=P/(√3·V_LL·cosφ)`}. AC 3φ L-N{" "}
          {`I=P/(3·V_LN·cosφ)`}. Inverse per A→W. Per impianti utilizzatori: CEI 64-8 / IEC 60364. Qualità della
          tensione: CEI EN 50160.
        </p>
        <p>
          Questo strumento fornisce calcoli preliminari. Per dimensionamento di cavi/interruttori usa i calcolatori
          dedicati e le tabelle CEI-UNEL.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalWattAmpereCalculator;
