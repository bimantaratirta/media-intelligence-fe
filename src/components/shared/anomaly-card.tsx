"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRelative, cn } from "@/lib/utils";

interface Anomaly {
  id: string;
  datetime: string;
  type: "spike" | "dip";
  change: number;
  trigger: string;
  mentions: number;
  avgMentions: number;
  rootCause?: {
    type: string;
    author: string;
    content: string;
    url: string;
  };
  topKeywords?: string[];
  relatedMentionCount?: number;
  note?: string;
}

interface AnomalyCardProps {
  anomaly: Anomaly;
  selected?: boolean;
  onClick?: () => void;
}

export function AnomalyCard({ anomaly, selected, onClick }: AnomalyCardProps) {
  const isSpike = anomaly.type === "spike";

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        selected && "ring-2 ring-blue-500"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {isSpike ? (
              <TrendingUp className="h-5 w-5 text-red-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-blue-500" />
            )}
            <span
              className={cn(
                "font-bold text-lg",
                isSpike ? "text-red-600" : "text-blue-600"
              )}
            >
              {anomaly.change >= 0 ? "+" : ""}
              {anomaly.change}%
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {anomaly.trigger}
          </Badge>
        </div>

        <p className="text-sm text-slate-500 mb-2">
          {formatRelative(anomaly.datetime)}
        </p>

        <p className="text-sm">
          <span className="font-medium">
            {anomaly.mentions.toLocaleString()}
          </span>{" "}
          mentions
          <span className="text-slate-500">
            {" "}
            (avg: {anomaly.avgMentions.toLocaleString()})
          </span>
        </p>

        {anomaly.note && (
          <p className="text-xs text-slate-500 mt-2 italic">{anomaly.note}</p>
        )}
      </CardContent>
    </Card>
  );
}
