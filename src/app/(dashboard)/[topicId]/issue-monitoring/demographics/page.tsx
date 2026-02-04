"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { GenderDonutChart } from "@/components/charts/gender-donut-chart";
import { AgeDistributionChart } from "@/components/charts/age-distribution-chart";
import { GenderSentimentChart } from "@/components/charts/gender-sentiment-chart";
import { AgeSentimentHeatmap } from "@/components/charts/age-sentiment-heatmap";
import { PlatformDemographicsMatrix } from "@/components/charts/platform-demographics-matrix";
import { ConfidenceNote } from "@/components/shared/confidence-note";
import { InsightPanel, type Insight } from "@/components/shared/insight-panel";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { Download } from "lucide-react";

// Import mock data
import demographicsData from "@/mocks/data/demographics.json";

// Type the insights data properly
const typedInsights: Insight[] = demographicsData.insights as Insight[];

export default function DemographicsPage() {
  const [platform, setPlatform] = useState<string>("all");
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(50);

  // Filter platform demographics based on selection
  const filteredPlatformData =
    platform === "all"
      ? demographicsData.platformDemographics
      : demographicsData.platformDemographics.filter((p) => p.platform === platform);

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Demographics Analysis
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Understand audience composition by gender and age
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DateRangePicker />
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">Platform:</span>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="twitter">X/Twitter</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="news">News Portal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 flex-1 max-w-xs">
              <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                Confidence:
              </span>
              <Slider
                value={[confidenceThreshold]}
                onValueChange={(v) => setConfidenceThreshold(v[0])}
                min={0}
                max={100}
                step={10}
                className="w-32"
              />
              <span className="text-sm font-medium w-12 text-slate-900 dark:text-slate-100">
                {confidenceThreshold}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GenderDonutChart data={demographicsData.genderDistribution} />
        <AgeDistributionChart data={demographicsData.ageDistribution} />
      </div>

      {/* Gender Sentiment Breakdown */}
      <GenderSentimentChart data={demographicsData.genderDistribution} />

      {/* Age Sentiment Heatmap */}
      <AgeSentimentHeatmap data={demographicsData.ageDistribution} />

      {/* Platform Demographics Matrix */}
      <PlatformDemographicsMatrix data={filteredPlatformData} />

      {/* AI Insights */}
      <InsightPanel insights={typedInsights} />

      {/* Confidence Note */}
      <ConfidenceNote metrics={demographicsData.confidenceMetrics} />
    </div>
  );
}
