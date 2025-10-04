import React, { useState } from 'react';
import { Expense } from './EmployeeDashboard';
import { ReceiptUpload } from './ReceiptUpload';
import { CurrencyConverter } from './CurrencyConverter';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Save, Send, Upload } from 'lucide-react';

interface AddExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id' | 'employeeName'>) => void;
  onCancel: () => void;
}

interface FormData {
  description: string;
  expenseDate: string;
  category: Expense['category'];
  paidBy: Expense['paidBy'];
  remarks: string;
  originalAmount: number;
  originalCurrency: string;
  receipt?: File;
}

const categories: Expense['category'][] = ['Food', 'Travel', 'Miscellaneous', 'Equipment', 'Transportation'];
const paymentMethods: Expense['paidBy'][] = ['Cash', 'Card', 'Bank'];
const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR'];

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    description: '',
    expenseDate: new Date().toISOString().split('T')[0],
    category: 'Miscellaneous',
    paidBy: 'Card',
    remarks: '',
    originalAmount: 0,
    originalCurrency: 'USD',
  });

  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleReceiptUpload = (file: File, ocrData?: any) => {
    setFormData(prev => ({ ...prev, receipt: file }));
    
    // Auto-fill form data from OCR if available
    if (ocrData) {
      if (ocrData.amount) {
        setFormData(prev => ({ ...prev, originalAmount: ocrData.amount }));
      }
      if (ocrData.date) {
        setFormData(prev => ({ ...prev, expenseDate: ocrData.date }));
      }
      if (ocrData.description) {
        setFormData(prev => ({ ...prev, description: ocrData.description }));
      }
      if (ocrData.category) {
        setFormData(prev => ({ ...prev, category: ocrData.category }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.expenseDate) {
      newErrors.expenseDate = 'Date is required';
    }
    if (formData.originalAmount <= 0) {
      newErrors.originalAmount = 'Amount must be greater than 0' as any;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (status: 'Draft' | 'Waiting Approval') => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const expense: Omit<Expense, 'id' | 'employeeName'> = {
        ...formData,
        convertedAmount,
        baseCurrency: 'USD', // Company base currency
        status,
        receipt: formData.receipt,
      };

      onSubmit(expense);
    } catch (error) {
      console.error('Error submitting expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-1">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Receipt Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReceiptUpload onUpload={handleReceiptUpload} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              placeholder="Enter expense description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Expense Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.expenseDate}
                onChange={(e) => handleInputChange('expenseDate', e.target.value)}
                className={`min-h-[2.25rem] ${errors.expenseDate ? 'border-destructive' : ''}`}
              />
              {errors.expenseDate && (
                <p className="text-sm text-destructive">{errors.expenseDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value as Expense['category'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paidBy">Payment Method</Label>
              <Select
                value={formData.paidBy}
                onValueChange={(value) => handleInputChange('paidBy', value as Expense['paidBy'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Input
                id="remarks"
                placeholder="Additional notes"
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Amount & Currency</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalAmount">Original Amount *</Label>
              <Input
                id="originalAmount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.originalAmount || ''}
                onChange={(e) => handleInputChange('originalAmount', parseFloat(e.target.value) || 0)}
                className={errors.originalAmount ? 'border-destructive' : ''}
              />
              {errors.originalAmount && (
                <p className="text-sm text-destructive">{errors.originalAmount}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalCurrency">Original Currency</Label>
              <Select
                value={formData.originalCurrency}
                onValueChange={(value) => handleInputChange('originalCurrency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="z-[9999]">
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <CurrencyConverter
            amount={formData.originalAmount}
            fromCurrency={formData.originalCurrency}
            toCurrency="USD"
            onConversion={(converted) => setConvertedAmount(converted)}
          />
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleSubmit('Draft')}
          disabled={isLoading}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save as Draft
        </Button>
        <Button
          onClick={() => handleSubmit('Waiting Approval')}
          disabled={isLoading}
          className="gap-2 bg-green-600 hover:bg-green-700"
        >
          <Send className="h-4 w-4" />
          Submit for Approval
        </Button>
      </div>
    </div>
  );
};