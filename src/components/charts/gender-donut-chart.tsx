"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

interface GenderData {
  male: { count: number; percentage: number };
  female: { count: number; percentage: number };
  unknown?: { count: number; percentage: number };
}

interface GenderDonutChartProps {
  data: GenderData;
}

const COLORS = {
  male: "#2563EB", // blue-600
  female: "#9333EA", // purple-600 (not pink)
  unknown: "#6B7280", // gray-500
};

const RADIAN = Math.PI / 180;

interface LabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

function renderCustomizedLabel(props: LabelProps) {
  const { cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent = 0 } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-sm font-semibold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export function GenderDonutChart({ data }: GenderDonutChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = [
    { name: "Male", value: data.male.percentage, icon: "♂", count: data.male.count, color: COLORS.male },
    { name: "Female", value: data.female.percentage, icon: "♀", count: data.female.count, color: COLORS.female },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Gender Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
              >
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
                formatter={(value, _name, props) => {
                  const payload = props.payload as { count: number };
                  return [`${value}% (${payload.count.toLocaleString()} mentions)`, ""];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-2">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {item.icon} {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
