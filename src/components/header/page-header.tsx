
import React from "react";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PageHeaderProps {
  title: string;
  backLink?: string;
  actions?: { label: string; onClick: () => void }[];
}

export function PageHeader({ title, backLink, actions }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background backdrop-blur-lg border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        {backLink && (
          <Link to={backLink} className="mr-3 text-foreground">
            <ChevronLeft size={24} />
          </Link>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      
      {actions && actions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map((action) => (
              <DropdownMenuItem 
                key={action.label} 
                onClick={action.onClick}
              >
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
