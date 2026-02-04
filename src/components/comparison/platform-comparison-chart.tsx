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
import type { PlatformComparisonData } from "@/mocks/data/comparison";

interface PlatformComparisonChartProps {
  data: PlatformComparisonData[];
  labelA: string;
  labelB: string;
}

export function PlatformComparisonChart({
  data,
  labelA,
  labelB,
}: PlatformComparisonChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Platform Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#334155" : "#E2E8F0"}
              />
              <XAxis
                type="number"
                domain={[0, 50]}
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
              <Legend />
              <Bar
                dataKey="periodA"
                name={labelA}
                fill="#3B82F6"
                radius={[0, 4, 4, 0]}
              />
              <Bar
                dataKey="periodB"
                name={labelB}
                fill="#8B5CF6"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
