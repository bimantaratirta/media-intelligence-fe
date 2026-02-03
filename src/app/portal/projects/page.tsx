"use client";

import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { ProjectCard } from "@/components/shared/project-card";
import { CreateProjectCard } from "@/components/shared/create-project-card";
import { useTopics } from "@/lib/api/hooks/use-topics";

export default function ProjectsPage() {
  const router = useRouter();
  const { data: topics, isLoading, error } = useTopics();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Your Projects</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your social media monitoring topics</p>
        </div>
        <Button onClick={() => router.push("/portal/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </Button>
      </div>

      {/* Search (optional - for when there are many projects) */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="Search projects..." className="pl-10" />
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-[280px]">
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full mt-auto" />
              </div>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">Failed to load projects</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics?.map((topic) => (
            <ProjectCard key={topic.id} topic={topic} />
          ))}
          <CreateProjectCard />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && topics?.length === 0 && (
        <div className="text-center py-12">
          <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-lg">No projects yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Create your first project to start monitoring</p>
          <Button className="mt-4" onClick={() => router.push("/portal/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </div>
      )}
    </div>
  );
}
