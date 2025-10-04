import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Receipt,
  LogOut,
  Menu,
  User,
} from "lucide-react";
import { getSharedExpenses, convertToManagerFormat, saveSharedExpenses } from "./utils/expenseSync";
import { Button } from "./ui/button";
import { TeamExpensesTable } from "./TeamExpensesTable";
import { ManagerProfile } from "./ManagerProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { toast } from "sonner";

interface ManagerDashboardProps {
  managerName: string;
  onLogout: () => void;
}

// Mock data
const generateMockExpenses = () => {
  const employees = [
    "John Smith",
    "Sarah Johnson",
    "Michael Brown",
    "Emily Davis",
    "David Wilson",
    "Jessica Martinez",
    "Robert Garcia",
    "Jennifer Anderson",
    "William Taylor",
    "Ashley Thomas",
    "James Moore",
    "Amanda Jackson",
  ];

  const categories = [
    "Travel",
    "Office Supplies",
    "Meals & Entertainment",
    "Software",
    "Training",
    "Transportation",
  ];

  const descriptions = [
    "Client meeting lunch",
    "Conference registration fee",
    "Office equipment purchase",
    "Team building dinner",
    "Business trip expenses",
    "Software subscription renewal",
    "Training course materials",
    "Taxi to client office",
    "Hotel accommodation",
    "Office supplies restocking",
  ];

  const approvalSubjects = [
    "Expense Reimbursement Request",
    "Travel Expense Claim",
    "Office Supply Purchase",
    "Client Entertainment Expense",
    "Training Program Fee",
    "Conference Attendance Cost",
    "Software License Purchase",
    "Transportation Expense",
    "Team Building Activity",
    "Business Meal Expense",
  ];

  const statuses: ("pending" | "approved" | "rejected")[] = ["pending", "approved", "rejected"];

  return Array.from({ length: 25 }, (_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const subject = approvalSubjects[Math.floor(Math.random() * approvalSubjects.length)];
    
    return {
      id: `EXP-${1000 + i}`,
      approvalSubject: subject,
      employeeName: employees[Math.floor(Math.random() * employees.length)],
      amount: Math.floor(Math.random() * 2000) + 50,
      currency: "USD",
      category: category,
      description: description,
      date: new Date(2025, 9, Math.floor(Math.random() * 30) + 1).toLocaleDateString(),
      approvalComments: i % 3 === 0 ? "Approved as per company policy" : "",
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });
};

export function ManagerDashboard({ managerName, onLogout }: ManagerDashboardProps) {
  const [activeView, setActiveView] = useState<"dashboard" | "expenses" | "profile">("dashboard");
  const [expenses, setExpenses] = useState(() => {
    // Get all expenses from shared storage
    const allExpenses = getSharedExpenses();
    // Show all expenses including drafts for manager review
    return allExpenses
      .map(convertToManagerFormat);
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleUpdateExpense = (id: string, status: "approved" | "rejected", comment: string) => {
    setExpenses((prev: any) =>
      prev.map((expense: any) =>
        expense.id === id
          ? { ...expense, status, approvalComments: comment || expense.approvalComments }
          : expense
      )
    );
    
    // Update the shared expense storage
    const allExpenses = getSharedExpenses();
    const updatedExpenses = allExpenses.map((expense: any) => {
      if (expense.id === id) {
        // Map status back to employee format
        const employeeStatus = status === "approved" ? "Approved" : "Rejected";
        return { ...expense, status: employeeStatus };
      }
      return expense;
    });
    saveSharedExpenses(updatedExpenses);
    
    toast.success(
      `Expense ${status === "approved" ? "approved" : "rejected"} successfully!`
    );
  };

  // Add import for saveSharedExpenses
  // (This should be at the top with other imports, but we're adding it here for clarity)
  // import { getSharedExpenses, convertToManagerFormat, saveSharedExpenses } from "./utils/expenseSync";

  // Refresh expenses from shared storage periodically
  useEffect(() => {
    const refreshExpenses = () => {
      const allExpenses = getSharedExpenses();
      const updatedExpenses = allExpenses
        .map(convertToManagerFormat);
      setExpenses(updatedExpenses);
    };

    // Refresh on mount
    refreshExpenses();

    // Set up interval to refresh periodically
    const interval = setInterval(refreshExpenses, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const pendingCount = expenses.filter((e: any) => e.status === "pending").length;
  const approvedCount = expenses.filter((e: any) => e.status === "approved").length;
  const rejectedCount = expenses.filter((e: any) => e.status === "rejected").length;
  const totalAmount = expenses
    .filter((e: any) => e.status === "approved")
    .reduce((sum: number, e: any) => sum + e.amount, 0);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h2>Expense Manager</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant={activeView === "dashboard" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveView("dashboard");
            setIsMobileMenuOpen(false);
          }}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button
          variant={activeView === "expenses" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveView("expenses");
            setIsMobileMenuOpen(false);
          }}
        >
          <Receipt className="mr-2 h-4 w-4" />
          Team Expenses
        </Button>
        <Button
          variant={activeView === "profile" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveView("profile");
            setIsMobileMenuOpen(false);
          }}
        >
          <User className="mr-2 h-4 w-4" />
          My Profile
        </Button>
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r bg-card flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="border-b bg-card p-4 flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>
          <div className="flex-1">
            <h3>Welcome back, {managerName}!</h3>
            <p className="text-muted-foreground">
              {activeView === "dashboard" && "Overview of team expenses"}
              {activeView === "expenses" && "Manage team expense requests"}
              {activeView === "profile" && "Manage your profile information"}
            </p>
          </div>
          <div className="flex items-center gap-2">
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
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {activeView === "dashboard" ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Pending Requests</CardDescription>
                    <CardTitle>{pendingCount}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Awaiting approval</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Approved</CardDescription>
                    <CardTitle>{approvedCount}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Rejected</CardDescription>
                    <CardTitle>{rejectedCount}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Approved</CardDescription>
                    <CardTitle>USD {totalAmount.toFixed(2)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest expense submissions from your team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setActiveView("expenses")}>
                    View All Expenses
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : activeView === "expenses" ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h2>Manager's View</h2>
                  <p className="text-muted-foreground">
                    Review and approve expense requests from your team members
                  </p>
                </div>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle>Approvals to review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TeamExpensesTable
                      expenses={expenses}
                      onUpdateExpense={handleUpdateExpense}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <ManagerProfile managerName={managerName} onLogout={onLogout} />
          )}
        </main>
      </div>
    </div>
  );
}