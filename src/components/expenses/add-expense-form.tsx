
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CurrencyInput } from "../ui/currency-input";
import { mockGroups, mockUsers } from "@/lib/mock-data";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExpenseFormData, SplitMethod } from "@/types";
import { CalendarIcon, ReceiptText } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const categories = [
  "Food",
  "Bills",
  "Rent",
  "Travel",
  "Entertainment",
  "Shopping",
  "Others",
];

interface AddExpenseFormProps {
  groupId?: string;
}

export function AddExpenseForm({ groupId }: AddExpenseFormProps) {
  const navigate = useNavigate();
  const currentUser = mockUsers[0]; // Assume first user is current user
  const [date, setDate] = useState<Date>(new Date());

  const initialSelectedGroup = groupId 
    ? mockGroups.find(g => g.id === groupId) 
    : undefined;

  const initialParticipants = initialSelectedGroup
    ? initialSelectedGroup.members.map(m => m.id)
    : [currentUser.id];

  const [formData, setFormData] = useState<ExpenseFormData>({
    title: "",
    amount: 0,
    paidBy: currentUser.id,
    participants: initialParticipants,
    splitMethod: "equal",
    groupId: groupId,
    date: new Date().toISOString(),
  });

  const handleGroupChange = (value: string) => {
    const selectedGroup = mockGroups.find(g => g.id === value);
    setFormData({
      ...formData,
      groupId: value,
      participants: selectedGroup ? selectedGroup.members.map(m => m.id) : [currentUser.id],
    });
  };

  const handleParticipantToggle = (userId: string, checked: boolean) => {
    const newParticipants = checked 
      ? [...formData.participants, userId]
      : formData.participants.filter(id => id !== userId);
    
    setFormData({
      ...formData,
      participants: newParticipants,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    
    if (formData.amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    
    if (formData.participants.length === 0) {
      toast.error("Please select at least one participant");
      return;
    }
    
    // In a real app, we would save the expense here
    toast.success("Expense added successfully!");
    
    // Navigate back to previous page or home
    setTimeout(() => navigate(-1), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pb-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="What was this expense for?"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <CurrencyInput
          id="amount"
          placeholder="0"
          symbol="₹"
          onValueChange={(value) => setFormData({ ...formData, amount: value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="group">Group (Optional)</Label>
        <Select
          value={formData.groupId}
          onValueChange={handleGroupChange}
          disabled={!!groupId} // Disable if groupId is provided as prop
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a group" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="no-group">No group</SelectItem>
              {mockGroups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.emoji} {group.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="paidBy">Paid by</Label>
        <Select 
          value={formData.paidBy}
          onValueChange={(value) => setFormData({ ...formData, paidBy: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select who paid" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {mockUsers.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.id === currentUser.id ? "You" : user.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Split Method</Label>
        <Select 
          value={formData.splitMethod}
          onValueChange={(value) => setFormData({ 
            ...formData, 
            splitMethod: value as SplitMethod 
          })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select how to split" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="equal">Split Equally</SelectItem>
              <SelectItem value="custom">Custom Split</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate || new Date());
                setFormData({
                  ...formData,
                  date: (newDate || new Date()).toISOString(),
                });
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category (Optional)</Label>
        <Select 
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Participants</Label>
        <div className="space-y-3 max-h-60 overflow-y-auto p-1">
          {(formData.groupId 
            ? mockGroups.find(g => g.id === formData.groupId)?.members || []
            : mockUsers
          ).map((user) => (
            <div key={user.id} className="flex items-center space-x-3">
              <Checkbox 
                id={`user-${user.id}`}
                checked={formData.participants.includes(user.id)}
                onCheckedChange={(checked) => {
                  handleParticipantToggle(user.id, checked as boolean);
                }}
              />
              <Label htmlFor={`user-${user.id}`} className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user.id === currentUser.id ? "You" : user.name}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Add any additional notes..."
          value={formData.notes || ""}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>
      
      <div className="pt-2">
        <Button variant="outline" type="button" className="w-full mb-3" onClick={() => toast.info("Receipt upload coming soon!")}>
          <ReceiptText size={18} className="mr-2" />
          Add Receipt Photo
        </Button>
        <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90">
          Save Expense
        </Button>
      </div>
    </form>
  );
}
