import { CheckCircle2, Moon, ShieldCheck, Target } from "lucide-react";
import { routines } from "@/components/wellness/data";
import { WellnessHeader, WellnessShell } from "@/components/wellness/WellnessUI";

function RoutineCard({ routine }: { routine: (typeof routines)[number] }) {
  return (
    <article className="rounded-[26px] border border-[#dfe8da] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.045]">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0dc] text-[#d77b21]"><CheckCircle2 size={20} /></div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white">{routine.title}</h2>
      </div>
      <p className="mb-5 text-sm leading-6 text-slate-500 dark:text-white/55">{routine.detail}</p>
      <ul className="space-y-3">{routine.items.map((item) => <li key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-white/75"><span className="h-1.5 w-1.5 rounded-full bg-[#2F8F46]" />{item}</li>)}</ul>
    </article>
  );
}

export default function FitnessPage() {
  return (
    <WellnessShell>
      <section className="py-4 sm:py-8">
        <WellnessHeader eyebrow="Build your rhythm" title="Fitness without the fuss" description="Start with a routine that supports your energy, your space and your real schedule." />
        <div className="grid gap-5 md:grid-cols-2">{routines.map((routine) => <RoutineCard key={routine.title} routine={routine} />)}</div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <InfoCard icon={<Target size={19} />} title="Set a clear target" text="Choose one weekly focus, such as three short strength sessions." />
          <InfoCard icon={<Moon size={19} />} title="Recover well" text="Sleep, hydration and rest days help your body adapt to training." />
          <InfoCard icon={<ShieldCheck size={19} />} title="Train safely" text="Warm up first, learn good form and stop for sharp or unusual pain." />
        </div>
      </section>
    </WellnessShell>
  );
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <article className="rounded-[22px] border border-[#dfe8da] bg-[#f2f8ed] p-5 dark:border-white/10 dark:bg-[#1a291d]"><div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#2F8F46] dark:bg-white/10 dark:text-[#b7df86]">{icon}</div><h2 className="font-black text-slate-900 dark:text-white">{title}</h2><p className="mt-2 text-xs leading-5 text-slate-600 dark:text-white/55">{text}</p></article>;
}
