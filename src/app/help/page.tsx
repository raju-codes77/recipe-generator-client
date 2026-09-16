import React from "react";
import Link from "next/link";
import { ChevronLeft, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Help Center | FoodCanvas",
  description: "Get help with using FoodCanvas",
};

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Help Center</h1>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-3 text-emerald-700 dark:text-emerald-400">Getting Started</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                FoodCanvas is your personalized recipe matching and meal tracking assistant. To get started, create an account, adjust your taste profile, and let our algorithm find the perfect recipes for you.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-3 text-emerald-700 dark:text-emerald-400">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                  <h3 className="font-bold mb-1">How does the Taste Matcher work?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The Taste Matcher uses your preferred flavor profile (sweetness, sourness, etc.) and ingredient preferences to rank recipes from our database, ensuring you only see what you will love to eat.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                  <h3 className="font-bold mb-1">Can I track my daily calories?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Yes! Visit the Meal Tracker page to log your daily meals, take photos of your food, and monitor your caloric intake against your personal goals.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-3 text-emerald-700 dark:text-emerald-400">Contact Support</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                If you need further assistance, please contact our support team at <a href="mailto:support@foodcanvas.app" className="text-emerald-600 hover:underline">support@foodcanvas.app</a>. We typically respond within 24 hours.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
