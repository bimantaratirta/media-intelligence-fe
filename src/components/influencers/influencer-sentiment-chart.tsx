"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import type { Influencer } from "@/mocks/data/influencers";

interface InfluencerSentimentChartProps {
  data: Influencer[];
}

export function InfluencerSentimentChart({ data }: InfluencerSentimentChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = data.slice(0, 5).map((inf) => ({
    name:
      inf.username.length > 12
        ? inf.username.slice(0, 12) + "..."
        : inf.username,
    positive: inf.sentiment.positive,
    neutral: inf.sentiment.neutral,
    negative: inf.sentiment.negative,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Sentiment by Top Influencers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={80}
                tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                  border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                  borderRadius: "8px",
                }}
                formatter={(value) => `${value}%`}
              />
              <Legend />
              <Bar
                dataKey="positive"
                name="Positive"
                stackId="a"
                fill="#22C55E"
              />
              <Bar
                dataKey="neutral"
                name="Neutral"
                stackId="a"
                fill="#6B7280"
              />
              <Bar
                dataKey="negative"
                name="Negative"
                stackId="a"
                fill="#EF4444"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
