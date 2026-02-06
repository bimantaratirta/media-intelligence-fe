"use client";

import { useRouter } from "next/navigation";
import { Plus, BarChart3, FolderOpen, Clock, Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "@/components/shared/project-card";
import { useTopics } from "@/lib/api/hooks/use-topics";
import { useAuthStore } from "@/stores/auth-store";
import { formatCompact, formatRelative } from "@/lib/utils";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function ProjectsPage() {
  const router = useRouter();
  const { data: topics, isLoading, error } = useTopics();
  const user = useAuthStore((state) => state.user);

  // Calculate aggregate stats
  const totalMentions = topics?.reduce((sum, t) => sum + t.mentionCount, 0) ?? 0;
  const activeProjects = topics?.filter((t) => t.status === "active").length ?? 0;
  const lastUpdate = topics?.length
    ? topics.reduce((latest, t) => (new Date(t.lastCrawledAt) > new Date(latest.lastCrawledAt) ? t : latest)).lastCrawledAt
    : null;

  const userName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {getGreeting()}, {userName}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Here&apos;s what&apos;s happening with your projects</p>
          </div>
          <Button
            onClick={() => router.push("/portal/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Quick Stats */}
        {!isLoading && !error && topics && topics.length > 0 && (
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <span className="font-semibold">{formatCompact(totalMentions)}</span>
              <span className="text-slate-400">total mentions</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Layers className="h-4 w-4 text-green-500" />
              <span className="font-semibold">{activeProjects}</span>
              <span className="text-slate-400">active projects</span>
            </div>
            {lastUpdate && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Clock className="h-4 w-4" />
                <span>Last sync {formatRelative(lastUpdate)}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">Failed to load projects</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      )}

      {/* Projects List */}
      {!isLoading && !error && topics && topics.length > 0 && (
        <div className="space-y-4">
          {topics.map((topic) => (
            <ProjectCard key={topic.id} topic={topic} variant="compact" />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && topics?.length === 0 && (
        <div className="text-center py-16">
          <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">No projects yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Create your first project to start monitoring social media mentions and analytics.
          </p>
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push("/portal/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Project
          </Button>
        </div>
      )}
    </div>
  );
}
