import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PresentationProvider } from "@/store/PresentationContext";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Link href="/" className="block p-8" rel="icon">
          Home
        </Link>
        <PresentationProvider>{children}</PresentationProvider>
      </body>
    </html>
  );
}
