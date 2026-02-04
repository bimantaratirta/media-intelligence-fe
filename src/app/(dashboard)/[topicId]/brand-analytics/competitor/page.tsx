"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ShareOfVoiceChart } from "@/components/competitor/share-of-voice-chart";
import { MetricsComparisonTable } from "@/components/competitor/metrics-comparison-table";
import { TrendComparisonChart } from "@/components/competitor/trend-comparison-chart";
import { SentimentComparisonChart } from "@/components/competitor/sentiment-comparison-chart";
import { PlatformBreakdownChart } from "@/components/competitor/platform-breakdown-chart";
import { InsightPanel } from "@/components/shared/insight-panel";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { Download, Plus, RefreshCw } from "lucide-react";
import {
  mockCompetitors,
  mockCompetitiveInsights,
} from "@/mocks/data/competitor";

export default function CompetitorPage() {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(
    mockCompetitors.map((c) => c.id)
  );

  const toggleCompetitor = (id: string) => {
    setSelectedCompetitors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const filteredCompetitors = mockCompetitors.filter((c) =>
    selectedCompetitors.includes(c.id)
  );

  // Map competitive insights to InsightPanel format
  const insightTypeMap: Record<string, "observation" | "recommendation" | "trend" | "warning"> = {
    strength: "observation",
    opportunity: "recommendation",
    trend: "trend",
    recommendation: "recommendation",
  };

  const insights = mockCompetitiveInsights.map((i) => ({
    ...i,
    type: insightTypeMap[i.type] || "observation",
    priority: "medium" as const,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Competitor Comparison
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Compare your brand performance with competitors
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DateRangePicker />
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Competitor Selector */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-muted-foreground">Compare:</span>
            {mockCompetitors.map((competitor) => (
              <div key={competitor.id} className="flex items-center gap-2">
                <Checkbox
                  id={competitor.id}
                  checked={selectedCompetitors.includes(competitor.id)}
                  onCheckedChange={() => toggleCompetitor(competitor.id)}
                  disabled={competitor.isOwn} // Can't deselect own brand
                />
                <label
                  htmlFor={competitor.id}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: competitor.color }}
                  />
                  <span className="text-sm font-medium">{competitor.name}</span>
                  {competitor.isOwn && (
                    <Badge variant="secondary" className="text-xs">
                      You
                    </Badge>
                  )}
                </label>
              </div>
            ))}
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Competitor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Share of Voice */}
      <ShareOfVoiceChart competitors={filteredCompetitors} />

      {/* Metrics Table */}
      <MetricsComparisonTable competitors={filteredCompetitors} />

      {/* Trend Comparison */}
      <TrendComparisonChart competitors={filteredCompetitors} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentComparisonChart competitors={filteredCompetitors} />
        <PlatformBreakdownChart competitors={filteredCompetitors} />
      </div>

      {/* Competitive Insights */}
      <InsightPanel insights={insights} />
    </div>
  );
}
