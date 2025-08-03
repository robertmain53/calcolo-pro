"use client";
import React, { useState } from 'react';

interface FormData {
  title: string;
  slug: string;
  category: string;
  description: string;
}

const ClassificazioneInterventiEdificiEsistentiCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ title: "", slug: "", category: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Classificazione Interventi su Edifici Esistenti</h1>
      <p className="text-gray-600 mb-4">Adeguamento, miglioramento, intervento locale (NTC 2018 Cap. 8)</p>
      <form>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Titolo:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="block text-gray-700 font-bold mb-2">Slug:</label>
          <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Categoria:</label>
          <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descrizione:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows={4} />
        </div>
      </form>
    </div>
  );
};

export default ClassificazioneInterventiEdificiEsistentiCalculator;
