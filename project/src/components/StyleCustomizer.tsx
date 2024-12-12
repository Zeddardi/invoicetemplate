import React from 'react';
import { Settings } from 'lucide-react';
import { InvoiceStyle } from '../types/invoice';

interface Props {
  style: InvoiceStyle;
  onChange: (style: InvoiceStyle) => void;
}

export default function StyleCustomizer({ style, onChange }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Settings size={20} />
        <h3 className="text-lg font-semibold">Customize Design</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Primary Color</label>
          <input
            type="color"
            value={style.primaryColor}
            onChange={(e) => onChange({ ...style, primaryColor: e.target.value })}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Secondary Color</label>
          <input
            type="color"
            value={style.secondaryColor}
            onChange={(e) => onChange({ ...style, secondaryColor: e.target.value })}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Font Family</label>
          <select
            value={style.fontFamily}
            onChange={(e) => onChange({ ...style, fontFamily: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="Helvetica">Helvetica</option>
            <option value="Times-Roman">Times New Roman</option>
            <option value="Courier">Courier</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Border Radius</label>
          <input
            type="range"
            min="0"
            max="16"
            value={style.borderRadius}
            onChange={(e) => onChange({ ...style, borderRadius: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Layout Style</label>
          <select
            value={style.layout}
            onChange={(e) => onChange({ ...style, layout: e.target.value as InvoiceStyle['layout'] })}
            className="w-full p-2 border rounded"
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={style.showLogo}
              onChange={(e) => onChange({ ...style, showLogo: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm font-medium">Show Logo</span>
          </label>
        </div>
      </div>
    </div>
  );
}