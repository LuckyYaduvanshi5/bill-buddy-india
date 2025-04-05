
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus, User } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "@/lib/mock-data";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Group name is required",
  }),
  emoji: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateGroupForm() {
  const navigate = useNavigate();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const availableUsers = mockUsers.filter(user => !selectedMembers.includes(user.id));

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      emoji: "👥",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (selectedMembers.length === 0) {
      toast.error("Please add at least one member to the group");
      return;
    }

    // In a real app, this would call an API to create the group
    toast.success(`Group "${data.name}" created!`);
    
    // Navigate back to groups list
    navigate("/groups");
  };

  const addMember = (userId: string) => {
    setSelectedMembers([...selectedMembers, userId]);
  };

  const removeMember = (userId: string) => {
    setSelectedMembers(selectedMembers.filter(id => id !== userId));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="emoji"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <div className="bg-primary/10 h-20 w-20 rounded-full flex items-center justify-center text-4xl mb-2">
                {field.value || "👥"}
              </div>
              <FormControl>
                <Input
                  placeholder="Group Emoji (optional)"
                  {...field}
                  className="w-40 text-center"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter group name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Group Members</h3>
            {selectedMembers.length === 0 ? (
              <div className="text-center py-4 bg-muted/20 rounded-md">
                <p className="text-muted-foreground">No members added yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedMembers.map((memberId) => {
                  const user = mockUsers.find((u) => u.id === memberId);
                  if (!user) return null;
                  
                  return (
                    <Card key={user.id} className="bg-background">
                      <CardContent className="p-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMember(user.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Add Friends</h3>
            {availableUsers.length === 0 ? (
              <div className="text-center py-4 bg-muted/20 rounded-md">
                <p className="text-muted-foreground">All friends are added to the group</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableUsers.map((user) => (
                  <Card key={user.id} className="bg-background">
                    <CardContent className="p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addMember(user.id)}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-brand-blue hover:bg-brand-blue/90"
        >
          Create Group
        </Button>
      </form>
    </Form>
  );
}
