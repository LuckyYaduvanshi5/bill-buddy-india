
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/header/page-header";
import { getGroupById, mockUsers, getExpensesByGroupId } from "@/lib/mock-data";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseCard } from "@/components/expenses/expense-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

const GroupDetailPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("expenses");
  
  const group = groupId ? getGroupById(groupId) : undefined;
  const expenses = groupId ? getExpensesByGroupId(groupId) : [];
  const currentUser = mockUsers[0]; // Assume first user is current user
  
  if (!group) {
    return (
      <AppLayout>
        <div className="p-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Group not found</h2>
          <Button onClick={() => navigate("/groups")}>Back to Groups</Button>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      <PageHeader 
        title={group.name} 
        backLink="/groups" 
        actions={[
          { label: "Settings", onClick: () => toast.info("Group settings coming soon") },
          { label: "Leave Group", onClick: () => toast.info("Leave group coming soon") },
        ]}
      />
      
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center text-3xl mr-4">
            {group.emoji || "👥"}
          </div>
          <div>
            <h1 className="text-xl font-semibold">{group.name}</h1>
            <p className="text-sm text-muted-foreground">
              {group.members.length} members
            </p>
          </div>
        </div>
        
        <div className="mb-4 flex -space-x-2 overflow-hidden">
          {group.members.map(member => (
            <Avatar key={member.id} className="border-2 border-background">
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="balances">Balances</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses" className="mt-4">
            <div className="mb-4">
              <Button 
                className="w-full bg-brand-blue hover:bg-brand-blue/90"
                onClick={() => navigate(`/add?groupId=${group.id}`)}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add an Expense
              </Button>
            </div>
            
            {expenses.length > 0 ? (
              <div>
                {expenses.map(expense => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    currentUserId={currentUser.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="font-semibold mb-2">No expenses yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding your first group expense
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="balances" className="mt-4">
            <div className="text-center py-8">
              <h3 className="font-semibold mb-2">
                Group balances coming soon!
              </h3>
              <p className="text-muted-foreground">
                We're working on making this feature available soon.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default GroupDetailPage;
