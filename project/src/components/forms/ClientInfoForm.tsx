import React from 'react';
import { ClientInfo } from '../../types/invoice';
import FormInput from '../ui/FormInput';

interface Props {
  data: ClientInfo;
  onChange: (data: ClientInfo) => void;
}

export default function ClientInfoForm({ data, onChange }: Props) {
  const handleChange = (field: keyof ClientInfo) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...data, [field]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Client Information</h3>
      <FormInput
        label="Client Name"
        value={data.name}
        onChange={handleChange('name')}
        required
      />
      <FormInput
        label="VAT Number"
        value={data.vatNumber}
        onChange={handleChange('vatNumber')}
        required
      />
      <FormInput
        label="Address"
        value={data.address}
        onChange={handleChange('address')}
        required
      />
    </div>
  );
}