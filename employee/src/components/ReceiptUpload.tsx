import React, { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Upload, FileText, Image, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface OCRData {
  amount?: number;
  date?: string;
  description?: string;
  category?: 'Food' | 'Travel' | 'Miscellaneous' | 'Equipment' | 'Transportation';
  merchant?: string;
}

interface ReceiptUploadProps {
  onUpload: (file: File, ocrData?: OCRData) => void;
}

export const ReceiptUpload: React.FC<ReceiptUploadProps> = ({ onUpload }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrData, setOcrData] = useState<OCRData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Simulated OCR processing
  const processOCR = useCallback(async (file: File): Promise<OCRData> => {
    // Simulate OCR processing time
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    await delay(500);
    setProgress(25);
    
    await delay(500);
    setProgress(50);
    
    await delay(500);
    setProgress(75);
    
    await delay(500);
    setProgress(100);

    // Simulate OCR results based on file name or generate mock data
    const mockOcrData: OCRData = {
      amount: Math.round((Math.random() * 200 + 10) * 100) / 100,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: [
        'Business lunch',
        'Taxi fare',
        'Office supplies',
        'Conference registration',
        'Hotel accommodation'
      ][Math.floor(Math.random() * 5)],
      category: ['Food', 'Transportation', 'Equipment', 'Travel', 'Travel'][Math.floor(Math.random() * 5)] as any,
      merchant: [
        'Restaurant ABC',
        'Uber',
        'Office Depot',
        'TechConf 2024',
        'Hotel XYZ'
      ][Math.floor(Math.random() * 5)]
    };

    return mockOcrData;
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload an image (JPEG, PNG, GIF) or PDF file');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('File size must be less than 5MB');
      return;
    }

    setError(null);
    setUploadedFile(file);
    setIsProcessing(true);
    setProgress(0);

    try {
      const extractedData = await processOCR(file);
      setOcrData(extractedData);
      onUpload(file, extractedData);
    } catch (err) {
      setError('Failed to process receipt. Please try again.');
      console.error('OCR processing error:', err);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [onUpload, processOCR]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {!uploadedFile ? (
        <div
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('receipt-upload')?.click()}
        >
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Receipt</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your receipt here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            Supports JPEG, PNG, GIF, PDF (max 5MB)
          </p>
          <input
            id="receipt-upload"
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <Button variant="outline" className="mt-4">
            Choose File
          </Button>
        </div>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {uploadedFile.type.startsWith('image/') ? (
                  <Image className="h-10 w-10 text-blue-500" />
                ) : (
                  <FileText className="h-10 w-10 text-red-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{uploadedFile.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(uploadedFile.size)}
                </p>
                
                {isProcessing && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Processing receipt with OCR...</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                )}

                {ocrData && !isProcessing && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">OCR Processing Complete</span>
                    </div>
                    <div className="text-sm space-y-1">
                      {ocrData.amount && (
                        <p><span className="font-medium">Amount:</span> ${ocrData.amount.toFixed(2)}</p>
                      )}
                      {ocrData.date && (
                        <p><span className="font-medium">Date:</span> {ocrData.date}</p>
                      )}
                      {ocrData.merchant && (
                        <p><span className="font-medium">Merchant:</span> {ocrData.merchant}</p>
                      )}
                      {ocrData.category && (
                        <p><span className="font-medium">Suggested Category:</span> {ocrData.category}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setUploadedFile(null);
                  setOcrData(null);
                  setError(null);
                  setIsProcessing(false);
                  setProgress(0);
                }}
              >
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {ocrData && !isProcessing && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Receipt processed successfully! Form fields have been auto-filled with extracted data.
            You can review and edit the information before submitting.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};