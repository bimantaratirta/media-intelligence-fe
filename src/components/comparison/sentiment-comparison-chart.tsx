"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import type { PeriodMetrics } from "@/mocks/data/comparison";

interface SentimentComparisonChartProps {
  periodA: PeriodMetrics;
  periodB: PeriodMetrics;
}

const COLORS = {
  positive: "#22C55E",
  neutral: "#6B7280",
  negative: "#EF4444",
};

export function SentimentComparisonChart({
  periodA,
  periodB,
}: SentimentComparisonChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const dataA = [
    { name: "Positive", value: periodA.positivePercent },
    { name: "Neutral", value: periodA.neutralPercent },
    { name: "Negative", value: periodA.negativePercent },
  ];

  const dataB = [
    { name: "Positive", value: periodB.positivePercent },
    { name: "Neutral", value: periodB.neutralPercent },
    { name: "Negative", value: periodB.negativePercent },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Sentiment Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Period A */}
          <div>
            <p className="text-center text-sm font-medium mb-2">
              {periodA.label}
            </p>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataA}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {dataA.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            entry.name.toLowerCase() as keyof typeof COLORS
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                      border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Period B */}
          <div>
            <p className="text-center text-sm font-medium mb-2">
              {periodB.label}
            </p>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataB}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {dataB.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            entry.name.toLowerCase() as keyof typeof COLORS
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                      border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Shared Legend */}
        <div className="flex justify-center gap-4 mt-4 text-sm">
          {Object.entries(COLORS).map(([name, color]) => (
            <div key={name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="capitalize">{name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
