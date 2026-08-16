import Image from "next/image";
import Link from "next/link";
import { Search, Bell } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full px-4 pt-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="FoodCanvas Logo" 
              width={150} 
              height={40} 
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[15px] font-semibold text-emerald-700">
            Home
          </Link>
          <Link href="/recipes" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Recipes
          </Link>
          <Link href="/ai-tools" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
            AI Tools
          </Link>
          <Link href="/community" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Community
          </Link>
          <Link href="/challenges" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Challenges
          </Link>
        </nav>

        {/* Right Section (Search & Actions) */}
        <div className="flex items-center gap-4">
          
          {/* Search Bar */}
          <div className="hidden lg:flex items-center relative">
            <div className="absolute left-3 text-gray-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search recipes, ingredient..." 
              className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Notifications */}
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell size={20} />
            {/* Notification badge indicator (optional) */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <button className="h-9 w-9 rounded-full overflow-hidden border border-gray-200">
            <Image 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User profile" 
              width={36} 
              height={36} 
              className="object-cover w-full h-full"
            />
          </button>
        </div>

      </header>
    </div>
  );
}
