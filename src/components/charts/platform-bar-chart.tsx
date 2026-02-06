"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useTheme } from "next-themes";

interface PlatformBarChartProps {
  data: {
    platform: string;
    percentage: number;
    count: number;
  }[];
}

const PLATFORM_COLORS: Record<string, string> = {
  "X/Twitter": "#1D9BF0", // slightly muted
  Twitter: "#1D9BF0", // slightly muted
  Instagram: "#C13584", // more muted pink
  TikTok: "#475569", // slate-600, not black
  Facebook: "#1877F2",
  YouTube: "#B91C1C", // red-700, darker to avoid conflict
  "News Portal": "#6366F1", // indigo-500
  Others: "#94A3B8",
};

export function PlatformBarChart({ data }: PlatformBarChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical">
        <XAxis
          type="number"
          tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <YAxis
          type="category"
          dataKey="platform"
          tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }}
          width={100}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
            borderRadius: "8px",
          }}
          formatter={(value, _name, props) => [
            `${value}% (${(props.payload as { count: number }).count.toLocaleString()} mentions)`,
            "Share",
          ]}
        />
        <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={PLATFORM_COLORS[entry.platform] || "#94A3B8"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
