
import React from "react";
import { Navbar } from "@/components/navigation/navbar";

interface AppLayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
}

export function AppLayout({ children, hideNavbar = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex justify-center py-4 bg-background">
        <img 
          src="/lovable-uploads/9847c9cf-f02c-4e42-b7b2-e7636e4eb49f.png" 
          alt="Bill Buddy Logo" 
          className="h-10 w-auto"
        />
      </header>
      <main className="pb-16">
        {children}
      </main>
      {!hideNavbar && <Navbar />}
    </div>
  );
}
