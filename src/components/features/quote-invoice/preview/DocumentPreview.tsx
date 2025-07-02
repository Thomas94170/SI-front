import { useRef } from 'react';
import  { useReactToPrint,  } from 'react-to-print';
import useDocumentStore from '../../../../store/useDocumentStore';
import QuotePreview from './QuotePreview';
import InvoicePreview from './InvoicePreview';
import { Printer, FileDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import html2pdf from 'html2pdf.js';
import ErrorBoundary from '../../../ErrorBoundary';

export default function DocumentPreview() {
  const { activeDocument, currentQuote, currentInvoice } = useDocumentStore();
  const componentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current!,
    documentTitle: activeDocument === 'quote' 
      ? `Devis_${currentQuote.number}` 
      : `Facture_${currentInvoice?.number}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  } as Parameters<typeof useReactToPrint>[0]);

  const handleDownload = () => {
    if (!componentRef.current) return;
    const element = componentRef.current;

    const opt = {
      margin:       0.5,
      filename:     activeDocument === 'quote'
        ? `Devis_${currentQuote.number}.pdf`
        : `Facture_${currentInvoice?.invoiceName || 'facture'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'cm', format: 'a4', orientation: 'portrait' }
    };
    console.log('filename invoice : ', opt.filename);
    
   // verifier ici pourquoi facture undefined, ca doit etre le currentInvoice?.number
    html2pdf().set(opt).from(element).save();
  };

  const renderPreview = () => {
    if (activeDocument === 'quote') {
      return <QuotePreview quote={currentQuote} />;
    } else if (activeDocument === 'invoice' && currentInvoice) {
      return<ErrorBoundary fallback={<p>Impossible d’afficher la facture.</p>}>
      <InvoicePreview invoice={currentInvoice} /> </ErrorBoundary>;
    }
    return <div className="p-8 text-center">Aucun document à afficher</div>;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePrint}
        >
          <Printer className="mr-2 h-4 w-4" />
          Imprimer
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDownload}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Télécharger PDF
        </Button>
      </div>
      <Card className="overflow-hidden bg-white print:shadow-none">
        <div 
          ref={componentRef} 
          className="min-h-[29.7cm] w-full bg-white p-8 print:p-0"
        >
          {renderPreview()}
        </div>
      </Card>
    </div>
  );
}