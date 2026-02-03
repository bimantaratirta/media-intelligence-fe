"use client";

import { useParams } from "next/navigation";
import { MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { InsightPanel, type Insight } from "@/components/shared/insight-panel";
import { ViralMentionCard, type ViralMention } from "@/components/shared/viral-mention-card";
import { MentionTrendChart } from "@/components/charts/mention-trend-chart";
import { SentimentDonut } from "@/components/charts/sentiment-donut";
import { PlatformBarChart } from "@/components/charts/platform-bar-chart";
import { useIssueOverview } from "@/lib/api/hooks/use-issue-monitoring";

export default function IssueMonitoringOverviewPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const { data, isLoading } = useIssueOverview(topicId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Issue Monitoring</h1>
          <p className="text-slate-500">Track public conversations and sentiment</p>
        </div>
        <DateRangePicker />
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Mentions"
          value={data?.stats.totalMentions.value || 0}
          change={data?.stats.totalMentions.change || 0}
          sparklineData={data?.stats.totalMentions.trend}
          loading={isLoading}
        />
        <StatCard
          title="Reach Estimate"
          value={data?.stats.reach.value || 0}
          change={data?.stats.reach.change || 0}
          sparklineData={data?.stats.reach.trend}
          loading={isLoading}
        />
        <StatCard
          title="Sentiment Score"
          value={data?.stats.sentimentScore.value || 0}
          change={data?.stats.sentimentScore.change || 0}
          format="number"
          sparklineData={data?.stats.sentimentScore.trend}
          loading={isLoading}
        />
        <StatCard
          title="Virality Index"
          value={data?.stats.viralityIndex.value || 0}
          change={data?.stats.viralityIndex.change || 0}
          format="number"
          sparklineData={data?.stats.viralityIndex.trend}
          loading={isLoading}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mention Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mention Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[300px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
            ) : (
              <MentionTrendChart data={data?.mentionTrend || []} />
            )}
          </CardContent>
        </Card>

        {/* Sentiment Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[200px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
            ) : (
              <SentimentDonut data={data?.sentimentBreakdown || { positive: 0, neutral: 0, negative: 0 }} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Platform & Location Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[200px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
            ) : (
              <PlatformBarChart data={data?.platformDistribution || []} />
            )}
          </CardContent>
        </Card>

        {/* Top Provinces */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Top Provinces
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {data?.topProvinces.map((province, index) => (
                  <div key={province.id} className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-500 w-6">{index + 1}.</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{province.name}</span>
                        <span className="text-sm text-slate-500">{province.percentage}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${province.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <InsightPanel insights={(data?.insights || []) as Insight[]} loading={isLoading} />

      {/* Viral Mentions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Viral Mentions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {(data?.viralMentions as ViralMention[] | undefined)?.map((mention) => (
                <ViralMentionCard key={mention.id} mention={mention} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
