
import { Expense } from "@/types";
import { getUserById } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Receipt } from "lucide-react";

interface ExpenseCardProps {
  expense: Expense;
  currentUserId: string;
}

export function ExpenseCard({ expense, currentUserId }: ExpenseCardProps) {
  const payer = getUserById(expense.paidBy);
  const isCurrentUserPayer = expense.paidBy === currentUserId;
  const dateFormatted = formatDistanceToNow(new Date(expense.date), { addSuffix: true });
  
  // Find how much the current user owes or is owed
  const currentUserParticipation = expense.participants.find(
    p => p.userId === currentUserId
  );
  const currentUserAmount = currentUserParticipation?.amount || 0;
  
  // Calculate the balance for the current user
  let balanceAmount = 0;
  let balanceText = "";
  let balanceClass = "balance-neutral";
  
  if (isCurrentUserPayer) {
    // User paid, so they are owed money by others (except their own share)
    balanceAmount = expense.amount - currentUserAmount;
    if (balanceAmount > 0) {
      balanceText = `You get back ₹${balanceAmount.toFixed(0)}`;
      balanceClass = "balance-positive";
    }
  } else {
    // User didn't pay, so they owe money
    balanceAmount = currentUserAmount;
    balanceText = `You owe ₹${balanceAmount.toFixed(0)}`;
    balanceClass = "balance-negative";
  }

  return (
    <div className="bill-card mb-3">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={payer?.avatarUrl} alt={payer?.name} />
            <AvatarFallback>{payer?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="card-heading">{expense.title}</h3>
            <p className="card-subheading">
              {isCurrentUserPayer ? "You paid" : `${payer?.name} paid`}
              <span className="mx-1">•</span>
              {dateFormatted}
            </p>
          </div>
        </div>
        {expense.receipt && (
          <Receipt size={18} className="text-muted-foreground" />
        )}
      </div>
      
      <div className="flex justify-between mt-3 items-end">
        <div>
          {expense.category && (
            <Badge variant="outline" className="text-xs">
              {expense.category}
            </Badge>
          )}
        </div>
        <div className="flex flex-col items-end">
          <div className="card-heading">₹{expense.amount.toFixed(0)}</div>
          <div className={balanceClass}>{balanceText}</div>
        </div>
      </div>
    </div>
  );
}
