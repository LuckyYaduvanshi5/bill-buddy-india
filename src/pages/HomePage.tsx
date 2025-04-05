
import { AppLayout } from "@/components/layout/app-layout";
import {
  mockUsers,
  mockGroups,
  calculateBalances,
  getTotalBalanceForUser,
} from "@/lib/mock-data";
import { useState } from "react";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { ExpenseCard } from "@/components/expenses/expense-card";
import { mockExpenses } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BalanceCard } from "@/components/balances/balance-card";
import { UPISheet } from "@/components/upi/upi-sheet";
import { GroupCard } from "@/components/groups/group-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  const currentUser = mockUsers[0]; // Assume first user is current user
  const userBalances = calculateBalances()[currentUser.id] || [];
  const totalBalance = getTotalBalanceForUser(currentUser.id);
  const recentExpenses = [...mockExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 3);
  
  const [upiSheetOpen, setUpiSheetOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<{
    userId: string;
    amount: number;
  } | null>(null);
  
  const handleSettleUp = (userId: string, amount: number) => {
    setSelectedPayment({ userId, amount });
    setUpiSheetOpen(true);
  };
  
  return (
    <AppLayout>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Hi, {currentUser.name}!</h1>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          <SummaryCard
            title="Total Balance"
            amount={totalBalance}
            icon={totalBalance >= 0 ? "up" : "down"}
          />
          <SummaryCard
            title="You Owe"
            amount={-userBalances
              .filter(b => b.amount < 0)
              .reduce((sum, b) => sum + b.amount, 0)}
            icon="down"
          />
          <SummaryCard
            title="You're Owed"
            amount={userBalances
              .filter(b => b.amount > 0)
              .reduce((sum, b) => sum + b.amount, 0)}
            icon="up"
          />
        </div>
        
        {userBalances.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Balances</h2>
              <Button variant="link" asChild>
                <Link to="/balances">See All</Link>
              </Button>
            </div>
            <div>
              {userBalances.slice(0, 3).map((balance) => (
                <BalanceCard
                  key={balance.userId}
                  balance={balance}
                  onSettleUp={handleSettleUp}
                />
              ))}
            </div>
          </section>
        )}
        
        <section className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Recent Expenses</h2>
            <Button variant="link" asChild>
              <Link to="/activity">See All</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {recentExpenses.map(expense => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                currentUserId={currentUser.id}
              />
            ))}
          </div>
        </section>
        
        <section className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Your Groups</h2>
            <Button variant="link" asChild>
              <Link to="/groups">See All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {mockGroups.slice(0, 3).map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </section>
        
        <section className="mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Bill Buddy Pro</CardTitle>
              <CardDescription>
                Unlock premium features to manage expenses better
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm mb-3">
                <li className="flex items-center">
                  <span className="text-brand-green mr-2">✓</span>
                  Scan receipts automatically
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green mr-2">✓</span>
                  Detailed expense analytics
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green mr-2">✓</span>
                  Export reports in PDF/CSV
                </li>
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-95"
              >
                Try 14 Days Free
              </Button>
            </CardContent>
          </Card>
        </section>
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

export default HomePage;
