import type { Metadata } from "next";
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
  title: "FoodCanvas",
  description: "Ai Recipe Generator & sharing platform",
};

import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import { Toaster } from "react-hot-toast";
import AIAssistantPopup from "@/components/AIAssistantPopup";
import WellnessReminderScheduler from "@/components/aitools/WellnessReminderScheduler";
import { NotificationProvider } from "@/components/notifications/NotificationContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
        <div className="">
          <NotificationProvider>
            <Navbar />
            <AIAssistantPopup/>
            <main className="flex-1">
              {children}
              <Toaster position="top-right" reverseOrder={false} />
              <WellnessReminderScheduler />
            </main>
            <ConditionalFooter />
          </NotificationProvider>
        </div>
      </body>
    </html>
  );
}
