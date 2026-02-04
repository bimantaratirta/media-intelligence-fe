"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

interface DistributionData {
  range: string;
  count: number;
  percentage: number;
}

interface BotRiskSummary {
  lowRisk: { count: number; percentage: number };
  mediumRisk: { count: number; percentage: number };
  highRisk: { count: number; percentage: number };
}

interface BotScoreDistributionProps {
  distribution: DistributionData[];
  summary: BotRiskSummary;
}

function getBarColor(range: string): string {
  const score = parseFloat(range.split("-")[0]);
  if (score < 0.3) return "#22C55E"; // green
  if (score < 0.6) return "#EAB308"; // yellow
  return "#EF4444"; // red
}

export function BotScoreDistribution({
  distribution,
  summary,
}: BotScoreDistributionProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Bot Score Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={distribution}
              margin={{ top: 5, right: 10, left: 10, bottom: 25 }}
            >
              <XAxis
                dataKey="range"
                tick={{ fontSize: 10, fill: isDark ? "#94A3B8" : "#64748B" }}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                  border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                  borderRadius: "8px",
                }}
                formatter={(value, _name, props) => {
                  const payload = props.payload as DistributionData;
                  return [
                    `${payload.count.toLocaleString()} accounts (${value}%)`,
                    "Count",
                  ];
                }}
                labelFormatter={(label) => `Score: ${label}`}
              />
              <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                {distribution.map((entry, index) => (
                  <Cell key={index} fill={getBarColor(entry.range)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Summary */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700"
            >
              Low Risk
            </Badge>
            <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
              {summary.lowRisk.percentage}%
            </p>
            <p className="text-xs text-muted-foreground">
              {summary.lowRisk.count.toLocaleString()} accounts
            </p>
          </div>

          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
            <Badge
              variant="outline"
              className="bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700"
            >
              Medium Risk
            </Badge>
            <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400 mt-1">
              {summary.mediumRisk.percentage}%
            </p>
            <p className="text-xs text-muted-foreground">
              {summary.mediumRisk.count.toLocaleString()} accounts
            </p>
          </div>

          <div className="text-center p-3 bg-red-50 dark:bg-red-950 rounded-lg">
            <Badge
              variant="outline"
              className="bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-300 dark:border-red-700"
            >
              High Risk
            </Badge>
            <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-1">
              {summary.highRisk.percentage}%
            </p>
            <p className="text-xs text-muted-foreground">
              {summary.highRisk.count.toLocaleString()} accounts
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
