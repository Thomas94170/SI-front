export interface Client {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface Business {
  name: string;
  address: string;
  email: string;
  phone: string;
  siret: string;
  website?: string;
  logo?: string;
}

export interface Item {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface QuoteData {
  id: string;
  number: string;
  createdAt: string;
  validUntil: string;
  client: Client;
  business: Business;
  items: Item[];
  notes?: string;
  termsAndConditions?: string;
  currency: string;
}

export interface InvoiceData extends Omit<QuoteData, 'validUntil'> {
  invoiceName: string
  dueDate: string;
  quoteId: string;
  quoteNumber: string;
  quoteDate: string;
  isPaid: boolean;
  paidDate?: string;
}

export type InvoiceStatus = 'draft' | 'pending' | 'paid';

export type DocumentType = 'quote' | 'invoice';

export const DEFAULT_BUSINESS: Business = {
  name: '',
  address: '',
  email: '',
  phone: '',
  siret: '',
  website: '',
  logo: '',
};

export const DEFAULT_CLIENT: Client = {
  name: '',
  address: '',
  email: '',
  phone: '',
};

export const CURRENCIES = [
  { value: 'EUR', label: '€ - Euro' },
  { value: 'USD', label: '$ - US Dollar' },
  { value: 'GBP', label: '£ - British Pound' },
  { value: 'CAD', label: 'C$ - Canadian Dollar' },
  { value: 'CHF', label: 'CHF - Swiss Franc' },
];

export const DEFAULT_QUOTE: QuoteData = {
  id: '',
  number: '',
  createdAt: new Date().toISOString().split('T')[0],
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  client: DEFAULT_CLIENT,
  business: DEFAULT_BUSINESS,
  items: [],
  currency: 'EUR',
};