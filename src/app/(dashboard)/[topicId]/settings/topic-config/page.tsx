"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Save,
  Twitter,
  Instagram,
  Music,
  Youtube,
  Facebook,
  AtSign,
  Newspaper,
  Globe,
  Clock,
  Play,
  Pause,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { KeywordInputEnhanced } from "@/components/shared/keyword-input-enhanced";
import { QueryPreview } from "@/components/shared/query-preview";

interface TopicConfig {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  lastCrawledAt: string;
  keywords: {
    primary: string[];
    mustContain: string[];
    exclude: string[];
  };
  platforms: Record<string, boolean>;
}

async function fetchTopicConfig(topicId: string): Promise<TopicConfig> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const data = await import("@/mocks/data/topic-config.json");
  return data.default as TopicConfig;
}

interface PlatformConfig {
  id: string;
  name: string;
  icon: LucideIcon;
}

const platformConfig: PlatformConfig[] = [
  { id: "twitter", name: "X/Twitter", icon: Twitter },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "tiktok", name: "TikTok", icon: Music },
  { id: "youtube", name: "YouTube", icon: Youtube },
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "threads", name: "Threads", icon: AtSign },
  { id: "newsPortal", name: "News Portal", icon: Newspaper },
  { id: "googleNews", name: "Google News", icon: Globe },
];

function formatRelative(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString();
}

export default function TopicConfigPage() {
  const params = useParams();
  const topicId = params.topicId as string;

  const { data: config, isLoading } = useQuery({
    queryKey: ["topic-config", topicId],
    queryFn: () => fetchTopicConfig(topicId),
  });

  // Local state for form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [primaryKeywords, setPrimaryKeywords] = useState<string[]>([]);
  const [mustContain, setMustContain] = useState<string[]>([]);
  const [excludeKeywords, setExcludeKeywords] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form when data loads
  useEffect(() => {
    if (config) {
      setName(config.name);
      setDescription(config.description);
      setPrimaryKeywords(config.keywords.primary);
      setMustContain(config.keywords.mustContain);
      setExcludeKeywords(config.keywords.exclude);
      setPlatforms(config.platforms);
    }
  }, [config]);

  // Track changes
  useEffect(() => {
    if (config) {
      const changed =
        name !== config.name ||
        description !== config.description ||
        JSON.stringify(primaryKeywords) !== JSON.stringify(config.keywords.primary) ||
        JSON.stringify(mustContain) !== JSON.stringify(config.keywords.mustContain) ||
        JSON.stringify(excludeKeywords) !== JSON.stringify(config.keywords.exclude) ||
        JSON.stringify(platforms) !== JSON.stringify(config.platforms);
      setHasChanges(changed);
    }
  }, [name, description, primaryKeywords, mustContain, excludeKeywords, platforms, config]);

  const togglePlatform = (platformId: string) => {
    setPlatforms((prev) => ({
      ...prev,
      [platformId]: !prev[platformId],
    }));
  };

  const handleSave = async () => {
    // Validation
    if (primaryKeywords.length === 0) {
      toast.error("Validation Error", {
        description: "At least one primary keyword is required",
      });
      return;
    }

    if (!Object.values(platforms).some(Boolean)) {
      toast.error("Validation Error", {
        description: "At least one platform must be selected",
      });
      return;
    }

    setIsSaving(true);

    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Settings Saved", {
      description: "Your topic configuration has been updated",
    });
    setHasChanges(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    if (config) {
      setName(config.name);
      setDescription(config.description);
      setPrimaryKeywords(config.keywords.primary);
      setMustContain(config.keywords.mustContain);
      setExcludeKeywords(config.keywords.exclude);
      setPlatforms(config.platforms);
      setHasChanges(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48" />
        <Skeleton className="h-64" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Topic Configuration</h1>
          <p className="text-slate-500">Configure keywords and data collection settings</p>
        </div>

        {hasChanges && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
              Cancel Changes
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <span className="animate-spin mr-2">...</span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Topic Identity */}
      <Card>
        <CardHeader>
          <CardTitle>Topic Identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Badge
              variant={config?.status === "active" ? "default" : "secondary"}
              className={config?.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
            >
              {config?.status === "active" ? (
                <>
                  <Play className="h-3 w-3 mr-1" />
                  Active
                </>
              ) : (
                <>
                  <Pause className="h-3 w-3 mr-1" />
                  Paused
                </>
              )}
            </Badge>
            <span className="text-sm text-slate-500">Created: {config?.createdAt && formatRelative(config.createdAt)}</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Topic Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter topic name" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this topic is monitoring"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Keyword Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Keyword Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <KeywordInputEnhanced
            label="Primary Keywords (OR Logic)"
            description="Mentions containing ANY of these keywords will be collected"
            value={primaryKeywords}
            onChange={setPrimaryKeywords}
            placeholder="e.g., Brand X, @brandx, #brandx"
            variant="primary"
            tooltipContent="Use variations of your brand name, including hashtags, mentions, and common misspellings"
          />

          <Separator />

          <KeywordInputEnhanced
            label="Context Keywords (AND Logic) - Optional"
            description="Mentions must ALSO contain at least one of these words for more focused results"
            value={mustContain}
            onChange={setMustContain}
            placeholder="e.g., review, complaint, feedback"
            variant="mustContain"
            tooltipContent="Use this to filter for specific types of mentions, like complaints or reviews"
          />

          <Separator />

          <KeywordInputEnhanced
            label="Exclude Keywords (NOT Logic)"
            description="Mentions containing these words will be filtered out"
            value={excludeKeywords}
            onChange={setExcludeKeywords}
            placeholder="e.g., giveaway, hiring, promo"
            variant="exclude"
            tooltipContent="Filter out spam and irrelevant content like job postings or giveaways"
          />

          <Separator />

          {/* Query Preview */}
          <QueryPreview primary={primaryKeywords} mustContain={mustContain} exclude={excludeKeywords} />
        </CardContent>
      </Card>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {platformConfig.map((platform) => {
              const Icon = platform.icon;
              const isEnabled = platforms[platform.id];

              return (
                <div
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                    ${
                      isEnabled
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                    }
                  `}
                >
                  <Switch checked={isEnabled} onCheckedChange={() => togglePlatform(platform.id)} />
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${isEnabled ? "text-blue-600" : "text-slate-400"}`} />
                    <span className="text-sm font-medium">{platform.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Data Refresh Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Data Refresh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium">Data refreshed every 24 hours</p>
              <p className="text-sm text-slate-500">
                {config?.lastCrawledAt
                  ? `Last updated: ${formatRelative(config.lastCrawledAt)}`
                  : "Waiting for first data collection"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button (bottom) */}
      {hasChanges && (
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
            Cancel Changes
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <span className="animate-spin mr-2">...</span>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
