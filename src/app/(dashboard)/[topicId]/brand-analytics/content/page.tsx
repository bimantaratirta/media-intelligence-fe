"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentTable } from "@/components/content/content-table";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Download, FileText, TrendingUp, Eye, Award, RefreshCw } from "lucide-react";
import { useTheme } from "next-themes";
import {
  mockContentItems,
  mockContentSummary,
  mockPlatformPerformance,
  mockContentTypeBreakdown,
} from "@/mocks/data/content";

const COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#6B7280"];

export default function ContentPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Content Performance
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Analyze your content performance across platforms
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DateRangePicker />
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold">
                  {mockContentSummary.totalPosts}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Engagement</p>
                <p className="text-2xl font-bold">
                  {mockContentSummary.avgEngagement}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reach</p>
                <p className="text-2xl font-bold">
                  {(mockContentSummary.totalReach / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Platform</p>
                <p className="text-2xl font-bold">
                  {mockContentSummary.topPlatform}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Table */}
      <ContentTable data={mockContentItems} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Performance by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockPlatformPerformance} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? "#334155" : "#E2E8F0"}
                  />
                  <XAxis
                    type="number"
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="platform"
                    width={80}
                    tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
                  />
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                      border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="avgEngagement"
                    fill="#3B82F6"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Content Type Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Content Type Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockContentTypeBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="percentage"
                    nameKey="type"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {mockContentTypeBreakdown.map((entry, index) => (
                      <Cell
                        key={entry.type}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                      border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
