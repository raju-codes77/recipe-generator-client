"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, Dumbbell, HeartPulse, Leaf, Flame, Scale, Timer, Bot, Sparkles, LucideIcon } from "lucide-react";

export const wellnessIcons: Record<string, LucideIcon> = { Dumbbell, HeartPulse, Leaf, Flame, Scale, Timer, Bot };

export function WellnessHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Link href="/dashboard/users/wellness" className="mb-4 inline-flex items-center gap-1 text-xs font-bold text-[#2F8F46] transition hover:gap-2 dark:text-[#B7E35F]"><ChevronLeft size={15} /> Wellness Hub</Link>
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#e28b31]">{eyebrow}</p>
        <h1 className="max-w-3xl text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-white/60">{description}</p>
      </div>
    </div>
  );
}

export function WellnessCard({ title, description, href, icon, accent }: { title: string; description: string; href: string; icon: keyof typeof wellnessIcons; accent: string }) {
  const Icon = wellnessIcons[icon];
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.35, ease: "easeOut" }} className="group h-full">
      <Link href={href} className="relative flex h-full min-h-56 flex-col overflow-hidden rounded-[28px] border border-white/20 bg-white/70 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(47,143,70,0.1)] dark:border-white/10 dark:bg-[#1A221B]/80 dark:hover:shadow-[0_20px_40px_rgba(183,227,95,0.05)]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-white/5 dark:to-transparent" />
        <div className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${accent} shadow-sm transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-md`}><Icon size={26} /></div>
        <h2 className="relative text-xl font-black text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-[#2F8F46] dark:group-hover:text-[#B7E35F]">{title}</h2>
        <p className="relative mt-2 max-w-[19rem] text-sm leading-relaxed text-slate-600 dark:text-white/60">{description}</p>
        <span className="relative mt-auto flex items-center gap-2 pt-6 text-xs font-black uppercase tracking-[0.12em] text-[#2F8F46] dark:text-[#B7E35F]">
          Explore <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
        <Sparkles className="absolute -right-4 -top-4 text-[#2F8F46]/5 transition-all duration-700 group-hover:rotate-45 group-hover:scale-125 group-hover:text-[#2F8F46]/10 dark:text-[#B7E35F]/5 dark:group-hover:text-[#B7E35F]/10" size={96} />
      </Link>
    </motion.div>
  );
}

export function WellnessShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-full overflow-hidden bg-[#fbfdf9] dark:bg-[#0c120e] transition-colors duration-300">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#b7df86]/20 to-[#2F8F46]/5 blur-[100px] dark:from-[#b7df86]/10 dark:to-[#2F8F46]/5" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#e28b31]/10 to-transparent blur-[120px] dark:from-[#e28b31]/5" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}

export function ActionButton({ children, onClick, type = "button" }: { children: React.ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return <button type={type} onClick={onClick} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F8F46] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#2F8F46]/20 transition hover:-translate-y-0.5 hover:bg-[#235f31]">{children}</button>;
}
