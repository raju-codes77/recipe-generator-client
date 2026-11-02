"use client";

import { useState } from "react";
import { HeartPulse, Scale } from "lucide-react";
import { ActionButton, WellnessHeader, WellnessShell } from "@/components/wellness/WellnessUI";

const inputClass = "mt-2 w-full rounded-xl border border-[#dfe8da] bg-[#fbfdf9] px-3 py-3 text-sm outline-none dark:border-white/10 dark:bg-white/5";

export default function BmiPage() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const meters = +height / 100;
    if (meters > 0 && +weight > 0) setBmi(Math.round((+weight / (meters * meters)) * 10) / 10);
  };

  const category = bmi === null ? "" : bmi < 18.5 ? "Below the usual range" : bmi < 25 ? "Within the usual range" : bmi < 30 ? "Above the usual range" : "Higher than the usual range";

  return (
    <WellnessShell>
      <section className="py-4 sm:py-8">
        <WellnessHeader eyebrow="A useful snapshot" title="BMI calculator" description="Use height and weight to calculate a quick BMI snapshot, then pair it with how you feel and your professional guidance." />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[28px] border border-[#dfe8da] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.045]"><div className="grid gap-5 sm:grid-cols-2">
            <label className="text-xs font-bold text-slate-600 dark:text-white/70">Height (cm)<input type="number" value={height} onChange={(event) => setHeight(event.target.value)} className={inputClass} /></label>
            <label className="text-xs font-bold text-slate-600 dark:text-white/70">Weight (kg)<input type="number" value={weight} onChange={(event) => setWeight(event.target.value)} className={inputClass} /></label>
          </div><div className="mt-7"><ActionButton onClick={calculate}>Calculate BMI <Scale size={17} /></ActionButton></div></div>
          <div className="rounded-[28px] bg-[#fff0dc] p-7 text-[#653c1d]"><HeartPulse size={25} className="mb-5 text-[#d77b21]" /><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b56a1b]">Your result</p>{bmi ? <><p className="mt-2 text-6xl font-black">{bmi}</p><h2 className="mt-2 text-xl font-black">{category}</h2><p className="mt-3 text-sm leading-6 text-[#7e5737]">BMI is one broad indicator and does not account for every body type. Use it as a conversation starter, not a diagnosis.</p></> : <p className="mt-3 text-2xl font-black text-[#b8895c]">Your number will appear here</p>}</div>
        </div>
      </section>
    </WellnessShell>
  );
}
