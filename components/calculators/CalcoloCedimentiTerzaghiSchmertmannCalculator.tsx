"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface CalculatorData {
  _rowIndex: number;
  Titolo: string;
  Slug: string;
  Categoria: string;
  Descrizione: string;
  Lingua: string;
}

const CalcoloCedimentiTerzaghiSchmertmannCalculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({
    _rowIndex: 32,
    Titolo: "Calcolo Cedimenti Edometrici e Immediati: Metodo di Terzaghi e Schmertmann",
    Slug: "calcolo-cedimenti-terzaghi-schmertmann",
    Categoria: "Ingegneria Geotecnica ",
    Descrizione: "Metodo di Terzaghi e Schmertmann",
    Lingua: "it"
  });

  const [inputValues, setInputValues] = useState({
    // Aggiungi qui i campi di input del tuo calcolatore
    // Esempio:  pressure: '', area: '', 
  });

  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  const calculate = () => {
    // Aggiungi qui la logica di calcolo
    // Esempio: setResult(parseFloat(inputValues.pressure) * parseFloat(inputValues.area));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{data.Titolo}</h1>
      <p className="text-gray-600 mb-4">{data.Descrizione}</p>
      <div className="mb-4">
        {/* Aggiungi qui i campi di input del tuo calcolatore */}
        {/* Esempio: <input type="number" name="pressure" value={inputValues.pressure} onChange={handleInputChange} placeholder="Pressione" className="border border-gray-300 px-3 py-1 rounded-md" /> */}
      </div>
      <button onClick={calculate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Calcola</button>
      {result !== null && (
        <div className="mt-4">
          <p className="text-lg font-bold">Risultato: {result}</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloCedimentiTerzaghiSchmertmannCalculator;
