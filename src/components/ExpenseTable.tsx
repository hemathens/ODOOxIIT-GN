import React, { useState } from 'react';
import { Expense } from './EmployeeDashboard';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Eye, FileText, Calendar, User, MessageSquare } from 'lucide-react';
// Using native Date formatting instead of date-fns

interface ExpenseTableProps {
  expenses: Expense[];
}

const getStatusColor = (status: Expense['status']) => {
  switch (status) {
    case 'Draft':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    case 'Waiting Approval':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'Approved':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'Rejected':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const getCategoryColor = (category: Expense['category']) => {
  switch (category) {
    case 'Food':
      return 'bg-blue-100 text-blue-800';
    case 'Travel':
      return 'bg-purple-100 text-purple-800';
    case 'Equipment':
      return 'bg-orange-100 text-orange-800';
    case 'Transportation':
      return 'bg-indigo-100 text-indigo-800';
    case 'Miscellaneous':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ExpenseDetails: React.FC<{ expense: Expense }> = ({ expense }) => {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Expense Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Description</label>
              <p>{expense.description}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Date</label>
              <p>{new Date(expense.expenseDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Category</label>
              <Badge className={getCategoryColor(expense.category)}>{expense.category}</Badge>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Payment Method</label>
              <p>{expense.paidBy}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Original Amount</label>
              <p>{expense.originalAmount.toFixed(2)} {expense.originalCurrency}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Converted Amount</label>
              <p>{expense.convertedAmount.toFixed(2)} {expense.baseCurrency}</p>
            </div>
          </div>
          {expense.remarks && (
            <div>
              <label className="text-sm text-muted-foreground">Remarks</label>
              <p>{expense.remarks}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approval Trail */}
      {expense.approvalTrail && expense.approvalTrail.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Approval Trail
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expense.approvalTrail.map((trail, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{trail.user}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{trail.action}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{trail.comment}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(trail.timestamp).toLocaleString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric', 
                        hour: 'numeric', 
                        minute: '2-digit', 
                        hour12: true 
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Receipt */}
      {expense.receipt && (
        <Card>
          <CardHeader>
            <CardTitle>Receipt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 p-4 border rounded-lg">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {typeof expense.receipt === 'string' ? expense.receipt : expense.receipt.name}
                </p>
                <p className="text-sm text-muted-foreground">Receipt file</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses }) => {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No expenses found
                  </TableCell>
                </TableRow>
              ) : (
                expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">
                      <div className="max-w-[200px] truncate" title={expense.description}>
                        {expense.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(expense.expenseDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(expense.category)}>
                        {expense.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{expense.paidBy}</TableCell>
                    <TableCell>
                      <div>
                        <div>{expense.originalAmount.toFixed(2)} {expense.originalCurrency}</div>
                        {expense.originalCurrency !== expense.baseCurrency && (
                          <div className="text-xs text-muted-foreground">
                            {expense.convertedAmount.toFixed(2)} {expense.baseCurrency}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(expense.status)}>
                        {expense.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Expense Details</DialogTitle>
                            <DialogDescription>
                              Detailed information about the expense
                            </DialogDescription>
                          </DialogHeader>
                          {selectedExpense && <ExpenseDetails expense={selectedExpense} />}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};