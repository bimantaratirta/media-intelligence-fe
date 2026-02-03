"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

interface SentimentEditDialogProps {
  open: boolean;
  onClose: () => void;
  mention: {
    id: string;
    content: string;
    autoSentiment: string;
    manualSentiment: string | null;
  } | null;
  onSave: (mentionId: string, sentiment: string) => void;
}

export function SentimentEditDialog({ open, onClose, mention, onSave }: SentimentEditDialogProps) {
  const [selectedSentiment, setSelectedSentiment] = useState("neutral");

  useEffect(() => {
    if (mention) {
      setSelectedSentiment(mention.manualSentiment || mention.autoSentiment || "neutral");
    }
  }, [mention]);

  const handleSave = () => {
    if (mention) {
      onSave(mention.id, selectedSentiment);
      onClose();
    }
  };

  if (!mention) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Sentiment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Content Preview */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <p className="text-sm">{mention.content}</p>
          </div>

          {/* Auto Detected */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Auto detected:</span>
            <Badge
              variant="secondary"
              className={
                mention.autoSentiment === "positive"
                  ? "bg-green-100 text-green-700"
                  : mention.autoSentiment === "negative"
                    ? "bg-red-100 text-red-700"
                    : "bg-slate-100 text-slate-700"
              }
            >
              {mention.autoSentiment}
            </Badge>
          </div>

          {/* Sentiment Selection */}
          <div className="space-y-3">
            <Label>Correct sentiment to:</Label>
            <RadioGroup value={selectedSentiment} onValueChange={setSelectedSentiment} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="positive" id="positive" />
                <Label htmlFor="positive" className="flex items-center gap-1 cursor-pointer">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  Positive
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral" className="flex items-center gap-1 cursor-pointer">
                  <span className="w-3 h-3 rounded-full bg-slate-500" />
                  Neutral
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="negative" id="negative" />
                <Label htmlFor="negative" className="flex items-center gap-1 cursor-pointer">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  Negative
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Change</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
