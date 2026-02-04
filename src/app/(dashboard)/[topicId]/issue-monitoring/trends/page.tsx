"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { InteractiveTrendChart } from "@/components/charts/interactive-trend-chart";
import { ActivityHeatmap } from "@/components/charts/activity-heatmap";
import { AnomalyCard } from "@/components/shared/anomaly-card";
import { SpikeDetailPanel } from "@/components/shared/spike-detail-panel";
import { Lightbulb } from "lucide-react";

interface TrendDataPoint {
  date: string;
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  isSpike?: boolean;
}

interface Anomaly {
  id: string;
  datetime: string;
  type: "spike" | "dip";
  change: number;
  trigger: string;
  mentions: number;
  avgMentions: number;
  rootCause?: {
    type: string;
    author: string;
    content: string;
    url: string;
    engagement?: {
      likes: number;
      retweets: number;
      replies: number;
    };
  };
  topKeywords?: string[];
  relatedMentionCount?: number;
  note?: string;
}

interface HeatmapData {
  day: string;
  hours: number[];
}

interface TrendsData {
  mainTrend: TrendDataPoint[];
  anomalies: Anomaly[];
  heatmapData: HeatmapData[];
  peakActivity: {
    days: string[];
    hours: string[];
    insight: string;
  };
}

async function fetchTrendsData(topicId: string): Promise<TrendsData> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const data = await import("@/mocks/data/trends-analysis.json");
  return data.default as TrendsData;
}

export default function TrendsAnalysisPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const [viewMode, setViewMode] = useState<"total" | "sentiment" | "platform">(
    "total"
  );
  const [granularity, setGranularity] = useState("hour");
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["trends-analysis", topicId],
    queryFn: () => fetchTrendsData(topicId),
  });

  const handlePointClick = (point: TrendDataPoint) => {
    const anomaly = data?.anomalies.find((a) =>
      a.datetime.includes(point.date.split(" ")[0])
    );
    if (anomaly) setSelectedAnomaly(anomaly);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Trend Analysis</h1>
          <p className="text-slate-500">
            Deep-dive into temporal patterns and anomalies
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={granularity} onValueChange={setGranularity}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hour">Hourly</SelectItem>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
            </SelectContent>
          </Select>
          <DateRangePicker />
        </div>
      </div>

      {/* Main Trend Chart */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Mention Trend</CardTitle>
            <Tabs
              value={viewMode}
              onValueChange={(v) =>
                setViewMode(v as "total" | "sentiment" | "platform")
              }
            >
              <TabsList>
                <TabsTrigger value="total">Total</TabsTrigger>
                <TabsTrigger value="sentiment">By Sentiment</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[400px]" />
          ) : (
            <InteractiveTrendChart
              data={data?.mainTrend || []}
              viewMode={viewMode}
              onPointClick={handlePointClick}
            />
          )}
        </CardContent>
      </Card>

      {/* Anomalies & Detail */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Anomaly List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Detected Anomalies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              [...Array(3)].map((_, i) => <Skeleton key={i} className="h-24" />)
            ) : (
              data?.anomalies.map((anomaly) => (
                <AnomalyCard
                  key={anomaly.id}
                  anomaly={anomaly}
                  selected={selectedAnomaly?.id === anomaly.id}
                  onClick={() => setSelectedAnomaly(anomaly)}
                />
              ))
            )}
          </CardContent>
        </Card>

        {/* Spike Detail */}
        <div className="lg:col-span-2">
          <SpikeDetailPanel anomaly={selectedAnomaly} />
        </div>
      </div>

      {/* Activity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[250px]" />
          ) : (
            <>
              <ActivityHeatmap data={data?.heatmapData || []} />
              {data?.peakActivity && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {data.peakActivity.insight}
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
