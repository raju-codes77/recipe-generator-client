"use client";

import { useState } from "react";
import { ArrowRight, Check, Timer } from "lucide-react";
import { getQuickPlan } from "@/components/wellness/data";
import { WellnessHeader, WellnessShell } from "@/components/wellness/WellnessUI";

const timeOptions = ["10", "20", "30"];
const goalOptions = ["Lose Weight", "Stay Fit", "Build Strength"];
const levelOptions = ["Beginner", "Intermediate"];

function ChoiceGroup({ label, options, value, onChange, suffix = "" }: { label: string; options: string[]; value: string; onChange: (value: string) => void; suffix?: string }) {
	return (
		<div>
			<p className="mb-3 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/50">{label}</p>
			<div className="flex flex-wrap gap-2">
				{options.map((option) => (
					<button key={option} type="button" onClick={() => onChange(option)} className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${value === option ? "border-[#2F8F46] bg-[#eaf7e8] text-[#2F8F46] dark:bg-[#2F8F46]/20 dark:text-[#b7df86]" : "border-[#dfe8da] text-slate-500 hover:border-[#a8cb8a] dark:border-white/10"}`}>
						{option}{suffix}
					</button>
				))}
			</div>
		</div>
	);
}

export default function QuickPlanPage() {
	const [time, setTime] = useState("20");
	const [goal, setGoal] = useState("Stay Fit");
	const [level, setLevel] = useState("Beginner");
	const plan = getQuickPlan(time, goal, level);

	return (
		<WellnessShell>
			<section className="py-4 sm:py-8">
				<WellnessHeader eyebrow="Make it doable" title="Your quick plan" description="Choose three things that matter to you and get a small, clear plan for right now." />
				<div className="grid gap-6 lg:grid-cols-[0.85fr_1fr]">
					<div className="rounded-[28px] border border-[#dfe8da] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.045]"><div className="space-y-6">
						<ChoiceGroup label="How much time do you have?" options={timeOptions} value={time} onChange={setTime} suffix=" min" />
						<ChoiceGroup label="What's your goal?" options={goalOptions} value={goal} onChange={setGoal} />
						<ChoiceGroup label="Fitness level" options={levelOptions} value={level} onChange={setLevel} />
					</div></div>
					<article className="rounded-[28px] bg-[#163c27] p-7 text-white shadow-lg">
						<div className="flex items-center gap-3 text-[#b7df86]"><Timer size={22} /><span className="text-xs font-black uppercase tracking-[0.16em]">Recommended for you</span></div>
						<h2 className="mt-5 text-3xl font-black">{time}-Minute {level} Plan</h2>
						<p className="mt-2 text-sm text-white/60">A practical {goal.toLowerCase()} session that meets you where you are.</p>
						<ul className="mt-7 space-y-4">{plan.map((step) => <li key={step} className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b7df86] text-[#163c27]"><Check size={14} /></span>{step}</li>)}</ul>
						<div className="mt-8 flex items-center gap-2 text-xs font-bold text-[#e5f3d2]">Keep it steady <ArrowRight size={15} /></div>
					</article>
				</div>
			</section>
		</WellnessShell>
	);
}
