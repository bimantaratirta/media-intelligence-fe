"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle } from "lucide-react";

interface ConfidenceMetrics {
  genderAccuracy: number;
  ageAccuracy: number;
  undetectableProfiles: number;
  totalProfilesAnalyzed: number;
  lastUpdated: string;
}

interface ConfidenceNoteProps {
  metrics: ConfidenceMetrics;
}

export function ConfidenceNote({ metrics }: ConfidenceNoteProps) {
  return (
    <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
              Data Confidence Note
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
              Demographics data is inferred from profile analysis, name patterns, and bio
              information.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-700 dark:text-amber-300">Gender Accuracy</span>
                  <span className="font-medium text-amber-800 dark:text-amber-200">
                    {metrics.genderAccuracy}%
                  </span>
                </div>
                <Progress value={metrics.genderAccuracy} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-700 dark:text-amber-300">Age Accuracy</span>
                  <span className="font-medium text-amber-800 dark:text-amber-200">
                    {metrics.ageAccuracy}%
                  </span>
                </div>
                <Progress value={metrics.ageAccuracy} className="h-2" />
              </div>
            </div>

            <p className="text-xs text-amber-600 dark:text-amber-400 mt-3">
              Undetectable profiles: {metrics.undetectableProfiles}% of{" "}
              {metrics.totalProfilesAnalyzed.toLocaleString()} total profiles analyzed
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
