"use client";
import React, { useState } from 'react';

const CalcoloDellivaCalculator: React.FC = () => {
  const [prezzoNetto, setPrezzoNetto] = useState<number>(0);
  const [prezzoLordo, setPrezzoLordo] = useState<number>(0);
  const [iva, setIva] = useState<number>(0);

  const handlePrezzoNettoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPrezzoNetto(value);
    setPrezzoLordo(value + value * (iva / 100));
  };

  const handlePrezzoLordoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPrezzoLordo(value);
    setPrezzoNetto(value / (1 + iva / 100));
  };

  const handleIvaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setIva(value);
    setPrezzoLordo(prezzoNetto + prezzoNetto * (value / 100));
  };

  return (
    <div className="p-4">
      <h1>Calcolo Dell'IVA Calculator</h1>
      <p>Per aggiungere l'IVA a un prezzo netto o scorporare l'IVA da prezzo lordo.</p>
      <div className="my-4">
        <label>Prezzo Netto:</label>
        <input type="number" value={prezzoNetto} onChange={handlePrezzoNettoChange} className="border p-2 m-2" />
      </div>
      <div className="my-4">
        <label>Prezzo Lordo:</label>
        <input type="number" value={prezzoLordo} onChange={handlePrezzoLordoChange} className="border p-2 m-2" />
      </div>
      <div className="my-4">
        <label>IVA (%):</label>
        <input type="number" value={iva} onChange={handleIvaChange} className="border p-2 m-2" />
      </div>
    </div>
  );
};

export default CalcoloDellivaCalculator;