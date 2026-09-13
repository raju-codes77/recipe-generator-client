"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const FALLBACK_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60",
];

export default function CommunitySection() {
  const [avatars, setAvatars] = useState<string[]>(FALLBACK_AVATARS);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);

  useEffect(() => {
    async function fetchDynamicCommunityData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        // Fetch recent recipes to get real active user avatars
        const res = await fetch(`${apiUrl}/api/recipes?limit=20`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.recipes) {
            // Extract unique author profile images
            const uniqueAvatars = new Set<string>();
            data.recipes.forEach((recipe: any) => {
              if (recipe.author?.profileImage) {
                uniqueAvatars.add(recipe.author.profileImage);
              }
            });

            const realAvatars = Array.from(uniqueAvatars);
            
            // If we have real avatars, use them! If we have fewer than 6, backfill with fallbacks.
            if (realAvatars.length > 0) {
              const combinedAvatars = [...realAvatars, ...FALLBACK_AVATARS].slice(0, 6);
              setAvatars(combinedAvatars);
            }
            
            // Just for dynamic flavor, we can use the total recipes to imply community size, 
            // or if the backend provides pagination totals, we can use that.
            if (data.total) {
              setTotalUsers(data.total * 12); // Rough multiplier to imply active users based on recipes
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch dynamic community data:", error);
      }
    }

    fetchDynamicCommunityData();
  }, []);

  return (
    <section className="w-full py-12 lg:py-16 px-6 lg:px-8 flex justify-center bg-[#F8FAF8] dark:bg-[#080B12]">
      <div className="relative w-full max-w-[1000px] rounded-[28px] overflow-hidden shadow-2xl flex flex-col items-center justify-center py-14 px-6 lg:py-16 text-center">
        
        {/* Core Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1A13] via-[#091F14] to-[#0B1522] pointer-events-none" />

        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

        {/* Left Decorative Image — Fully Blended */}
        <div className="absolute top-0 left-0 w-40 h-40 md:w-64 md:h-64 pointer-events-none opacity-40 mix-blend-overlay mask-radial-fade">
          <Image 
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=80" 
            alt="Decorative leaf and food" 
            fill sizes="(max-width: 768px) 100vw, 50vw" 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0B1A13] via-[#0B1A13]/50" />
        </div>

        {/* Right Decorative Image — Fully Blended */}
        <div className="absolute bottom-0 right-0 w-40 h-40 md:w-72 md:h-72 pointer-events-none opacity-30 mix-blend-overlay mask-radial-fade">
          <Image 
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80" 
            alt="Decorative bowl and leaf" 
            fill sizes="(max-width: 768px) 100vw, 50vw" 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-[#0B1522] via-[#0B1522]/50" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-emerald-400 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5 w-fit shadow-sm">
            <span>Join {totalUsers ? (totalUsers > 1000 ? `${(totalUsers / 1000).toFixed(1)}k+` : `${totalUsers}+`) : "50,000+"} Creators</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[52px] font-black text-white tracking-tight mb-5 leading-[1.1]">
            Join a Community of <br className="hidden md:block" />
            <span 
              className="drop-shadow-lg"
              style={{
                background: 'linear-gradient(90deg, #4AB741 0%, #10B981 50%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Food Lovers
            </span>
          </h2>
          
          <p className="text-stone-300/80 text-base md:text-lg font-medium mb-10 max-w-lg leading-relaxed">
            Share your AI-generated creations, rate community recipes, and discover daily inspiration from thousands of active home cooks.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            
            {/* Avatars */}
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <div key={index} className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#091F14] overflow-hidden shadow-lg hover:-translate-y-1.5 transition-transform duration-300 z-0">
                  <Image src={avatar} alt="Community member" fill sizes="80px" className="object-cover" />
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/community" className="group">
              <div 
                className="inline-flex items-center gap-2 text-white font-bold py-3 px-7 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-[15px]"
                style={{
                  background: 'linear-gradient(90deg, #154D31 0%, #24733E 50%, #10B981 100%)',
                  backgroundSize: '200% 100%',
                  transition: 'background-position 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundPosition = 'right center'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundPosition = 'left center'}
              >
                <span>Join the Community</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}
