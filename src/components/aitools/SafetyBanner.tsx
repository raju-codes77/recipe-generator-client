import { ShieldCheck } from "lucide-react";

export default function SafetyBanner() {
  return (
    <div className="bg-green-50/80 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-600/30">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">AI Safety & Quality</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            All AI tools are designed with safety, accuracy, and user privacy in mind. We continuously
            improve our models to provide the best cooking experience.
          </p>
        </div>
      </div>
      
      <button className="flex-shrink-0 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm w-full md:w-auto text-sm">
        Learn More About Our AI
      </button>
    </div>
  );
}
