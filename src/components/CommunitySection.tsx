import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CommunitySection() {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60",
  ];

  return (
    <section className="w-full py-16 lg:py-20 px-6 lg:px-8 flex justify-center bg-[#FCFBF8] dark:bg-[#0b0f19]">
      <div className="relative w-full max-w-[1200px] bg-stone-900 dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg flex flex-col items-center justify-center py-16 px-6 lg:py-20 text-center border border-stone-800">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

        {/* Left Decorative Image */}
        <div className="absolute top-0 left-0 w-24 h-24 md:w-56 md:h-56 pointer-events-none">
          <div className="relative w-full h-full -translate-x-1/4 -translate-y-1/4 opacity-30">
             <Image 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&auto=format&fit=crop&q=80" 
                alt="Decorative leaf and food" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover rounded-full mix-blend-overlay"
             />
          </div>
        </div>

        {/* Right Decorative Image */}
        <div className="absolute bottom-0 right-0 w-24 h-24 md:w-64 md:h-64 pointer-events-none">
          <div className="relative w-full h-full translate-x-1/4 translate-y-1/4 opacity-30">
             <Image 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=80" 
                alt="Decorative bowl and leaf" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover rounded-full mix-blend-overlay"
             />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
            Join a Community of <span className="text-emerald-500">Food Lovers</span>
          </h2>
          <p className="text-stone-400 text-base font-medium mb-10 max-w-md leading-relaxed">
            Share your AI-generated creations, rate community recipes, and discover daily inspiration from thousands of active home cooks.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            
            {/* Avatars */}
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <div key={index} className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-stone-900 overflow-hidden shadow-sm hover:-translate-y-1 transition-transform duration-300 z-0">
                  <Image src={avatar} alt="Community member" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/community" className="group">
              <div className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-7 rounded-full shadow-sm transition-all group-hover:scale-105 active:scale-95 text-[15px] flex items-center gap-2">
                Join the Community
              </div>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}
