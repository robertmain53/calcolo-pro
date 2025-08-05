"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

// Valori di riferimento per la scabrezza assoluta (ε) secondo la normativa (es. UNI 9182)
// I valori sono in millimetri (mm)
const scabrezzaMateriali = {
  'Acciaio (nuovo)': 0.045,
  'Ghisa (nuova)': 0.26,
  'Ghisa (incrostata)': 1.2,
  'PVC, PE, Vetroresina': 0.0015,
  'Rame, Ottone': 0.0015,
  'Cemento lisciato': 0.3,
  'Cemento grezzo': 2.0,
};

// Componente React per il calcolo
const PerditeCaricoContinueCalculator: React.FC = () => {
  // Stati per gli input richiesti dal calcolo
  const [velocita, setVelocita] = useState<number>(1.5); // m/s
  const [diametro, setDiametro] = useState<number>(100); // mm
  const [lunghezza, setLunghezza] = useState<number>(100); // m
  const [scabrezza, setScabrezza] = useState<number>(scabrezzaMateriali['Acciaio (nuovo)']); // mm
  const [viscosita, setViscosita] = useState<number>(1.004e-6); // m²/s (acqua a 20°C)

  // Stato per il risultato
  const [risultato, setRisultato] = useState<number | string>(0);

  /**
   * Calcola le perdite di carico continue (Δh) usando l'equazione di Darcy-Weisbach.
   */
  const calculatePerditeCarico = () => {
    // Conversione delle unità di misura in SI (metri)
    const D = diametro / 1000; // da mm a m
    const epsilon = scabrezza / 1000; // da mm a m

    // Validazione input
    if (D <= 0 || velocita <= 0 || lunghezza <= 0) {
      setRisultato("I valori di diametro, velocità e lunghezza devono essere maggiori di zero.");
      return;
    }

    // 1. Calcolo del Numero di Reynolds (Re)
    const Re = (velocita * D) / viscosita;

    // 2. Calcolo del fattore di attrito 'f'
    let f = 0;
    if (Re < 2300) {
      // Regime Laminare
      f = 64 / Re;
    } else {
      // Regime Turbolento (formula di Swamee-Jain)
      const termineLog = Math.log10((epsilon / D) / 3.7 + 5.74 / Math.pow(Re, 0.9));
      f = 0.25 / Math.pow(termineLog, 2);
    }

    // 3. Calcolo della perdita di carico (Δh) con Darcy-Weisbach
    const g = 9.81;
    const delta_h = f * (lunghezza / D) * (Math.pow(velocita, 2) / (2 * g));

    setRisultato(delta_h.toFixed(4));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-4 border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800">Calcolatore Perdite di Carico (Darcy-Weisbach) ⚙️</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Velocità fluido (v)</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input type="number" value={velocita} onChange={(e) => setVelocita(parseFloat(e.target.value) || 0)} className="p-2 border rounded-l-md w-full focus:ring-blue-500 focus:border-blue-500" />
            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 bg-gray-50 text-gray-500 text-sm">m/s</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Diametro interno tubo (D)</label>
           <div className="mt-1 flex rounded-md shadow-sm">
            <input type="number" value={diametro} onChange={(e) => setDiametro(parseFloat(e.target.value) || 0)} className="p-2 border rounded-l-md w-full focus:ring-blue-500 focus:border-blue-500" />
            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 bg-gray-50 text-gray-500 text-sm">mm</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lunghezza tubo (L)</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input type="number" value={lunghezza} onChange={(e) => setLunghezza(parseFloat(e.target.value) || 0)} className="p-2 border rounded-l-md w-full focus:ring-blue-500 focus:border-blue-500" />
            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 bg-gray-50 text-gray-500 text-sm">m</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Viscosità cinematica (ν)</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input type="number" step="any" value={viscosita} onChange={(e) => setViscosita(parseFloat(e.target.value) || 0)} className="p-2 border rounded-l-md w-full focus:ring-blue-500 focus:border-blue-500" />
            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 bg-gray-50 text-gray-500 text-sm">m²/s</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Acqua a 20°C ≈ 1.004e-6 m²/s</p>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="materiale" className="block text-sm font-medium text-gray-700">Scabrezza assoluta (ε) per materiale</label>
          <select id="materiale" onChange={(e) => setScabrezza(parseFloat(e.target.value))} value={scabrezza} className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            {Object.entries(scabrezzaMateriali).map(([nome, valore]) => (<option key={nome} value={valore}>{nome} ({valore} mm)</option>))}
          </select>
        </div>
      </div>
      <button onClick={calculatePerditeCarico} className="w-full p-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Calcola Perdita di Carico
      </button>
      <div className="p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800">Risultato 💧</h2>
        <p className="text-2xl font-bold text-blue-600 mt-1">{risultato} <span className="text-lg font-medium text-gray-600">m c.a. (metri colonna d'acqua)</span></p>
      </div>
    </div>
  );
};

// --- Componente per la Guida Tecnica ---
const GuidaTecnica: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-4 mt-8 border border-gray-200">
      <details className="group">
        <summary className="text-xl font-bold text-gray-800 cursor-pointer list-none">
          <span className="group-open:hidden">▶ Mostra Guida Tecnica e FAQ</span>
          <span className="hidden group-open:inline">▼ Nascondi Guida Tecnica e FAQ</span>
        </summary>
        
        <div className="mt-4 space-y-4 text-gray-700">
          <hr className="my-4"/>
          <h2 className="text-xl font-semibold">Inquadramento Teorico e Normativo</h2>
          <p>
            Questo strumento esegue il calcolo delle perdite di carico distribuite (o continue) in condotte in pressione, utilizzando l'<strong>equazione di Darcy-Weisbach</strong>. Tale formula rappresenta il metodo di riferimento nella fluidodinamica moderna, riconosciuto dalla normativa tecnica internazionale e nazionale (es. <strong>UNI 9182</strong>) per la sua accuratezza e validità generale.
          </p>
          <p>
            Il calcolatore automatizza la risoluzione delle equazioni che costituiscono il fondamento teorico dell'<strong>abaco di Moody</strong>, offrendo una soluzione numerica precisa che elimina le imprecisioni dovute all'interpolazione grafica. Nello specifico, per il regime turbolento, viene impiegata la <strong>formula di Swamee-Jain</strong>, una approssimazione esplicita di elevata accuratezza dell'equazione implicita di <strong>Colebrook-White</strong>.
          </p>

          <hr className="my-4"/>
          <h2 className="text-xl font-semibold">Esempi di Calcolo e Interpretazione 📊</h2>
          <p>
            Il risultato primario del calcolo è la <strong>perdita di carico (Δh)</strong>, espressa in <strong>metri di colonna d'acqua (m c.a.)</strong>. Questo valore rappresenta l'energia dissipata dal fluido per attrito lungo il tratto di condotta analizzato.
          </p>
          <h3 className="text-lg font-semibold mt-2">Esempio 1: Rete antincendio in acciaio</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Dati</strong>: Acqua a 20°C, Acciaio nuovo (ε=0.045mm), D=100mm, L=80m, v=2.5m/s</li>
            <li><strong>Risultati intermedi</strong>: Re ≈ 249,004 (Turbolento), f ≈ 0.0176</li>
            <li><strong>Risultato finale</strong>: <strong>Δh ≈ 1.80 m c.a.</strong></li>
            <li><strong>Interpretazione</strong>: Per questo tratto, la pompa dovrà fornire una prevalenza aggiuntiva di 1.80 metri per compensare la sola perdita di carico distribuita.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">Esempio 2: Adduzione civile in PVC</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Dati</strong>: Acqua a 20°C, PVC (ε=0.0015mm), D=60mm, L=150m, v=1.8m/s</li>
            <li><strong>Risultati intermedi</strong>: Re ≈ 107,569 (Turbolento), f ≈ 0.0179</li>
            <li><strong>Risultato finale</strong>: <strong>Δh ≈ 4.39 m c.a.</strong></li>
            <li><strong>Interpretazione</strong>: Il diametro ridotto e la maggiore lunghezza comportano una perdita di carico quasi tripla rispetto al primo esempio, evidenziando il loro impatto critico nel dimensionamento.</li>
          </ul>

          <hr className="my-4"/>
          <h2 className="text-xl font-semibold">Domande Tecniche Frequenti (FAQ) 🧠</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">1. Perché usare Darcy-Weisbach invece di formule empiriche (es. Hazen-Williams)?</h3>
              <p>L'equazione di Darcy-Weisbach ha una solida base fisica ed è universalmente applicabile a qualsiasi fluido newtoniano e regime di moto, garantendo un'accuratezza superiore. Le formule empiriche sono valide solo in condizioni limitate.</p>
            </div>
            <div>
              <h3 className="font-semibold">2. Qual è l'impatto della temperatura dell'acqua?</h3>
              <p>La temperatura modifica la viscosità cinematica (ν), alterando il numero di Reynolds (Re) e di conseguenza il fattore di attrito (f). L'effetto è rilevante in applicazioni industriali o con fluidi diversi dall'acqua.</p>
            </div>
            <div>
              <h3 className="font-semibold">3. Come si relaziona questo calcolatore all'abaco di Moody?</h3>
              <p>Questo strumento non visualizza l'abaco perché ne implementa la base matematica (l'equazione di Colebrook-White). Ciò elimina l'errore di interpolazione manuale, fornendo un risultato più preciso.</p>
            </div>
            <div>
              <h3 className="font-semibold">4. Come si integra questo risultato nel dimensionamento di un impianto?</h3>
              <p>La perdita di carico calcolata (Δh) è una componente essenziale della perdita di carico totale dell'impianto (ΔH_tot = ΣΔh_distribuite + ΣΔh_localizzate). Questo valore è critico per il dimensionamento della pompa, la verifica delle pressioni di esercizio e l'ottimizzazione dei diametri.</p>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};


// Componente principale che unisce Calcolatore e Guida
const PaginaCalcolatorePerditeDiCarico: React.FC = () => {
    return (
        <div className="p-4 md:p-8 bg-gray-50 font-sans">
            <div className="max-w-2xl mx-auto">
                <PerditeCaricoContinueCalculator />
                <GuidaTecnica />
            </div>
        </div>
    );
}

export default PaginaCalcolatorePerditeDiCarico;