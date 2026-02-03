"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";

interface SentimentByPlatformProps {
  data: {
    platform: string;
    positive: number;
    neutral: number;
    negative: number;
  }[];
}

export function SentimentByPlatformChart({ data }: SentimentByPlatformProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#E2E8F0"} />
        <XAxis dataKey="platform" tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }} />
        <YAxis tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }} tickFormatter={(value) => `${value}%`} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
            borderRadius: "8px",
          }}
          formatter={(value) => [`${value}%`, ""]}
        />
        <Legend />
        <Bar dataKey="positive" name="Positive" fill="#22C55E" radius={[4, 4, 0, 0]} />
        <Bar dataKey="neutral" name="Neutral" fill="#64748B" radius={[4, 4, 0, 0]} />
        <Bar dataKey="negative" name="Negative" fill="#EF4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
