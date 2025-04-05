
import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/header/page-header";
import { mockUsers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Settings, 
  History, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  UserCircle,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ProfilePage = () => {
  const currentUser = mockUsers[0]; // Assume first user is current user
  
  const menuItems = [
    {
      icon: UserCircle,
      label: "Account Details",
      onClick: () => toast.info("Account settings coming soon"),
    },
    {
      icon: Settings,
      label: "Preferences",
      onClick: () => toast.info("Preferences coming soon"),
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      onClick: () => toast.info("Payment methods coming soon"),
    },
    {
      icon: History,
      label: "Transaction History",
      onClick: () => toast.info("Transaction history coming soon"),
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      onClick: () => toast.info("Help & support coming soon"),
    },
  ];
  
  return (
    <AppLayout>
      <PageHeader title="Profile" />
      
      <div className="p-4">
        <div className="mb-6 flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-3">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback className="text-2xl">{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">{currentUser.name}</h2>
          <p className="text-muted-foreground">{currentUser.phone}</p>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Bill Buddy Free</p>
                <p className="text-xs text-muted-foreground">Upgrade for more features</p>
              </div>
              <Button 
                className="bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-95"
                size="sm"
                onClick={() => toast.info("Subscription plans coming soon")}
              >
                <Star className="h-4 w-4 mr-2" />
                Upgrade
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-2 mb-6">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start text-base font-normal h-12"
              onClick={item.onClick}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
              <ChevronRight className="h-5 w-5 ml-auto" />
            </Button>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => toast.info("Logout functionality coming soon")}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
