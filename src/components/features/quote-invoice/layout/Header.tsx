import { FileText, FileCheck, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useToast } from '../../../../hooks/use-toast';
import useDocumentStore from '../../../../store/useDocumentStore';
import { cn } from '../../../../lib/utils';
import type { DocumentType } from '../../../../lib/types';

export default function Header() {
  const { toast } = useToast();
  const { 
    activeDocument, 
    setActiveDocument, 
    currentQuote, 
    currentInvoice, 
    saveQuote, 
    generateInvoice,
    initializeNewQuote 
  } = useDocumentStore();

  const handleTabChange = (type: DocumentType) => {
    setActiveDocument(type);
  };

  const handleSave = () => {
    saveQuote();
    toast({
      title: "Devis enregistré",
      description: "Votre devis a été enregistré avec succès.",
    });
  };

  const handleGenerateInvoice = () => {
    if (currentQuote.items.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez ajouter au moins un produit ou service au devis.",
        variant: "destructive",
      });
      return;
    }
    
    if (!currentQuote.client.name || !currentQuote.business.name) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez compléter les informations client et entreprise.",
        variant: "destructive",
      });
      return;
    }
    
    generateInvoice();
    toast({
      title: "Facture générée",
      description: "La facture a été générée à partir du devis.",
    });
  };

  const handleNewQuote = () => {
    initializeNewQuote();
    toast({
      title: "Nouveau devis",
      description: "Un nouveau devis a été créé.",
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Smart Invoice Editor</h1>
        </div>
        
        <div className="flex items-center gap-1 md:gap-4">
          <nav className="flex gap-1">
            <Button
              variant={activeDocument === 'quote' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleTabChange('quote')}
              className={cn(
                "relative",
                activeDocument === 'quote' && "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
              )}
            >
              <FileText className="mr-2 h-4 w-4" />
              Devis
            </Button>
            
            <Button
              variant={activeDocument === 'invoice' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleTabChange('invoice')}
              disabled={!currentInvoice}
              className={cn(
                "relative",
                activeDocument === 'invoice' && "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
              )}
            >
              <FileCheck className="mr-2 h-4 w-4" />
              Facture
            </Button>
          </nav>
          
          <Separator orientation="vertical" className="mx-1 h-6" />
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleNewQuote}>
              Nouveau
            </Button>
            
            <Button size="sm" variant="outline" onClick={handleSave}>
              Enregistrer
            </Button>
            
            {activeDocument === 'quote' && (
              <Button size="sm" onClick={handleGenerateInvoice}>
                Générer Facture
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}