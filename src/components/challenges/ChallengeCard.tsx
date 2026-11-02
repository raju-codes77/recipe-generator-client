import Image from "next/image";
import Link from "next/link";
import { Users, Clock, Flame } from "lucide-react";

export default function ChallengeCard({ challenge }: { challenge: any }) {
  return (
    <Link href={`/challenges/${challenge.id}`} className="group relative w-full h-[280px] rounded-2xl overflow-hidden block">
      <Image
        src={challenge.coverImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80"}
        alt={challenge.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        {challenge.isFeatured && (
          <span className="bg-orange-500 text-xs font-bold px-2 py-1 rounded-md mb-2 inline-flex items-center gap-1">
            <Flame size={12} /> Featured
          </span>
        )}
        <h3 className="text-xl font-bold mb-1">{challenge.title}</h3>
        <p className="text-sm text-gray-300 line-clamp-1 mb-3">{challenge.description}</p>
        <div className="flex gap-4 text-xs font-medium text-gray-300">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-green-400" />
            <span>{challenge.durationDays} Days</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-green-400" />
            <span>{challenge._count?.participants || 0} Joined</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
