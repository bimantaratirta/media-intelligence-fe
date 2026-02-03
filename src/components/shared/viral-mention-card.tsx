import { Twitter, Instagram, Music, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCompact, cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface ViralMention {
  id: string;
  platform: string;
  author: string;
  content: string;
  engagement: {
    likes: number;
    retweets: number;
    comments: number;
  };
  sentiment: "positive" | "neutral" | "negative";
  createdAt: string;
}

interface ViralMentionCardProps {
  mention: ViralMention;
}

const platformIcons: Record<string, LucideIcon> = {
  twitter: Twitter,
  instagram: Instagram,
  tiktok: Music,
};

const sentimentStyles: Record<string, string> = {
  positive: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  negative: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

function formatRelative(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

export function ViralMentionCard({ mention }: ViralMentionCardProps) {
  const Icon = platformIcons[mention.platform] || Twitter;

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="h-4 w-4 text-slate-500" />
              <span className="font-medium text-sm">{mention.author}</span>
              <Badge variant="secondary" className={cn("text-xs", sentimentStyles[mention.sentiment])}>
                {mention.sentiment}
              </Badge>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">{mention.content}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {formatCompact(mention.engagement.likes)}
            </span>
            {mention.engagement.retweets > 0 && (
              <span className="flex items-center gap-1">
                <Repeat2 className="h-4 w-4" />
                {formatCompact(mention.engagement.retweets)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {formatCompact(mention.engagement.comments)}
            </span>
          </div>
          <span className="text-xs text-slate-400">{formatRelative(mention.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
