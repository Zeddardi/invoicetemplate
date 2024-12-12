import React from 'react';
import { CompanyInfo } from '../../types/invoice';
import FormInput from '../ui/FormInput';

interface Props {
  data: CompanyInfo;
  onChange: (data: CompanyInfo) => void;
}

export default function CompanyInfoForm({ data, onChange }: Props) {
  const handleChange = (field: keyof CompanyInfo) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...data, [field]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Company Information</h3>
      <FormInput
        label="Company Name"
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
      <FormInput
        type="email"
        label="Email"
        value={data.email}
        onChange={handleChange('email')}
        required
      />
      <FormInput
        type="tel"
        label="Phone"
        value={data.phone}
        onChange={handleChange('phone')}
        required
      />
    </div>
  );
}