"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Edit2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { SentimentGauge } from "@/components/charts/sentiment-gauge";
import { EmotionRadar } from "@/components/charts/emotion-radar";
import { MentionTrendChart } from "@/components/charts/mention-trend-chart";
import { SentimentByPlatformChart } from "@/components/charts/sentiment-by-platform";
import { SentimentEditDialog } from "@/components/shared/sentiment-edit-dialog";
import { formatCompact } from "@/lib/utils";

// Helper function
function formatRelative(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

function getSentimentBgColor(sentiment: string): string {
  switch (sentiment) {
    case "positive":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "negative":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
  }
}

// Mock fetch
async function fetchSentimentData(topicId: string) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const data = await import("@/mocks/data/sentiment-analysis.json");
  return data.default;
}

interface Mention {
  id: string;
  content: string;
  autoSentiment: string;
  manualSentiment: string | null;
  autoEmotion: string;
  createdAt: string;
}

export default function SentimentAnalysisPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const [editingMention, setEditingMention] = useState<Mention | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["sentiment-analysis", topicId],
    queryFn: () => fetchSentimentData(topicId),
  });

  const handleSaveSentiment = (mentionId: string, sentiment: string) => {
    console.log("Save sentiment:", mentionId, sentiment);
    // TODO: Call API to update sentiment
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sentiment Analysis</h1>
          <p className="text-slate-500">Understand public perception and emotions</p>
        </div>
        <DateRangePicker />
      </div>

      {/* Sentiment Score & Distribution */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Score</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            {isLoading ? (
              <div className="h-40 w-48 animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
            ) : (
              <SentimentGauge value={data?.sentimentScore.value || 0} change={data?.sentimentScore.change || 0} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {(["positive", "neutral", "negative"] as const).map((sentiment) => {
                  const item = data?.distribution[sentiment];
                  const colors = {
                    positive: "bg-green-500",
                    neutral: "bg-slate-500",
                    negative: "bg-red-500",
                  };
                  return (
                    <div key={sentiment}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize">{sentiment}</span>
                        <span>
                          {item?.percentage}% ({formatCompact(item?.count || 0)})
                        </span>
                      </div>
                      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors[sentiment]} rounded-full transition-all`}
                          style={{ width: `${item?.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Trend Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[300px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
          ) : (
            <MentionTrendChart data={data?.trend || []} />
          )}
        </CardContent>
      </Card>

      {/* Emotion Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Emotion Radar</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[250px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
            ) : (
              <EmotionRadar data={data?.emotions || {}} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emotion Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-6 animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(data?.emotions || {})
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([emotion, value]) => {
                    const emojis: Record<string, string> = {
                      joy: "😊",
                      anger: "😠",
                      sadness: "😢",
                      fear: "😨",
                      surprise: "😲",
                      disgust: "🤢",
                      neutral: "😐",
                    };
                    return (
                      <div key={emotion} className="flex items-center gap-3">
                        <span className="text-lg">{emojis[emotion]}</span>
                        <span className="w-20 capitalize text-sm">{emotion}</span>
                        <div className="flex-1 h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${value}%` }} />
                        </div>
                        <span className="text-sm text-slate-500 w-12 text-right">{value}%</span>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sentiment By Platform */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment by Platform</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[300px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
          ) : (
            <SentimentByPlatformChart data={data?.byPlatform || []} />
          )}
        </CardContent>
      </Card>

      {/* Sentiment Drivers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Positive Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-6 animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {data?.positiveDrivers.map((driver) => (
                  <div key={driver.word} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-28">{driver.word}</span>
                    <div className="flex-1 h-4 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${(driver.count / (data.positiveDrivers[0]?.count || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-slate-500 w-12 text-right">{driver.count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Negative Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-6 animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {data?.negativeDrivers.map((driver) => (
                  <div key={driver.word} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-28">{driver.word}</span>
                    <div className="flex-1 h-4 bg-red-100 dark:bg-red-900/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{
                          width: `${(driver.count / (data.negativeDrivers[0]?.count || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-slate-500 w-12 text-right">{driver.count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Manual Correction Table */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Sentiment Correction</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Content</TableHead>
                <TableHead>Auto</TableHead>
                <TableHead>Manual</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="w-16">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? [...Array(3)].map((_, i) => (
                    <TableRow key={i}>
                      {[...Array(5)].map((_, j) => (
                        <TableCell key={j}>
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : data?.recentMentions.map((mention) => (
                    <TableRow key={mention.id}>
                      <TableCell className="max-w-xs">
                        <p className="truncate text-sm">{mention.content}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSentimentBgColor(mention.autoSentiment)}>{mention.autoSentiment}</Badge>
                      </TableCell>
                      <TableCell>
                        {mention.manualSentiment ? (
                          <Badge className={getSentimentBgColor(mention.manualSentiment)}>{mention.manualSentiment}</Badge>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">{formatRelative(mention.createdAt)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => setEditingMention(mention)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <SentimentEditDialog
        open={!!editingMention}
        onClose={() => setEditingMention(null)}
        mention={editingMention}
        onSave={handleSaveSentiment}
      />
    </div>
  );
}
