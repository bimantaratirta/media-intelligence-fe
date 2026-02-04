"use client";

import { ExternalLink, Hash, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SpikeDetailPanelProps {
  anomaly: {
    datetime: string;
    mentions: number;
    change: number;
    rootCause?: {
      type: string;
      author: string;
      content: string;
      url: string;
      engagement?: {
        likes: number;
        retweets: number;
        replies: number;
      };
    };
    topKeywords?: string[];
    relatedMentionCount?: number;
  } | null;
}

export function SpikeDetailPanel({ anomaly }: SpikeDetailPanelProps) {
  if (!anomaly) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full min-h-[300px] text-slate-500">
          <p>Select an anomaly to view details</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Spike Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Date & Time</p>
            <p className="font-medium">
              {new Date(anomaly.datetime).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-slate-500">Mentions</p>
            <p className="font-medium">
              {anomaly.mentions.toLocaleString()}
              <span className="text-red-600 ml-1">(+{anomaly.change}%)</span>
            </p>
          </div>
        </div>

        {/* Root Cause */}
        {anomaly.rootCause && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              Root Cause
              <Badge variant="secondary">{anomaly.rootCause.type}</Badge>
            </h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <p className="font-medium text-sm">{anomaly.rootCause.author}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-3">
                {anomaly.rootCause.content}
              </p>
              {anomaly.rootCause.engagement && (
                <div className="flex gap-4 mt-2 text-xs text-slate-500">
                  <span>
                    {anomaly.rootCause.engagement.likes.toLocaleString()} likes
                  </span>
                  <span>
                    {anomaly.rootCause.engagement.retweets.toLocaleString()}{" "}
                    retweets
                  </span>
                  <span>
                    {anomaly.rootCause.engagement.replies.toLocaleString()}{" "}
                    replies
                  </span>
                </div>
              )}
              <Button
                variant="link"
                size="sm"
                className="mt-2 h-auto p-0"
                asChild
              >
                <a
                  href={anomaly.rootCause.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Original Post
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* Top Keywords */}
        {anomaly.topKeywords && anomaly.topKeywords.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Top Keywords in Spike
            </h4>
            <div className="flex flex-wrap gap-2">
              {anomaly.topKeywords.map((keyword) => (
                <Badge key={keyword} variant="outline">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Related Mentions */}
        {anomaly.relatedMentionCount && (
          <Button variant="outline" className="w-full">
            <MessageSquare className="h-4 w-4 mr-2" />
            View {anomaly.relatedMentionCount} Related Mentions
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
