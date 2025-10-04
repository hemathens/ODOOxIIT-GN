// Utility functions for synchronizing expenses between portals

export interface SharedExpense {
  id: string;
  employeeName: string;
  description: string;
  expenseDate: string;
  category: string;
  paidBy: string;
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

/**
 * Get all shared expenses from localStorage
 */
export const getSharedExpenses = (): SharedExpense[] => {
  try {
    const expenses = localStorage.getItem('sharedExpenses');
    return expenses ? JSON.parse(expenses) : [];
  } catch (error) {
    console.error('Error parsing shared expenses:', error);
    return [];
  }
};

/**
 * Save shared expenses to localStorage
 */
export const saveSharedExpenses = (expenses: SharedExpense[]): void => {
  try {
    localStorage.setItem('sharedExpenses', JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving shared expenses:', error);
  }
};

/**
 * Add a new expense to shared storage
 */
export const addSharedExpense = (expense: Omit<SharedExpense, 'id'>): SharedExpense => {
  const expenses = getSharedExpenses();
  const newExpense: SharedExpense = {
    ...expense,
    id: `exp-${expense.employeeName.replace(/\s+/g, '')}-${Date.now()}`
  };
  saveSharedExpenses([...expenses, newExpense]);
  return newExpense;
};

/**
 * Update an existing expense in shared storage
 */
export const updateSharedExpense = (id: string, updates: Partial<SharedExpense>): SharedExpense | null => {
  const expenses = getSharedExpenses();
  const index = expenses.findIndex(expense => expense.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedExpense = { ...expenses[index], ...updates };
  expenses[index] = updatedExpense;
  saveSharedExpenses(expenses);
  return updatedExpense;
};

/**
 * Get expenses for a specific employee
 */
export const getEmployeeExpenses = (employeeName: string): SharedExpense[] => {
  const expenses = getSharedExpenses();
  return expenses.filter(expense => expense.employeeName === employeeName);
};

/**
 * Convert shared expense format to manager portal format
 */
export const convertToManagerFormat = (expense: SharedExpense) => {
  return {
    id: expense.id,
    approvalSubject: expense.description || 'Expense Request',
    employeeName: expense.employeeName,
    amount: expense.originalAmount || expense.convertedAmount || 0,
    currency: expense.originalCurrency || expense.baseCurrency || 'USD',
    category: expense.category || 'Miscellaneous',
    description: expense.description || '',
    date: expense.expenseDate || new Date().toLocaleDateString(),
    approvalComments: '',
    status: expense.status === 'Draft' ? 'draft' :
            expense.status === 'Waiting Approval' ? 'pending' : 
            expense.status === 'Approved' ? 'approved' : 
            expense.status === 'Rejected' ? 'rejected' : 'pending'
  };
};

/**
 * Convert shared expense format to admin portal format
 */
export const convertToAdminFormat = (expense: SharedExpense) => {
  return {
    id: expense.id,
    employeeName: expense.employeeName,
    description: expense.description,
    category: expense.category || 'Misc',
    date: expense.expenseDate || new Date().toISOString().split('T')[0],
    amount: expense.originalAmount || expense.convertedAmount || 0,
    currency: expense.originalCurrency || expense.baseCurrency || 'USD',
    convertedAmount: expense.convertedAmount || expense.originalAmount || 0,
    companyCurrency: 'USD',
    status: expense.status || 'Pending',
    approvalPath: [`${expense.employeeName} (Employee)`]
  };
};