export interface InvoiceData {
  company: CompanyInfo;
  client: ClientInfo;
  invoiceDetails: InvoiceDetails;
  items: InvoiceItem[];
  vatRate: number;
  logo?: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  vatNumber: string;
}

export interface ClientInfo {
  name: string;
  address: string;
  vatNumber: string;
}

export interface InvoiceDetails {
  number: string;
  date: string;
  dueDate: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}