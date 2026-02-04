"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTheme } from "next-themes";
import type { KeywordTrendData } from "@/mocks/data/wordcloud";

interface KeywordTrendChartProps {
  trends: KeywordTrendData[];
  availableKeywords: string[];
}

const COLORS = ["#3B82F6", "#22C55E", "#EF4444", "#F59E0B", "#8B5CF6"];

export function KeywordTrendChart({
  trends,
  availableKeywords,
}: KeywordTrendChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(
    trends.slice(0, 2).map((t) => t.keyword)
  );

  const addKeyword = (keyword: string) => {
    if (selectedKeywords.length < 5 && !selectedKeywords.includes(keyword)) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const removeKeyword = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
  };

  // Merge data for chart
  const chartData =
    trends[0]?.data.map((point, index) => {
      const dataPoint: Record<string, string | number> = { date: point.date };
      selectedKeywords.forEach((kw) => {
        const trend = trends.find((t) => t.keyword === kw);
        if (trend) {
          dataPoint[kw] = trend.data[index]?.value || 0;
        }
      });
      return dataPoint;
    }) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Keyword Trend Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Keyword Selection */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            Select keywords to compare (max 5):
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedKeywords.map((keyword, index) => (
              <Badge
                key={keyword}
                variant="secondary"
                className="gap-1"
                style={{ borderLeft: `3px solid ${COLORS[index]}` }}
              >
                {keyword}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeKeyword(keyword)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {selectedKeywords.length < 5 && (
              <select
                className="text-sm border rounded px-2 py-1 bg-background"
                value=""
                onChange={(e) => {
                  if (e.target.value) addKeyword(e.target.value);
                }}
              >
                <option value="">+ Add keyword</option>
                {availableKeywords
                  .filter((k) => !selectedKeywords.includes(k))
                  .map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#334155" : "#E2E8F0"}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("id-ID", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis
                tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                  border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
                  borderRadius: "8px",
                }}
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("id-ID", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <Legend />
              {selectedKeywords.map((keyword, index) => (
                <Line
                  key={keyword}
                  type="monotone"
                  dataKey={keyword}
                  stroke={COLORS[index]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
