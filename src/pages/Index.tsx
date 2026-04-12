import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { GreetingHeader } from "@/components/dashboard/GreetingHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { StudyPlanCards } from "@/components/dashboard/StudyPlanCards";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { SubjectMastery } from "@/components/dashboard/SubjectMastery";
import { FocusMode } from "@/components/dashboard/FocusMode";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { WeakTopicsRadar } from "@/components/dashboard/WeakTopicsRadar";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border px-2 lg:hidden">
            <SidebarTrigger />
          </header>
          <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <GreetingHeader />
            <StatsCards />
            <QuickActions />
            <StudyPlanCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PerformanceChart />
              <SubjectMastery />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FocusMode />
              <WeakTopicsRadar />
              <div className="space-y-4">
                <MoodTracker />
                <Leaderboard />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
