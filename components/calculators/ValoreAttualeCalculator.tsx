"use client";;
import MathBlock from '@/components/ui/MathBlock';
import React, { useState } from 'react';

interface IValoreAttualeProps {
  capitaleFuturo: number;
  tassoInteresse: number;
  anni: number;
}

const ValoreAttualeCalculator: React.FC<IValoreAttualeProps> = ({ capitaleFuturo, tassoInteresse, anni }) => {
  const [valoreAttuale, setValoreAttuale] = useState<number>(0);

  React.useEffect(() => {
    const calcolaValoreAttuale = () => {
      if (capitaleFuturo <= 0 || tassoInteresse <= 0 || anni <= 0) {
        setValoreAttuale(0);
        return;
      }
      const risultato = capitaleFuturo / Math.pow(1 + tassoInteresse, anni);
      setValoreAttuale(risultato);
    };
    calcolaValoreAttuale();
  }, [capitaleFuturo, tassoInteresse, anni]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Calcolatore del Valore Attuale</h1>
      <p className="text-gray-600 mb-4">Questo calcolatore determina l'importo equivalente al tempo presente di un capitale esigibile tra "n" anni.</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="capitaleFuturo">
          Capitale Futuro:
        </label>
        <input
          type="number"
          id="capitaleFuturo"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={capitaleFuturo}
          onChange={(e) => {
            //Gestione input per evitare valori non numerici
            const value = parseFloat(e.target.value) || 0;
            //Aggiorna solo se il valore è valido
            if (!isNaN(value)) {
              //Passa il valore al componente padre
              //Questo è un esempio, adatta al tuo caso specifico
              //this.props.onChangeCapitaleFuturo(value);
            }
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="tassoInteresse">
          Tasso di Interesse (decimale):
        </label>
        <input
          type="number"
          id="tassoInteresse"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={tassoInteresse}
          onChange={(e) => {
            const value = parseFloat(e.target.value) || 0;
            if (!isNaN(value)) {
              //this.props.onChangeTassoInteresse(value);
            }
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="anni">
          Anni:
        </label>
        <input
          type="number"
          id="anni"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={anni}
          onChange={(e) => {
            const value = parseFloat(e.target.value) || 0;
            if (!isNaN(value)) {
              //this.props.onChangeAnni(value);
            }
          }}
        />
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-bold">Valore Attuale: {valoreAttuale.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ValoreAttualeCalculator;
