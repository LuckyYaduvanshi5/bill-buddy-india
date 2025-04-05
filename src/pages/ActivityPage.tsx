
import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/header/page-header";
import { mockExpenses } from "@/lib/mock-data";
import { ExpenseCard } from "@/components/expenses/expense-card";
import { mockUsers } from "@/lib/mock-data";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ActivityPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const currentUser = mockUsers[0]; // Assume first user is current user
  
  // Sort expenses by date, newest first
  const sortedExpenses = [...mockExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get user's expenses (either paid by them or they're a participant)
  const userExpenses = sortedExpenses.filter(
    expense => 
      expense.paidBy === currentUser.id || 
      expense.participants.some(p => p.userId === currentUser.id)
  );
  
  // Get expenses where the user paid
  const paidByUserExpenses = sortedExpenses.filter(
    expense => expense.paidBy === currentUser.id
  );
  
  // Get expenses others paid but user participated in
  const paidToUserExpenses = sortedExpenses.filter(
    expense => 
      expense.paidBy !== currentUser.id && 
      expense.participants.some(p => p.userId === currentUser.id)
  );
  
  const getExpensesToShow = () => {
    switch (activeTab) {
      case "all":
        return userExpenses;
      case "paid":
        return paidByUserExpenses;
      case "owed":
        return paidToUserExpenses;
      default:
        return userExpenses;
    }
  };
  
  return (
    <AppLayout>
      <PageHeader title="Activity" />
      
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="paid">You Paid</TabsTrigger>
            <TabsTrigger value="owed">You Owe</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="space-y-3">
          {getExpensesToShow().length > 0 ? (
            getExpensesToShow().map(expense => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                currentUserId={currentUser.id}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <h3 className="font-semibold mb-2">No expenses found</h3>
              <p className="text-muted-foreground">
                {activeTab === "all"
                  ? "You don't have any expenses yet"
                  : activeTab === "paid"
                  ? "You haven't paid for any expenses yet"
                  : "No one has added expenses where you owe money"}
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ActivityPage;
