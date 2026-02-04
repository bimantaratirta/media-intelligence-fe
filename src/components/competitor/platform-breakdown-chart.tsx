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

interface PlatformBreakdownChartProps {
  competitors: CompetitorData[];
}

const platforms = [
  "twitter",
  "instagram",
  "tiktok",
  "facebook",
  "youtube",
  "news",
] as const;

const platformLabels: Record<string, string> = {
  twitter: "X/Twitter",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  youtube: "YouTube",
  news: "News",
};

export function PlatformBreakdownChart({
  competitors,
}: PlatformBreakdownChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = platforms.map((platform) => {
    const point: Record<string, string | number> = {
      platform: platformLabels[platform],
    };
    competitors.forEach((c) => {
      point[c.name] = c.platforms[platform];
    });
    return point;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Platform Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#334155" : "#E2E8F0"}
              />
              <XAxis
                dataKey="platform"
                tick={{ fontSize: 10, fill: isDark ? "#94A3B8" : "#64748B" }}
              />
              <YAxis
                tickFormatter={(v) => `${v}%`}
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
              {competitors.map((c) => (
                <Bar key={c.id} dataKey={c.name} fill={c.color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
