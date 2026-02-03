"use client";

import { Twitter, Instagram, Music, Youtube, Facebook, AtSign, Newspaper, Globe } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { CreateProjectFormData } from "@/types/create-project";

interface StepPlatformsProps {
  data: CreateProjectFormData;
  onChange: (data: Partial<CreateProjectFormData>) => void;
}

const platformConfig = [
  { id: "twitter", name: "X/Twitter", icon: Twitter, description: "Posts & replies" },
  { id: "instagram", name: "Instagram", icon: Instagram, description: "Posts & comments" },
  { id: "tiktok", name: "TikTok", icon: Music, description: "Videos & comments" },
  { id: "youtube", name: "YouTube", icon: Youtube, description: "Videos & comments" },
  { id: "facebook", name: "Facebook", icon: Facebook, description: "Posts & comments" },
  { id: "threads", name: "Threads", icon: AtSign, description: "Posts & replies" },
  { id: "newsPortal", name: "News Portal", icon: Newspaper, description: "100+ Indonesian portals" },
  { id: "googleNews", name: "Google News", icon: Globe, description: "Indonesia region" },
] as const;

export function StepPlatforms({ data, onChange }: StepPlatformsProps) {
  const togglePlatform = (platformId: keyof typeof data.platforms) => {
    onChange({
      platforms: {
        ...data.platforms,
        [platformId]: !data.platforms[platformId],
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Data Sources</h2>
        <p className="text-sm text-slate-500">Select platforms to monitor and crawling frequency</p>
      </div>

      {/* Platforms */}
      <div className="space-y-4">
        <Label>Platforms to Monitor</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {platformConfig.map((platform) => {
            const Icon = platform.icon;
            const isEnabled = data.platforms[platform.id as keyof typeof data.platforms];

            return (
              <div
                key={platform.id}
                className={`
                  flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors
                  ${
                    isEnabled
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                  }
                `}
                onClick={() => togglePlatform(platform.id as keyof typeof data.platforms)}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${isEnabled ? "text-blue-600" : "text-slate-400"}`} />
                  <div>
                    <p className="font-medium text-sm">{platform.name}</p>
                    <p className="text-xs text-slate-500">{platform.description}</p>
                  </div>
                </div>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={() => togglePlatform(platform.id as keyof typeof data.platforms)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Frequency */}
      <div className="space-y-4">
        <Label>Crawling Frequency</Label>
        <RadioGroup
          value={data.crawlFrequency}
          onValueChange={(value) => onChange({ crawlFrequency: value as CreateProjectFormData["crawlFrequency"] })}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { value: "realtime", label: "Real-time", description: "Instant updates" },
            { value: "15min", label: "Every 15 min", description: "Recommended" },
            { value: "hourly", label: "Hourly", description: "Balanced" },
            { value: "daily", label: "Daily", description: "Low volume" },
          ].map((option) => (
            <label
              key={option.value}
              className={`
                flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${
                  data.crawlFrequency === option.value
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                }
              `}
            >
              <RadioGroupItem value={option.value} className="sr-only" />
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-slate-500">{option.description}</span>
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
