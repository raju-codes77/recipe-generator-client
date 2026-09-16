import React from "react";
import Link from "next/link";
import { ChevronLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | FoodCanvas",
  description: "Terms and conditions for using FoodCanvas",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Terms of Service</h1>
          </div>
          
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
            <p className="text-sm mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using FoodCanvas, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. User Accounts</h2>
            <p className="mb-4">
              You must create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. User Content</h2>
            <p className="mb-4">
              You retain all rights to the content you post on FoodCanvas, including recipes, photos, and reviews. By posting content, you grant us a non-exclusive, worldwide license to use, display, and distribute your content on our platform.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Acceptable Use</h2>
            <p className="mb-4">
              You agree not to use FoodCanvas for any unlawful purpose or in a way that violates the rights of others. This includes posting inappropriate content, spamming, or attempting to compromise the security of the platform.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Disclaimer of Warranties</h2>
            <p className="mb-4">
              FoodCanvas is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted or error-free. Nutritional information provided is for general guidance only and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
