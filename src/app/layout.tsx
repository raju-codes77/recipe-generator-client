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
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
  },
};

import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import { Toaster } from "react-hot-toast";
import AIAssistantPopup from "@/components/AIAssistantPopup";
import WellnessReminderScheduler from "@/components/aitools/WellnessReminderScheduler";
import { NotificationProvider } from "@/components/notifications/NotificationContext";
import { InlineScript } from "@/components/InlineScript";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <InlineScript
          html={`(() => {
            try {
              const savedTheme = localStorage.getItem("theme");
              const useDark = savedTheme === "dark" || (savedTheme === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
              document.documentElement.classList.toggle("dark", useDark);
            } catch {
              document.documentElement.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);
            }
          })();`}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
        <div className="w-full min-w-0">
          <NotificationProvider>
            <Navbar />
            <AIAssistantPopup/>
            <main className="w-full min-w-0 flex-1">
              {children}
              <Toaster position="bottom-right" reverseOrder={false} />
              <WellnessReminderScheduler />
            </main>
            <ConditionalFooter />
          </NotificationProvider>
        </div>
      </body>
    </html>
  );
}
