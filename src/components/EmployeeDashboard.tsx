import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Plus, Receipt, TrendingUp, Clock, CheckCircle, User, LogOut } from 'lucide-react';
import { getEmployeeExpenses, addSharedExpense, saveSharedExpenses, getSharedExpenses } from './utils/expenseSync';
import { AddExpenseForm } from './AddExpenseForm';
import { ExpenseTable } from './ExpenseTable';
import { ExpenseFilters } from './ExpenseFilters';
import { EmployeeProfile } from './EmployeeProfile';
import { toast } from 'sonner';

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
  receipt?: string;
  approvalTrail?: Array<{
    action: string;
    user: string;
    comment: string;
    timestamp: string;
  }>;
}

interface EmployeeDashboardProps {
  employeeName: string;
  onLogout: () => void;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ employeeName, onLogout }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    // Get expenses for this employee from shared storage
    const employeeExpenses = getEmployeeExpenses(employeeName);
    
    // If no expenses exist for this employee, create initial mock data
    if (employeeExpenses.length === 0) {
      return [
        {
          id: `exp-${employeeName.replace(/\s+/g, '')}-${Date.now()}-1`,
          employeeName: employeeName,
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
              user: employeeName,
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
          id: `exp-${employeeName.replace(/\s+/g, '')}-${Date.now()}-2`,
          employeeName: employeeName,
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
          id: `exp-${employeeName.replace(/\s+/g, '')}-${Date.now()}-3`,
          employeeName: employeeName,
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
      ];
    }
    
    return employeeExpenses;
  });

  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'profile'>('dashboard');

  // Save expenses to shared localStorage whenever they change
  React.useEffect(() => {
    // Get all existing expenses
    const allExpenses = getSharedExpenses();
    
    // Remove existing expenses for this employee
    const filteredExpenses = allExpenses.filter((exp: any) => exp.employeeName !== employeeName);
    
    // Add current employee's expenses
    const updatedExpenses = [...filteredExpenses, ...expenses];
    
    // Save back to localStorage
    saveSharedExpenses(updatedExpenses);
  }, [expenses, employeeName]);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: `exp-${employeeName.replace(/\s+/g, '')}-${Date.now()}`,
      employeeName: employeeName,
    };
    
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
    setIsAddExpenseOpen(false);
    
    toast.success('Expense added successfully!');
  };

  // Refresh expenses from shared storage periodically
  useEffect(() => {
    const refreshExpenses = () => {
      const employeeExpenses = getEmployeeExpenses(employeeName);
      setExpenses(employeeExpenses);
      setFilteredExpenses(employeeExpenses);
    };

    // Refresh on mount
    refreshExpenses();

    // Set up interval to refresh periodically
    const interval = setInterval(refreshExpenses, 5000);
    
    return () => clearInterval(interval);
  }, [employeeName]);

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

  // Refresh expenses from shared storage when component mounts
  React.useEffect(() => {
    const refreshExpenses = () => {
      const allExpenses = JSON.parse(localStorage.getItem('sharedExpenses') || '[]');
      const employeeExpenses = allExpenses.filter((exp: Expense) => exp.employeeName === employeeName);
      setExpenses(employeeExpenses);
      setFilteredExpenses(employeeExpenses);
    };

    // Refresh on mount
    refreshExpenses();

    // Set up interval to refresh periodically
    const interval = setInterval(refreshExpenses, 5000);
    
    return () => clearInterval(interval);
  }, [employeeName]);

  // Calculate summary stats
  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.convertedAmount, 0);
  const pendingExpenses = filteredExpenses.filter(exp => exp.status === 'Waiting Approval').length;
  const approvedExpenses = filteredExpenses.filter(exp => exp.status === 'Approved').length;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="border-b bg-card p-4 flex items-center justify-between">
          <div>
            <h3>Welcome back, {employeeName}!</h3>
            <p className="text-muted-foreground">
              Track and manage your business expenses
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => setActiveView('profile')}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="flex items-center gap-2 text-destructive border-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {activeView === 'profile' ? (
            <EmployeeProfile employeeName={employeeName} onLogout={onLogout} />
          ) : (
            <div className="space-y-6">
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
          )}
        </main>
      </div>
    </div>
  );
};