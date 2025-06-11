import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '..//ui/input';
import { Button } from '..//ui/button';
import type { QuoteData, Item } from '../../../../lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '..//ui/card';
import { formatCurrency } from '../../../../lib/utils';
import { generateUniqueId } from '../../../../lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import useDocumentStore from '../../../../store/useDocumentStore';

export default function ItemsForm() {
  const { watch, setValue } = useFormContext<QuoteData>();
  const [newItem, setNewItem] = useState<Omit<Item, 'id'>>({
    description: '',
    quantity: 1,
    unitPrice: 0,
    taxRate: 20,
  });
  
  const currency = watch('currency');
  const items = watch('items');
  const { updateQuoteItems } = useDocumentStore();
  
  const handleNewItemChange = (field: keyof Omit<Item, 'id'>, value: string | number) => {
    setNewItem({
      ...newItem,
      [field]: value,
    });
  };

  const addItem = () => {
    if (!newItem.description) return;
    
    const updatedItems = [
      ...items,
      { ...newItem, id: generateUniqueId() },
    ];
    
    setValue('items', updatedItems);
    updateQuoteItems(updatedItems);
    
    // Reset form
    setNewItem({
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 20,
    });
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setValue('items', updatedItems);
    updateQuoteItems(updatedItems);
  };

  const calculateLineTotal = (quantity: number, unitPrice: number, taxRate: number): number => {
    return quantity * unitPrice * (1 + taxRate / 100);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Produits et services</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Items List */}
        {items.length > 0 && (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Description</TableHead>
                  <TableHead className="text-right">Qté</TableHead>
                  <TableHead className="text-right">Prix unitaire</TableHead>
                  <TableHead className="text-right">TVA</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.unitPrice, currency)}
                    </TableCell>
                    <TableCell className="text-right">{item.taxRate}%</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(
                        calculateLineTotal(item.quantity, item.unitPrice, item.taxRate),
                        currency
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Add New Item */}
        <div className="grid grid-cols-8 gap-3 items-end">
          <div className="col-span-8 md:col-span-3">
            <Input
              placeholder="Description du produit ou service"
              value={newItem.description}
              onChange={(e) => handleNewItemChange('description', e.target.value)}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Input
              type="number"
              min="1"
              placeholder="Qté"
              value={newItem.quantity}
              onChange={(e) => handleNewItemChange('quantity', parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="col-span-3 md:col-span-2">
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="Prix unitaire"
              value={newItem.unitPrice || ''}
              onChange={(e) => handleNewItemChange('unitPrice', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Input
              type="number"
              min="0"
              max="100"
              placeholder="TVA %"
              value={newItem.taxRate}
              onChange={(e) => handleNewItemChange('taxRate', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="col-span-8 md:col-span-1">
            <Button 
              type="button"
              onClick={addItem}
              disabled={!newItem.description}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}