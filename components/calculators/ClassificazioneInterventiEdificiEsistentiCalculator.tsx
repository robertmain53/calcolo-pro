'use client';

import React, { useState } from 'react';

interface FormData {
  title: string;
  slug: string;
  category: string;
  description: string;
}

const initialForm: FormData = {
  title: '',
  slug: '',
  category: '',
  description: '',
};

const ClassificazioneInterventiEdificiEsistentiCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialForm);

  // 🛠️ un solo handler per <input> e <textarea>
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">
        Classificazione Interventi su Edifici Esistenti
      </h1>
      <p className="text-gray-600 mb-4">
        Adeguamento, miglioramento, intervento locale (NTC 2018 – Cap. 8)
      </p>

      <form className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-bold">Titolo:</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2 shadow"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-bold">Slug:</span>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2 shadow"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-bold">Categoria:</span>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2 shadow"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-bold">Descrizione:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full border rounded p-2 shadow"
          />
        </label>
      </form>
    </div>
  );
};

export default ClassificazioneInterventiEdificiEsistentiCalculator;
