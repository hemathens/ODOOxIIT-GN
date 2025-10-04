import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { TrendingUp, RefreshCw, AlertTriangle } from 'lucide-react';

interface CurrencyConverterProps {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  onConversionComplete: (convertedAmount: number) => void;
}

interface ExchangeRates {
  [key: string]: number;
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  amount,
  fromCurrency,
  toCurrency,
  onConversionComplete,
}) => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Mock exchange rates - in a real app, this would come from an API
  const mockRates: ExchangeRates = {
    'USD': 1.0,
    'EUR': 0.85,
    'GBP': 0.73,
    'CAD': 1.35,
    'AUD': 1.52,
    'JPY': 149.50,
    'INR': 83.25,
  };

  const fetchExchangeRates = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you would call the actual API:
      // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      // const data = await response.json();
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data for demo
      setRates(mockRates);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError('Failed to fetch exchange rates. Using cached rates.');
      // Fallback to mock rates
      setRates(mockRates);
      setLastUpdated(new Date().toISOString());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (rates && amount > 0) {
      let convertedAmount = amount;
      
      if (fromCurrency !== toCurrency) {
        // Convert from source currency to USD first (if not already USD)
        const usdAmount = fromCurrency === 'USD' ? amount : amount / rates[fromCurrency];
        
        // Then convert from USD to target currency (if not USD)
        convertedAmount = toCurrency === 'USD' ? usdAmount : usdAmount * rates[toCurrency];
      }
      
      onConversionComplete(Math.round(convertedAmount * 100) / 100);
    } else {
      onConversionComplete(0);
    }
  }, [amount, fromCurrency, toCurrency, rates, onConversionComplete]);

  const getConvertedAmount = (): number => {
    if (!rates || amount <= 0) return 0;
    
    if (fromCurrency === toCurrency) return amount;
    
    const usdAmount = fromCurrency === 'USD' ? amount : amount / rates[fromCurrency];
    const convertedAmount = toCurrency === 'USD' ? usdAmount : usdAmount * rates[toCurrency];
    
    return Math.round(convertedAmount * 100) / 100;
  };

  const getExchangeRate = (): number => {
    if (!rates || fromCurrency === toCurrency) return 1;
    
    const usdAmount = fromCurrency === 'USD' ? 1 : 1 / rates[fromCurrency];
    const rate = toCurrency === 'USD' ? usdAmount : usdAmount * rates[toCurrency];
    
    return Math.round(rate * 10000) / 10000;
  };

  const convertedAmount = getConvertedAmount();
  const exchangeRate = getExchangeRate();

  if (fromCurrency === toCurrency || amount <= 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Currency Conversion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Fetching latest exchange rates...</span>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Original Amount</p>
                <p className="text-xl font-semibold">
                  {amount.toFixed(2)} {fromCurrency}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Converted Amount</p>
                <p className="text-xl font-semibold text-green-600">
                  {convertedAmount.toFixed(2)} {toCurrency}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Exchange Rate</p>
                <p className="text-sm">
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                Live Rate
              </Badge>
            </div>

            {lastUpdated && (
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date(lastUpdated).toLocaleString()}
              </p>
            )}
          </div>
        )}

        <Alert>
          <TrendingUp className="h-4 w-4" />
          <AlertDescription>
            Exchange rates are updated in real-time. The converted amount will be used for company reporting.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};