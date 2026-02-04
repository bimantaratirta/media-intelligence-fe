"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  ReferenceDot,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";

interface DataPoint {
  date: string;
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  isSpike?: boolean;
}

interface InteractiveTrendChartProps {
  data: DataPoint[];
  viewMode: "total" | "sentiment" | "platform";
  onPointClick?: (point: DataPoint) => void;
}

export function InteractiveTrendChart({
  data,
  viewMode,
  onPointClick,
}: InteractiveTrendChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const spikes = data.filter((d) => d.isSpike);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    if (e?.activePayload && e.activePayload[0]) {
      onPointClick?.(e.activePayload[0].payload as DataPoint);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} onClick={handleClick}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "#334155" : "#E2E8F0"}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
          tickFormatter={(value) => value.split(" ")[1] || value}
        />
        <YAxis
          tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
          tickFormatter={(value) =>
            value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value
          }
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
            borderRadius: "8px",
          }}
          formatter={(value) => [
            typeof value === "number" ? value.toLocaleString() : value,
          ]}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <Legend />

        {viewMode === "total" && (
          <Area
            type="monotone"
            dataKey="total"
            name="Total Mentions"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
          />
        )}

        {viewMode === "sentiment" && (
          <>
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
          </>
        )}

        {/* Spike indicators */}
        {spikes.map((spike, i) => (
          <ReferenceDot
            key={i}
            x={spike.date}
            y={spike.total}
            r={8}
            fill="#EF4444"
            stroke="#fff"
            strokeWidth={2}
          />
        ))}

        <Brush
          dataKey="date"
          height={30}
          stroke="#3B82F6"
          tickFormatter={(value) => value.split(" ")[0]}
          fill={isDark ? "#1E293B" : "#F8FAFC"}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
