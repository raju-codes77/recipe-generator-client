'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiArrowLeft, FiCalendar, FiClock, FiDollarSign, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

interface NutritionistType {
  id: string;
  name: string;
  education: string;
  specialty: string;
  available_time: string;
  fees: number;
  image_url: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function NutritionistDetailPage({ params }: PageProps) {
  const router = useRouter();
  
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const [nutritionist, setNutritionist] = useState<NutritionistType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    appointmentDate: '',
    slotTime: '',
  });

  const fetchNutritionistDetails = async (nutritionistId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`http://localhost:5000/api/nutritionist/${nutritionistId}`);
      const data = await res.json();

      if (data.success) {
        setNutritionist(data.data);
      } else {
        setError(data.message || 'Nutritionist information not found.');
      }
    } catch (err) {
      console.error('Error fetching details:', err);
      setError('Server connection error. Please check if your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNutritionistDetails(id);
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nutritionistId: id,
          ...formData,
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success('Your appointment has been successfully booked!');
        setFormData({ patientName: '', email: '', phone: '', appointmentDate: '', slotTime: '' });
      } else {
        toast.error('Failed to book appointment: ' + (result.message || 'Please try again'));
      }
    } catch (err) {
      console.error('Booking error:', err);
      toast.error('A server error occurred, please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8f3] dark:bg-[#101611]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#dce8d4] border-t-[#2F8F46]"></div>
      </div>
    );
  }

  if (error || !nutritionist) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f7f8f3] px-4 dark:bg-[#101611]">
        <p className="text-red-500 font-medium">{error || 'Nutritionist not found'}</p>
        <button 
          onClick={() => router.back()} 
          className="rounded-xl bg-[#2F8F46] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#235f31]"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8f3] px-4 pb-16 pt-24 text-slate-900 dark:bg-[#101611] dark:text-white sm:px-6 lg:px-8">
      {/* Toaster Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => router.back()}
          className="mb-7 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition hover:text-[#2F8F46] dark:text-white/50"
        >
          <FiArrowLeft size={18} /> Back to List
        </button>

        <div className="mb-8 rounded-[28px] bg-[#1f6a3a] p-6 text-white shadow-xl shadow-[#1f6a3a]/15 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8e59f]">Personal consultation</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Build a healthier routine with expert guidance.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">Choose a time below and take the next step toward food choices that work in real life.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="h-fit rounded-[26px] border border-[#e1e7dc] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
            <Image
              width={112}
              height={112}
              src={(nutritionist.image_url || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80").trimEnd()}
              alt={nutritionist.name}
              className="mx-auto mb-4 h-28 w-28 rounded-3xl border-2 border-[#b7df86] object-cover shadow-md"
            />
            <h2 className="text-center text-xl font-bold text-slate-900 dark:text-white">{nutritionist.name}</h2>
            <p className="mt-1 text-center text-xs font-semibold text-[#2F8F46] dark:text-[#b7df86]">{nutritionist.specialty}</p>
            <p className="mt-1 text-center text-xs text-slate-400 dark:text-white/40">{nutritionist.education}</p>

            <div className="mt-6 space-y-3 border-t border-[#edf0e9] pt-6 text-sm dark:border-white/10">
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1.5"><FiClock size={16} className="text-[#2F8F46]" /> Timing:</span>
                <span className="font-medium text-xs">{nutritionist.available_time || "10:00 AM - 04:00 PM"}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1.5"><FiDollarSign size={16} className="text-[#e6923b]" /> Consultation Fee:</span>
                <span className="font-bold text-[#2F8F46]">৳{nutritionist.fees}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-[#e1e7dc] bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8 lg:col-span-2">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Book an appointment</h3>
            <p className="mb-6 mt-2 text-xs leading-5 text-slate-500 dark:text-white/50">Tell us where to reach you and select a convenient time for your consultation.</p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-white/70">Your Name</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400"><FiUser size={16} /></span>
                  <input
                    type="text"
                    name="patientName"
                    required
                    value={formData.patientName}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className="w-full rounded-xl border border-[#dfe5da] bg-[#f8faf6] py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#7fb35c] focus:ring-2 focus:ring-[#b7df86]/25 dark:border-white/10 dark:bg-black/20 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-white/70">Email Address</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-400"><FiMail size={16} /></span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@gmail.com"
                      className="w-full rounded-xl border border-[#dfe5da] bg-[#f8faf6] py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#7fb35c] focus:ring-2 focus:ring-[#b7df86]/25 dark:border-white/10 dark:bg-black/20 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-white/70">Mobile Number</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-400"><FiPhone size={16} /></span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="017xxxxxxxx"
                      className="w-full rounded-xl border border-[#dfe5da] bg-[#f8faf6] py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#7fb35c] focus:ring-2 focus:ring-[#b7df86]/25 dark:border-white/10 dark:bg-black/20 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-white/70">Select Date</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-400"><FiCalendar size={16} /></span>
                    <input
                      type="date"
                      name="appointmentDate"
                      required
                      value={formData.appointmentDate}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-[#dfe5da] bg-[#f8faf6] py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#7fb35c] focus:ring-2 focus:ring-[#b7df86]/25 dark:border-white/10 dark:bg-black/20 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-white/70">Time Slot</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-400"><FiClock size={16} /></span>
                    <input
                      type="text"
                      name="slotTime"
                      required
                      value={formData.slotTime}
                      onChange={handleInputChange}
                      placeholder="e.g. 03:30 PM - 04:00 PM"
                      className="w-full rounded-xl border border-[#dfe5da] bg-[#f8faf6] py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#7fb35c] focus:ring-2 focus:ring-[#b7df86]/25 dark:border-white/10 dark:bg-black/20 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F8F46] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2F8F46]/15 transition hover:bg-[#235f31] disabled:opacity-50"
              >
                {submitting ? 'Processing Booking...' : 'Confirm Appointment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}