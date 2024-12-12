import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePDF from './components/InvoicePDF';
import { InvoiceData } from './types/invoice';

export default function App() {
  const [showPDF, setShowPDF] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const handleGenerateInvoice = (data: InvoiceData) => {
    setInvoiceData(data);
    setShowPDF(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Invoice Generator</h1>
        
        {!showPDF ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <InvoiceForm onSubmit={handleGenerateInvoice} />
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setShowPDF(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Back to Editor
            </button>
            {invoiceData && <InvoicePDF data={invoiceData} />}
          </div>
        )}
      </div>
    </div>
  );
}