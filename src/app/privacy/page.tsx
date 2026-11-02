import React from "react";
import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | FoodCanvas",
  description: "Privacy policy for FoodCanvas",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Privacy Policy</h1>
          </div>
          
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
            <p className="text-sm mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us when you create an account, build your taste profile, log meals, and post recipes. This includes your name, email address, dietary preferences, and any photos you upload.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to provide and improve our services, personalize your recipe recommendations, and communicate with you about your account.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              When you post content to the community, it is visible to other users. We do not sell your personal information to third parties. We may share information with service providers who assist us in operating our platform.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Data Security</h2>
            <p className="mb-4">
              We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Your Choices</h2>
            <p className="mb-4">
              You can update or delete your account information at any time through your profile settings. You can also contact us to request the deletion of your personal data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
