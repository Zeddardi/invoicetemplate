import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { InvoiceData, CompanyInfo, ClientInfo, InvoiceDetails } from '../types/invoice';
import CompanyInfoForm from './forms/CompanyInfoForm';
import ClientInfoForm from './forms/ClientInfoForm';
import InvoiceDetailsForm from './forms/InvoiceDetailsForm';
import ItemsForm from './forms/ItemsForm';
import LogoUploader from './LogoUploader';
import FormInput from './ui/FormInput';

interface Props {
  onSubmit: (data: InvoiceData) => void;
}

const initialState: InvoiceData = {
  company: {
    name: '',
    address: '',
    email: '',
    phone: '',
    vatNumber: ''
  },
  client: {
    name: '',
    address: '',
    vatNumber: ''
  },
  invoiceDetails: {
    number: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: ''
  },
  items: [{ id: '1', description: '', quantity: 1, price: 0 }],
  vatRate: 20,
  logo: undefined
};

export default function InvoiceForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<InvoiceData>(initialState);

  const updateCompany = (company: CompanyInfo) => {
    setFormData(prev => ({ ...prev, company }));
  };

  const updateClient = (client: ClientInfo) => {
    setFormData(prev => ({ ...prev, client }));
  };

  const updateInvoiceDetails = (invoiceDetails: InvoiceDetails) => {
    setFormData(prev => ({ ...prev, invoiceDetails }));
  };

  const updateItems = (items: InvoiceData['items']) => {
    setFormData(prev => ({ ...prev, items }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <CompanyInfoForm
              data={formData.company}
              onChange={updateCompany}
            />
            <ClientInfoForm
              data={formData.client}
              onChange={updateClient}
            />
          </div>
          
          <div className="mt-6">
            <InvoiceDetailsForm
              data={formData.invoiceDetails}
              onChange={updateInvoiceDetails}
            />
          </div>

          <div className="mt-6">
            <ItemsForm
              items={formData.items}
              onChange={updateItems}
            />
          </div>

          <div className="mt-6">
            <FormInput
              type="number"
              label="VAT Rate (%)"
              value={formData.vatRate}
              onChange={(e) => setFormData(prev => ({ ...prev, vatRate: Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)) }))}
              min="0"
              max="100"
              step="0.1"
              required
            />
          </div>
        </div>

        <div className="space-y-6">
          <LogoUploader
            onUpload={(logo) => setFormData(prev => ({ ...prev, logo }))}
            currentLogo={formData.logo}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
      >
        <Download size={20} /> Generate Invoice
      </button>
    </form>
  );
}