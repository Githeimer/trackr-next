import type { Metadata } from "next";
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
        className={` antialiased  bg-[#0c0c0c] text-[var(--light-color)]`}
      >
        {children}
      </body>
    </html>
  );
}
