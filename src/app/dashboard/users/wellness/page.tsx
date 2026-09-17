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
  return (
    <WellnessShell>
      <section className="pb-10 pt-4 sm:pb-16 sm:pt-8">
        {/* Dynamic Hero Section */}
        <div className="relative mb-8 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#12311f] via-[#163c27] to-[#0d2417] px-6 py-8 text-white shadow-[0_20px_50px_rgba(22,60,39,0.25)] sm:px-10 sm:py-12">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          
          {/* Animated Glows */}
          <div className="pointer-events-none absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-[#b7df86]/30 to-[#2F8F46]/0 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-10 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-[#e28b31]/20 to-transparent blur-[60px]" />

          <div className="relative z-10 max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#b7df86]">
              <Sparkles size={16} className="animate-pulse" /> Your everyday wellbeing
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 sm:text-5xl drop-shadow-sm">
              Wellness Hub
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              Take care of your body, nutrition and daily lifestyle with simple tools and personalized guidance designed for your life.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-[11px] font-bold text-[#dcefc8] border border-white/10 shadow-inner transition-all hover:bg-white/20">
              <ArrowUpRight size={14} /> Seven ways to feel more capable today
            </div>
          </div>
          
          {/* Decorative Rings */}
          <div className="pointer-events-none absolute -right-10 -top-24 h-[300px] w-[300px] rounded-full border-[30px] border-[#b7df86]/10 backdrop-blur-3xl transition-transform duration-1000 hover:scale-105" />
          <div className="pointer-events-none absolute -bottom-32 right-20 h-[220px] w-[220px] rounded-full border-[18px] border-[#e28b31]/15 backdrop-blur-xl" />
        </div>

        {/* Feature Grid Section */}
        <div className="mb-8 flex items-end justify-between px-2">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#e28b31] dark:text-[#f3a44d]">Explore your toolkit</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">Small steps, made simpler</h2>
          </div>
          <span className="hidden text-sm font-semibold text-slate-400 dark:text-slate-500 sm:block">Pick what feels useful today</span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {features.map(([title, description, href, icon, accent]) => (
            <WellnessCard key={href} title={title} description={description} href={href} icon={icon} accent={accent} />
          ))}
        </div>
      </section>
    </WellnessShell>
  );
}
