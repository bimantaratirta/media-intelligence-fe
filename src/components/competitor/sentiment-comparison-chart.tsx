"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import type { CompetitorData } from "@/mocks/data/competitor";

interface SentimentComparisonChartProps {
  competitors: CompetitorData[];
}

export function SentimentComparisonChart({
  competitors,
}: SentimentComparisonChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = competitors.map((c) => ({
    name: c.name,
    Positive: c.metrics.positivePercent,
    Neutral: c.metrics.neutralPercent,
    Negative: c.metrics.negativePercent,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Sentiment Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#334155" : "#E2E8F0"}
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={100}
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
              <Legend />
              <Bar dataKey="Positive" stackId="a" fill="#22C55E" />
              <Bar dataKey="Neutral" stackId="a" fill="#6B7280" />
              <Bar dataKey="Negative" stackId="a" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
