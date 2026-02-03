"use client";

import { useParams } from "next/navigation";
import { Instagram, Music, Twitter, Youtube, Facebook, TrendingUp, TrendingDown } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatCard } from "@/components/shared/stat-card";
import { EngagementChart } from "@/components/charts/engagement-chart";
import { PlatformDonut } from "@/components/charts/platform-donut";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { useBrandOverview } from "@/lib/api/hooks/use-brand-analytics";
import { formatCompact, cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const platformIcons: Record<string, LucideIcon> = {
  Instagram: Instagram,
  TikTok: Music,
  Twitter: Twitter,
  YouTube: Youtube,
  Facebook: Facebook,
};

export default function BrandAnalyticsOverviewPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const { data, isLoading } = useBrandOverview(topicId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Brand Analytics</h1>
          <p className="text-slate-500">Monitor your official account performance</p>
        </div>
        <DateRangePicker />
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Followers"
          value={data?.overview.followers.value || 0}
          change={data?.overview.followers.change || 0}
          sparklineData={data?.overview.followers.trend}
          loading={isLoading}
        />
        <StatCard
          title="Total Reach"
          value={data?.overview.reach.value || 0}
          change={data?.overview.reach.change || 0}
          sparklineData={data?.overview.reach.trend}
          loading={isLoading}
        />
        <StatCard
          title="Engagement"
          value={data?.overview.engagement.value || 0}
          change={data?.overview.engagement.change || 0}
          sparklineData={data?.overview.engagement.trend}
          loading={isLoading}
        />
        <StatCard
          title="Engagement Rate"
          value={data?.overview.engagementRate.value || 0}
          change={data?.overview.engagementRate.change || 0}
          format="percentage"
          sparklineData={data?.overview.engagementRate.trend}
          loading={isLoading}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Engagement Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Engagement Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[300px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
            ) : (
              <EngagementChart data={data?.engagementTrend || []} />
            )}
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[250px] animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
            ) : (
              <PlatformDonut data={data?.platformBreakdown || []} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead className="text-right">Followers</TableHead>
                <TableHead className="text-right">Posts</TableHead>
                <TableHead className="text-right">Reach</TableHead>
                <TableHead className="text-right">Engagement</TableHead>
                <TableHead className="text-right">Eng. Rate</TableHead>
                <TableHead className="text-right">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      {[...Array(7)].map((_, j) => (
                        <TableCell key={j}>
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : data?.platformPerformance.map((platform) => {
                    const Icon = platformIcons[platform.platform] || Instagram;
                    return (
                      <TableRow key={platform.platform}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span className="font-medium">{platform.platform}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatCompact(platform.followers)}</TableCell>
                        <TableCell className="text-right">{platform.posts}</TableCell>
                        <TableCell className="text-right">{formatCompact(platform.reach)}</TableCell>
                        <TableCell className="text-right">{formatCompact(platform.engagement)}</TableCell>
                        <TableCell className="text-right">{platform.engRate.toFixed(1)}%</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={cn(
                              "flex items-center justify-end gap-1",
                              platform.growth >= 0 ? "text-green-600" : "text-red-600",
                            )}
                          >
                            {platform.growth >= 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            {Math.abs(platform.growth).toFixed(1)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
