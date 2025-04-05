
import React from "react";
import { Balance } from "@/types";
import { getUserById } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";

interface BalanceCardProps {
  balance: Balance;
  onSettleUp: (userId: string, amount: number) => void;
}

export function BalanceCard({ balance, onSettleUp }: BalanceCardProps) {
  const otherUser = getUserById(balance.userId);
  const isPositive = balance.amount > 0; // Positive means they owe you

  if (!otherUser) return null;

  return (
    <div className="bill-card mb-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} />
            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="card-heading">{otherUser.name}</h3>
            <p className={isPositive ? "balance-positive" : "balance-negative"}>
              {isPositive
                ? `owes you ₹${Math.abs(balance.amount).toFixed(0)}`
                : `you owe ₹${Math.abs(balance.amount).toFixed(0)}`}
            </p>
          </div>
        </div>
        {!isPositive && (
          <Button
            variant="outline"
            size="sm"
            className="text-brand-blue border-brand-blue hover:bg-brand-blue/10"
            onClick={() => onSettleUp(balance.userId, Math.abs(balance.amount))}
          >
            <IndianRupee size={16} className="mr-1" />
            Pay
          </Button>
        )}
      </div>
    </div>
  );
}
