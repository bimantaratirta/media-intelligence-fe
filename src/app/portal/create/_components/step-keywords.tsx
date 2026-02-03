"use client";

import { Label } from "@/components/ui/label";
import { KeywordInput } from "@/components/shared/keyword-input";
import type { CreateProjectFormData } from "@/types/create-project";

interface StepKeywordsProps {
  data: CreateProjectFormData;
  onChange: (data: Partial<CreateProjectFormData>) => void;
}

export function StepKeywords({ data, onChange }: StepKeywordsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Keyword Configuration</h2>
        <p className="text-sm text-slate-500">Define keywords to monitor across platforms</p>
      </div>

      <div className="space-y-6">
        {/* Primary Keywords */}
        <div className="space-y-2">
          <Label>
            Primary Keywords (OR Logic) <span className="text-red-500">*</span>
          </Label>
          <p className="text-xs text-slate-500">Mentions containing ANY of these keywords will be collected</p>
          <KeywordInput
            value={data.primaryKeywords}
            onChange={(primaryKeywords) => onChange({ primaryKeywords })}
            placeholder="e.g., Brand X, BrandX, @brandx"
          />
        </div>

        {/* Must Contain */}
        <div className="space-y-2">
          <Label>Context Keywords (AND Logic)</Label>
          <p className="text-xs text-slate-500">Optional: Mentions must ALSO contain at least one of these words</p>
          <KeywordInput
            value={data.mustContain}
            onChange={(mustContain) => onChange({ mustContain })}
            placeholder="e.g., review, complaint, feedback"
          />
        </div>

        {/* Exclude */}
        <div className="space-y-2">
          <Label>Exclude Keywords (NOT Logic)</Label>
          <p className="text-xs text-slate-500">Mentions containing these words will be filtered out</p>
          <KeywordInput
            value={data.excludeKeywords}
            onChange={(excludeKeywords) => onChange({ excludeKeywords })}
            placeholder="e.g., giveaway, promo, hiring"
          />
        </div>

        {/* Query Preview */}
        {data.primaryKeywords.length > 0 && (
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <Label className="text-xs">Query Preview</Label>
            <code className="block mt-2 text-sm break-all">
              ({data.primaryKeywords.map((k) => `"${k}"`).join(" OR ")})
              {data.mustContain.length > 0 && <> AND ({data.mustContain.map((k) => `"${k}"`).join(" OR ")})</>}
              {data.excludeKeywords.length > 0 && <> NOT ({data.excludeKeywords.map((k) => `"${k}"`).join(" OR ")})</>}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
