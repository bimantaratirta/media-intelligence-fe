"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { WordCloudChart } from "@/components/charts/word-cloud-chart";
import { TopKeywordsList } from "@/components/charts/top-keywords-list";
import { KeywordTrendChart } from "@/components/charts/keyword-trend-chart";
import { CoOccurrenceHeatmap } from "@/components/charts/co-occurrence-heatmap";
import { TopicClusters } from "@/components/charts/topic-clusters";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { Download } from "lucide-react";
import {
  mockWords,
  mockKeywordTrends,
  mockCoOccurrences,
  mockTopicClusters,
} from "@/mocks/data/wordcloud";

export default function WordCloudPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;

  const [wordType, setWordType] = useState<string>("all");
  const [minFrequency, setMinFrequency] = useState<number>(5);
  const [excludeCommon, setExcludeCommon] = useState<boolean>(true);

  // Filter words based on settings
  const filteredWords = useMemo(() => {
    let words = mockWords.filter((w) => w.value >= minFrequency);

    if (wordType !== "all") {
      words = words.filter((w) => w.type === wordType);
    }

    if (excludeCommon) {
      const commonWords = ["yang", "dan", "di", "ke", "dari"];
      words = words.filter((w) => !commonWords.includes(w.text.toLowerCase()));
    }

    return words;
  }, [wordType, minFrequency, excludeCommon]);

  const handleWordClick = (word: string) => {
    // Navigate to mentions filtered by this word
    router.push(
      `/${topicId}/issue-monitoring/mentions/feed/all?keyword=${encodeURIComponent(word)}`
    );
  };

  const availableKeywords = mockKeywordTrends.map((t) => t.keyword);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Word Analysis & Topics
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Discover trending topics, hashtags, and key terms
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
              <Label className="text-sm text-muted-foreground">
                Word Type:
              </Label>
              <Select value={wordType} onValueChange={setWordType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="keyword">Keywords</SelectItem>
                  <SelectItem value="hashtag">Hashtags</SelectItem>
                  <SelectItem value="mention">Mentions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">
                Min Frequency:
              </Label>
              <Input
                type="number"
                value={minFrequency}
                onChange={(e) => setMinFrequency(parseInt(e.target.value) || 0)}
                className="w-20"
                min={1}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="excludeCommon"
                checked={excludeCommon}
                onCheckedChange={(checked) =>
                  setExcludeCommon(checked as boolean)
                }
              />
              <Label htmlFor="excludeCommon" className="text-sm">
                Exclude common words
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Word Cloud */}
      <WordCloudChart words={filteredWords} onWordClick={handleWordClick} />

      {/* Top Keywords & Hashtags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopKeywordsList
          words={mockWords}
          type="keyword"
          title="Top Keywords"
          maxItems={10}
        />
        <TopKeywordsList
          words={mockWords}
          type="hashtag"
          title="Trending Hashtags"
          maxItems={10}
        />
      </div>

      {/* Keyword Trend */}
      <KeywordTrendChart
        trends={mockKeywordTrends}
        availableKeywords={availableKeywords}
      />

      {/* Co-occurrence Heatmap */}
      <CoOccurrenceHeatmap data={mockCoOccurrences} />

      {/* Topic Clusters */}
      <TopicClusters clusters={mockTopicClusters} />
    </div>
  );
}
