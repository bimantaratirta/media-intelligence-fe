"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { TriageCard } from "@/components/shared/triage-card";
import { Skeleton } from "@/components/ui/skeleton";

async function fetchClusters(topicId: string) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const data = await import("@/mocks/data/mentions.json");
  return data.default.clusters;
}

export default function MentionsClustersPage() {
  const params = useParams();
  const topicId = params.topicId as string;

  const { data: clusters, isLoading } = useQuery({
    queryKey: ["mention-clusters", topicId],
    queryFn: () => fetchClusters(topicId),
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Mention Triage</h1>
        <p className="text-slate-500">Quick categorization for efficient review</p>
      </div>

      {/* Cluster Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? [...Array(10)].map((_, i) => <Skeleton key={i} className="h-48" />)
          : clusters?.map((cluster) => <TriageCard key={cluster.id} cluster={cluster} />)}
      </div>
    </div>
  );
}
