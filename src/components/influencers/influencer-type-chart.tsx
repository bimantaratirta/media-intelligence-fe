"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

interface TypeData {
  type: string;
  label: string;
  count: number;
  percentage: number;
}

interface InfluencerTypeChartProps {
  data: TypeData[];
}

const COLORS: Record<string, string> = {
  kol: "#F97316", // orange-500
  media: "#8B5CF6", // violet-500
  verified: "#3B82F6", // blue-500
  organic: "#22C55E", // green-500
};

export function InfluencerTypeChart({ data }: InfluencerTypeChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Influencer Types</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="percentage"
                nameKey="label"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.type}
                    fill={COLORS[entry.type] || "#6B7280"}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                  border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                  borderRadius: "8px",
                }}
                formatter={(value, _name, props) => {
                  const payload = props.payload as TypeData;
                  return [`${value}% (${payload.count} accounts)`, payload.label];
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
