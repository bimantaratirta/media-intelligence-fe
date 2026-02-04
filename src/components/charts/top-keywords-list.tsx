"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WordData } from "@/mocks/data/wordcloud";

interface TopKeywordsListProps {
  words: WordData[];
  type: "keyword" | "hashtag" | "mention";
  title: string;
  maxItems?: number;
}

function getTrendIcon(change: number) {
  if (change > 0) return <TrendingUp className="h-3 w-3 text-green-500" />;
  if (change < 0) return <TrendingDown className="h-3 w-3 text-red-500" />;
  return <Minus className="h-3 w-3 text-gray-500" />;
}

function getTrendLabel(change: number): string {
  if (change > 100) return "Viral";
  if (change > 50) return "Trending up";
  if (change > 0) return `+${change}%`;
  if (change < -20) return "Declining";
  if (change < 0) return `${change}%`;
  return "Stable";
}

export function TopKeywordsList({
  words,
  type,
  title,
  maxItems = 10,
}: TopKeywordsListProps) {
  const filteredWords = words
    .filter((w) => w.type === type)
    .sort((a, b) => b.value - a.value)
    .slice(0, maxItems);

  const maxValue = filteredWords[0]?.value || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredWords.map((word, index) => (
            <div key={word.text} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-5">
                    {index + 1}.
                  </span>
                  <span className="font-medium text-sm">{word.text}</span>
                  {word.change > 50 && (
                    <Badge variant="secondary" className="text-xs">
                      New
                    </Badge>
                  )}
                </div>
                <span className="font-medium text-sm">
                  {word.value.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2 pl-7">
                <Progress
                  value={(word.value / maxValue) * 100}
                  className="h-2 flex-1"
                />
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs min-w-24",
                    word.change > 0
                      ? "text-green-600"
                      : word.change < 0
                        ? "text-red-600"
                        : "text-gray-500"
                  )}
                >
                  {getTrendIcon(word.change)}
                  <span>{getTrendLabel(word.change)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
