import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { InvoiceItem } from '../../types/invoice';
import FormInput from '../ui/FormInput';

interface Props {
  items: InvoiceItem[];
  onChange: (items: InvoiceItem[]) => void;
}

export default function ItemsForm({ items, onChange }: Props) {
  const addItem = () => {
    onChange([
      ...items,
      { id: Date.now().toString(), description: '', quantity: 1, price: 0 }
    ]);
  };

  const removeItem = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    onChange(
      items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Items</h3>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      {items.map((item) => (
        <div key={item.id} className="flex gap-4 items-center">
          <FormInput
            placeholder="Description"
            className="flex-1"
            value={item.description}
            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
            required
          />
          <FormInput
            type="number"
            placeholder="Quantity"
            className="w-24"
            value={item.quantity}
            onChange={(e) => updateItem(item.id, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            required
          />
          <FormInput
            type="number"
            placeholder="Price"
            className="w-32"
            value={item.price}
            onChange={(e) => updateItem(item.id, 'price', Math.max(0, parseFloat(e.target.value) || 0))}
            min="0"
            step="0.01"
            required
          />
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}