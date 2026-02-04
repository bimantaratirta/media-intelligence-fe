"use client";

import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkline } from "@/components/charts/sparkline";
import { formatCompact } from "@/lib/utils";

interface ProvinceDetailPanelProps {
  province: {
    id: string;
    name: string;
    mentions: number;
    positive: number;
    negative: number;
    neutral?: number;
    reach: number;
    engagement: number;
    change: number;
  } | null;
  trend?: { date: string; mentions: number }[];
}

export function ProvinceDetailPanel({
  province,
  trend,
}: ProvinceDetailPanelProps) {
  if (!province) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[300px] text-slate-500">
          <p>Select a province on the map to view details</p>
        </CardContent>
      </Card>
    );
  }

  const neutralPercent = province.neutral ?? (100 - province.positive - province.negative);
  const sentimentScore = ((province.positive - province.negative) / 100).toFixed(2);

  const stats = [
    {
      label: "Mentions",
      value: formatCompact(province.mentions),
      change: province.change,
      suffix: "%",
    },
    {
      label: "Sentiment",
      value: sentimentScore,
      change: 0.12,
      suffix: "",
    },
    {
      label: "Reach",
      value: formatCompact(province.reach),
      change: 8,
      suffix: "%",
    },
    {
      label: "Engagement",
      value: `${province.engagement}%`,
      change: 0.3,
      suffix: "%",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{province.name}</span>
          <Button variant="outline" size="sm">
            View Mentions
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
            >
              <p className="text-xs text-slate-500">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
              <p
                className={`text-xs flex items-center gap-1 ${stat.change >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.change >= 0 ? "+" : ""}
                {typeof stat.change === "number" && stat.change % 1 !== 0
                  ? stat.change.toFixed(2)
                  : stat.change}
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>

        {/* Trend Chart */}
        {trend && (
          <div>
            <p className="text-sm font-medium mb-2">
              Mention Trend (Last 7 Days)
            </p>
            <div className="h-24">
              <Sparkline
                data={trend.map((t) => ({ value: t.mentions }))}
                color="#3B82F6"
                height={96}
              />
            </div>
          </div>
        )}

        {/* Sentiment Breakdown */}
        <div>
          <p className="text-sm font-medium mb-2">Sentiment Breakdown</p>
          <div className="flex h-4 rounded-full overflow-hidden">
            <div
              className="bg-green-500"
              style={{ width: `${province.positive}%` }}
            />
            <div
              className="bg-slate-400"
              style={{ width: `${neutralPercent}%` }}
            />
            <div
              className="bg-red-500"
              style={{ width: `${province.negative}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1 text-slate-500">
            <span>Positive {province.positive}%</span>
            <span>Neutral {neutralPercent}%</span>
            <span>Negative {province.negative}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
