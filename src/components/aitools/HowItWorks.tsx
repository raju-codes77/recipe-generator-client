import { Search, BrainCircuit, Wand2, ChefHat } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "1. Input",
      desc: "Provide ingredients, photos or preferences",
      icon: Search,
    },
    {
      id: 2,
      title: "2. AI Analysis",
      desc: "Our AI models analyze data and patterns",
      icon: BrainCircuit,
    },
    {
      id: 3,
      title: "3. Smart Results",
      desc: "Get personalized recommendations",
      icon: Wand2,
    },
    {
      id: 4,
      title: "4. Cook & Enjoy",
      desc: "Cook with confidence and share your results",
      icon: ChefHat,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm mb-6 h-full flex flex-col justify-center">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-10">How AI Tools Work</h3>
      
      <div className="relative flex flex-col md:flex-row justify-between w-full max-w-4xl mx-auto">
        
        {/* Connecting Line (Desktop) */}
        <div className="absolute top-8 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-green-200 dark:border-green-900/50 hidden md:block z-0"></div>

        {/* Steps */}
        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center text-center w-full md:w-1/4 mb-8 md:mb-0 px-2 group">
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-2 border-green-100 dark:border-green-900 shadow-md shadow-green-100/50 flex items-center justify-center text-green-600 dark:text-green-500 mb-4 group-hover:scale-110 group-hover:border-green-300 transition-all duration-300">
              <step.icon size={24} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">{step.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[150px]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
