import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import useDocumentStore from '../../../../store/useDocumentStore';
import type { QuoteData } from '../../../../lib/types';

export default function ClientForm() {
  const { watch, setValue, formState: { errors } } = useFormContext<QuoteData>();
  const watchedClient = watch('client');

  const [client, setClient] = useState<QuoteData['client']>({
    name: watchedClient?.name || '',
    email: watchedClient?.email || '',
    phone: watchedClient?.phone || '',
    address: watchedClient?.address || '',
  });

  const { updateQuote } = useDocumentStore();

  const handleChange = (field: keyof QuoteData['client'], value: string) => {
    const updatedClient = { ...client, [field]: value };
    setClient(updatedClient);
    setValue('client', updatedClient);
  };

  const handleValidate = () => {
    updateQuote({ client });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Informations du client</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client-name">
              Nom du client <span className="text-destructive">*</span>
            </Label>
            <Input
              id="client-name"
              placeholder="Nom du client"
              value={client.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors.client?.name ? 'border-destructive' : ''}
            />
            {errors.client?.name && (
              <p className="text-sm text-destructive">{errors.client.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="client-email">Email</Label>
            <Input
              id="client-email"
              type="email"
              placeholder="client@example.com"
              value={client.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={errors.client?.email ? 'border-destructive' : ''}
            />
            {errors.client?.email && (
              <p className="text-sm text-destructive">{errors.client.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="client-phone">Téléphone</Label>
            <Input
              id="client-phone"
              placeholder="06 12 34 56 78"
              value={client.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="client-address">
            Adresse <span className="text-destructive">*</span>
          </Label>
          <Input
            id="client-address"
            placeholder="123 rue de Paris, 75001 Paris"
            value={client.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className={errors.client?.address ? 'border-destructive' : ''}
          />
          {errors.client?.address && (
            <p className="text-sm text-destructive">{errors.client.address.message}</p>
          )}
        </div>

        <Button type="button" onClick={handleValidate} className="mt-4 w-full">
          Valider les informations client
        </Button>
      </CardContent>
    </Card>
  );
}
