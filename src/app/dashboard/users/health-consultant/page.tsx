"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FiActivity, 
  FiStar, 
  FiCalendar, 
  FiVideo, 
  FiShield, 
  FiCheckCircle, 
  FiSearch, 
  FiAward,
  FiClock,
  FiUserCheck
} from "react-icons/fi";
import { Sparkles, HeartPulse, Stethoscope, Apple } from "lucide-react";

// ডেমো কনসালটেন্ট ও নিউট্রিশনিস্ট ডাটা
const consultants = [
  {
    id: 1,
    name: "Dr. Sarah Al-Ameen",
    title: "Chief Clinical Nutritionist & Dietitian",
    specialty: "Weight Management & Clinical Diet",
    rating: 4.9,
    reviews: 142,
    experience: "10+ Years Exp.",
    image: "https://images.unsplash.com/photo-1594824813575-2b47e5b02660?auto=format&fit=crop&w=400&q=80",
    available: "Available Today",
    tag: "Top Rated",
    type: "Nutritionist"
  },
  {
    id: 2,
    name: "Dr. Michael Chen, MD",
    title: "Endocrinologist & Metabolic Specialist",
    specialty: "Diabetes & Metabolic Health",
    rating: 4.8,
    reviews: 98,
    experience: "12+ Years Exp.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    available: "Next Slot: Tomorrow",
    tag: "Specialist",
    type: "Doctor"
  },
  {
    id: 3,
    name: "Dr. Aliza Rahman",
    title: "Holistic Health & Sports Nutritionist",
    specialty: "Athletic Diet & Muscle Gain",
    rating: 4.95,
    reviews: 210,
    experience: "8+ Years Exp.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    available: "Available Today",
    tag: "Popular",
    type: "Nutritionist"
  },
  {
    id: 4,
    name: "Dr. David Vance",
    title: "Cardiologist & Preventive Health Expert",
    specialty: "Heart Health & Lifestyle Medicine",
    rating: 4.75,
    reviews: 85,
    experience: "15+ Years Exp.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    available: "Next Slot: Monday",
    tag: "Expert",
    type: "Doctor"
  }
];

export default function HealthConsultantPage() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsultant, setSelectedConsultant] = useState<any>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // ফিল্টারিং লজিক
  const filteredConsultants = consultants.filter((item) => {
    const matchesFilter = filter === "All" || item.type === filter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleBooking = (consultant: any) => {
    setSelectedConsultant(consultant);
    setBookingSuccess(false);
  };

  const confirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedConsultant(null);
      setBookingSuccess(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* Top Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-emerald-600 via-[#2F8F46] to-teal-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden mb-10"
        >
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={14} className="text-orange-300" /> AI & Expert Health Hub
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Consult with Expert Doctors & Nutritionists
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6">
              Get personalized diet plans, medical advice, and continuous health tracking from certified professionals to live a healthier life.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <FiShield className="text-emerald-300" /> 100% Verified Experts
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <FiVideo className="text-emerald-300" /> Secure Video Consultations
              </span>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 w-full md:w-auto">
            {["All", "Nutritionist", "Doctor"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 md:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  filter === tab
                    ? "bg-[#2F8F46] text-white shadow-md shadow-emerald-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                {tab === "All" ? "All Experts" : tab === "Nutritionist" ? "Nutritionists" : "Doctors"}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 shadow-sm"
            />
          </div>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredConsultants.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800/80 p-5 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image & Tag */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 shadow-md">
                    {expert.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-medium text-white flex items-center gap-1">
                    <FiClock size={10} /> {expert.available}
                  </span>
                </div>

                {/* Details */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      {expert.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md text-amber-500 text-xs font-bold">
                      <FiStar size={12} className="fill-amber-500" />
                      <span>{expert.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    {expert.title}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {expert.specialty} • {expert.experience}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleBooking(expert)}
                className="w-full py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-[#2F8F46] hover:text-white text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-emerald-500/20"
              >
                <FiCalendar size={14} /> Book Consultation
              </button>
            </motion.div>
          ))}
        </div>

        {/* Booking Modal */}
        {selectedConsultant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative"
            >
              {bookingSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <FiCheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Booking Confirmed!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your appointment with <span className="font-bold text-emerald-600">{selectedConsultant.name}</span> has been scheduled successfully. We will email you the video link shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={selectedConsultant.image}
                      alt={selectedConsultant.name}
                      className="w-14 h-14 rounded-2xl object-cover shadow-md"
                    />
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {selectedConsultant.name}
                      </h3>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        {selectedConsultant.title}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={confirmBooking} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Select Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        required
                        className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Health Notes / Main Concern
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe your health goals or diet concerns..."
                        required
                        className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedConsultant(null)}
                        className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-2xl bg-[#2F8F46] hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-500/30 transition-all"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}