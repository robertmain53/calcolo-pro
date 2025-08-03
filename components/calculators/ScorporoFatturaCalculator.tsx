"use client";
import React, { useState } from 'react';

const ScorporoFatturaCalculator: React.FC = () => {
  const [importoLordo, setImportoLordo] = useState<number>(0);
  const [importoNetto, setImportoNetto] = useState<number>(0);
  const [iva, setIva] = useState<number>(0);

  const handleImportoLordoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImportoLordo = parseFloat(e.target.value);
    setImportoLordo(newImportoLordo);
    setImportoNetto(newImportoLordo / 1.22);
    setIva(newImportoLordo - (newImportoLordo / 1.22));
  };

  return (
    <div className="p-4">
      <h1>Scorporo Fattura Calculator</h1>
      <p>Questo strumento esegue lo scorporo di una fattura (o calcolo inverso) per determinare le singole componenti di una parcella partendo da un importo lordo onnicomprensivo.</p>
      <label className="block mt-4">Importo Lordo:</label>
      <input type="number" value={importoLordo} onChange={handleImportoLordoChange} className="border p-2 rounded-md" />
      <div className="mt-4">
        <p>Importo Netto: {importoNetto.toFixed(2)}</p>
        <p>IVA: {iva.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ScorporoFatturaCalculator;