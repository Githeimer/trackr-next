"use client"
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
     <SessionProvider>
      <Navbar></Navbar>
      <Toaster/>
     {children}
     </SessionProvider>
    );
  }
  