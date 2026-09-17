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
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} transition={{ duration: 0.35 }} className="group h-full">
      <Link href={href} className="relative flex h-full min-h-56 flex-col overflow-hidden rounded-[28px] border border-[#dfe8da] bg-white/90 p-6 shadow-[0_12px_35px_rgba(43,77,51,0.07)] transition-shadow hover:shadow-[0_20px_45px_rgba(43,77,51,0.14)] dark:border-white/10 dark:bg-white/[0.045]">
        <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${accent} transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}><Icon size={23} /></div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white">{title}</h2>
        <p className="mt-2 max-w-[19rem] text-sm leading-6 text-slate-600 dark:text-white/55">{description}</p>
        <span className="mt-auto flex items-center gap-2 pt-6 text-xs font-black uppercase tracking-[0.12em] text-[#2F8F46] dark:text-[#B7E35F]">Explore <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
        <Sparkles className="absolute -right-2 -top-2 text-[#2F8F46]/10 transition-transform duration-500 group-hover:rotate-45 dark:text-[#B7E35F]/10" size={80} />
      </Link>
    </motion.div>
  );
}

export function WellnessShell({ children }: { children: React.ReactNode }) {
  return <div className="relative min-h-full overflow-hidden"><div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#b7df86]/20 blur-3xl" /><div className="relative mx-auto max-w-7xl">{children}</div></div>;
}

export function ActionButton({ children, onClick, type = "button" }: { children: React.ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return <button type={type} onClick={onClick} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F8F46] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#2F8F46]/20 transition hover:-translate-y-0.5 hover:bg-[#235f31]">{children}</button>;
}
