"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import type { Topic } from "@/mocks/data/comparison";

export type CompareMode = "periods" | "topics" | "custom";

interface ComparisonSelectorProps {
  mode: CompareMode;
  onModeChange: (mode: CompareMode) => void;
  topics: Topic[];
  selectedTopicA?: string;
  selectedTopicB?: string;
  onTopicAChange?: (topicId: string) => void;
  onTopicBChange?: (topicId: string) => void;
}

export function ComparisonSelector({
  mode,
  onModeChange,
  topics,
  selectedTopicA,
  selectedTopicB,
  onTopicAChange,
  onTopicBChange,
}: ComparisonSelectorProps) {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Mode Selection */}
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">
              Compare:
            </Label>
            <RadioGroup
              value={mode}
              onValueChange={(v) => onModeChange(v as CompareMode)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="periods" id="periods" />
                <Label htmlFor="periods">Time Periods</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="topics" id="topics" />
                <Label htmlFor="topics">Topics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Period Selection */}
          {mode === "periods" && (
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Period A:</Label>
                <DateRangePicker />
              </div>
              <span className="text-muted-foreground font-medium">vs</span>
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Period B:</Label>
                <DateRangePicker />
              </div>
            </div>
          )}

          {/* Topic Selection */}
          {mode === "topics" && (
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Topic A:</Label>
                <Select value={selectedTopicA} onValueChange={onTopicAChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <span className="text-muted-foreground font-medium">vs</span>
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Topic B:</Label>
                <Select value={selectedTopicB} onValueChange={onTopicBChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Custom mode - combine both */}
          {mode === "custom" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Topic A:</Label>
                  <Select value={selectedTopicA} onValueChange={onTopicAChange}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id}>
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <DateRangePicker />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Topic B:</Label>
                  <Select value={selectedTopicB} onValueChange={onTopicBChange}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id}>
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <DateRangePicker />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
