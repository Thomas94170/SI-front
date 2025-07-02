import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuoteData, InvoiceData, DocumentType } from '../lib/types';
import { DEFAULT_QUOTE } from '../lib/types';
import useAuthStore from './useAuthStore';
import { calculateSubtotal, calculateTaxes } from '../lib/utils';


import { 
  generateQuoteNumber, 
  generateUniqueId, 
 // createInvoiceFromQuote 
} from '../lib/utils';

interface DocumentState {
  activeDocument: DocumentType;
  currentQuote: QuoteData;
  currentInvoice: InvoiceData | null;
  savedQuotes: QuoteData[];
  savedInvoices: InvoiceData[];
  setActiveDocument: (type: DocumentType) => void;
  updateQuote: (data: Partial<QuoteData>) => void;
  updateQuoteItems: (items: QuoteData['items']) => void;
  initializeNewQuote: () => void;
  saveQuote: () => void;
  updateQuoteClient: (client: QuoteData['client']) => void;
  generateInvoice: () => void;
  deleteQuote: (id: string) => void;
  deleteInvoice: (id: string) => void;
  loadQuote: (id: string) => void;
  loadInvoice: (id: string) => void;
}

const initialQuote = {
  ...DEFAULT_QUOTE,
  id: generateUniqueId(),
  number: generateQuoteNumber(),
};

const useDocumentStore = create<DocumentState>()(
  persist(
    (set, get) => ({
      activeDocument: 'quote',
      currentQuote: initialQuote,
      currentInvoice: null,
      savedQuotes: [],
      savedInvoices: [],

      setActiveDocument: (type) => set({ activeDocument: type }),

      updateQuote: (data) => 
        set((state) => ({ 
          currentQuote: { ...state.currentQuote, ...data } 
        })),

      updateQuoteItems: (items) => 
        set((state) => ({ 
          currentQuote: { ...state.currentQuote, items } 
        })),

        updateQuoteClient: (client) => 
          set((state) => ({
            currentQuote: {
              ...state.currentQuote,
              client,
            },
          })),
        

      initializeNewQuote: () => 
        set({
          currentQuote: {
            ...initialQuote,
            id: generateUniqueId(),
            number: generateQuoteNumber(),
          },
          currentInvoice: null,
          activeDocument: 'quote',
        }),

      saveQuote: () => 
        set((state) => {
          const existingIndex = state.savedQuotes.findIndex(
            (q) => q.id === state.currentQuote.id
          );

          const updatedQuotes = existingIndex >= 0
            ? state.savedQuotes.map((q, i) => 
                i === existingIndex ? state.currentQuote : q
              )
            : [...state.savedQuotes, state.currentQuote];

          return { savedQuotes: updatedQuotes };
        }),

        generateInvoice: async () => {
          const { saveQuote } = get();
          const { userId } = useAuthStore.getState();
        
          if (!userId) {
            console.error("Utilisateur non authentifié.");
            return;
          }

          saveQuote();

  // 📦 Recharge le quote à jour juste après la sauvegarde
        const updatedQuote = get().currentQuote;

        
          const subtotal = calculateSubtotal(updatedQuote.items);
          const taxes = calculateTaxes(updatedQuote.items);
          const totalInclTax = subtotal + taxes;
          

          const payload = {
            
            invoiceName: updatedQuote.number.replace(/^DE/, 'FA'),
            client: updatedQuote.client.name,
            email: updatedQuote.client.email || '',
            phoneNumber: updatedQuote.client.phone || '',
            dueDate: new Date(updatedQuote.validUntil).toISOString(),
            totalBT: subtotal,
            totalInclTax: totalInclTax,
            userId,
          };
        
          try {
            console.log("🧾 Numéro de devis :", updatedQuote.number);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/invoice`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
            console.log(`userId & response : ${userId} ${response}` )
            if (!response.ok) {
              const errorText = await response.text();
              console.error("Erreur API:", errorText);
              throw new Error(errorText);
            }
        
            const newInvoice = await response.json();
            console.log("📄 Réponse API :", newInvoice);

        
            set({
              currentInvoice: {
                ...newInvoice,
                invoiceName: updatedQuote.number.replace(/^DE/, 'FA'),
                business: updatedQuote.business,
                client: updatedQuote.client,
                items: updatedQuote.items,
                notes: updatedQuote.notes,
                termsAndConditions: updatedQuote.termsAndConditions,
                currency: updatedQuote.currency,
              },
              activeDocument: 'invoice',
             
            });
            console.log('res : ', newInvoice);
          } catch (error) {
            console.error("Erreur lors de la génération de la facture:", error);
          }
        },
        

        deleteQuote: (id) => 
        set((state) => ({
          savedQuotes: state.savedQuotes.filter((q) => q.id !== id),
          // Reset current quote if it's the one being deleted
          ...(state.currentQuote.id === id 
              ? { currentQuote: initialQuote } 
              : {})
        })),

      deleteInvoice: (id) => 
        set((state) => ({
          savedInvoices: state.savedInvoices.filter((i) => i.id !== id),
          // Reset current invoice if it's the one being deleted
          ...(state.currentInvoice?.id === id 
              ? { currentInvoice: null } 
              : {})
        })),

      loadQuote: (id) => 
        set((state) => {
          const quoteToLoad = state.savedQuotes.find((q) => q.id === id);
          if (!quoteToLoad) return state;
          
          return {
            currentQuote: quoteToLoad,
            activeDocument: 'quote',
          };
        }),

      loadInvoice: (id) => 
        set((state) => {
          const invoiceToLoad = state.savedInvoices.find((i) => i.id === id);
          if (!invoiceToLoad) return state;
          
          return {
            currentInvoice: invoiceToLoad,
            activeDocument: 'invoice',
          };
        }),
    }),
    {
      name: 'smart-invoice-storage',
    }
  )
);

export default useDocumentStore;