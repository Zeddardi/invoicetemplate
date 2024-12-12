import React from 'react';
import { InvoiceData } from '../types/invoice';

interface Props {
  data: InvoiceData;
}

export default function LivePreview({ data }: Props) {
  const { style } = data;
  
  return (
    <div 
      className="bg-white p-8 rounded-lg shadow-md"
      style={{ 
        fontFamily: style.fontFamily,
        borderRadius: `${style.borderRadius}px`,
      }}
    >
      <div className="flex justify-between items-start mb-8">
        {style.showLogo && data.logo && (
          <img src={data.logo} alt="Company Logo" className="h-16 object-contain" />
        )}
        <div style={{ color: style.primaryColor }} className="text-right">
          <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
          <p className="text-sm">#{data.invoiceNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold mb-2" style={{ color: style.secondaryColor }}>From</h3>
          <p>{data.companyName}</p>
          <p>{data.companyAddress}</p>
          <p>{data.companyEmail}</p>
          <p>{data.companyPhone}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2" style={{ color: style.secondaryColor }}>Bill To</h3>
          <p>{data.clientName}</p>
          <p>{data.clientAddress}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-4 gap-4 font-semibold p-2" style={{ backgroundColor: style.primaryColor, color: 'white' }}>
          <div className="col-span-2">Description</div>
          <div>Quantity</div>
          <div>Amount</div>
        </div>
        {data.items.map((item) => (
          <div key={item.id} className="grid grid-cols-4 gap-4 p-2 border-b">
            <div className="col-span-2">{item.description}</div>
            <div>{item.quantity}</div>
            <div>${(item.quantity * item.price).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="text-right">
        <div className="text-xl font-bold" style={{ color: style.primaryColor }}>
          Total: ${data.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}
        </div>
      </div>
    </div>
  );
}