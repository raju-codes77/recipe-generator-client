import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function ProComingSoonPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[32px] p-10 shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
          Pro Membership<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
            Coming Soon!
          </span>
        </h1>
        
        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          We're working hard to bring you advanced AI tools, exclusive custom meal plans, premium nutritional insights, and so much more.
        </p>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-8 text-left border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider">What to expect:</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-sm text-slate-600 dark:text-slate-400 gap-2">
              <span className="text-emerald-500">✓</span> Unlimited AI recipe generation
            </li>
            <li className="flex items-center text-sm text-slate-600 dark:text-slate-400 gap-2">
              <span className="text-emerald-500">✓</span> Highly personalized meal plans
            </li>
            <li className="flex items-center text-sm text-slate-600 dark:text-slate-400 gap-2">
              <span className="text-emerald-500">✓</span> Advanced macro tracking
            </li>
            <li className="flex items-center text-sm text-slate-600 dark:text-slate-400 gap-2">
              <span className="text-emerald-500">✓</span> Expert nutrition insights
            </li>
          </ul>
        </div>

        <Link 
          href="/dashboard/user"
          className="inline-flex items-center justify-center w-full py-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
