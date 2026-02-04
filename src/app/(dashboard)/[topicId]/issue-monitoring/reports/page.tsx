"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  ReportGeneratorForm,
  type ReportConfig,
} from "@/components/reports/report-generator-form";
import { RecentReportsTable } from "@/components/reports/recent-reports-table";
import { ScheduledReports } from "@/components/reports/scheduled-reports";
import {
  reportTemplates,
  reportSections,
  mockRecentReports,
  mockScheduledReports,
} from "@/mocks/data/reports";

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reports, setReports] = useState(mockRecentReports);
  const [scheduledReports, setScheduledReports] = useState(mockScheduledReports);

  const handleGenerate = async (config: ReportConfig) => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsGenerating(false);

    toast.success("Report Generated", {
      description: "Your report is ready for download.",
    });
  };

  const handleDownload = (reportId: string) => {
    const report = reports.find((r) => r.id === reportId);
    if (report?.downloadUrl) {
      // In real app, trigger download
      toast.success("Download Started", {
        description: `Downloading ${report.name}...`,
      });
    }
  };

  const handleCopyLink = (reportId: string) => {
    // In real app, copy to clipboard
    toast.success("Link Copied", {
      description: "Report link copied to clipboard.",
    });
  };

  const handleToggleSchedule = (reportId: string, enabled: boolean) => {
    setScheduledReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, enabled } : r))
    );
    toast.success(enabled ? "Schedule Enabled" : "Schedule Disabled", {
      description: `Report schedule has been ${enabled ? "enabled" : "disabled"}.`,
    });
  };

  const handleEditSchedule = (reportId: string) => {
    // Open edit dialog
    toast.info("Edit Schedule", {
      description: "Edit functionality coming soon.",
    });
  };

  const handleDeleteSchedule = (reportId: string) => {
    setScheduledReports((prev) => prev.filter((r) => r.id !== reportId));
    toast.success("Schedule Deleted", {
      description: "Report schedule has been removed.",
    });
  };

  const handleAddSchedule = () => {
    toast.success("Schedule Created", {
      description: "New report schedule has been created.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Report Center
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Generate and schedule automated reports
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator Form - 1 column */}
        <div className="lg:col-span-1">
          <ReportGeneratorForm
            templates={reportTemplates}
            sections={reportSections}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>

        {/* Reports Lists - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <RecentReportsTable
            reports={reports}
            onDownload={handleDownload}
            onCopyLink={handleCopyLink}
          />

          <ScheduledReports
            reports={scheduledReports}
            onToggle={handleToggleSchedule}
            onEdit={handleEditSchedule}
            onDelete={handleDeleteSchedule}
            onAdd={handleAddSchedule}
          />
        </div>
      </div>
    </div>
  );
}
