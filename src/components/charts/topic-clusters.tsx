"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TopicCluster } from "@/mocks/data/wordcloud";

interface TopicClustersProps {
  clusters: TopicCluster[];
}

const sentimentColors = {
  positive: "bg-green-500",
  neutral: "bg-gray-500",
  negative: "bg-red-500",
};

export function TopicClusters({ clusters }: TopicClustersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Topic Clusters (Auto-detected)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Based on semantic analysis, we detected these topics:
        </p>

        <div className="space-y-4">
          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cluster.icon}</span>
                  <h4 className="font-medium">{cluster.name}</h4>
                </div>
                <Badge
                  variant={
                    cluster.dominantSentiment === "positive"
                      ? "default"
                      : cluster.dominantSentiment === "negative"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {cluster.sentiment[cluster.dominantSentiment]}%{" "}
                  {cluster.dominantSentiment}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {cluster.keywords.map((keyword) => (
                  <Badge key={keyword} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {cluster.mentions.toLocaleString()} mentions
                </span>

                <div className="flex items-center gap-2">
                  {/* Mini sentiment bar */}
                  <div className="flex h-2 w-24 rounded-full overflow-hidden">
                    <div
                      className={cn(sentimentColors.positive)}
                      style={{ width: `${cluster.sentiment.positive}%` }}
                    />
                    <div
                      className={cn(sentimentColors.neutral)}
                      style={{ width: `${cluster.sentiment.neutral}%` }}
                    />
                    <div
                      className={cn(sentimentColors.negative)}
                      style={{ width: `${cluster.sentiment.negative}%` }}
                    />
                  </div>

                  <Button variant="ghost" size="sm" className="h-7">
                    View Mentions
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
