"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { WordData } from "@/mocks/data/wordcloud";

interface WordCloudChartProps {
  words: WordData[];
  onWordClick?: (word: string) => void;
}

const SENTIMENT_COLORS: Record<string, string> = {
  positive: "text-green-500 hover:text-green-600",
  neutral: "text-gray-500 hover:text-gray-600",
  negative: "text-red-500 hover:text-red-600",
};

export function WordCloudChart({ words, onWordClick }: WordCloudChartProps) {
  // Calculate font sizes based on value
  const { minValue, maxValue, cloudWords } = useMemo(() => {
    if (words.length === 0) {
      return { minValue: 0, maxValue: 0, cloudWords: [] };
    }

    const values = words.map((w) => w.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    // Shuffle words for better distribution
    const shuffled = [...words].sort(() => Math.random() - 0.5);

    return {
      minValue: min,
      maxValue: max,
      cloudWords: shuffled,
    };
  }, [words]);

  const getFontSize = (value: number): number => {
    if (maxValue === minValue) return 20;
    // Scale from 14px to 48px
    const normalized = (value - minValue) / (maxValue - minValue);
    return Math.round(14 + normalized * 34);
  };

  const getOpacity = (value: number): number => {
    if (maxValue === minValue) return 1;
    const normalized = (value - minValue) / (maxValue - minValue);
    return 0.6 + normalized * 0.4;
  };

  if (words.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Word Cloud</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted rounded-lg">
            <p className="text-muted-foreground">No words to display</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Word Cloud</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex flex-wrap items-center justify-center gap-2 p-4 overflow-hidden">
          {cloudWords.map((word, index) => (
            <button
              key={`${word.text}-${index}`}
              onClick={() => onWordClick?.(word.text)}
              className={cn(
                "transition-all duration-200 cursor-pointer font-medium hover:scale-110",
                SENTIMENT_COLORS[word.sentiment || "neutral"]
              )}
              style={{
                fontSize: `${getFontSize(word.value)}px`,
                opacity: getOpacity(word.value),
              }}
              title={`${word.text}: ${word.value} mentions (${word.sentiment})`}
            >
              {word.text}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Positive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <span>Neutral</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Negative</span>
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-2">
          Click on any word to filter mentions
        </p>
      </CardContent>
    </Card>
  );
}
