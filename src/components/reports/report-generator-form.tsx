"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, FileImage, FileSpreadsheet, Globe } from "lucide-react";
import type {
  ReportType,
  ReportFormat,
  ReportTemplate,
  ReportSection,
} from "@/mocks/data/reports";

interface ReportGeneratorFormProps {
  templates: ReportTemplate[];
  sections: ReportSection[];
  onGenerate: (config: ReportConfig) => void;
  isGenerating?: boolean;
}

export interface ReportConfig {
  type: ReportType;
  format: ReportFormat;
  sections: string[];
  dateRange?: { start: Date; end: Date };
}

const formatIcons: Record<ReportFormat, React.ReactNode> = {
  pdf: <FileText className="h-4 w-4" />,
  pptx: <FileImage className="h-4 w-4" />,
  docx: <FileSpreadsheet className="h-4 w-4" />,
  html: <Globe className="h-4 w-4" />,
};

export function ReportGeneratorForm({
  templates,
  sections,
  onGenerate,
  isGenerating = false,
}: ReportGeneratorFormProps) {
  const [selectedType, setSelectedType] = useState<ReportType>("executive");
  const [selectedFormat, setSelectedFormat] = useState<ReportFormat>("pptx");
  const [selectedSections, setSelectedSections] = useState<string[]>(
    sections.filter((s) => s.default).map((s) => s.id)
  );

  const selectedTemplate = templates.find((t) => t.id === selectedType);

  const toggleSection = (sectionId: string) => {
    setSelectedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleGenerate = () => {
    onGenerate({
      type: selectedType,
      format: selectedFormat,
      sections: selectedSections,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Generate New Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Type */}
        <div className="space-y-2">
          <Label>Report Type</Label>
          <Select
            value={selectedType}
            onValueChange={(v) => setSelectedType(v as ReportType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedTemplate && (
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p className="font-medium">{selectedTemplate.name}</p>
              <p className="text-muted-foreground">
                {selectedTemplate.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{selectedTemplate.pages}</Badge>
                <span className="text-xs text-muted-foreground">
                  Includes: {selectedTemplate.sections.join(", ")}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Label>Date Range</Label>
          <DateRangePicker />
        </div>

        {/* Sections */}
        <div className="space-y-2">
          <Label>Include in Report</Label>
          <div className="grid grid-cols-1 gap-3">
            {sections.map((section) => (
              <div key={section.id} className="flex items-start space-x-2">
                <Checkbox
                  id={section.id}
                  checked={selectedSections.includes(section.id)}
                  onCheckedChange={() => toggleSection(section.id)}
                />
                <div className="grid gap-1 leading-none">
                  <Label
                    htmlFor={section.id}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {section.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Format */}
        <div className="space-y-2">
          <Label>Export Format</Label>
          <RadioGroup
            value={selectedFormat}
            onValueChange={(v) => setSelectedFormat(v as ReportFormat)}
            className="flex flex-wrap gap-4"
          >
            {(["pdf", "pptx", "docx", "html"] as ReportFormat[]).map(
              (format) => (
                <div key={format} className="flex items-center space-x-2">
                  <RadioGroupItem value={format} id={format} />
                  <Label
                    htmlFor={format}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    {formatIcons[format]}
                    <span className="uppercase text-xs">{format}</span>
                  </Label>
                </div>
              )
            )}
          </RadioGroup>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || selectedSections.length === 0}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Report...
            </>
          ) : (
            "Generate Report"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
