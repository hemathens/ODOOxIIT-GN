import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (comment: string) => void;
  action: "approve" | "reject";
  employeeName: string;
  amount: string;
  approvalSubject?: string;
}

export function ApprovalModal({
  isOpen,
  onClose,
  onConfirm,
  action,
  employeeName,
  amount,
  approvalSubject,
}: ApprovalModalProps) {
  const [comment, setComment] = useState("");

  const handleConfirm = () => {
    onConfirm(comment);
    setComment("");
    onClose();
  };

  const handleClose = () => {
    setComment("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {action === "approve" ? "Approve" : "Reject"} Expense
          </DialogTitle>
          <DialogDescription>
            {approvalSubject && (
              <div className="mb-2">
                <span className="font-medium">{approvalSubject}</span>
              </div>
            )}
            {action === "approve" ? "Approving" : "Rejecting"} expense for{" "}
            <span className="font-medium">{employeeName}</span> - {amount}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="comment">Comments (Optional)</Label>
            <Textarea
              id="comment"
              placeholder="Add any comments about this decision..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant={action === "approve" ? "default" : "destructive"}
          >
            Confirm {action === "approve" ? "Approval" : "Rejection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}