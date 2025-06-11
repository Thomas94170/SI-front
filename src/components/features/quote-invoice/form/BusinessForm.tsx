import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import useDocumentStore from '../../../../store/useDocumentStore';
import type { QuoteData } from '../../../../lib/types';

export default function BusinessForm() {
  const { watch, setValue, formState: { errors } } = useFormContext<QuoteData>();
  const watchedBusiness = watch('business');

  const [business, setBusiness] = useState<QuoteData['business']>({
    name: watchedBusiness?.name || '',
    siret: watchedBusiness?.siret || '',
    email: watchedBusiness?.email || '',
    phone: watchedBusiness?.phone || '',
    address: watchedBusiness?.address || '',
    website: watchedBusiness?.website || '',
  });

  const { updateQuote } = useDocumentStore();

  const handleChange = (field: keyof QuoteData['business'], value: string) => {
    const updated = { ...business, [field]: value };
    setBusiness(updated);
    setValue('business', updated);
  };

  const handleValidate = () => {
    updateQuote({ business });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Information de l'entreprise</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="business-name">
              Nom de l'entreprise <span className="text-destructive">*</span>
            </Label>
            <Input
              id="business-name"
              placeholder="Votre entreprise"
              value={business.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors.business?.name ? "border-destructive" : ""}
            />
            {errors.business?.name && (
              <p className="text-sm text-destructive">{errors.business.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-siret">
              SIRET <span className="text-destructive">*</span>
            </Label>
            <Input
              id="business-siret"
              placeholder="12345678901234"
              value={business.siret}
              onChange={(e) => handleChange('siret', e.target.value)}
              className={errors.business?.siret ? "border-destructive" : ""}
            />
            {errors.business?.siret && (
              <p className="text-sm text-destructive">{errors.business.siret.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="business-email"
              type="email"
              placeholder="contact@entreprise.com"
              value={business.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={errors.business?.email ? "border-destructive" : ""}
            />
            {errors.business?.email && (
              <p className="text-sm text-destructive">{errors.business.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-phone">
              Téléphone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="business-phone"
              placeholder="06 12 34 56 78"
              value={business.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={errors.business?.phone ? "border-destructive" : ""}
            />
            {errors.business?.phone && (
              <p className="text-sm text-destructive">{errors.business.phone.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="business-address">
            Adresse <span className="text-destructive">*</span>
          </Label>
          <Input
            id="business-address"
            placeholder="123 rue de Paris, 75001 Paris"
            value={business.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className={errors.business?.address ? "border-destructive" : ""}
          />
          {errors.business?.address && (
            <p className="text-sm text-destructive">{errors.business.address.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="business-website">Site web</Label>
          <Input
            id="business-website"
            placeholder="www.votreentreprise.com"
            value={business.website}
            onChange={(e) => handleChange('website', e.target.value)}
          />
        </div>

        <Button type="button" onClick={handleValidate} className="mt-4 w-full">
          Valider les informations entreprise
        </Button>
      </CardContent>
    </Card>
  );
}
