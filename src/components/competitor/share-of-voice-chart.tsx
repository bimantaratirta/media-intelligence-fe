"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import type { CompetitorData } from "@/mocks/data/competitor";

interface ShareOfVoiceChartProps {
  competitors: CompetitorData[];
}

export function ShareOfVoiceChart({ competitors }: ShareOfVoiceChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const totalMentions = competitors.reduce(
    (sum, c) => sum + c.metrics.mentions,
    0
  );

  const data = competitors.map((c) => ({
    name: c.name,
    value: Math.round((c.metrics.mentions / totalMentions) * 100),
    mentions: c.metrics.mentions,
    color: c.color,
    isOwn: c.isOwn,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Share of Voice</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={true}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeWidth={entry.isOwn ? 3 : 1}
                    stroke={entry.isOwn ? "#1E40AF" : isDark ? "#334155" : "#E5E7EB"}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `${value}% (${props.payload.mentions.toLocaleString()} mentions)`,
                  name,
                ]}
                contentStyle={{
                  backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                  border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
