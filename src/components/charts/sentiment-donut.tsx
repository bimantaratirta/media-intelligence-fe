"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "next-themes";

interface SentimentDonutProps {
  data: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const COLORS = {
  positive: "#22C55E",
  neutral: "#64748B",
  negative: "#EF4444",
};

export function SentimentDonut({ data }: SentimentDonutProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = [
    { name: "Positive", value: data.positive, color: COLORS.positive },
    { name: "Neutral", value: data.neutral, color: COLORS.neutral },
    { name: "Negative", value: data.negative, color: COLORS.negative },
  ];

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
              border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
              borderRadius: "8px",
            }}
            formatter={(value) => [`${value}%`, ""]}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-2">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {item.name}: {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
