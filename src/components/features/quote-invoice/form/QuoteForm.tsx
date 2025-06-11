import { useEffect } from 'react';
import { FormProvider, useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { QuoteData } from '../../../../lib/types';
import useDocumentStore from '../../../../store/useDocumentStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

import QuoteDetailsForm from './QuoteDetailsForm';
import BusinessForm from './BusinessForm';
import ClientForm from './ClientForm';
import ItemsForm from './ItemsForm';
import TermsForm from './TermsForm';



const quoteSchema = z.object({
  id: z.string(),
  number: z.string(),
  createdAt: z.string(),
  validUntil: z.string(),
  client: z.object({
    name: z.string().min(1, { message: "Le nom du client est requis" }),
    address: z.string().min(1, { message: "L'adresse du client est requise" }),
    email: z.string().email({ message: "Email invalide" }).or(z.literal("")),
    phone: z.string(),
  }),
  business: z.object({
    name: z.string().min(1, { message: "Le nom de l'entreprise est requis" }),
    address: z.string().min(1, { message: "L'adresse de l'entreprise est requise" }),
    email: z.string().email({ message: "Email invalide" }),
    phone: z.string().min(1, { message: "Le téléphone est requis" }),
    siret: z.string().min(14, { message: "Le SIRET doit contenir 14 chiffres" }),
    website: z.string().optional(),
    logo: z.string().optional(),
  }),
  items: z.array(
    z.object({
      id: z.string(),
      description: z.string(),
      quantity: z.number().positive(),
      unitPrice: z.number().min(0),
      taxRate: z.number().min(0).max(100),
    })
  ),
  notes: z.string().optional(),
  termsAndConditions: z.string().optional(),
  currency: z.string(),
});

export default function QuoteForm() {
  const { currentQuote, updateQuote } = useDocumentStore();
  
  const methods = useForm<QuoteData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: currentQuote,
  });

  // Update form when currentQuote changes
  useEffect(() => {
    methods.reset(currentQuote);
  }, [currentQuote, methods]);

  // Update store when form values change
  const onValueChange = (data: Partial<QuoteData>) => {
    updateQuote(data);
  };

  

  return (
    <FormProvider {...methods}>
      <form onChange={methods.handleSubmit(onValueChange, () => {})} className="space-y-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="client">Client</TabsTrigger>
            <TabsTrigger value="business">Entreprise</TabsTrigger>
            <TabsTrigger value="terms">Conditions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6 pt-4">
            <QuoteDetailsForm />
            <ItemsForm />
          </TabsContent>
          
          <TabsContent value="client" className="pt-4">
            <ClientForm />
          </TabsContent>
          
          <TabsContent value="business" className="pt-4">
            <BusinessForm />
          </TabsContent>
          
          <TabsContent value="terms" className="pt-4">
            <TermsForm />
          </TabsContent>
        </Tabs>
        
      </form>
    </FormProvider>
  );
}