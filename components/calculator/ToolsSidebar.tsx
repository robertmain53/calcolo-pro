'use client';
import React, { useState } from 'react';
import { 
  BookmarkIcon, 
  DocumentArrowDownIcon, 
  ShareIcon,
  PrinterIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface ToolsSidebarProps {
  calculatorName: string;
  results: Record<string, number>;
  inputs: Record<string, any>;
}

export default function ToolsSidebar({ calculatorName, results, inputs }: ToolsSidebarProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    // Implementazione toast semplice - sostituisci con react-hot-toast se installato
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  const handleSaveResult = async () => {
    setIsSaving(true);
    
    try {
      const savedData = {
        calculator: calculatorName,
        inputs,
        results,
        savedAt: new Date().toISOString(),
        id: Date.now().toString()
      };

      const existingSaves = JSON.parse(localStorage.getItem('calculator_saves') || '[]');
      existingSaves.push(savedData);
      localStorage.setItem('calculator_saves', JSON.stringify(existingSaves));

      showToast('Risultato salvato con successo!');
    } catch (error) {
      showToast('Errore nel salvare il risultato', 'error');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    try {
      const htmlContent = generatePDFContent();
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      }
      
      showToast('PDF generato con successo!');
    } catch (error) {
      showToast('Errore nella generazione del PDF', 'error');
      console.error('PDF export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Risultati ${calculatorName}`,
          text: `Ecco i risultati del calcolatore ${calculatorName}`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('URL copiato negli appunti!');
      }
    } catch (error) {
      console.error('Share error:', error);
      showToast('Errore nella condivisione', 'error');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const generatePDFContent = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Risultati ${calculatorName}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 20px; 
            line-height: 1.6;
          }
          .header { 
            border-bottom: 2px solid #3B82F6; 
            padding-bottom: 20px; 
            margin-bottom: 30px;
          }
          .result-item { 
            margin: 10px 0; 
            padding: 10px; 
            background: #F3F4F6; 
            border-radius: 8px;
          }
          .input-section, .results-section { 
            margin: 20px 0; 
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #E5E7EB;
            font-size: 12px;
            color: #6B7280;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${calculatorName}</h1>
          <p>Generato il: ${new Date().toLocaleDateString('it-IT')}</p>
          <p>SoCalSolver - Calcolatori Professionali</p>
        </div>
        
        <div class="input-section">
          <h2>Parametri di Input</h2>
          ${Object.entries(inputs).map(([key, value]) => 
            `<div class="result-item">
              <strong>${key}:</strong> ${value}
            </div>`
          ).join('')}
        </div>

        <div class="results-section">
          <h2>Risultati</h2>
          ${Object.entries(results).map(([key, value]) => 
            `<div class="result-item">
              <strong>${key}:</strong> ${typeof value === 'number' ? value.toLocaleString('it-IT') : value}
            </div>`
          ).join('')}
        </div>

        <div class="footer">
          <p>Questo report è stato generato da SoCalSolver.com</p>
          <p>I risultati sono da considerarsi come stime e non sostituiscono la consulenza professionale.</p>
        </div>
      </body>
      </html>
    `;
  };

  const viewSavedResults = () => {
    const saves = JSON.parse(localStorage.getItem('calculator_saves') || '[]');
    console.log('Saved results:', saves);
    showToast(`Hai ${saves.length} risultati salvati`);
  };

  return (
    <div className="lg:col-span-1">
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <ChartBarIcon className="w-6 h-6 mr-2 text-blue-600" />
          Strumenti
        </h3>
        
        <div className="space-y-3">
          <button 
            onClick={handleSaveResult}
            disabled={isSaving || Object.keys(results).length === 0}
            className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <BookmarkIcon className="w-5 h-5 mr-3 text-green-600" />
            <span>
              {isSaving ? 'Salvando...' : '📊 Salva Risultato'}
            </span>
          </button>

          <button 
            onClick={handleExportPDF}
            disabled={isExporting || Object.keys(results).length === 0}
            className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-3 text-red-600" />
            <span>
              {isExporting ? 'Generando...' : '📄 Esporta PDF'}
            </span>
          </button>

          <button 
            onClick={handleShare}
            className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors flex items-center"
          >
            <ShareIcon className="w-5 h-5 mr-3 text-blue-600" />
            <span>🔗 Condividi</span>
          </button>

          <button 
            onClick={handlePrint}
            className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors flex items-center"
          >
            <PrinterIcon className="w-5 h-5 mr-3 text-gray-600" />
            <span>🖨️ Stampa</span>
          </button>

          <button 
            onClick={viewSavedResults}
            className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors flex items-center"
          >
            <ClockIcon className="w-5 h-5 mr-3 text-purple-600" />
            <span>📈 Storico</span>
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Info Rapide</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• Risultati: {Object.keys(results).length}</p>
            <p>• Input: {Object.keys(inputs).length}</p>
            <p>• Aggiornato: {new Date().toLocaleTimeString('it-IT')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
