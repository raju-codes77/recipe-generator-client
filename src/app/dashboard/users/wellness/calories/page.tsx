"use client";

import { useState } from "react";
import { Flame, Info } from "lucide-react";
import { ActionButton, WellnessHeader, WellnessShell } from "@/components/wellness/WellnessUI";

const inputClass = "mt-2 w-full rounded-xl border border-[#dfe8da] bg-[#fbfdf9] px-3 py-3 text-sm outline-none dark:border-white/10 dark:bg-white/5";

function NumberField({ label, value, unit, onChange }: { label: string; value: string; unit: string; onChange: (value: string) => void }) {
  return (
    <label className="text-xs font-bold text-slate-600 dark:text-white/70">
      {label}
      <div className="mt-2 flex items-center rounded-xl border border-[#dfe8da] bg-[#fbfdf9] px-3 dark:border-white/10 dark:bg-white/5">
        <input type="number" value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 flex-1 bg-transparent py-3 text-sm font-semibold outline-none" />
        <span className="text-[10px] text-slate-400">{unit}</span>
      </div>
    </label>
  );
}

export default function CaloriesPage() {
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState("female");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");
  const [activity, setActivity] = useState("1.375");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const base = gender === "male"
      ? 10 * +weight + 6.25 * +height - 5 * +age + 5
      : 10 * +weight + 6.25 * +height - 5 * +age - 161;
    setResult(Math.round(base * +activity));
  };

  return (
    <WellnessShell>
      <section className="py-4 sm:py-8">
        <WellnessHeader eyebrow="Know your baseline" title="Calorie calculator" description="Get a simple estimate of your daily calorie needs. This is a starting point, not a medical prescription." />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[28px] border border-[#dfe8da] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.045]">
            <div className="grid gap-5 sm:grid-cols-2">
              <NumberField label="Age" value={age} unit="years" onChange={setAge} />
              <NumberField label="Height" value={height} unit="cm" onChange={setHeight} />
              <NumberField label="Weight" value={weight} unit="kg" onChange={setWeight} />
              <label className="text-xs font-bold text-slate-600 dark:text-white/70">Gender<select value={gender} onChange={(event) => setGender(event.target.value)} className={inputClass}><option value="female">Female</option><option value="male">Male</option></select></label>
              <label className="text-xs font-bold text-slate-600 dark:text-white/70 sm:col-span-2">Activity level<select value={activity} onChange={(event) => setActivity(event.target.value)} className={inputClass}><option value="1.2">Mostly sitting</option><option value="1.375">Lightly active</option><option value="1.55">Moderately active</option><option value="1.725">Very active</option></select></label>
            </div>
            <div className="mt-7"><ActionButton onClick={calculate}>Calculate estimate <Flame size={17} /></ActionButton></div>
          </div>
          <div className="flex min-h-64 flex-col justify-center rounded-[28px] bg-[#163c27] p-7 text-white shadow-lg"><Info className="mb-5 text-[#b7df86]" size={24} /><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b7df86]">Your daily estimate</p>{result ? <><p className="mt-3 text-5xl font-black">{result.toLocaleString()}</p><p className="mt-2 text-sm text-white/65">calories per day to maintain your current weight.</p></> : <p className="mt-3 text-2xl font-black text-white/45">Enter your details to begin</p>}</div>
        </div>
      </section>
    </WellnessShell>
  );
}
