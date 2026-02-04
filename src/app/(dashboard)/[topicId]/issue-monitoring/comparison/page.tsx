"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ComparisonSelector,
  type CompareMode,
} from "@/components/comparison/comparison-selector";
import { MetricsComparisonTable } from "@/components/comparison/metrics-comparison-table";
import { TrendOverlayChart } from "@/components/comparison/trend-overlay-chart";
import { SentimentComparisonChart } from "@/components/comparison/sentiment-comparison-chart";
import { PlatformComparisonChart } from "@/components/comparison/platform-comparison-chart";
import { ComparisonInsights } from "@/components/comparison/comparison-insights";
import { Download, RefreshCw } from "lucide-react";
import {
  mockPeriodA,
  mockPeriodB,
  mockTrendOverlay,
  mockPlatformComparison,
  mockTopics,
  mockComparisonInsights,
} from "@/mocks/data/comparison";

export default function ComparisonPage() {
  const [mode, setMode] = useState<CompareMode>("periods");
  const [topicA, setTopicA] = useState<string>(mockTopics[0].id);
  const [topicB, setTopicB] = useState<string>(mockTopics[1].id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Comparison View
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Compare metrics across time periods or topics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Comparison Selector */}
      <ComparisonSelector
        mode={mode}
        onModeChange={setMode}
        topics={mockTopics}
        selectedTopicA={topicA}
        selectedTopicB={topicB}
        onTopicAChange={setTopicA}
        onTopicBChange={setTopicB}
      />

      {/* Metrics Table */}
      <MetricsComparisonTable periodA={mockPeriodA} periodB={mockPeriodB} />

      {/* Trend Overlay */}
      <TrendOverlayChart
        data={mockTrendOverlay}
        labelA={mockPeriodA.label}
        labelB={mockPeriodB.label}
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentComparisonChart periodA={mockPeriodA} periodB={mockPeriodB} />
        <PlatformComparisonChart
          data={mockPlatformComparison}
          labelA={mockPeriodA.label}
          labelB={mockPeriodB.label}
        />
      </div>

      {/* AI Insights */}
      <ComparisonInsights insights={mockComparisonInsights} />
    </div>
  );
}
