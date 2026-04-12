import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { GreetingHeader } from "@/components/dashboard/GreetingHeader";
import { AISuggestionCard } from "@/components/dashboard/AISuggestionCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { StudyProgressCard } from "@/components/dashboard/StudyProgressCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { SubjectMastery } from "@/components/dashboard/SubjectMastery";
import { StudyTaskList } from "@/components/dashboard/StudyTaskList";
import { QuizPerformanceCard } from "@/components/dashboard/QuizPerformanceCard";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { FocusMode } from "@/components/dashboard/FocusMode";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { WeakTopicsRadar } from "@/components/dashboard/WeakTopicsRadar";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AIChatWidget } from "@/components/dashboard/AIChatWidget";
import { MobileNav } from "@/components/dashboard/MobileNav";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border px-2 lg:hidden">
            <SidebarTrigger />
          </header>
          <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 space-y-5 pb-24 md:pb-8">
            <GreetingHeader />
            <AISuggestionCard />
            <StatsCards />
            <QuickActions />

            {/* Main grid: Study Progress + Performance + Mastery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StudyProgressCard />
              <PerformanceChart />
              <SubjectMastery />
            </div>

            {/* Task list + Quiz + AI Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StudyTaskList />
              <QuizPerformanceCard />
              <AIInsightsCard />
            </div>

            {/* Bottom row: Focus + Radar + Mood + Leaderboard */}
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
      <AIChatWidget />
      <MobileNav />
    </SidebarProvider>
  );
};

export default Index;
