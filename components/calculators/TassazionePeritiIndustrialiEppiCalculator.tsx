'use client';

import React, { useState, useEffect } from 'react';

// Definiamo le aliquote IRPEF 2024
const IRPEF_RATES = {
  scaglione1: { limit: 28000, rate: 0.23 },
  scaglione2: { limit: 50000, rate: 0.35 },
  scaglione3: { limit: Infinity, rate: 0.43 },
};

// Costanti per i calcoli EPPI e Forfettario
const COEFFICIENTE_REDDITIVITA = 0.78; // 78% per Periti Industriali
const ALIQUOTA_FORFETTARIO_STANDARD = 0.15; // 15%
const ALIQUOTA_FORFETTARIO_STARTUP = 0.05; // 5%
const CONTRIBUTO_SOGGETTIVO_EPPI = 0.18; // 18%
const CONTRIBUTO_INTEGRATIVO_EPPI = 0.05; // 5%
const CONTRIBUTO_MATERNITA_EPPI = 100.0; // Valore fisso, esempio (da verificare annualmente)

const TassazionePeritiIndustrialiEppiCalculator = () => {
  const [inputs, setInputs] = useState({
    regimeFiscale: 'forfettario', // 'forfettario' o 'ordinario'
    fatturatoLordo: 50000,
    speseDeducibili: 10000,
    contributiVersatiAnnoPrecedente: 4000,
    isStartup: false,
  });

  const [results, setResults] = useState({
    redditoImponibile: 0,
    impostaDovuta: 0,
    contributoSoggettivo: 0,
    contributoIntegrativo: 0,
    totaleEPPI: 0,
    totaleUscite: 0,
    nettoRimanente: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setInputs((prev) => ({...prev, [name]: checked }));
    } else {
        setInputs((prev) => ({...prev, [name]: parseFloat(value) || 0 }));
    }
  };

  useEffect(() => {
    const calcolaTasseEContributi = () => {
      const { regimeFiscale, fatturatoLordo, speseDeducibili, contributiVersatiAnnoPrecedente, isStartup } = inputs;
      
      let redditoImponibileLordo = 0;
      let redditoImponibileNetto = 0;
      let impostaDovuta = 0;
      let contributoSoggettivo = 0;

      if (regimeFiscale === 'forfettario') {
        redditoImponibileLordo = fatturatoLordo * COEFFICIENTE_REDDITIVITA;
        redditoImponibileNetto = redditoImponibileLordo - contributiVersatiAnnoPrecedente;
        
        const aliquotaApplicata = isStartup ? ALIQUOTA_FORFETTARIO_STARTUP : ALIQUOTA_FORFETTARIO_STANDARD;
        impostaDovuta = redditoImponibileNetto > 0 ? redditoImponibileNetto * aliquotaApplicata : 0;
        
        // Nel forfettario il contributo soggettivo si calcola sul reddito imponibile lordo
        contributoSoggettivo = redditoImponibileLordo * CONTRIBUTO_SOGGETTIVO_EPPI;

      } else { // Regime Ordinario
        redditoImponibileLordo = fatturatoLordo - speseDeducibili;
        redditoImponibileNetto = redditoImponibileLordo - contributiVersatiAnnoPrecedente;

        // Calcolo IRPEF a scaglioni
        if (redditoImponibileNetto > 0) {
            if (redditoImponibileNetto <= IRPEF_RATES.scaglione1.limit) {
                impostaDovuta = redditoImponibileNetto * IRPEF_RATES.scaglione1.rate;
            } else if (redditoImponibileNetto <= IRPEF_RATES.scaglione2.limit) {
                impostaDovuta = (IRPEF_RATES.scaglione1.limit * IRPEF_RATES.scaglione1.rate) + 
                                ((redditoImponibileNetto - IRPEF_RATES.scaglione1.limit) * IRPEF_RATES.scaglione2.rate);
            } else {
                 impostaDovuta = (IRPEF_RATES.scaglione1.limit * IRPEF_RATES.scaglione1.rate) + 
                                ((IRPEF_RATES.scaglione2.limit - IRPEF_RATES.scaglione1.limit) * IRPEF_RATES.scaglione2.rate) +
                                ((redditoImponibileNetto - IRPEF_RATES.scaglione2.limit) * IRPEF_RATES.scaglione3.rate);
            }
        }
        
        // Nell'ordinario il contributo soggettivo si calcola sul reddito professionale (fatturato - spese)
        contributoSoggettivo = redditoImponibileLordo * CONTRIBUTO_SOGGETTIVO_EPPI;
      }
      
      const contributoIntegrativo = fatturatoLordo * CONTRIBUTO_INTEGRATIVO_EPPI;
      const totaleEPPI = contributoSoggettivo + contributoIntegrativo + CONTRIBUTO_MATERNITA_EPPI;
      const totaleUscite = impostaDovuta + totaleEPPI;
      const nettoRimanente = fatturatoLordo - totaleUscite;

      setResults({
        redditoImponibile: redditoImponibileNetto,
        impostaDovuta,
        contributoSoggettivo,
        contributoIntegrativo,
        totaleEPPI,
        totaleUscite,
        nettoRimanente,
      });
    };

    calcolaTasseEContributi();
  }, [inputs]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800">Calcolatore Tasse Periti Industriali (EPPI)</h1>
        <p className="text-gray-600 mt-1">Stima le imposte e i contributi per il regime forfettario e ordinario.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Colonna Input */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Dati di Input</h2>
          
          <div>
            <label htmlFor="regimeFiscale" className="block text-sm font-medium text-gray-700">Regime Fiscale</label>
            <select
              id="regimeFiscale"
              name="regimeFiscale"
              value={inputs.regimeFiscale}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="forfettario">Regime Forfettario</option>
              <option value="ordinario">Regime Ordinario</option>
            </select>
          </div>

          <div>
            <label htmlFor="fatturatoLordo" className="block text-sm font-medium text-gray-700">Fatturato Lordo Annuale (€)</label>
            <input
              type="number"
              id="fatturatoLordo"
              name="fatturatoLordo"
              value={inputs.fatturatoLordo}
              onChange={handleInputChange}
              className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          {inputs.regimeFiscale === 'ordinario' && (
             <div>
                <label htmlFor="speseDeducibili" className="block text-sm font-medium text-gray-700">Spese Deducibili (€)</label>
                <input
                    type="number"
                    id="speseDeducibili"
                    name="speseDeducibili"
                    value={inputs.speseDeducibili}
                    onChange={handleInputChange}
                    className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
             </div>
          )}

          <div>
            <label htmlFor="contributiVersatiAnnoPrecedente" className="block text-sm font-medium text-gray-700">Contributi EPPI versati l'anno scorso (€)</label>
            <input
              type="number"
              id="contributiVersatiAnnoPrecedente"
              name="contributiVersatiAnnoPrecedente"
              value={inputs.contributiVersatiAnnoPrecedente}
              onChange={handleInputChange}
              className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          {inputs.regimeFiscale === 'forfettario' && (
            <div className="flex items-center">
                <input
                    id="isStartup"
                    name="isStartup"
                    type="checkbox"
                    checked={inputs.isStartup}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isStartup" className="ml-2 block text-sm text-gray-900">
                    Applica aliquota startup al 5%
                </label>
            </div>
          )}
        </div>

        {/* Colonna Risultati */}
        <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
           <h2 className="text-xl font-semibold text-gray-700">Risultati del Calcolo 📊</h2>
           
           <div className="space-y-2">
                <p className="flex justify-between"><span>Reddito Imponibile Fiscale:</span> <span className="font-semibold">{results.redditoImponibile.toFixed(2)} €</span></p>
                <p className="flex justify-between text-red-600">
                    <span>
                        {inputs.regimeFiscale === 'forfettario' ? 'Imposta Sostitutiva' : 'IRPEF Lorda'}:
                    </span>
                    <span className="font-bold">{results.impostaDovuta.toFixed(2)} €</span>
                </p>
                <hr className="my-2"/>
                <h3 className="font-semibold text-gray-600">Dettaglio Contributi EPPI:</h3>
                <p className="flex justify-between"><span>Contributo Soggettivo ({CONTRIBUTO_SOGGETTIVO_EPPI * 100}%):</span> <span className="font-semibold">{results.contributoSoggettivo.toFixed(2)} €</span></p>
                <p className="flex justify-between"><span>Contributo Integrativo ({CONTRIBUTO_INTEGRATIVO_EPPI * 100}%):</span> <span className="font-semibold">{results.contributoIntegrativo.toFixed(2)} €</span></p>
                <p className="flex justify-between"><span>Contributo Maternità:</span> <span className="font-semibold">{CONTRIBUTO_MATERNITA_EPPI.toFixed(2)} €</span></p>
                <p className="flex justify-between text-blue-600">
                    <strong>Totale Contributi EPPI:</strong>
                    <strong className="font-bold">{results.totaleEPPI.toFixed(2)} €</strong>
                </p>
           </div>

           <div className="mt-4 pt-4 border-t-2 border-dashed">
                <p className="flex justify-between text-xl font-bold text-red-700">
                    <span>TOTALE USCITE (Tasse + Contributi):</span>
                    <span>{results.totaleUscite.toFixed(2)} €</span>
                </p>
                <p className="flex justify-between text-xl font-bold text-green-700 mt-2">
                    <span>NETTO RIMANENTE (Fatturato - Uscite):</span>
                    <span>{results.nettoRimanente.toFixed(2)} €</span>
                </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TassazionePeritiIndustrialiEppiCalculator;
