import React from "react";
import Link from "next/link";
import { ChevronLeft, Cookie } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | FoodCanvas",
  description: "Cookie policy for FoodCanvas",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <Cookie className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Cookie Policy</h1>
          </div>
          
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
            <p className="text-sm mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are stored on your device when you visit our website. They help us make the site work properly, understand how you interact with it, and improve your experience.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly, such as maintaining your session when you log in.</li>
              <li><strong>Preference Cookies:</strong> Allow the website to remember choices you make, like your preferred theme (light/dark mode).</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use the site by collecting and reporting information anonymously.</li>
            </ul>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Third-Party Cookies</h2>
            <p className="mb-4">
              In addition to our own cookies, we may also use various third-party cookies, for example, from analytics providers or embedded content from other platforms.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Managing Cookies</h2>
            <p className="mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
