
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
        <div className="text-2xl font-bold text-brand-blue">Bill Buddy</div>
      </header>
      <main className="pb-16">
        {children}
      </main>
      {!hideNavbar && <Navbar />}
    </div>
  );
}
