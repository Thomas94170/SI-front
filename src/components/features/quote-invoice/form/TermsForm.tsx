import { useFormContext } from 'react-hook-form';
import type { QuoteData } from '../../../../lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function TermsForm() {
  const { register } = useFormContext<QuoteData>();

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
            {...register('notes')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="termsAndConditions">Conditions générales de vente</Label>
          <Textarea
            id="termsAndConditions"
            placeholder="Conditions générales de vente..."
            className="min-h-[150px]"
            {...register('termsAndConditions')}
          />
          <p className="text-sm text-muted-foreground">
            Ces conditions seront affichées en bas du devis et de la facture.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}