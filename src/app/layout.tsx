import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Helthy - AI-Powered Fitness Companion",
  description:
    "Transform your fitness journey with Helthy's AI-powered analytics, personalized workouts, and intelligent meal planning. Join the future of fitness today.",
  keywords:
    "fitness, AI, health, workout tracking, nutrition, wellness, fitness app",
  authors: [{ name: "Helthy Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
