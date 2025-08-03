"use client";
import React, { useState } from 'react';

interface Coordinate {
  x: number;
  y: number;
}

const CalcoloAreaPerimetroPoligonoCalculator: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [area, setArea] = useState<number | null>(null);
  const [perimeter, setPerimeter] = useState<number | null>(null);

  const addCoordinate = (x: number, y: number) => {
    setCoordinates([...coordinates, { x, y }]);
  };

  const calculate = () => {
    if (coordinates.length < 3) {
      setArea(null);
      setPerimeter(null);
      return;
    }

    let areaValue = 0;
    let perimeterValue = 0;

    for (let i = 0; i < coordinates.length; i++) {
      const j = (i + 1) % coordinates.length;
      areaValue += coordinates[i].x * coordinates[j].y;
      areaValue -= coordinates[j].x * coordinates[i].y;
      perimeterValue += Math.sqrt(Math.pow(coordinates[j].x - coordinates[i].x, 2) + Math.pow(coordinates[j].y - coordinates[i].y, 2));
    }

    setArea(Math.abs(areaValue) / 2);
    setPerimeter(perimeterValue);
  };

  const handleInputChange = (index: number, type: 'x' | 'y', value: string) => {
    const newCoordinates = [...coordinates];
    newCoordinates[index][type] = parseFloat(value);
    setCoordinates(newCoordinates);
  };

  return (
    <div className="p-4">
      <h1>Calcolo Area e Perimetro Poligono</h1>
      <p>Calcola l'area e il perimetro di un poligono inserendo le coordinate dei suoi vertici.</p>
      <div className="mb-4">
        {coordinates.map((coord, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="number"
              className="w-20 border border-gray-300 rounded px-2"
              value={coord.x}
              onChange={(e) => handleInputChange(index, 'x', e.target.value)}
            />
            <input
              type="number"
              className="w-20 border border-gray-300 rounded px-2"
              value={coord.y}
              onChange={(e) => handleInputChange(index, 'y', e.target.value)}
            />
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => {
                const newCoordinates = [...coordinates];
                newCoordinates.splice(index, 1);
                setCoordinates(newCoordinates);
              }}
            >
              Rimuovi
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addCoordinate(0, 0)}
        >
          Aggiungi Vertice
        </button>
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={calculate}
      >
        Calcola
      </button>
      {area !== null && (
        <div className="mt-4">
          <p>Area: {area.toFixed(2)}</p>
          <p>Perimetro: {perimeter?.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default CalcoloAreaPerimetroPoligonoCalculator;