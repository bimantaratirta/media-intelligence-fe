"use client";

import {
  LineChart,
  Line,
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

interface TrendComparisonChartProps {
  competitors: CompetitorData[];
}

export function TrendComparisonChart({
  competitors,
}: TrendComparisonChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Merge all trends into single dataset
  const chartData =
    competitors[0]?.trend.map((point, index) => {
      const dataPoint: Record<string, string | number> = {
        date: point.date,
      };
      competitors.forEach((c) => {
        dataPoint[c.id] = c.trend[index]?.value || 0;
      });
      return dataPoint;
    }) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Mention Trend Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#334155" : "#E2E8F0"}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("id-ID", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis
                tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
              />
              <Tooltip
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("id-ID")
                }
                formatter={(value) => [
                  typeof value === "number" ? value.toLocaleString() : value,
                ]}
                contentStyle={{
                  backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                  border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                  borderRadius: "8px",
                }}
              />
              <Legend />
              {competitors.map((c, index) => (
                <Line
                  key={c.id}
                  type="monotone"
                  dataKey={c.id}
                  name={c.name}
                  stroke={c.color}
                  strokeWidth={c.isOwn ? 3 : 2}
                  strokeDasharray={c.isOwn ? "0" : index === 1 ? "5 5" : "2 2"}
                  dot={{ r: c.isOwn ? 4 : 3 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
