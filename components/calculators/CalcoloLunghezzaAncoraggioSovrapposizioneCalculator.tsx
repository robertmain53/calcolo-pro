'use client';

import React, { useState } from 'react';

interface CalculatorData {
  _rowIndex: number;
  Titolo: string;
  Slug: string;
  Categoria: string;
  Descrizione: string;
  Lingua: string;
}

/**
 * Calcolatore NTC‑2018 per la lunghezza di ancoraggio / sovrapposizione
 * delle armature in acciaio ad aderenza migliorata.
 */
const CalcoloLunghezzaAncoraggioSovrapposizioneCalculator: React.FC = () => {
  const [data] = useState<CalculatorData>({
    _rowIndex: 21,
    Titolo:
      'Calcolo Lunghezza di Ancoraggio e Sovrapposizione Armature: per barre ad aderenza migliorata (NTC 2018)',
    Slug: 'calcolo-lunghezza-ancoraggio-sovrapposizione',
    Categoria: 'Ingegneria Strutturale',
    Descrizione: 'Per barre ad aderenza migliorata (NTC 2018)',
    Lingua: 'it',
  });

  /**
   * INPUT del calcolatore
   *  - diametro barra (mm)
   *  - resistenza acciaio (MPa)
   *  (altri parametri possono essere aggiunti in un secondo momento)
   */
  const [diametro, setDiametro] = useState<number>(0);
  const [resistenza, setResistenza] = useState<number>(0);

  /**
   * Formula semplificata d’esempio
   *   l_bd = 0.3 · φ · f_yk   (puramente illustrativa!)
   *   dove φ è il diametro (mm) e f_yk la resistenza caratteristica (MPa)
   *
   * Sostituisci con la formula completa di § 4.1.2.2 NTC 2018.
   */
  const calcolaLunghezzaAncoraggio = (
    diametro: number,
    resistenza: number
  ): number => {
    if (diametro <= 0 || resistenza <= 0) return 0;
    return 0.3 * diametro * resistenza; // 🔸 placeholder
  };

  // ➜ risultato ricalcolato ad ogni render
  const risultato = calcolaLunghezzaAncoraggio(diametro, resistenza);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{data.Titolo}</h1>
      <p className="text-gray-600 mb-4">{data.Descrizione}</p>

      {/* —— input diametro —— */}
      <div className="mb-4">
        <label htmlFor="diametro" className="block text-gray-700 font-bold mb-2">
          Diametro barra (mm):
        </label>
        <input
          type="number"
          id="diametro"
          value={diametro}
          onChange={(e) => setDiametro(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* —— input resistenza —— */}
      <div className="mb-4">
        <label
          htmlFor="resistenza"
          className="block text-gray-700 font-bold mb-2"
        >
          Resistenza acciaio f_yk (MPa):
        </label>
        <input
          type="number"
          id="resistenza"
          value={resistenza}
          onChange={(e) => setResistenza(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* —— risultato —— */}
      <p className="font-bold text-gray-700">
        Lunghezza di ancoraggio&nbsp;/&nbsp;sovrapposizione:&nbsp;
        <span className="text-indigo-600 text-lg font-mono">
          {risultato.toFixed(1)}&nbsp;mm
        </span>
      </p>
    </div>
  );
};

export default CalcoloLunghezzaAncoraggioSovrapposizioneCalculator;
