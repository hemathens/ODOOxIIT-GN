import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Calendar,
  TrendingUp,
  Info
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "./ui/utils";
import { toast } from "sonner";

type ExpenseStatus = "Pending" | "Approved" | "Rejected";
type ExpenseCategory = "Travel" | "Food" | "Accommodation" | "Misc" | "Supplies";

type Expense = {
  id: string;
  employeeName: string;
  description: string;
  category: ExpenseCategory;
  date: string;
  amount: number;
  currency: string;
  convertedAmount: number;
  companyCurrency: string;
  status: ExpenseStatus;
  approvalPath: string[];
};

const mockExpenses: Expense[] = [
  {
    id: "1",
    employeeName: "Emily Davis",
    description: "Flight tickets to NYC for client meeting",
    category: "Travel",
    date: "2025-10-01",
    amount: 1250.00,
    currency: "USD",
    convertedAmount: 1250.00,
    companyCurrency: "USD",
    status: "Pending",
    approvalPath: ["John Smith (Manager)", "Sarah Johnson (Finance)", "David Wilson (Director)"],
  },
  {
    id: "2",
    employeeName: "Michael Brown",
    description: "Team lunch with vendors",
    category: "Food",
    date: "2025-10-02",
    amount: 234.50,
    currency: "USD",
    convertedAmount: 234.50,
    companyCurrency: "USD",
    status: "Pending",
    approvalPath: ["John Smith (Manager)", "Sarah Johnson (Finance)"],
  },
  {
    id: "3",
    employeeName: "John Smith",
    description: "Office supplies and stationery",
    category: "Supplies",
    date: "2025-09-28",
    amount: 89.99,
    currency: "USD",
    convertedAmount: 89.99,
    companyCurrency: "USD",
    status: "Approved",
    approvalPath: ["Sarah Johnson (Finance)"],
  },
  {
    id: "4",
    employeeName: "Emily Davis",
    description: "Hotel stay - Conference in Boston",
    category: "Accommodation",
    date: "2025-09-25",
    amount: 450.00,
    currency: "USD",
    convertedAmount: 450.00,
    companyCurrency: "USD",
    status: "Approved",
    approvalPath: ["John Smith (Manager)", "Sarah Johnson (Finance)"],
  },
  {
    id: "5",
    employeeName: "Michael Brown",
    description: "Uber rides for client visits",
    category: "Travel",
    date: "2025-09-30",
    amount: 67.80,
    currency: "USD",
    convertedAmount: 67.80,
    companyCurrency: "USD",
    status: "Rejected",
    approvalPath: ["John Smith (Manager)"],
  },
  {
    id: "6",
    employeeName: "David Wilson",
    description: "Business dinner with potential clients",
    category: "Food",
    date: "2025-10-03",
    amount: 3200.00,
    currency: "USD",
    convertedAmount: 3200.00,
    companyCurrency: "USD",
    status: "Pending",
    approvalPath: ["Sarah Johnson (Finance)", "CEO (Executive)"],
  },
  {
    id: "7",
    employeeName: "Emily Davis",
    description: "Conference registration fee",
    category: "Misc",
    date: "2025-09-20",
    amount: 599.00,
    currency: "USD",
    convertedAmount: 599.00,
    companyCurrency: "USD",
    status: "Approved",
    approvalPath: ["John Smith (Manager)", "Sarah Johnson (Finance)"],
  },
  {
    id: "8",
    employeeName: "Michael Brown",
    description: "Laptop accessories and peripherals",
    category: "Supplies",
    date: "2025-10-04",
    amount: 156.75,
    currency: "USD",
    convertedAmount: 156.75,
    companyCurrency: "USD",
    status: "Pending",
    approvalPath: ["John Smith (Manager)", "IT Department"],
  },
];

export function ExpensesOverview() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : mockExpenses;
  });
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const savedSearch = localStorage.getItem('expenseSearchQuery');
    return savedSearch || "";
  });
  const [statusFilter, setStatusFilter] = useState<string>(() => {
    const savedStatus = localStorage.getItem('expenseStatusFilter');
    return savedStatus || "all";
  });
  const [categoryFilter, setCategoryFilter] = useState<string>(() => {
    const savedCategory = localStorage.getItem('expenseCategoryFilter');
    return savedCategory || "all";
  });

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Save filter states to localStorage
  useEffect(() => {
    localStorage.setItem('expenseSearchQuery', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('expenseStatusFilter', statusFilter);
  }, [statusFilter]);

  useEffect(() => {
    localStorage.setItem('expenseCategoryFilter', categoryFilter);
  }, [categoryFilter]);

  // Calculate summary statistics
  const stats = {
    totalThisMonth: expenses
      .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
      .reduce((sum, e) => sum + e.convertedAmount, 0),
    pending: expenses.filter(e => e.status === "Pending").length,
    approved: expenses.filter(e => e.status === "Approved").length,
    rejected: expenses.filter(e => e.status === "Rejected").length,
  };

  // Filter expenses
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = 
      expense.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || expense.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleApprove = (expenseId: string) => {
    const expense = expenses.find(e => e.id === expenseId);
    if (expense) {
      setExpenses(expenses.map(exp => 
        exp.id === expenseId ? { ...exp, status: "Approved" as ExpenseStatus } : exp
      ));
      
      // Show notification
      toast.success("Expense Approved", {
        description: `${expense.employeeName}'s expense has been approved`,
        duration: 3000
      });
      
      // Add notification to localStorage for the notification system
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const newNotification = {
        id: Date.now().toString(),
        title: "Expense Approved",
        description: `${expense.employeeName}'s $${expense.amount} expense has been approved`,
        timestamp: "Just now",
        read: false
      };
      localStorage.setItem('notifications', JSON.stringify([...notifications, newNotification]));
    }
  };

  const handleReject = (expenseId: string) => {
    const expense = expenses.find(e => e.id === expenseId);
    if (expense) {
      setExpenses(expenses.map(exp => 
        exp.id === expenseId ? { ...exp, status: "Rejected" as ExpenseStatus } : exp
      ));
      
      // Show notification
      toast.error("Expense Rejected", {
        description: `${expense.employeeName}'s expense has been rejected`,
        duration: 3000
      });
      
      // Add notification to localStorage for the notification system
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const newNotification = {
        id: Date.now().toString(),
        title: "Expense Rejected",
        description: `${expense.employeeName}'s $${expense.amount} expense has been rejected`,
        timestamp: "Just now",
        read: false
      };
      localStorage.setItem('notifications', JSON.stringify([...notifications, newNotification]));
    }
  };

  const getStatusBadge = (status: ExpenseStatus) => {
    switch (status) {
      case "Pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">⏳ Pending</Badge>;
      case "Approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">✅ Approved</Badge>;
      case "Rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">❌ Rejected</Badge>;
    }
  };

  const isHighValue = (amount: number) => amount >= 1000;

  return (
    <div className="space-y-6">
      <div>
        <h2>Expenses Overview</h2>
        <p className="text-muted-foreground mt-1">
          Review and manage expense submissions from your team
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow border-2 border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total Expenses This Month
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">💰 ${stats.totalThisMonth.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow border-2 border-yellow-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Pending Approvals
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-yellow-50 flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">⏳ {stats.pending}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Awaiting your review
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow border-2 border-green-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Approved Expenses
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">✅ {stats.approved}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Successfully processed
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow border-2 border-red-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Rejected Expenses
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">❌ {stats.rejected}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Declined submissions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by employee or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Accommodation">Accommodation</SelectItem>
                <SelectItem value="Supplies">Supplies</SelectItem>
                <SelectItem value="Misc">Miscellaneous</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card className="shadow-md">
        <TooltipProvider>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>👤 Employee Name</TableHead>
                <TableHead>📝 Description</TableHead>
                <TableHead>🏷️ Category</TableHead>
                <TableHead>📅 Date</TableHead>
                <TableHead>💲 Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense, index) => (
                <TableRow
                  key={expense.id}
                  className={cn(
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                    isHighValue(expense.convertedAmount) && expense.status === "Pending" && "bg-yellow-50/70 hover:bg-yellow-100/70"
                  )}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white text-sm">
                        {expense.employeeName.charAt(0)}
                      </div>
                      <span>{expense.employeeName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          <p className="truncate">{expense.description}</p>
                          {isHighValue(expense.convertedAmount) && (
                            <Info className="h-4 w-4 text-orange-500 shrink-0" />
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <div className="space-y-2">
                          <p>{expense.description}</p>
                          {isHighValue(expense.convertedAmount) && (
                            <p className="text-orange-500">⚠️ High-value expense requiring attention</p>
                          )}
                          <div className="mt-2 pt-2 border-t">
                            <p className="text-xs">Approval Path:</p>
                            {expense.approvalPath.map((approver, idx) => (
                              <p key={idx} className="text-xs flex items-center gap-1 mt-1">
                                <span className="text-blue-500">→</span> {approver}
                              </p>
                            ))}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                      <span>{expense.category}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className={cn(
                        isHighValue(expense.convertedAmount) && "text-orange-600"
                      )}>
                        {expense.currency} ${expense.amount.toLocaleString()}
                      </p>
                      {expense.currency !== expense.companyCurrency && (
                        <p className="text-sm text-muted-foreground">
                          ≈ {expense.companyCurrency} ${expense.convertedAmount.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  <TableCell className="text-right">
                    {expense.status === "Pending" ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 bg-green-50 hover:bg-green-100 text-green-700 border-green-300"
                          onClick={() => handleApprove(expense.id)}
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 bg-red-50 hover:bg-red-100 text-red-700 border-red-300"
                          onClick={() => handleReject(expense.id)}
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">No action</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </Card>

      {filteredExpenses.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Filter className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No expenses found matching your filters</p>
        </div>
      )}
    </div>
  );
}