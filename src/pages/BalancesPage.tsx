
import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/header/page-header";
import { calculateBalances, mockUsers } from "@/lib/mock-data";
import { BalanceCard } from "@/components/balances/balance-card";
import { UPISheet } from "@/components/upi/upi-sheet";
import { useState } from "react";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { getTotalBalanceForUser } from "@/lib/mock-data";

const BalancesPage = () => {
  const currentUser = mockUsers[0]; // Assume first user is current user
  const userBalances = calculateBalances()[currentUser.id] || [];
  const totalBalance = getTotalBalanceForUser(currentUser.id);
  
  const [upiSheetOpen, setUpiSheetOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<{
    userId: string;
    amount: number;
  } | null>(null);
  
  const handleSettleUp = (userId: string, amount: number) => {
    setSelectedPayment({ userId, amount });
    setUpiSheetOpen(true);
  };
  
  const youOweTotal = -userBalances
    .filter(b => b.amount < 0)
    .reduce((sum, b) => sum + b.amount, 0);
    
  const youAreOwedTotal = userBalances
    .filter(b => b.amount > 0)
    .reduce((sum, b) => sum + b.amount, 0);
  
  return (
    <AppLayout>
      <PageHeader title="Balances" backLink="/" />
      
      <div className="p-4">
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          <SummaryCard
            title="Total Balance"
            amount={totalBalance}
            icon={totalBalance >= 0 ? "up" : "down"}
          />
          <SummaryCard
            title="You Owe"
            amount={-youOweTotal}
            icon="down"
          />
          <SummaryCard
            title="You're Owed"
            amount={youAreOwedTotal}
            icon="up"
          />
        </div>
        
        {userBalances.length > 0 ? (
          <div>
            <h2 className="font-semibold mb-3">All Balances</h2>
            {userBalances.map((balance) => (
              <BalanceCard
                key={balance.userId}
                balance={balance}
                onSettleUp={handleSettleUp}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="font-semibold mb-2">No balances yet</h3>
            <p className="text-muted-foreground">
              You don't have any active balances with friends
            </p>
          </div>
        )}
      </div>
      
      {selectedPayment && (
        <UPISheet
          isOpen={upiSheetOpen}
          onClose={() => setUpiSheetOpen(false)}
          userId={selectedPayment.userId}
          amount={selectedPayment.amount}
        />
      )}
    </AppLayout>
  );
};

export default BalancesPage;
