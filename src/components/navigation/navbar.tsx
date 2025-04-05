
import React from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  Users, 
  PlusCircle, 
  ClipboardList, 
  User 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();
  
  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Groups",
      href: "/groups",
      icon: Users,
    },
    {
      name: "Add",
      href: "/add",
      icon: PlusCircle,
    },
    {
      name: "Activity",
      href: "/activity",
      icon: ClipboardList,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-background border-t border-border h-16 flex items-center justify-around z-10">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            "flex flex-col items-center px-3 py-2 rounded-md transition-colors",
            location.pathname === item.href
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <item.icon
            size={24}
            className={cn(
              item.name === "Add" && "text-brand-blue p-0.5",
              item.name === "Add" && location.pathname === item.href && "text-brand-blue",
            )}
          />
          <span className="text-xs mt-1">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
