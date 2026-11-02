"use client";

import { useMemo, useState } from "react";
import { Dumbbell, Clock3, Repeat2, RotateCcw, SlidersHorizontal } from "lucide-react";
import { exercises } from "@/components/wellness/data";
import { WellnessHeader, WellnessShell } from "@/components/wellness/WellnessUI";

function ExerciseMetric({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
	return (
		<div>
			<p className="text-[10px] text-slate-400">{label}</p>
			<p className="mt-1 flex items-center gap-1 text-xs font-bold">
				{icon}
				{value}
			</p>
		</div>
	);
}

function ExerciseCard({ exercise }: { exercise: (typeof exercises)[number] }) {
	return (
		<article className="rounded-[24px] border border-[#dfe8da] bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.045]">
			<div className="mb-5 flex items-start justify-between">
				<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf7e8] text-[#2F8F46] dark:bg-[#2F8F46]/20 dark:text-[#b7df86]"><Dumbbell size={20} /></div>
				<span className="rounded-full bg-[#fff0dc] px-3 py-1 text-[10px] font-bold text-[#bb6b1d]">{exercise.duration} min</span>
			</div>
			<h2 className="text-lg font-black text-slate-900 dark:text-white">{exercise.name}</h2>
			<p className="mt-2 text-xs leading-5 text-slate-500 dark:text-white/55">{exercise.instructions}</p>
			<div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#edf1e9] pt-4 dark:border-white/10">
				<ExerciseMetric label="Sets" value={exercise.sets} icon={<Repeat2 size={13} />} />
				<ExerciseMetric label="Reps" value={exercise.reps} />
				<ExerciseMetric label="Rest" value={exercise.rest} icon={<Clock3 size={13} />} />
			</div>
			<span className="mt-4 inline-block text-[10px] font-black uppercase tracking-wider text-[#2F8F46] dark:text-[#b7df86]">{exercise.level} · {exercise.focus}</span>
		</article>
	);
}

export default function ExercisePage() {
	const [audience, setAudience] = useState("Everyone");
	const [level, setLevel] = useState("All levels");
	const [focus, setFocus] = useState("All goals");
	const [duration, setDuration] = useState("All times");
	const filteredExercises = useMemo(() => {
		const exactMatches = exercises.filter((exercise) => {
			const audienceMatches = audience === "Everyone" || exercise.audience === "Everyone" || exercise.audience === audience;
			const levelMatches = level === "All levels" || exercise.level === level;
			const focusMatches = focus === "All goals" || exercise.focus === focus;
			const durationMatches = duration === "All times" || exercise.duration === Number(duration);
			return audienceMatches && levelMatches && focusMatches && durationMatches;
		});

		if (exactMatches.length > 0) return exactMatches;

		// Keep the page useful when the static catalog has no exact combination.
		return exercises
			.map((exercise) => ({
				exercise,
				score:
					(level !== "All levels" && exercise.level === level ? 3 : 0) +
					(focus !== "All goals" && exercise.focus === focus ? 3 : 0) +
					(duration !== "All times" && exercise.duration === Number(duration) ? 3 : 0) +
					(audience !== "Everyone" && (exercise.audience === audience || exercise.audience === "Everyone") ? 2 : 0),
			}))
			.sort((first, second) => second.score - first.score)
			.slice(0, 3)
			.map(({ exercise }) => exercise);
	}, [audience, level, focus, duration]);
	const hasExactMatches = filteredExercises.some((exercise) => {
		const audienceMatches = audience === "Everyone" || exercise.audience === "Everyone" || exercise.audience === audience;
		const levelMatches = level === "All levels" || exercise.level === level;
		const focusMatches = focus === "All goals" || exercise.focus === focus;
		const durationMatches = duration === "All times" || exercise.duration === Number(duration);
		return audienceMatches && levelMatches && focusMatches && durationMatches;
	});

	const resetFilters = () => {
		setAudience("Everyone");
		setLevel("All levels");
		setFocus("All goals");
		setDuration("All times");
	};

	return (
		<WellnessShell>
			<section className="py-4 sm:py-8">
				<WellnessHeader eyebrow="Move with intention" title="Exercise, your way" description="Simple movements organized by goal, level and time. Choose a session that feels achievable today." />
				<div className="mb-6 rounded-[24px] border border-[#dfe8da] bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.045]">
					<div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-white/50"><SlidersHorizontal size={15} /> Personalize your movement</div><button type="button" onClick={resetFilters} className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbdcc1] px-3 py-2 text-[10px] font-black uppercase tracking-wider text-[#2F8F46] transition hover:bg-[#edf7e9] focus:outline-none focus:ring-2 focus:ring-[#b7df86] dark:border-white/20 dark:text-[#b7df86] dark:hover:bg-white/10"><RotateCcw size={13} /> Reset</button></div>
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
						<Filter label="For" value={audience} options={["Everyone", "Men", "Women", "Teenagers"]} onChange={setAudience} />
						<Filter label="Level" value={level} options={["All levels", "Beginner", "Intermediate"]} onChange={setLevel} />
						<Filter label="Goal" value={focus} options={["All goals", "Weight loss", "Strength", "Full body"]} onChange={setFocus} />
						<Filter label="Time" value={duration} options={["All times", "10", "20", "30"]} onChange={setDuration} suffix=" min" />
					</div>
				</div>
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{filteredExercises.map((exercise) => <ExerciseCard key={exercise.name} exercise={exercise} />)}
				</div>
				{!hasExactMatches && filteredExercises.length > 0 && <p className="mt-4 rounded-2xl border border-[#f0dfc9] bg-[#fff8ed] p-4 text-xs text-[#8b5a2a] dark:border-[#a66f32]/40 dark:bg-[#5d411f]/20 dark:text-[#f2c98f]">No exact match was found, so these are the closest exercises for your selections.</p>}
			</section>
		</WellnessShell>
	);
}

function Filter({ label, value, options, onChange, suffix = "" }: { label: string; value: string; options: string[]; onChange: (value: string) => void; suffix?: string }) {
	return <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#dfe8da] bg-[#fbfdf9] px-3 py-2.5 text-xs font-bold normal-case tracking-normal text-slate-700 outline-none focus:border-[#7fb35c] focus:ring-2 focus:ring-[#b7df86]/40 dark:border-white/20 dark:bg-[#18251b] dark:text-white dark:[color-scheme:dark]">{options.map((option) => <option key={option} value={option} className="bg-white text-slate-700 dark:bg-[#18251b] dark:text-white">{option}{option !== "Everyone" && option !== "All levels" && option !== "All goals" && option !== "All times" ? suffix : ""}</option>)}</select></label>;
}
