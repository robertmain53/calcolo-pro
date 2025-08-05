"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState, useEffect } from 'react';

// Componente principale che include il calcolatore e la guida
const StimaDurataCantiereCompleto: React.FC = () => {
  return (
    // Usiamo un Fragment <> per raggruppare i due componenti principali
    <>
      <StimaDurataLavoriCalculator />
      <GuidaAlCalcolatore />
    </>
  );
};

// --- Componente Calcolatore ---
const StimaDurataLavoriCalculator: React.FC = () => {
  const [quantita, setQuantita] = useState<string>('');
  const [produttivita, setProduttivita] = useState<string>('');
  const [durataLavori, setDurataLavori] = useState<number>(0);

  useEffect(() => {
    const numQuantita = parseFloat(quantita);
    const numProduttivita = parseFloat(produttivita);

    if (!isNaN(numQuantita) && !isNaN(numProduttivita) && numProduttivita > 0) {
      const durataCalcolata = numQuantita / numProduttivita;
      setDurataLavori(Math.ceil(durataCalcolata));
    } else {
      setDurataLavori(0);
    }
  }, [quantita, produttivita]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">📐 Stima Durata Cantiere</h1>
      <p className="text-sm text-gray-600 mb-6">
        Inserisci la quantità totale del lavoro e la produttività media giornaliera per stimare i giorni necessari.
      </p>

      <div className="mb-4">
        <label htmlFor="quantita" className="block text-gray-700 font-semibold mb-1">
          Quantità Totale Lavoro (es. m², m³, ecc.)
        </label>
        <input
          id="quantita"
          type="number"
          value={quantita}
          onChange={(e) => setQuantita(e.target.value)}
          placeholder="Es. 500"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="produttivita" className="block text-gray-700 font-semibold mb-1">
          Produttività Media Giornaliera (quantità/giorno)
        </label>
        <input
          id="produttivita"
          type="number"
          value={produttivita}
          onChange={(e) => setProduttivita(e.target.value)}
          placeholder="Es. 25"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <p className="text-lg font-semibold text-gray-800">
          Durata Stimata: <span className="text-2xl font-bold text-blue-600">{durataLavori}</span> giorni lavorativi
        </p>
      </div>
    </div>
  );
};

// --- Componente Guida Testuale ---
const GuidaAlCalcolatore: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto mt-12 px-4 text-gray-800">
            <h2 className="text-3xl font-bold border-b pb-2 mb-6">Guida al Calcolatore</h2>

            <h3 className="text-2xl font-semibold mb-3">Introduzione</h3>
            <p className="mb-6 text-gray-700">
                Questo calcolatore è uno strumento pratico pensato per professionisti, artigiani e tecnici del settore edile. Il suo scopo è fornire una stima rapida e realistica della durata di una <strong>specifica lavorazione di cantiere</strong> (es. posa di un pavimento, tinteggiatura, ecc.). Basandosi sulla quantità totale da realizzare e sulla produttività media giornaliera, aiuta a definire un <strong>cronoprogramma di massima</strong>, fondamentale per la pianificazione delle attività e la gestione delle risorse.
            </p>

            <h3 className="text-2xl font-semibold mb-3">Guida Pratica: Come Interpretare i Risultati</h3>
            <p className="mb-4 text-gray-700">
                La formula alla base del calcolo è: <code className="bg-gray-200 p-1 rounded">Durata = Quantità Totale / Produttività Giornaliera</code>. Il risultato indica i <strong>giorni lavorativi effettivi</strong> necessari.
            </p>
            <div className="space-y-4 mb-8">
                <div className="p-4 border rounded-lg">
                    <p><strong>Esempio 1: Tinteggiatura Pareti</strong></p>
                    <p className="text-sm text-gray-600">Quantità: 400 m² | Produttività: 80 m²/giorno → <strong>Risultato: 5 giorni</strong></p>
                </div>
                <div className="p-4 border rounded-lg">
                    <p><strong>Esempio 2: Posa Pavimento in Gres</strong></p>
                    <p className="text-sm text-gray-600">Quantità: 120 m² | Produttività: 25 m²/giorno → <strong>Risultato: 5 giorni</strong> (4.8 arrotondato per eccesso)</p>
                </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Domande Frequenti (FAQ)</h3>
            <div className="space-y-6">
                <div>
                    <h4 className="font-semibold text-lg">1. Come determino la "Quantità di Lavoro"?</h4>
                    <p className="text-gray-700 mt-1">
                        È la misurazione totale della lavorazione (da un computo metrico). Esempi: <strong>m²</strong> per intonaci/pitture, <strong>m³</strong> per scavi/cls, <strong>ml</strong> per tubazioni, o <strong>pezzi (pz)</strong> per infissi/sanitari.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-lg">2. Cosa si intende per "Produttività Media"?</h4>
                    <p className="text-gray-700 mt-1">
                        È la quantità di lavoro che una squadra realizza in un giorno. È un dato critico che puoi ricavare dalla tua <strong>esperienza storica</strong>, da prezzari di riferimento (es. DEI) o da dati dei produttori.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-lg">3. Posso usare il calcolatore per un'intera ristrutturazione?</h4>
                    <p className="text-gray-700 mt-1">
                        Lo strumento è perfetto per <strong>singole lavorazioni</strong>. Per un progetto complesso, usalo per stimare la durata di ogni fase (demolizioni, impianti, ecc.) e poi assembla i risultati in un cronoprogramma generale (es. Gantt).
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-lg">4. Come posso rendere la stima più accurata?</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                        <li><strong>Sii realista:</strong> Usa dati di produttività onesti, non ideali.</li>
                        <li><strong>Scomponi il lavoro:</strong> Stima fasi specifiche, non generiche.</li>
                        <li><strong>Aggiungi i tempi "morti":</strong> Ricorda di aggiungere giorni per asciugatura materiali, imprevisti o maltempo al tuo cronoprogramma finale.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Esporta il componente principale che contiene tutto
export default StimaDurataCantiereCompleto;