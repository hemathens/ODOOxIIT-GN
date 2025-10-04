// Test file for expense synchronization functionality

import { 
  getSharedExpenses, 
  saveSharedExpenses, 
  addSharedExpense, 
  updateSharedExpense,
  getEmployeeExpenses
} from './expenseSync';

// Test the expense synchronization functions
export const testExpenseSync = () => {
  console.log('Testing expense synchronization functions...');
  
  // Clear existing expenses
  localStorage.removeItem('sharedExpenses');
  
  // Test adding an expense
  const newExpense = addSharedExpense({
    employeeName: 'John Doe',
    description: 'Business lunch',
    expenseDate: '2025-10-05',
    category: 'Food',
    paidBy: 'Card',
    remarks: 'Team meeting',
    originalAmount: 75.50,
    originalCurrency: 'USD',
    convertedAmount: 75.50,
    baseCurrency: 'USD',
    status: 'Waiting Approval'
  });
  
  console.log('Added expense:', newExpense);
  
  // Test getting all expenses
  const allExpenses = getSharedExpenses();
  console.log('All expenses:', allExpenses);
  
  // Test getting employee expenses
  const employeeExpenses = getEmployeeExpenses('John Doe');
  console.log('John Doe expenses:', employeeExpenses);
  
  // Test updating an expense
  if (newExpense) {
    const updatedExpense = updateSharedExpense(newExpense.id, {
      status: 'Approved',
      approvalTrail: [{
        action: 'Approved',
        user: 'Manager',
        comment: 'Valid business expense',
        timestamp: new Date().toISOString()
      }]
    });
    
    console.log('Updated expense:', updatedExpense);
  }
  
  // Test getting all expenses again
  const updatedExpenses = getSharedExpenses();
  console.log('Updated expenses:', updatedExpenses);
  
  console.log('Expense synchronization test completed.');
};