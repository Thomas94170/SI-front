import { useEffect } from "react";
import Layout from "../components/features/quote-invoice/layout/Layout";
import { Card } from "../components/features/quote-invoice/ui/card";
import QuoteForm from "../components/features/quote-invoice/form/QuoteForm";
import DocumentPreview from "../components/features/quote-invoice/preview/DocumentPreview";
import useDocumentStore from "../store/useDocumentStore";

export default function QuoteInvoicePage() {
    const { activeDocument, currentQuote, currentInvoice } = useDocumentStore();

  // Set document title
  useEffect(() => {
    document.title = 'Smart Invoice Editor';
  }, []);

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8">
          <Card className="p-6 animate-in fade-in slide-in-from-top-5 duration-300">
            {activeDocument === 'quote' && <QuoteForm />}
            {activeDocument === 'invoice' && currentInvoice && (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Facture générée</h2>
                <p className="text-gray-600 mb-4">
                  La facture a été générée à partir du devis {currentQuote.number}.
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Vous pouvez imprimer ou exporter la facture en PDF à l'aide des boutons ci-contre.
                </p>
              </div>
            )}
          </Card>

          <div className="animate-in fade-in slide-in-from-top-8 duration-500">
            <DocumentPreview />
          </div>
        </div>
      </div>
    </Layout>
  );
}