import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Item, QuoteData, InvoiceData } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function formatDate(date: string): string {
  return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
}

export function calculateSubtotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function calculateTaxes(items: Item[]): number {
  return items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice * (item.taxRate / 100),
    0
  );
}

export function calculateTotal(items: Item[]): number {
  const subtotal = calculateSubtotal(items);
  const taxes = calculateTaxes(items);
  return subtotal + taxes;
}

export function generateQuoteNumber(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  
  return `DE-${year}${month}-${random}`;
}

export function generateInvoiceNumber(quoteNumber: string): string {
  return quoteNumber.replace('DE-', 'FA-');
}

export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

export function createInvoiceFromQuote(quote: QuoteData): InvoiceData {
  const invoiceNumber = generateInvoiceNumber(quote.number);
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30); // 30 days payment term
  
  return {
    id: generateUniqueId(),
    number: invoiceNumber,
    createdAt: new Date().toISOString().split('T')[0],
    dueDate: dueDate.toISOString().split('T')[0],
    client: quote.client,
    business: quote.business,
    items: quote.items,
    notes: quote.notes,
    termsAndConditions: quote.termsAndConditions,
    currency: quote.currency,
    quoteId: quote.id,
    quoteNumber: quote.number,
    quoteDate: quote.createdAt,
    isPaid: false,
  };
}