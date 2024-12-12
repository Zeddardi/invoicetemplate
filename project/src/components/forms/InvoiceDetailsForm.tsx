import React from 'react';
import { InvoiceDetails } from '../../types/invoice';
import FormInput from '../ui/FormInput';

interface Props {
  data: InvoiceDetails;
  onChange: (data: InvoiceDetails) => void;
}

export default function InvoiceDetailsForm({ data, onChange }: Props) {
  const handleChange = (field: keyof InvoiceDetails) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...data, [field]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Invoice Details</h3>
      <FormInput
        label="Invoice Number"
        value={data.number}
        onChange={handleChange('number')}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          type="date"
          label="Invoice Date"
          value={data.date}
          onChange={handleChange('date')}
          required
        />
        <FormInput
          type="date"
          label="Due Date"
          value={data.dueDate}
          onChange={handleChange('dueDate')}
          required
        />
      </div>
    </div>
  );
}