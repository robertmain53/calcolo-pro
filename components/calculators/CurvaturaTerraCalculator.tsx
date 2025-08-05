"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CurvaturaTerraCalculatorProps {
  altezzaOsservatore?: number;
  altezzaOggetto?: number;
}

const CurvaturaTerraCalculator: React.FC<CurvaturaTerraCalculatorProps> = ({ altezzaOsservatore = 1.7, altezzaOggetto = 0 }) => {
  const [distanzaVisibile, setDistanzaVisibile] = useState<number>(0);
  const [altezzaNascosta, setAltezzaNascosta] = useState<number>(0);

  const raggioTerra = 6371000; // Raggio medio della Terra in metri

  React.useEffect(() => {
    const d = Math.sqrt(2 * raggioTerra * (altezzaOsservatore + altezzaOggetto));
    setDistanzaVisibile(d);
    const h = (d**2)/(2*raggioTerra) - altezzaOsservatore;
    setAltezzaNascosta(h);
  }, [altezzaOsservatore, altezzaOggetto]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolo Curvatura Terrestre</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore determina la distanza alla quale un oggetto è visibile all'orizzonte e quanto è nascosto dalla curvatura terrestre.</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="altezzaOsservatore">
          Altezza Osservatore (metri):
        </label>
        <input
          type="number"
          id="altezzaOsservatore"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={altezzaOsservatore}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
              // Aggiungi validazione per valori positivi
              if (value >= 0) {
                // Aggiorna lo stato solo se il valore è valido
                setDistanzaVisibile(Math.sqrt(2 * raggioTerra * (value + altezzaOggetto)));
              }
            }
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="altezzaOggetto">
          Altezza Oggetto (metri):
        </label>
        <input
          type="number"
          id="altezzaOggetto"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={altezzaOggetto}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
              // Aggiungi validazione per valori positivi
              if (value >= 0) {
                // Aggiorna lo stato solo se il valore è valido
                setDistanzaVisibile(Math.sqrt(2 * raggioTerra * (altezzaOsservatore + value)));
              }
            }
          }}
        />
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-bold">Distanza visibile all'orizzonte: {distanzaVisibile.toFixed(2)} metri</p>
        <p className="text-gray-700 font-bold">Altezza nascosta dalla curvatura: {altezzaNascosta.toFixed(2)} metri</p>
      </div>
    </div>
  );
};

export default CurvaturaTerraCalculator;
