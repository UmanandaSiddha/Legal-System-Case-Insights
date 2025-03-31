import Sidebar from "@/Components/Sidebar/page";

import type { Metadata } from "next";
import Navbar from "../Components/Navigation/navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legal System Case Insights",
  description:
    "An AI-powered tool designed to streamline the reading and comprehension of legal cases. ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
