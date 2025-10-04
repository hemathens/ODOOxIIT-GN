import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { CheckCircle, XCircle, Search, Info } from "lucide-react";
import { ApprovalModal } from "./ApprovalModal";
import { toast } from "sonner@2.0.3";

export interface Expense {
  id: string;
  approvalSubject: string;
  employeeName: string;
  amount: number;
  currency: string;
  category: string;
  description: string;
  date: string;
  approvalComments: string;
  status: "pending" | "approved" | "rejected";
}

interface TeamExpensesTableProps {
  expenses: Expense[];
  onUpdateExpense: (id: string, status: "approved" | "rejected", comment: string) => void;
}

const ITEMS_PER_PAGE = 10;

export function TeamExpensesTable({ expenses, onUpdateExpense }: TeamExpensesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    action: "approve" | "reject";
    expense: Expense | null;
  }>({
    isOpen: false,
    action: "approve",
    expense: null,
  });

  // Filter expenses based on search query
  const filteredExpenses = useMemo(() => {
    if (!searchQuery) return expenses;
    
    const query = searchQuery.toLowerCase();
    return expenses.filter(
      (expense) =>
        expense.approvalSubject.toLowerCase().includes(query) ||
        expense.employeeName.toLowerCase().includes(query) ||
        expense.category.toLowerCase().includes(query) ||
        expense.description.toLowerCase().includes(query) ||
        expense.status.toLowerCase().includes(query)
    );
  }, [expenses, searchQuery]);

  // Paginate filtered expenses
  const paginatedExpenses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredExpenses.slice(startIndex, endIndex);
  }, [filteredExpenses, currentPage]);

  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);

  const handleApprove = (expense: Expense) => {
    setModalState({
      isOpen: true,
      action: "approve",
      expense,
    });
  };

  const handleReject = (expense: Expense) => {
    setModalState({
      isOpen: true,
      action: "reject",
      expense,
    });
  };

  const handleModalConfirm = (comment: string) => {
    if (modalState.expense) {
      // Mock API call
      setTimeout(() => {
        onUpdateExpense(modalState.expense!.id, modalState.action === "approve" ? "approved" : "rejected", comment);
        toast.success(
          `Expense ${modalState.action === "approve" ? "approved" : "rejected"} successfully!`
        );
      }, 500);
    }
  };

  const getStatusBadge = (status: Expense["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-600 hover:bg-green-700 text-white">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-600 hover:bg-red-700 text-white">
            Rejected
          </Badge>
        );
    }
  };

  const pendingCount = expenses.filter((e) => e.status === "pending").length;

  return (
    <div className="space-y-4">
      {/* Search bar and count */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="pl-9"
          />
        </div>
        <div className="text-muted-foreground">
          Showing {filteredExpenses.length} of {expenses.length} records
          {pendingCount > 0 && (
            <span className="ml-2 text-yellow-600">
              • {pendingCount} pending
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Approval Subject</TableHead>
              <TableHead>Request Owner</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Request Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedExpenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No expenses found
                </TableCell>
              </TableRow>
            ) : (
              paginatedExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="max-w-xs">
                    <div className="flex items-center gap-2">
                      <div>
                        <div>{expense.approvalSubject}</div>
                        <div className="text-muted-foreground">{expense.id}</div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <div className="space-y-2">
                              <div>
                                <p className="text-muted-foreground">Description:</p>
                                <p>{expense.description}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Date:</p>
                                <p>{expense.date}</p>
                              </div>
                              {expense.approvalComments && (
                                <div>
                                  <p className="text-muted-foreground">Approval Comments:</p>
                                  <p>{expense.approvalComments}</p>
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell>{expense.employeeName}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>
                    {expense.currency} {expense.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  <TableCell className="text-right">
                    {expense.status === "pending" ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleApprove(expense)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(expense)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Approval Modal */}
      {modalState.expense && (
        <ApprovalModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ ...modalState, isOpen: false })}
          onConfirm={handleModalConfirm}
          action={modalState.action}
          employeeName={modalState.expense.employeeName}
          amount={`${modalState.expense.currency} ${modalState.expense.amount.toFixed(2)}`}
          approvalSubject={modalState.expense.approvalSubject}
        />
      )}
    </div>
  );
}