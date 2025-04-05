
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: "up" | "down" | "neutral";
  description?: string;
}

export function SummaryCard({ title, amount, icon, description }: SummaryCardProps) {
  const isPositive = amount >= 0;
  
  return (
    <Card className="flex-1 min-w-[150px]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon === "up" ? (
            <ArrowUpIcon className="h-4 w-4 text-brand-green" />
          ) : icon === "down" ? (
            <ArrowDownIcon className="h-4 w-4 text-brand-red" />
          ) : null}
        </div>
        <p 
          className={cn(
            "text-xl font-bold",
            isPositive ? "text-brand-green" : "text-brand-red"
          )}
        >
          {isPositive ? "₹" : "-₹"}{Math.abs(amount).toFixed(0)}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
