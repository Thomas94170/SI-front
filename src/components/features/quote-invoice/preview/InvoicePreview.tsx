import type { InvoiceData } from '../../../../lib/types';
import { formatCurrency, formatDate, calculateSubtotal, calculateTaxes, calculateTotal } from '../../../../lib/utils';
import { Check } from 'lucide-react';

interface InvoicePreviewProps {
  invoice: InvoiceData;
}

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const subtotal = calculateSubtotal(invoice.items);
  const taxes = calculateTaxes(invoice.items);
  const total = calculateTotal(invoice.items);

  return (
    <div className="flex flex-col gap-8 text-black">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">FACTURE</h1>
          <p className="mt-1 text-gray-600">N° {invoice.number}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{invoice.business.name}</p>
          <p className="text-sm text-gray-500">{invoice.business.address}</p>
          <p className="text-sm text-gray-500">
            SIRET: {invoice.business.siret}
          </p>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Facturé à</h2>
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <p className="font-medium">{invoice.client.name}</p>
            <p className="mt-1 text-sm text-gray-600">{invoice.client.address}</p>
            {invoice.client.email && (
              <p className="mt-1 text-sm text-gray-600">{invoice.client.email}</p>
            )}
            {invoice.client.phone && (
              <p className="mt-1 text-sm text-gray-600">{invoice.client.phone}</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Détails</h2>
          <div className="flex flex-col gap-2 rounded-md border border-gray-200 bg-gray-50 p-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Date d'émission</span>
              <span className="text-sm font-medium">{formatDate(invoice.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Date d'échéance</span>
              <span className="text-sm font-medium">{formatDate(invoice.dueDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Facture liée au devis</span>
              <span className="text-sm font-medium">{invoice.quoteNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Statut</span>
              <span 
                className={`text-sm font-medium ${
                  invoice.isPaid ? 'text-green-600' : 'text-orange-600'
                }`}
              >
                {invoice.isPaid ? 'Payée' : 'En attente de paiement'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mt-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300 text-left">
              <th className="pb-3 text-sm font-semibold text-gray-600">Description</th>
              <th className="pb-3 text-right text-sm font-semibold text-gray-600">Qté</th>
              <th className="pb-3 text-right text-sm font-semibold text-gray-600">Prix unitaire</th>
              <th className="pb-3 text-right text-sm font-semibold text-gray-600">TVA</th>
              <th className="pb-3 text-right text-sm font-semibold text-gray-600">Total HT</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3 text-sm">{item.description}</td>
                <td className="py-3 text-right text-sm">{item.quantity}</td>
                <td className="py-3 text-right text-sm">
                  {formatCurrency(item.unitPrice, invoice.currency)}
                </td>
                <td className="py-3 text-right text-sm">{item.taxRate}%</td>
                <td className="py-3 text-right text-sm">
                  {formatCurrency(item.quantity * item.unitPrice, invoice.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-4 flex justify-end">
        <div className="w-64 rounded-md border border-gray-200 bg-gray-50 p-4">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-sm text-gray-600">Sous-total HT</span>
            <span className="text-sm font-medium">
              {formatCurrency(subtotal, invoice.currency)}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="text-sm text-gray-600">TVA</span>
            <span className="text-sm font-medium">
              {formatCurrency(taxes, invoice.currency)}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-base font-medium">Total TTC</span>
            <span className="text-base font-bold text-blue-900">
              {formatCurrency(total, invoice.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      {invoice.isPaid && (
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-800">
            <Check className="h-5 w-5" />
            <span className="font-medium">Facture payée le {formatDate(invoice.paidDate || '')}</span>
          </div>
        </div>
      )}

      {/* Notes */}
      {invoice.notes && (
        <div className="mt-8">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Notes</h2>
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            {invoice.notes}
          </div>
        </div>
      )}

      {/* Terms */}
      {invoice.termsAndConditions && (
        <div className="mt-6">
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Conditions générales</h2>
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600">
            {invoice.termsAndConditions}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
        <p>
          {invoice.business.name} - SIRET: {invoice.business.siret} -
          {invoice.business.address} - {invoice.business.email}
        </p>
      </div>
    </div>
  );
}