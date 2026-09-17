import { ArrowUpRight, Sparkles } from "lucide-react";
import { WellnessCard, WellnessShell } from "@/components/wellness/WellnessUI";

const features = [
  ["Exercise", "Find simple workouts for your goal, level and available time.", "/dashboard/users/wellness/exercise", "Dumbbell", "bg-[#eaf7e8] text-[#2F8F46]"],
  ["Fitness", "Build a practical routine that fits naturally into your week.", "/dashboard/users/wellness/fitness", "HeartPulse", "bg-[#fff0dc] text-[#d77b21]"],
  ["Nutrition", "Explore approachable ideas for balanced everyday eating.", "/dashboard/users/wellness/nutrition", "Leaf", "bg-[#e8f4ee] text-[#237b52]"],
  ["Calorie Calculator", "Estimate your daily energy needs in a few simple steps.", "/dashboard/users/wellness/calories", "Flame", "bg-[#ffebe2] text-[#df6237]"],
  ["BMI Calculator", "Understand your BMI with a clear, friendly explanation.", "/dashboard/users/wellness/bmi", "Scale", "bg-[#edf0fb] text-[#5968a9]"],
  ["Quick Plan", "Choose your time and goal, then get a plan instantly.", "/dashboard/users/wellness/quick-plan", "Timer", "bg-[#eaf5f4] text-[#1a8581]"],
  ["AI Wellness Assistant", "Ask for a practical wellness nudge whenever you need one.", "/dashboard/users/wellness/ai-assistant", "Bot", "bg-[#f3eefa] text-[#8660a9]"],
] as const;

export default function WellnessHubPage() {
  return <WellnessShell><section className="pb-10 pt-4 sm:pb-16 sm:pt-8"><div className="mb-10 overflow-hidden rounded-[32px] bg-[#163c27] px-6 py-10 text-white shadow-[0_20px_60px_rgba(22,60,39,0.2)] sm:px-10 sm:py-14"><div className="relative z-10 max-w-2xl"><div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b7df86]"><Sparkles size={16} /> Your everyday wellbeing</div><h1 className="text-4xl font-black tracking-tight sm:text-6xl">Wellness Hub</h1><p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">Take care of your body, nutrition and daily lifestyle with simple tools and personalized guidance.</p><div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-[#dcefc8]"><ArrowUpRight size={15} /> Seven ways to feel more capable today</div></div><div className="pointer-events-none absolute -right-12 -top-32 h-96 w-96 rounded-full border-[38px] border-[#b7df86]/15" /><div className="pointer-events-none absolute -bottom-40 right-24 h-72 w-72 rounded-full border-[22px] border-[#e28b31]/20" /></div><div className="mb-6 flex items-end justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e28b31]">Explore your toolkit</p><h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">Small steps, made simpler</h2></div><span className="hidden text-xs font-semibold text-slate-400 sm:block">Pick what feels useful today</span></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{features.map(([title, description, href, icon, accent]) => <WellnessCard key={href} title={title} description={description} href={href} icon={icon} accent={accent} />)}</div></section></WellnessShell>;
}
