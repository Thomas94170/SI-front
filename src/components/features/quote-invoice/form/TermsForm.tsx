
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { QuoteData } from '../../../../lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import useDocumentStore from '../../../../store/useDocumentStore';

export default function TermsForm() {
  const { watch, setValue } = useFormContext<QuoteData>();
  const { updateQuote } = useDocumentStore();

  const watchedNotes = watch('notes') || '';
  const watchedTerms = watch('termsAndConditions') || '';

  const [notes, setNotes] = useState(watchedNotes);
  const [terms, setTerms] = useState(watchedTerms);

  const handleValidate = () => {
    updateQuote({
      notes,
      termsAndConditions: terms,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Conditions générales et notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="notes">Notes (affichées sur le devis/facture)</Label>
          <Textarea
            id="notes"
            placeholder="Notes ou informations supplémentaires pour le client..."
            className="min-h-[100px]"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setValue('notes', e.target.value);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="termsAndConditions">Conditions générales de vente</Label>
          <Textarea
            id="termsAndConditions"
            placeholder="Conditions générales de vente..."
            className="min-h-[150px]"
            value={terms}
            onChange={(e) => {
              setTerms(e.target.value);
              setValue('termsAndConditions', e.target.value);
            }}
          />
          <p className="text-sm text-muted-foreground">
            Ces conditions seront affichées en bas du devis et de la facture.
          </p>
        </div>

        <Button type="button" onClick={handleValidate} className="mt-4 w-full">
          Valider les conditions
        </Button>
      </CardContent>
    </Card>
  );
}
