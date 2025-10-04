import React, { useState } from 'react';
import { ExpenseTable } from './ExpenseTable';
import { AddExpenseForm } from './AddExpenseForm';
import { ExpenseFilters } from './ExpenseFilters';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Plus, Receipt, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export interface Expense {
  id: string;
  employeeName: string;
  description: string;
  expenseDate: string;
  category: 'Food' | 'Travel' | 'Miscellaneous' | 'Equipment' | 'Transportation';
  paidBy: 'Cash' | 'Card' | 'Bank';
  remarks: string;
  originalAmount: number;
  originalCurrency: string;
  convertedAmount: number;
  baseCurrency: string;
  status: 'Draft' | 'Waiting Approval' | 'Approved' | 'Rejected';
  receipt?: File | string;
  approvalTrail?: Array<{
    action: string;
    user: string;
    comment: string;
    timestamp: string;
  }>;
}

export const ExpenseDashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      description: 'Business lunch with client',
      expenseDate: '2024-03-15',
      category: 'Food',
      paidBy: 'Card',
      remarks: 'Quarterly review meeting',
      originalAmount: 85.50,
      originalCurrency: 'USD',
      convertedAmount: 85.50,
      baseCurrency: 'USD',
      status: 'Approved',
      receipt: 'receipt-1.jpg',
      approvalTrail: [
        {
          action: 'Submitted',
          user: 'John Doe',
          comment: 'Expense submitted for review',
          timestamp: '2024-03-15T10:30:00Z'
        },
        {
          action: 'Approved',
          user: 'Sarah Manager',
          comment: 'Approved - valid business expense',
          timestamp: '2024-03-16T14:20:00Z'
        }
      ]
    },
    {
      id: '2',
      employeeName: 'John Doe',
      description: 'Flight to conference',
      expenseDate: '2024-03-20',
      category: 'Travel',
      paidBy: 'Card',
      remarks: 'Tech conference attendance',
      originalAmount: 450.00,
      originalCurrency: 'USD',
      convertedAmount: 450.00,
      baseCurrency: 'USD',
      status: 'Waiting Approval',
      receipt: 'receipt-2.pdf'
    },
    {
      id: '3',
      employeeName: 'John Doe',
      description: 'Office supplies',
      expenseDate: '2024-03-22',
      category: 'Equipment',
      paidBy: 'Cash',
      remarks: 'Notebooks and pens',
      originalAmount: 25.75,
      originalCurrency: 'USD',
      convertedAmount: 25.75,
      baseCurrency: 'USD',
      status: 'Draft',
      receipt: 'receipt-3.jpg'
    }
  ]);

  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: Date.now().toString(),
      employeeName: 'John Doe', // In real app, this would come from auth
    };
    
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
    setIsAddExpenseOpen(false);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = expenses;

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(expense => expense.status === filters.status);
    }

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(expense => expense.category === filters.category);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(expense => expense.expenseDate >= filters.dateFrom);
    }

    if (filters.dateTo) {
      filtered = filtered.filter(expense => expense.expenseDate <= filters.dateTo);
    }

    setFilteredExpenses(filtered);
  };

  // Calculate summary stats
  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.convertedAmount, 0);
  const pendingExpenses = filteredExpenses.filter(exp => exp.status === 'Waiting Approval').length;
  const approvedExpenses = filteredExpenses.filter(exp => exp.status === 'Approved').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Expense Management</h1>
          <p className="text-muted-foreground">Track and manage your business expenses</p>
        </div>
        <Sheet open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
          <SheetTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg overflow-y-auto p-6">
            <SheetHeader className="mb-6">
              <SheetTitle>Add New Expense</SheetTitle>
              <SheetDescription>
                Create a new expense entry with receipt upload and automatic data extraction.
              </SheetDescription>
            </SheetHeader>
            <AddExpenseForm 
              onSubmit={handleAddExpense}
              onCancel={() => setIsAddExpenseOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredExpenses.length} expenses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingExpenses}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedExpenses}</div>
            <p className="text-xs text-muted-foreground">
              Ready for reimbursement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${expenses.filter(exp => exp.expenseDate.startsWith('2024-03')).reduce((sum, exp) => sum + exp.convertedAmount, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              March 2024
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <ExpenseFilters onFilterChange={handleFilterChange} />

      {/* Expenses Table */}
      <ExpenseTable expenses={filteredExpenses} />
    </div>
  );
};