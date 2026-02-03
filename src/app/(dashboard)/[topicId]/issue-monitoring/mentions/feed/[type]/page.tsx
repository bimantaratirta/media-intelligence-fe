"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Filter, SortDesc } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { MentionCard } from "@/components/shared/mention-card";
import { SentimentEditDialog } from "@/components/shared/sentiment-edit-dialog";

interface Mention {
  id: string;
  content: string;
  platform: string;
  author: {
    username: string;
    displayName: string;
    followers: number;
    isVerified: boolean;
    botScore: number;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views?: number | null;
  };
  sentiment: {
    auto: string;
    autoScore: number;
    manual?: string | null;
  };
  emotion: {
    primary: string;
    score: number;
  };
  location?: {
    provinceName: string;
  } | null;
  originalUrl: string;
  createdAt: string;
  isHandled: boolean;
  isFlagged: boolean;
}

async function fetchMentions(topicId: string, type: string) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const data = await import("@/mocks/data/mentions.json");
  return {
    cluster: data.default.clusters.find((c) => c.id === type),
    mentions: data.default.mentions as Mention[],
  };
}

export default function MentionsFeedPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;
  const type = params.type as string;

  const [editingMention, setEditingMention] = useState<Mention | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["mentions-feed", topicId, type],
    queryFn: () => fetchMentions(topicId, type),
  });

  const handleSelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleSaveSentiment = (mentionId: string, sentiment: string) => {
    console.log("Save sentiment:", mentionId, sentiment);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push(`/${topicId}/issue-monitoring/mentions/clusters`)}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Triage
          </Button>

          <div>
            <h1 className="text-2xl font-bold">{data?.cluster?.name || "Mentions"}</h1>
            <p className="text-slate-500">{data?.cluster?.count.toLocaleString()} mentions</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SortDesc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Most Recent</DropdownMenuItem>
              <DropdownMenuItem>Highest Engagement</DropdownMenuItem>
              <DropdownMenuItem>Most Negative</DropdownMenuItem>
              <DropdownMenuItem>Most Reach</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Platforms</DropdownMenuItem>
              <DropdownMenuItem>Twitter Only</DropdownMenuItem>
              <DropdownMenuItem>Instagram Only</DropdownMenuItem>
              <DropdownMenuItem>Unhandled Only</DropdownMenuItem>
              <DropdownMenuItem>Flagged Only</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <span className="text-sm font-medium">{selectedIds.length} selected</span>
          <Button variant="outline" size="sm">
            Mark Handled
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>
            Clear
          </Button>
        </div>
      )}

      {/* Mentions List */}
      <div className="space-y-4">
        {isLoading
          ? [...Array(5)].map((_, i) => <Skeleton key={i} className="h-48" />)
          : data?.mentions.map((mention) => (
              <MentionCard
                key={mention.id}
                mention={mention}
                selected={selectedIds.includes(mention.id)}
                onSelect={handleSelect}
                onEditSentiment={setEditingMention}
                onMarkHandled={(id) => console.log("Mark handled:", id)}
                onFlag={(id) => console.log("Flag:", id)}
              />
            ))}
      </div>

      {/* Load More */}
      {!isLoading && (
        <div className="flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      )}

      {/* Edit Dialog */}
      <SentimentEditDialog
        open={!!editingMention}
        onClose={() => setEditingMention(null)}
        mention={
          editingMention
            ? {
                id: editingMention.id,
                content: editingMention.content,
                autoSentiment: editingMention.sentiment.auto,
                manualSentiment: editingMention.sentiment.manual || null,
              }
            : null
        }
        onSave={handleSaveSentiment}
      />
    </div>
  );
}
