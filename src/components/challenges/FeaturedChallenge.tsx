import Image from "next/image";
import { Flame, Calendar, Users, Gift, ArrowRight } from "lucide-react";

export default function FeaturedChallenge() {
  return (
    <div className="relative w-full h-[320px] rounded-3xl overflow-hidden mb-10 group">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80"
        alt="Healthy Eating Challenge"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/70 to-transparent"></div>

      {/* Content Content */}
      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-center max-w-2xl text-white">
        
        {/* Featured Tag */}
        <div className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-4 w-fit">
          <Flame size={14} />
          <span>Featured Challenge</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          7-Day Healthy Eating Challenge
        </h2>
        
        <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
          Cook healthy, eat well, and feel your best! Share your healthy meals for 7 days and inspire the community.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-green-400" />
            <span>May 12 - May 18, 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-green-400" />
            <span>2.4K Participants</span>
          </div>
          <div className="flex items-center gap-2">
            <Gift size={16} className="text-green-400" />
            <span>Amazing Rewards</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="bg-white text-green-900 font-bold px-6 py-2.5 rounded-lg hover:bg-green-50 transition-colors">
            Join Challenge
          </button>
          <button className="flex items-center gap-2 text-white font-medium hover:text-green-200 transition-colors group/btn">
            View Details
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Circular Badge floating on right */}
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-4 border-white/20 bg-green-900/40 backdrop-blur-md flex flex-col items-center justify-center text-white hidden md:flex rotate-12 hover:rotate-0 transition-all duration-300">
        <span className="text-3xl font-black">7</span>
        <span className="text-xs font-medium uppercase tracking-wider text-green-100">Days</span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-green-200">Challenge</span>
      </div>
    </div>
  );
}
