
import { useState } from "react";
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
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const currentUser = mockUsers[0]; // Assume first user is current user
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  
  const accountForm = useForm({
    defaultValues: {
      name: currentUser.name,
      phone: currentUser.phone,
    }
  });

  const preferencesForm = useForm({
    defaultValues: {
      currency: "INR",
      language: "English",
      notifications: true,
    }
  });

  const paymentForm = useForm({
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    }
  });

  const handleSheetOpen = (sheetId: string) => {
    setActiveSheet(sheetId);
  };

  const handleSheetClose = () => {
    setActiveSheet(null);
  };

  const handleSignOut = () => {
    toast.success("You have been signed out");
    // In a real app, you would implement actual sign out logic
  };

  const handleAccountSave = (data: any) => {
    toast.success("Account details updated");
    handleSheetClose();
    // In a real app, you would update the user data
  };

  const handlePreferencesSave = (data: any) => {
    toast.success("Preferences updated");
    handleSheetClose();
    // In a real app, you would update the user preferences
  };

  const handlePaymentSave = (data: any) => {
    toast.success("Payment method added");
    handleSheetClose();
    // In a real app, you would save the payment method
  };

  const handleUpgrade = () => {
    toast.info("Upgrade functionality coming soon");
    // In a real app, you would navigate to a subscription page
  };
  
  const menuItems = [
    {
      id: "account",
      icon: UserCircle,
      label: "Account Details",
      onClick: () => handleSheetOpen("account"),
    },
    {
      id: "preferences",
      icon: Settings,
      label: "Preferences",
      onClick: () => handleSheetOpen("preferences"),
    },
    {
      id: "payment",
      icon: CreditCard,
      label: "Payment Methods",
      onClick: () => handleSheetOpen("payment"),
    },
    {
      id: "history",
      icon: History,
      label: "Transaction History",
      onClick: () => {
        toast.info("Transaction history coming soon");
      },
    },
    {
      id: "help",
      icon: HelpCircle,
      label: "Help & Support",
      onClick: () => {
        toast.info("Help & support coming soon");
      },
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
                onClick={handleUpgrade}
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
              key={item.id}
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
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Account Details Sheet */}
      <Sheet open={activeSheet === "account"} onOpenChange={() => handleSheetClose()}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Account Details</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <Form {...accountForm}>
              <form onSubmit={accountForm.handleSubmit(handleAccountSave)} className="space-y-6">
                <FormField
                  control={accountForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={accountForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <SheetClose asChild>
                    <Button variant="outline" className="mr-2">Cancel</Button>
                  </SheetClose>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>

      {/* Preferences Sheet */}
      <Sheet open={activeSheet === "preferences"} onOpenChange={() => handleSheetClose()}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Preferences</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <Form {...preferencesForm}>
              <form onSubmit={preferencesForm.handleSubmit(handlePreferencesSave)} className="space-y-6">
                <FormField
                  control={preferencesForm.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Currency</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={preferencesForm.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <SheetClose asChild>
                    <Button variant="outline" className="mr-2">Cancel</Button>
                  </SheetClose>
                  <Button type="submit">Save Preferences</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>

      {/* Payment Methods Sheet */}
      <Sheet open={activeSheet === "payment"} onOpenChange={() => handleSheetClose()}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Payment Methods</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <Form {...paymentForm}>
              <form onSubmit={paymentForm.handleSubmit(handlePaymentSave)} className="space-y-6">
                <FormField
                  control={paymentForm.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="XXXX XXXX XXXX XXXX" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={paymentForm.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name on Card</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={paymentForm.control}
                    name="expiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="MM/YY" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={paymentForm.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="123" type="password" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <SheetClose asChild>
                    <Button variant="outline" className="mr-2">Cancel</Button>
                  </SheetClose>
                  <Button type="submit">Add Payment Method</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
};

export default ProfilePage;
