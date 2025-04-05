
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { getUserById } from "@/lib/mock-data";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface UPISheetProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  amount: number;
}

export function UPISheet({ isOpen, onClose, userId, amount }: UPISheetProps) {
  const user = getUserById(userId);

  if (!user) return null;

  const handlePaymentApp = (app: string) => {
    // In a real app, this would deep link to the payment app
    toast.success(`Opening ${app} to pay ₹${amount.toFixed(0)} to ${user.name}`);
    // Mock successful payment
    setTimeout(() => {
      toast.success(`Payment of ₹${amount.toFixed(0)} completed successfully!`);
      onClose();
    }, 1500);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Pay with UPI</SheetTitle>
          <SheetDescription>
            Choose a payment app to settle ₹{amount.toFixed(0)} with {user.name}
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4 my-4">
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2"
            onClick={() => handlePaymentApp("Google Pay")}
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-xl">G</span>
            </div>
            <span>Google Pay</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2"
            onClick={() => handlePaymentApp("PhonePe")}
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-xl">P</span>
            </div>
            <span>PhonePe</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2"
            onClick={() => handlePaymentApp("Paytm")}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl">P</span>
            </div>
            <span>Paytm</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2"
            onClick={() => handlePaymentApp("BHIM UPI")}
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-xl">B</span>
            </div>
            <span>BHIM UPI</span>
          </Button>
        </div>
        <Separator className="my-4" />
        <Button
          variant="ghost"
          className="w-full mt-2"
          onClick={onClose}
        >
          Cancel
        </Button>
      </SheetContent>
    </Sheet>
  );
}
