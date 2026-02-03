"use client";

import {
  Twitter,
  Instagram,
  Music,
  Youtube,
  Facebook,
  AtSign,
  Newspaper,
  Heart,
  MessageCircle,
  Repeat2,
  Eye,
  ExternalLink,
  Edit2,
  CheckCircle,
  Flag,
  MoreHorizontal,
  BadgeCheck,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatCompact, cn } from "@/lib/utils";

interface MentionCardProps {
  mention: {
    id: string;
    content: string;
    platform: string;
    author: {
      username: string;
      displayName: string;
      followers: number;
      isVerified: boolean;
      botScore: number;
    };
    engagement: {
      likes: number;
      comments: number;
      shares: number;
      views?: number | null;
    };
    sentiment: {
      auto: string;
      autoScore: number;
      manual?: string | null;
    };
    emotion: {
      primary: string;
      score: number;
    };
    location?: {
      provinceName: string;
    } | null;
    originalUrl: string;
    createdAt: string;
    isHandled: boolean;
    isFlagged: boolean;
  };
  selected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
  onEditSentiment?: (mention: MentionCardProps["mention"]) => void;
  onMarkHandled?: (id: string) => void;
  onFlag?: (id: string) => void;
}

const platformIcons: Record<string, LucideIcon> = {
  twitter: Twitter,
  instagram: Instagram,
  tiktok: Music,
  youtube: Youtube,
  facebook: Facebook,
  threads: AtSign,
  news: Newspaper,
};

const platformColors: Record<string, string> = {
  twitter: "text-blue-500",
  instagram: "text-pink-500",
  tiktok: "text-slate-900 dark:text-white",
  youtube: "text-red-500",
  facebook: "text-blue-600",
  threads: "text-slate-900 dark:text-white",
  news: "text-slate-500",
};

const sentimentColors: Record<string, string> = {
  positive: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  negative: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const emotionEmojis: Record<string, string> = {
  joy: "😊",
  anger: "😠",
  sadness: "😢",
  fear: "😨",
  surprise: "😲",
  disgust: "🤢",
  neutral: "😐",
};

function formatRelative(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

export function MentionCard({
  mention,
  selected = false,
  onSelect,
  onEditSentiment,
  onMarkHandled,
  onFlag,
}: MentionCardProps) {
  const Icon = platformIcons[mention.platform] || Newspaper;
  const platformColor = platformColors[mention.platform] || "text-slate-500";
  const sentiment = mention.sentiment.manual || mention.sentiment.auto;
  const sentimentColor = sentimentColors[sentiment] || sentimentColors.neutral;

  const getBotScoreLabel = (score: number) => {
    if (score < 0.3) return { label: "Human", color: "text-green-600" };
    if (score < 0.6) return { label: "Uncertain", color: "text-yellow-600" };
    return { label: "Bot likely", color: "text-red-600" };
  };

  const botScore = getBotScoreLabel(mention.author.botScore);

  return (
    <Card className={cn("transition-all", selected && "ring-2 ring-blue-500", mention.isHandled && "opacity-60")}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {onSelect && (
            <Checkbox checked={selected} onCheckedChange={(checked) => onSelect(mention.id, !!checked)} className="mt-1" />
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={cn("gap-1", platformColor)}>
                <Icon className="h-3 w-3" />
                {mention.platform}
              </Badge>

              <Badge className={sentimentColor}>
                {mention.sentiment.manual ? "✏️ " : ""}
                {sentiment}
              </Badge>

              {mention.isFlagged && (
                <Badge variant="destructive" className="gap-1">
                  <Flag className="h-3 w-3" />
                  Flagged
                </Badge>
              )}

              {mention.isHandled && (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Handled
                </Badge>
              )}
            </div>

            {/* Author */}
            <div className="flex items-center gap-2 mt-2">
              <span className="font-medium">@{mention.author.username}</span>
              {mention.author.isVerified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
              <span className="text-sm text-slate-500">{formatCompact(mention.author.followers)} followers</span>
            </div>
          </div>

          <span className="text-sm text-slate-400 flex-shrink-0">{formatRelative(mention.createdAt)}</span>
        </div>

        {/* Content */}
        <p className="text-sm mb-4">{mention.content}</p>

        {/* Engagement */}
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {formatCompact(mention.engagement.likes)}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {formatCompact(mention.engagement.comments)}
          </span>
          <span className="flex items-center gap-1">
            <Repeat2 className="h-4 w-4" />
            {formatCompact(mention.engagement.shares)}
          </span>
          {mention.engagement.views && (
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {formatCompact(mention.engagement.views)}
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 flex-wrap">
          <span>
            Emotion: {emotionEmojis[mention.emotion.primary]} {mention.emotion.primary}
          </span>
          <span className={botScore.color}>
            Bot: {(mention.author.botScore * 100).toFixed(0)}% ({botScore.label})
          </span>
          {mention.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {mention.location.provinceName}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t">
          <Button variant="outline" size="sm" asChild>
            <a href={mention.originalUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />
              View Original
            </a>
          </Button>

          {onEditSentiment && (
            <Button variant="outline" size="sm" onClick={() => onEditSentiment(mention)}>
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onMarkHandled && (
                <DropdownMenuItem onClick={() => onMarkHandled(mention.id)}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {mention.isHandled ? "Mark Unhandled" : "Mark Handled"}
                </DropdownMenuItem>
              )}
              {onFlag && (
                <DropdownMenuItem onClick={() => onFlag(mention.id)}>
                  <Flag className="h-4 w-4 mr-2" />
                  {mention.isFlagged ? "Remove Flag" : "Flag"}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
