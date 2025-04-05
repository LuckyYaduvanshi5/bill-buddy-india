
import { AppLayout } from "@/components/layout/app-layout";
import {
  mockUsers,
  mockGroups,
  calculateBalances,
  getTotalBalanceForUser,
} from "@/lib/mock-data";
import { useState } from "react";
import { ExpenseCard } from "@/components/expenses/expense-card";
import { mockExpenses } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BalanceCard } from "@/components/balances/balance-card";
import { UPISheet } from "@/components/upi/upi-sheet";
import { GroupCard } from "@/components/groups/group-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, UserPlus, Receipt, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
          <div>
            <h1 className="text-2xl font-bold">Hi, {currentUser.name}!</h1>
            {totalBalance !== 0 && (
              <p className={`text-lg mt-1 ${totalBalance >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
                You {totalBalance >= 0 ? 'are owed' : 'owe'} ₹{Math.abs(totalBalance)}
              </p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-brand-blue to-brand-purple text-white">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <UserPlus size={28} className="mb-2" />
              <p className="text-center font-medium">Add your group members</p>
              <p className="text-xs text-center opacity-80 mt-1">
                Invite friends to join your groups
              </p>
              <Button 
                variant="ghost" 
                className="mt-2 text-white hover:bg-white/20" 
                size="sm"
                asChild
              >
                <Link to="/create-group">Create Group <ArrowRight size={16} className="ml-1" /></Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Receipt size={28} className="mb-2 text-brand-blue" />
              <p className="text-center font-medium">Enter expenses</p>
              <p className="text-xs text-center text-muted-foreground mt-1">
                Track and split bills easily
              </p>
              <Button 
                variant="ghost" 
                className="mt-2 text-brand-blue hover:bg-brand-blue/10" 
                size="sm"
                asChild
              >
                <Link to="/add">Add Expense <ArrowRight size={16} className="ml-1" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {userBalances.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Balances</h2>
              <Button variant="ghost" size="sm" asChild className="text-brand-blue">
                <Link to="/balances">See All</Link>
              </Button>
            </div>
            <Card>
              <CardContent className="p-4 pt-4">
                {userBalances.slice(0, 3).map((balance) => (
                  <div key={balance.userId} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9 mr-2">
                        <AvatarImage src={mockUsers.find(u => u.id === balance.userId)?.avatar} />
                        <AvatarFallback>
                          {mockUsers.find(u => u.id === balance.userId)?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{mockUsers.find(u => u.id === balance.userId)?.name}</p>
                        <p className={`text-sm ${balance.amount > 0 ? "text-brand-green" : "text-brand-red"}`}>
                          {balance.amount > 0 ? "owes you" : "you owe"} ₹{Math.abs(balance.amount)}
                        </p>
                      </div>
                    </div>
                    {balance.amount < 0 && (
                      <Button 
                        size="sm" 
                        onClick={() => handleSettleUp(balance.userId, -balance.amount)}
                        className="bg-brand-purple hover:bg-brand-purple/90"
                      >
                        Settle Up
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        )}
        
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recent Expenses</h2>
            <Button variant="ghost" size="sm" asChild className="text-brand-blue">
              <Link to="/activity">See All</Link>
            </Button>
          </div>
          <Card>
            <CardContent className="p-4 pt-4">
              {recentExpenses.map(expense => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  currentUserId={currentUser.id}
                />
              ))}
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Your Groups</h2>
            <Button variant="ghost" size="sm" asChild className="text-brand-blue">
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
          <Card className="bg-gradient-to-r from-brand-purple to-brand-blue text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Bill Buddy Pro</CardTitle>
              <CardDescription className="text-white/80">
                Unlock premium features to manage expenses better
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm mb-3">
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  Scan receipts automatically
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  Detailed expense analytics
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">✓</span>
                  Export reports in PDF/CSV
                </li>
              </ul>
              <Button 
                className="w-full bg-white text-brand-purple hover:bg-white/90"
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
