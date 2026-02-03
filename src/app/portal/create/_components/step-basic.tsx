"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateProjectFormData } from "@/types/create-project";

interface StepBasicProps {
  data: CreateProjectFormData;
  onChange: (data: Partial<CreateProjectFormData>) => void;
}

export function StepBasic({ data, onChange }: StepBasicProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Basic Information</h2>
        <p className="text-sm text-slate-500">Give your project a name and description</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Project Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g., Brand X Monitoring"
            maxLength={100}
          />
          <p className="text-xs text-slate-500">{data.name.length}/100 characters</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Describe what this project is monitoring..."
            rows={4}
            maxLength={500}
          />
          <p className="text-xs text-slate-500">{data.description.length}/500 characters</p>
        </div>
      </div>
    </div>
  );
}
