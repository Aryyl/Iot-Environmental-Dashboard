import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen bg-[#f4f3ed]">
      {/* Sidebar - fixed width */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 pr-6">
        <Navbar />
        <div className="flex-1 overflow-auto pb-6 px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
