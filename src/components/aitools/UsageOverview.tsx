import { ChefHat, Camera, BarChart3, Sparkles, Smile, ArrowUp } from "lucide-react";

export default function UsageOverview() {
  const stats = [
    {
      id: 1,
      label: "Recipes Generated",
      value: "2,451",
      trend: "18.2%",
      icon: ChefHat,
      color: "text-green-600 bg-green-50 dark:bg-green-900/30",
    },
    {
      id: 2,
      label: "Photos Analyzed",
      value: "1,876",
      trend: "22.1%",
      icon: Camera,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-900/30",
    },
    {
      id: 3,
      label: "Nutrition Analyses",
      value: "1,324",
      trend: "15.7%",
      icon: BarChart3,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30",
    },
    {
      id: 4,
      label: "Flavor Pairings",
      value: "892",
      trend: "9.8%",
      icon: Sparkles,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-900/30",
    },
    {
      id: 5,
      label: "Taste Matches",
      value: "624",
      trend: "14.3%",
      icon: Smile,
      color: "text-orange-500 bg-orange-50 dark:bg-orange-900/30",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm mb-6 h-full flex flex-col justify-center">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Usage Overview</h3>
        <select className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>All Time</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.color} transition-transform group-hover:scale-110 duration-300`}>
              <stat.icon size={18} />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-1">{stat.value}</p>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-2">{stat.label}</p>
            <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 dark:text-green-400">
              <ArrowUp size={12} />
              <span>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
