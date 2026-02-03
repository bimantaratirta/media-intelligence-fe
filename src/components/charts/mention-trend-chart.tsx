"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useTheme } from "next-themes";

interface MentionTrendChartProps {
  data: {
    date: string;
    positive: number;
    neutral: number;
    negative: number;
  }[];
}

export function MentionTrendChart({ data }: MentionTrendChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#E2E8F0"} />
        <XAxis dataKey="date" tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }} />
        <YAxis tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="positive"
          name="Positive"
          stackId="1"
          stroke="#22C55E"
          fill="#22C55E"
          fillOpacity={0.6}
        />
        <Area
          type="monotone"
          dataKey="neutral"
          name="Neutral"
          stackId="1"
          stroke="#64748B"
          fill="#64748B"
          fillOpacity={0.6}
        />
        <Area
          type="monotone"
          dataKey="negative"
          name="Negative"
          stackId="1"
          stroke="#EF4444"
          fill="#EF4444"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
