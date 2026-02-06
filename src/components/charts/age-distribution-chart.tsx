"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { BLUE_SEQUENTIAL_SCALE } from "@/lib/utils";

interface AgeGroup {
  group: string;
  label: string;
  count: number;
  percentage: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

interface AgeDistributionChartProps {
  data: AgeGroup[];
}

// Use blue sequential scale instead of rainbow
const COLORS = BLUE_SEQUENTIAL_SCALE;

export function AgeDistributionChart({ data }: AgeDistributionChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Find peak age group
  const peakGroup = data.reduce((prev, current) => (prev.percentage > current.percentage ? prev : current));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Age Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
              <XAxis
                type="number"
                domain={[0, 50]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }}
              />
              <YAxis
                type="category"
                dataKey="group"
                width={50}
                tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                  border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                  borderRadius: "8px",
                }}
                formatter={(value, _name, props) => {
                  const payload = props.payload as AgeGroup;
                  return [`${value}% (${payload.count.toLocaleString()} mentions)`, payload.label];
                }}
                labelFormatter={(label) => `Age: ${label}`}
              />
              <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-medium text-slate-900 dark:text-slate-200">Peak:</span> {peakGroup.group} years (
            {peakGroup.label}) - {peakGroup.percentage}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
