"use client";

import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Legend } from "recharts";
import { useTheme } from "next-themes";

interface EngagementChartProps {
  data: {
    date: string;
    engagement: number;
    reach: number;
  }[];
}

export function EngagementChart({ data }: EngagementChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#E2E8F0"} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }}
          axisLine={{ stroke: isDark ? "#334155" : "#E2E8F0" }}
        />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }}
          axisLine={{ stroke: isDark ? "#334155" : "#E2E8F0" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }}
          axisLine={{ stroke: isDark ? "#334155" : "#E2E8F0" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="engagement" name="Engagement" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="reach"
          name="Reach"
          stroke="#10B981"
          strokeWidth={2}
          dot={{ fill: "#10B981", strokeWidth: 2 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
