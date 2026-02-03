"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useProjectStore } from "@/stores/project-store";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

// Mock fetch topic - replace with actual API
async function fetchTopic(topicId: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Return mock topic data
  return {
    id: topicId,
    name: topicId === "topic-1" ? "Brand X Monitoring" : "Project " + topicId,
  };
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;
  const { setTopic } = useProjectStore();
  const { sidebarCollapsed } = useUIStore();

  // Fetch topic data
  const {
    data: topic,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topic", topicId],
    queryFn: () => fetchTopic(topicId),
    enabled: !!topicId,
  });

  // Set topic in store when loaded
  useEffect(() => {
    if (topic) {
      setTopic(topic.id, topic.name);
    }
  }, [topic, setTopic]);

  // Redirect if topic not found
  useEffect(() => {
    if (error) {
      router.push("/portal/projects");
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Topbar />
      <Sidebar />

      {/* Main Content */}
      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] mt-16 pt-6 pb-8 transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64",
          "px-4 lg:px-8",
        )}
      >
        {children}
      </main>
    </div>
  );
}
