import { Trophy } from "lucide-react";
import Image from "next/image";

export default function ChallengesHeader() {
  return (
    <div className="relative flex justify-between items-start mb-6">
      <div className="max-w-xl z-10 pt-2">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
            <Trophy size={20} className="fill-green-600 dark:fill-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Cooking Challenges
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          Join exciting cooking challenges, showcase your skills,
          and win amazing rewards!
        </p>
      </div>

      {/* Decorative Food Elements */}
      <div className="absolute top-0 right-0 w-80 h-32 hidden md:block opacity-90 pointer-events-none">
        <div className="relative w-full h-full">
           <Image
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=80"
            alt="Healthy ingredients"
            fill
            className="object-cover object-left"
            style={{ WebkitMaskImage: 'radial-gradient(ellipse at right, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)' }}
          />
        </div>
      </div>
    </div>
  );
}
