import DashboardSidebar from "@/components/DashboardSidebar";

export default function NextDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FCFDF9] text-gray-900 dark:bg-black dark:text-[#F6F0D7] flex w-full relative">
      {/* Sidebar Component */}
      <DashboardSidebar />
      
      {/* Main Content Screen */}
      <div className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gradient-to-b from-transparent via-[#2F8F46]/5 to-transparent">
          {children}
        </main>
      </div>
    </div>
  );
}