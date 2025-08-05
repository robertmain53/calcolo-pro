"use client";
import React, { useState } from 'react';
import MathBlock from '../ui/MathBlock';

// =======================================================================
//  1. DEFINIZIONE DEL COMPONENTE CALCOLATORE
// =======================================================================

interface LoadData {
  g1: number; g2: number; q: number; snow: number; wind: number; seismic: number;
  categoriaUso: 'A' | 'B' | 'C' | 'D' | 'E';
  altitudineNeve: 'inf_1000' | 'sup_1000';
}
interface Results {
  sluFondale: string; sluSismico: string; sleRara: string;
  sleFrequente: string; sleQuasiPermanente: string;
}
const COEFFICIENTS = {
  gamma: { g1_sfav: 1.3, g2_sfav: 1.5, q_sfav: 1.5 },
  psi: {
    A: { psi0: 0.7, psi1: 0.5, psi2: 0.3 }, B: { psi0: 0.7, psi1: 0.5, psi2: 0.3 },
    C: { psi0: 0.7, psi1: 0.7, psi2: 0.6 }, D: { psi0: 0.7, psi1: 0.7, psi2: 0.6 },
    E: { psi0: 1.0, psi1: 0.9, psi2: 0.8 },
    neve: {
      inf_1000: { psi0: 0.5, psi1: 0.2, psi2: 0.0 },
      sup_1000: { psi0: 0.7, psi1: 0.5, psi2: 0.2 },
    },
    vento: { psi0: 0.6, psi1: 0.2, psi2: 0.0 },
  }
};

const CalcoloCombinazioniCaricoCalculator: React.FC = () => {
  const [loads, setLoads] = useState<LoadData>({
    g1: 0, g2: 0, q: 0, snow: 0, wind: 0, seismic: 0,
    categoriaUso: 'A', altitudineNeve: 'inf_1000',
  });
  const [results, setResults] = useState<Results | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoads(prevData => ({ ...prevData, [name]: parseFloat(value) || 0 }));
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setLoads(prevData => ({ ...prevData, [name]: value as any }));
  };

  const calculate = () => {
    const { g1, g2, q, snow, wind, seismic, categoriaUso, altitudineNeve } = loads;
    const psi_q = COEFFICIENTS.psi[categoriaUso];
    const psi_snow = COEFFICIENTS.psi.neve[altitudineNeve];
    const psi_wind = COEFFICIENTS.psi.vento;
    const g_tot = g1 + g2;
    const variableActions = [
      { value: q, psi: psi_q }, { value: snow, psi: psi_snow }, { value: wind, psi: psi_wind },
    ];
    let sluFondaleMax = COEFFICIENTS.gamma.g1_sfav * g1 + COEFFICIENTS.gamma.g2_sfav * g2;
    for (let i = 0; i < variableActions.length; i++) {
      if (variableActions[i].value > 0) {
        let currentSlu = COEFFICIENTS.gamma.g1_sfav * g1 + COEFFICIENTS.gamma.g2_sfav * g2;
        currentSlu += COEFFICIENTS.gamma.q_sfav * variableActions[i].value;
        for (let j = 0; j < variableActions.length; j++) {
          if (i !== j)
            currentSlu += COEFFICIENTS.gamma.q_sfav * variableActions[j].psi.psi0 * variableActions[j].value;
        }
        sluFondaleMax = Math.max(sluFondaleMax, currentSlu);
      }
    }
    const sluSismico = seismic + g_tot + (psi_q.psi2 * q) + (psi_snow.psi2 * snow) + (psi_wind.psi2 * wind);
    let sleRaraMax = g_tot, sleFrequenteMax = g_tot;
    for (let i = 0; i < variableActions.length; i++) {
      if (variableActions[i].value > 0) {
        let currentSleRara = g_tot, currentSleFrequente = g_tot;
        currentSleRara += variableActions[i].value;
        currentSleFrequente += variableActions[i].psi.psi1 * variableActions[i].value;
        for (let j = 0; j < variableActions.length; j++) {
          if (i !== j) {
            currentSleRara += variableActions[j].psi.psi0 * variableActions[j].value;
            currentSleFrequente += variableActions[j].psi.psi2 * variableActions[j].value;
          }
        }
        sleRaraMax = Math.max(sleRaraMax, currentSleRara);
        sleFrequenteMax = Math.max(sleFrequenteMax, currentSleFrequente);
      }
    }
    const sleQuasiPermanente = g_tot + (psi_q.psi2 * q) + (psi_snow.psi2 * snow) + (psi_wind.psi2 * wind);
    setResults({
      sluFondale: sluFondaleMax.toFixed(2), sluSismico: sluSismico.toFixed(2),
      sleRara: sleRaraMax.toFixed(2), sleFrequente: sleFrequenteMax.toFixed(2),
      sleQuasiPermanente: sleQuasiPermanente.toFixed(2),
    });
  };
  const reset = () => {
    setLoads({
      g1: 0, g2: 0, q: 0, snow: 0, wind: 0, seismic: 0,
      categoriaUso: 'A', altitudineNeve: 'inf_1000',
    });
    setResults(null);
  };
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6 border-2 border-indigo-600">
      {/* ——— INPUT FORM ——— */}
      {/*  …omesso per brevità, invariato dal refactor… */}
    </div>
  );
};

// =======================================================================
//  2. DEFINIZIONE DELLA PAGINA HUB CHE UTILIZZA IL CALCOLATORE
// =======================================================================
const PaginaHubCombinazioniCarico: React.FC = () => {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <article className="prose max-w-none lg:prose-lg bg-white p-6 rounded-lg shadow-lg">
        <header className="text-center border-b pb-4 mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Hub sulle Combinazioni di Carico
          </h1>
          <p className="text-xl text-gray-600">
            Una guida pratica e teorica alle combinazioni di carico secondo le
            NTC 2018 per professionisti del settore.
          </p>
        </header>

        {/* —— INTRODUZIONE —— */}
        {/* …testo invariato… */}

        <section id="formule">
          <h2 className="text-2xl font-bold">
            Le Formule di Combinazione (§ 2.5.3 NTC 2018)
          </h2>

          {/* —— SLU —— */}
          <h3 className="text-xl font-semibold">Stati Limite Ultimi (SLU)</h3>
          <p>
            <strong>Combinazione Fondamentale:</strong>
          </p>
          <div className="bg-gray-100 p-4 rounded-md my-4 text-center text-lg font-mono">
            <MathBlock>
              {
                'E_d = \\sum_{j \\ge 1} \\gamma_{G,j} G_{k,j} + \\gamma_P P + \\gamma_{Q,1} Q_{k,1} + \\sum_{i > 1} \\gamma_{Q,i} \\psi_{0,i} Q_{k,i}'
              }
            </MathBlock>
          </div>

          {/* —— Commento e lista invariati —— */}

          <p>
            <strong>Combinazione Sismica (§ 7.3.5 NTC 2018):</strong>
          </p>
          <div className="bg-gray-100 p-4 rounded-md my-4 text-center text-lg font-mono">
            <MathBlock>
              {
                'E_d = E_{Ed} + \\sum_{j \\ge 1} G_{k,j} + P + \\sum_{i \\ge 1} \\psi_{2,i} Q_{k,i}'
              }
            </MathBlock>
          </div>

          {/* —— SLE —— */}
          <h3 className="text-xl font-semibold">Stati Limite di Esercizio (SLE)</h3>
          <p>
            <strong>Combinazione Rara:</strong>
          </p>
          <div className="bg-gray-100 p-4 rounded-md my-4 text-center text-lg font-mono">
            <MathBlock>
              {
                'E_d = \\sum_{j \\ge 1} G_{k,j} + P + Q_{k,1} + \\sum_{i > 1} \\psi_{0,i} Q_{k,i}'
              }
            </MathBlock>
          </div>
          <p>
            <strong>Combinazione Frequente:</strong>
          </p>
          <div className="bg-gray-100 p-4 rounded-md my-4 text-center text-lg font-mono">
            <MathBlock>
              {
                'E_d = \\sum_{j \\ge 1} G_{k,j} + P + \\psi_{1,1} Q_{k,1} + \\sum_{i > 1} \\psi_{2,i} Q_{k,i}'
              }
            </MathBlock>
          </div>
          <p>
            <strong>Combinazione Quasi-Permanente:</strong>
          </p>
          <div className="bg-gray-100 p-4 rounded-md my-4 text-center text-lg font-mono">
            <MathBlock>
              {
                'E_d = \\sum_{j \\ge 1} G_{k,j} + P + \\sum_{i \\ge 1} \\psi_{2,i} Q_{k,i}'
              }
            </MathBlock>
          </div>
        </section>

        <hr className="my-8" />

        {/* Inserimento del calcolatore */}
        <CalcoloCombinazioniCaricoCalculator />

        {/* —— resto della pagina invariato —— */}
      </article>
    </main>
  );
};

export default PaginaHubCombinazioniCarico;
