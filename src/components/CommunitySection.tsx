import Image from "next/image";
import Link from "next/link";

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
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="relative w-full bg-[#f8f9f5] dark:bg-slate-900/50 rounded-3xl overflow-hidden shadow-sm border border-emerald-50 dark:border-slate-800 flex flex-col items-center justify-center py-16 px-6 lg:py-24 text-center">
        
        {/* Left Decorative Image */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 pointer-events-none">
          <div className="relative w-full h-full -translate-x-1/4 -translate-y-1/4 opacity-90">
             <Image 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&auto=format&fit=crop&q=80" 
                alt="Decorative leaf and food" 
                fill 
                className="object-cover rounded-full mix-blend-multiply dark:mix-blend-lighten"
             />
          </div>
        </div>

        {/* Right Decorative Image */}
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 lg:w-72 lg:h-72 pointer-events-none">
          <div className="relative w-full h-full translate-x-1/4 translate-y-1/4 opacity-90">
             <Image 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=80" 
                alt="Decorative bowl and leaf" 
                fill 
                className="object-cover rounded-full mix-blend-multiply dark:mix-blend-lighten"
             />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Join a Community of Food Lovers
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium mb-8 max-w-md">
            Share recipes, get inspired and grow together.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            
            {/* Avatars */}
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <div key={index} className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden shadow-sm hover:-translate-y-1 transition-transform z-0">
                  <Image src={avatar} alt="Community member" fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/community">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 text-sm md:text-base">
                Join the Community
              </button>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}
