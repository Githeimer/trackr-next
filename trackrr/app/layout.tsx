import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar"
import "./globals.css";



export const metadata: Metadata = {
  title: "Trackrr",
  description: "Track your habits and analyze them later",
  icons:{
    icon:"/TR.jpg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased container bg-[#171717] text-[var(--light-color)]`}
      >
        <Navbar></Navbar>
        <Toaster/>
        {children}
      </body>
    </html>
  );
}
