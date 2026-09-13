'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiBriefcase, FiCheckCircle, FiMail, FiPhone, FiUser } from 'react-icons/fi';

export default function NutritionistApplicationPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f8f3] px-4 pb-16 pt-24 text-slate-900 dark:bg-[#101611] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/dashboard/users/example" className="mb-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition hover:text-[#2F8F46] dark:text-white/50"><FiArrowLeft /> Back to experts</Link>
        <section className="overflow-hidden rounded-[28px] bg-[#1f6a3a] p-6 text-white shadow-xl shadow-[#1f6a3a]/15 sm:p-9">
          <div className="flex items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8e59f]">Join the network</p><h1 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">Help people eat better, every day.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-white/70">Share your expertise with a community that values practical, compassionate nutrition advice.</p></div><FiBriefcase className="hidden h-20 w-20 text-[#b7df86]/25 sm:block" /></div>
        </section>

        <section className="mt-6 rounded-[26px] border border-[#e1e7dc] bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center"><FiCheckCircle className="mx-auto h-14 w-14 text-[#2F8F46] dark:text-[#b7df86]" /><h2 className="mt-5 text-2xl font-black">Application received</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-white/55">Thanks for your interest. Our team will review your details and contact you soon.</p><Link href="/dashboard/users/example" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#2F8F46] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#235f31]">Return to experts <FiArrowRight /></Link></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div><h2 className="text-2xl font-black">Tell us about yourself</h2><p className="mt-2 text-sm text-slate-500 dark:text-white/50">This demo form is ready for your application API when it is available.</p></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-xs font-bold text-slate-600 dark:text-white/70">Full name<div className="relative mt-2"><FiUser className="absolute left-4 top-3.5 text-slate-400" /><input required name="name" className="w-full rounded-xl border border-[#dfe5da] bg-[#f8faf6] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#7fb35c] dark:border-white/10 dark:bg-black/20" placeholder="Your name" /></div></label>
                <label className="text-xs font-bold text-slate-600 dark:text-white/70">Email address<div className="relative mt-2"><FiMail className="absolute left-4 top-3.5 text-slate-400" /><input required type="email" name="email" className="w-full rounded-xl border border-[#dfe5da] bg-[#f8faf6] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#7fb35c] dark:border-white/10 dark:bg-black/20" placeholder="you@example.com" /></div></label>
                <label className="text-xs font-bold text-slate-600 dark:text-white/70">Phone number<div className="relative mt-2"><FiPhone className="absolute left-4 top-3.5 text-slate-400" /><input required type="tel" name="phone" className="w-full rounded-xl border border-[#dfe5da] bg-[#f8faf6] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#7fb35c] dark:border-white/10 dark:bg-black/20" placeholder="Your phone number" /></div></label>
                <label className="text-xs font-bold text-slate-600 dark:text-white/70">Specialty<div className="relative mt-2"><FiBriefcase className="absolute left-4 top-3.5 text-slate-400" /><input required name="specialty" className="w-full rounded-xl border border-[#dfe5da] bg-[#f8faf6] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#7fb35c] dark:border-white/10 dark:bg-black/20" placeholder="Sports nutrition, dietetics..." /></div></label>
              </div>
              <label className="block text-xs font-bold text-slate-600 dark:text-white/70">Professional background<textarea required name="background" rows={4} className="mt-2 w-full resize-none rounded-xl border border-[#dfe5da] bg-[#f8faf6] px-4 py-3 text-sm outline-none focus:border-[#7fb35c] dark:border-white/10 dark:bg-black/20" placeholder="Tell us about your qualifications and experience..." /></label>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F8F46] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2F8F46]/15 transition hover:bg-[#235f31] sm:w-auto sm:px-8">Submit application <FiArrowRight /></button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
