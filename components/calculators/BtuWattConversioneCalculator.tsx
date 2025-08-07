"use client";

import React, { useState, useMemo } from 'react';

// Per un tocco di stile in più, potremmo usare icone.
// Se usi una libreria come lucide-react, puoi importarle così:
// import { Flame, Zap, X } from 'lucide-react';

// Componente per le icone (alternativa semplice senza librerie esterne)
const FlameIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M14.5 9.5c0 .9-.3 1.8-.8 2.5s-1.2 1.3-2 1.6c-.8.3-1.7.3-2.5.1s-1.5-.8-2-1.5c-.5-.7-.8-1.6-.8-2.5s.3-1.8.8-2.5C7.7 6.3 8.7 5.7 9.7 5.5c.8-.3 1.7-.3 2.5.1s1.5.8 2 1.5c.5.7.8 1.6.8 2.5z"/><path d="M12 18c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5c0 1.4.6 2.7 1.5 3.7S10.6 18 12 18z"/></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const ResetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M21 21v-5h-5"/></svg>;


/**
 * Un calcolatore di potenza per convertire BTU/h in Watt e viceversa,
 * con spiegazioni integrate per una migliore User Experience.
 */
const BTUWattCalculator = () => {
  // Usiamo stringhe per gli input per gestire meglio i campi vuoti e i decimali.
  const [btu, setBtu] = useState<string>('');
  const [watt, setWatt] = useState<string>('');
  const [lastChanged, setLastChanged] = useState<'btu' | 'watt' | null>(null);

  // Fattore di conversione ufficiale.
  const CONVERSION_FACTOR = 0.293071;

  // Gestisce la modifica del campo BTU/h
  const handleBtuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBtu(value);
    setLastChanged('btu');

    if (value === '' || isNaN(parseFloat(value))) {
      setWatt('');
    } else {
      const numericValue = parseFloat(value);
      const convertedValue = numericValue * CONVERSION_FACTOR;
      // Arrotondiamo a 2 cifre decimali per una migliore leggibilità.
      setWatt(convertedValue.toFixed(2));
    }
  };

  // Gestisce la modifica del campo Watt
  const handleWattChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWatt(value);
    setLastChanged('watt');

    if (value === '' || isNaN(parseFloat(value))) {
      setBtu('');
    } else {
      const numericValue = parseFloat(value);
      const convertedValue = numericValue / CONVERSION_FACTOR;
      setBtu(convertedValue.toFixed(2));
    }
  };
  
  // Resetta tutti i campi
  const handleReset = () => {
    setBtu('');
    setWatt('');
    setLastChanged(null);
  };

  // Memoizza il calcolo per la spiegazione dinamica, per evitare ricalcoli inutili.
  const formulaExplanation = useMemo(() => {
    if (!lastChanged || (!btu && !watt)) return null;

    const btuValue = parseFloat(btu);
    const wattValue = parseFloat(watt);

    if (isNaN(btuValue) || isNaN(wattValue)) return null;

    if (lastChanged === 'btu') {
      return (
        <p className="text-center text-gray-600">
          <span className="font-bold text-orange-600">{btuValue.toLocaleString('it-IT')}</span> BTU/h × {CONVERSION_FACTOR} = <span className="font-bold text-yellow-600">{wattValue.toLocaleString('it-IT')} W</span>
        </p>
      );
    }
    
    if (lastChanged === 'watt') {
      return (
        <p className="text-center text-gray-600">
          <span className="font-bold text-yellow-600">{wattValue.toLocaleString('it-IT')} W</span> / {CONVERSION_FACTOR} = <span className="font-bold text-orange-600">{btuValue.toLocaleString('it-IT')} BTU/h</span>
        </p>
      );
    }

    return null;

  }, [btu, watt, lastChanged]);

  return (
    <div className="bg-slate-50 font-sans p-4 sm:p-8 max-w-4xl mx-auto rounded-xl shadow-lg border border-slate-200">
      
      {/* --- TITOLO E DESCRIZIONE --- */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Conversione BTU/h in Watt</h1>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Usa il nostro strumento per una conversione rapida e precisa. Inserisci un valore in uno dei due campi per ottenere immediatamente il risultato nell'altro.</p>
      </div>

      {/* --- SEZIONE CALCOLATORE --- */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Input BTU/h */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="btu" className="flex items-center text-lg font-semibold text-slate-700">
              <FlameIcon />
              <span className="ml-2">BTU/h</span>
            </label>
            <input
              type="number"
              id="btu"
              name="btu"
              className="w-full p-3 text-xl border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              placeholder="Es. 12000"
              value={btu}
              onChange={handleBtuChange}
              aria-label="Valore in BTU per ora"
            />
          </div>

          {/* Input Watt */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="watt" className="flex items-center text-lg font-semibold text-slate-700">
              <ZapIcon />
              <span className="ml-2">Watt</span>
            </label>
            <input
              type="number"
              id="watt"
              name="watt"
              className="w-full p-3 text-xl border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
              placeholder="Es. 3516.85"
              value={watt}
              onChange={handleWattChange}
              aria-label="Valore in Watt"
            />
          </div>
        </div>
        
        {/* Pulsante Reset e Spiegazione Dinamica */}
        <div className="mt-6 h-10 flex items-center justify-center">
            { (btu || watt) ? (
                <div className="w-full flex flex-col items-center">
                    {formulaExplanation && <div className="text-lg mb-2 animate-fade-in">{formulaExplanation}</div>}
                    <button 
                        onClick={handleReset} 
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
                        aria-label="Resetta i campi"
                    >
                        <ResetIcon />
                        <span className="ml-2">Reset</span>
                    </button>
                </div>
            ) : (
                <p className="text-slate-500">Inserisci un valore per iniziare la conversione.</p>
            )}
        </div>
      </div>

      {/* --- SEZIONE SPIEGAZIONI --- */}
      <div className="mt-10 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Come Funziona la Conversione</h2>
        <div className="grid md:grid-cols-2 gap-8 text-slate-700">
          
          <div className="bg-white p-5 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-lg mb-2">Da BTU/h a Watt</h3>
            <p className="mb-4">Per convertire un valore da BTU/h a Watt, si usa la seguente formula, moltiplicando per il fattore di conversione.</p>
            <pre className="bg-slate-100 p-3 rounded-md text-center text-sm">
              <code>Watt = BTU/h * 0.293071</code>
            </pre>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-lg mb-2">Da Watt a BTU/h</h3>
            <p className="mb-4">Per la conversione inversa, da Watt a BTU/h, si divide il valore per lo stesso fattore.</p>
            <pre className="bg-slate-100 p-3 rounded-md text-center text-sm">
              <code>BTU/h = Watt / 0.293071</code>
            </pre>
          </div>
        </div>
      </div>

    </div>
  );
};

// Aggiungiamo uno stile per la semplice animazione di fade-in
const GlobalStyle = () => (
    <style jsx global>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }
    `}</style>
);

const App = () => (
    <>
        <GlobalStyle />
        <BTUWattCalculator />
    </>
)

export default App;
