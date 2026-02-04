"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Lightbulb } from "lucide-react";

interface GenderSentimentData {
  male: {
    percentage: number;
    sentiment: { positive: number; neutral: number; negative: number };
  };
  female: {
    percentage: number;
    sentiment: { positive: number; neutral: number; negative: number };
  };
}

interface GenderSentimentChartProps {
  data: GenderSentimentData;
}

const SENTIMENT_COLORS = {
  positive: "#22C55E", // green-500
  neutral: "#64748B", // slate-500
  negative: "#EF4444", // red-500
};

export function GenderSentimentChart({ data }: GenderSentimentChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = [
    {
      name: "Male ♂",
      positive: data.male.sentiment.positive,
      neutral: data.male.sentiment.neutral,
      negative: data.male.sentiment.negative,
    },
    {
      name: "Female ♀",
      positive: data.female.sentiment.positive,
      neutral: data.female.sentiment.neutral,
      negative: data.female.sentiment.negative,
    },
  ];

  // Calculate difference
  const sentimentDiff = data.female.sentiment.positive - data.male.sentiment.positive;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Demographic Breakdown by Sentiment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
            >
              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={70}
                tick={{ fontSize: 12, fill: isDark ? "#94A3B8" : "#64748B" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                  border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                  borderRadius: "8px",
                }}
                formatter={(value) => `${value}%`}
              />
              <Legend />
              <Bar
                dataKey="positive"
                name="Positive"
                stackId="a"
                fill={SENTIMENT_COLORS.positive}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="neutral"
                name="Neutral"
                stackId="a"
                fill={SENTIMENT_COLORS.neutral}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="negative"
                name="Negative"
                stackId="a"
                fill={SENTIMENT_COLORS.negative}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm flex items-start gap-2 text-blue-800 dark:text-blue-200">
            <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              Female audience menunjukkan sentiment lebih positif (
              {sentimentDiff > 0 ? "+" : ""}
              {sentimentDiff}% dibanding male)
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
