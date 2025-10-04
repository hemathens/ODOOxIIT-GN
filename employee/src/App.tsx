import React from 'react';
import { ExpenseDashboard } from './components/ExpenseDashboard';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <ExpenseDashboard />
      <Toaster />
    </div>
  );
}