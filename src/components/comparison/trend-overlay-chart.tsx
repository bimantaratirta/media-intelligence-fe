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
import type { TrendOverlayData } from "@/mocks/data/comparison";

interface TrendOverlayChartProps {
  data: TrendOverlayData[];
  labelA: string;
  labelB: string;
}

export function TrendOverlayChart({
  data,
  labelA,
  labelB,
}: TrendOverlayChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Trend Overlay</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#334155" : "#E2E8F0"}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
                tickFormatter={(value) => `Day ${value}`}
              />
              <YAxis
                tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
              />
              <Tooltip
                formatter={(value, name) => [
                  typeof value === "number" ? value.toLocaleString() : value,
                  name,
                ]}
                labelFormatter={(label) => `Day ${label}`}
                contentStyle={{
                  backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                  border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="periodA"
                name={labelA}
                stroke="#3B82F6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="periodB"
                name={labelB}
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 border-b-2 border-dashed border-blue-500" />
            <span>{labelA} (dashed)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-purple-500" />
            <span>{labelB} (solid)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
