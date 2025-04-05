
import React from "react";
import { Navbar } from "@/components/navigation/navbar";

interface AppLayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
}

export function AppLayout({ children, hideNavbar = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-16">
        {children}
      </main>
      {!hideNavbar && <Navbar />}
    </div>
  );
}
