import { ArrowRight, Leaf } from "lucide-react";
import { nutritionGroups, nutritionTips, NutritionGroup } from "@/components/wellness/data";
import { WellnessHeader, WellnessShell } from "@/components/wellness/WellnessUI";

function NutritionCard({ group }: { group: NutritionGroup }) {
  return (
    <article className="group rounded-[24px] border border-[#dfe8da] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/[0.045]">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f4ee] text-[#237b52]"><Leaf size={20} /></div>
      <h2 className="text-lg font-black text-slate-900 dark:text-white">{group.title}</h2>
      <ul className="mt-4 space-y-3">{group.items.map((item) => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-600 dark:text-white/60"><ArrowRight size={15} className="mt-0.5 shrink-0 text-[#e28b31]" />{item}</li>)}</ul>
    </article>
  );
}

export default function NutritionPage() {
  return (
    <WellnessShell>
      <section className="py-4 sm:py-8">
        <WellnessHeader eyebrow="Eat with ease" title="Everyday nutrition" description="A collection of flexible food ideas for balanced breakfasts, lunches, dinners, snacks and beyond." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{nutritionGroups.map((group) => <NutritionCard key={group.title} group={group} />)}</div>
        <div className="mt-6 rounded-[26px] bg-[#163c27] p-6 text-white shadow-lg">
          <h2 className="text-xl font-black">A balanced approach</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">{nutritionTips.map((tip) => <p key={tip} className="flex gap-3 text-sm leading-6 text-white/75"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b7df86]" />{tip}</p>)}</div>
        </div>
      </section>
    </WellnessShell>
  );
}
