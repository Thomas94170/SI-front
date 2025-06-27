import { useFormContext } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CURRENCIES } from '../../../../lib/types';
import type { QuoteData } from '../../../../lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '../../../../lib/utils';

export default function QuoteDetailsForm() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<QuoteData>();
  
  const createdAt = watch('createdAt');
  const validUntil = watch('validUntil');
  
  const handleCreatedAtChange = (date: Date | undefined) => {
    if (date) {
      setValue('createdAt', format(date, 'yyyy-MM-dd'));
    }
  };
  
  const handleValidUntilChange = (date: Date | undefined) => {
    if (date) {
      setValue('validUntil', format(date, 'yyyy-MM-dd'));
    }
  };
  
  const handleCurrencyChange = (currency: string) => {
    setValue('currency', currency);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Détails du devis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="number">
              Numéro de devis <span className="text-destructive">*</span>
            </Label>
            <Input
              id="number"
              {...register('number', { required: "Le numéro est requis" })}
              value={watch('number')}
              onChange={(e) => {
              const value = e.target.value;
              setValue('number', value); // garde en phase avec react-hook-form
              import('../../../../store/useDocumentStore').then((mod) => {
                console.log('[ZUSTAND] Mise à jour du quote number dans le store :', value); 
                mod.default.getState().updateQuote({ number: value }); // sync Zustand
              });
              }}
              className={errors.number ? "border-destructive" : ""}
            />
            {errors.number && (
              <p className="text-sm text-destructive">{errors.number.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currency">
              Devise <span className="text-destructive">*</span>
            </Label>
            <Select defaultValue={watch('currency')} onValueChange={handleCurrencyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une devise" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>
              Date d'émission <span className="text-destructive">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !createdAt && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {createdAt ? format(new Date(createdAt), 'PPP', { locale: fr }) : <span>Sélectionner une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={createdAt ? new Date(createdAt) : undefined}
                  onSelect={handleCreatedAtChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>
              Date de validité <span className="text-destructive">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !validUntil && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {validUntil ? format(new Date(validUntil), 'PPP', { locale: fr }) : <span>Sélectionner une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={validUntil ? new Date(validUntil) : undefined}
                  onSelect={handleValidUntilChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}