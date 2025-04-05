
import React from "react";
import { Link } from "react-router-dom";
import { Group } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Link to={`/groups/${group.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-2xl">
              {group.emoji || "👥"}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-lg">{group.name}</h3>
              <p className="text-sm text-muted-foreground">
                {group.members.length} members
              </p>
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div className="avatar-group">
              {group.members.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {group.members.length > 3 && (
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                  +{group.members.length - 3}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
