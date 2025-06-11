import type { QuoteData } from '../../../../lib/types';
import { formatCurrency, formatDate, calculateSubtotal, calculateTaxes, calculateTotal } from '../../../../lib/utils';

interface QuotePreviewProps {
  quote: QuoteData;
}

export default function QuotePreview({ quote }: QuotePreviewProps) {
  const subtotal = calculateSubtotal(quote.items);
  const taxes = calculateTaxes(quote.items);
  const total = calculateTotal(quote.items);

  return (
    <div className="flex flex-col gap-8 text-black">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">DEVIS</h1>
          <p className="mt-1 text-gray-600">N° {quote.number}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{quote.business.name}</p>
          <p className="text-sm text-gray-500">{quote.business.address}</p>
          <p className="text-sm text-gray-500">
            SIRET: {quote.business.siret}
          </p>
        </div>
      </div>

      {/* Quote Info */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Client</h2>
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <p className="font-medium">{quote.client.name}</p>
            <p className="mt-1 text-sm text-gray-600">{quote.client.address}</p>
            {quote.client.email && (
              <p className="mt-1 text-sm text-gray-600">{quote.client.email}</p>
            )}
            {quote.client.phone && (
              <p className="mt-1 text-sm text-gray-600">{quote.client.phone}</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Détails</h2>
          <div className="flex flex-col gap-2 rounded-md border border-gray-200 bg-gray-50 p-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Date d'émission</span>
              <span className="text-sm font-medium">{formatDate(quote.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Valable jusqu'au</span>
              <span className="text-sm font-medium">{formatDate(quote.validUntil)}</span>
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
            {quote.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3 text-sm">{item.description}</td>
                <td className="py-3 text-right text-sm">{item.quantity}</td>
                <td className="py-3 text-right text-sm">
                  {formatCurrency(item.unitPrice, quote.currency)}
                </td>
                <td className="py-3 text-right text-sm">{item.taxRate}%</td>
                <td className="py-3 text-right text-sm">
                  {formatCurrency(item.quantity * item.unitPrice, quote.currency)}
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
              {formatCurrency(subtotal, quote.currency)}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="text-sm text-gray-600">TVA</span>
            <span className="text-sm font-medium">
              {formatCurrency(taxes, quote.currency)}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-base font-medium">Total TTC</span>
            <span className="text-base font-bold text-blue-900">
              {formatCurrency(total, quote.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {quote.notes && (
        <div className="mt-8">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Notes</h2>
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            {quote.notes}
          </div>
        </div>
      )}

      {/* Terms */}
      {quote.termsAndConditions && (
        <div className="mt-6">
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Conditions générales</h2>
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600">
            {quote.termsAndConditions}
          </div>
        </div>
      )}

      {/* Acceptance */}
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Bon pour accord</h2>
          <div className="h-24 rounded-md border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Signature du client</p>
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Date</h2>
          <div className="h-24 rounded-md border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Date et signature</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
        <p>
          {quote.business.name} - SIRET: {quote.business.siret} -
          {quote.business.address} - {quote.business.email}
        </p>
      </div>
    </div>
  );
}