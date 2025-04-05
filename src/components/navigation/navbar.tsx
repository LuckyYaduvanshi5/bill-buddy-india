
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
            "flex flex-col items-center px-3 py-1",
            item.name === "Add" ? "relative" : ""
          )}
        >
          {item.name === "Add" ? (
            <div className="absolute -top-5 bg-brand-blue text-white rounded-full p-3 shadow-lg">
              <item.icon size={20} />
            </div>
          ) : (
            <item.icon
              size={24}
              className={cn(
                "transition-colors",
                location.pathname === item.href
                  ? "text-brand-blue"
                  : "text-muted-foreground"
              )}
            />
          )}
          <span className={cn(
            "text-xs mt-1",
            location.pathname === item.href
              ? "text-brand-blue font-medium"
              : "text-muted-foreground"
          )}>
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}
