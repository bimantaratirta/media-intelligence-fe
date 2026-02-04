"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Clock, Mail, AlertCircle, Edit, Trash2 } from "lucide-react";
import type { ScheduledReport } from "@/mocks/data/reports";

interface ScheduledReportsProps {
  reports: ScheduledReport[];
  onToggle: (reportId: string, enabled: boolean) => void;
  onEdit: (reportId: string) => void;
  onDelete: (reportId: string) => void;
  onAdd: () => void;
}

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatSchedule(report: ScheduledReport): string {
  const { schedule } = report;
  if (schedule.frequency === "daily") {
    return `Daily at ${schedule.time}`;
  }
  if (schedule.frequency === "weekly") {
    return `Every ${dayNames[schedule.dayOfWeek || 0]} at ${schedule.time}`;
  }
  if (schedule.frequency === "monthly") {
    return `Monthly on day ${schedule.dayOfMonth} at ${schedule.time}`;
  }
  return "";
}

export function ScheduledReports({
  reports,
  onToggle,
  onEdit,
  onDelete,
  onAdd,
}: ScheduledReportsProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Scheduled Reports</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Scheduled Report</DialogTitle>
            </DialogHeader>
            <ScheduleReportForm
              onSubmit={() => {
                setIsAddDialogOpen(false);
                onAdd();
              }}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-medium truncate">{report.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {report.type}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatSchedule(report)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {report.recipients.length} recipient(s)
                    </span>
                  </div>

                  {report.condition && (
                    <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 mt-2">
                      <AlertCircle className="h-3 w-3" />
                      Condition: {report.condition.metric}{" "}
                      {report.condition.operator} {report.condition.value}%
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-2">
                    Next run: {new Date(report.nextRun).toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Switch
                    checked={report.enabled}
                    onCheckedChange={(checked) => onToggle(report.id, checked)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(report.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDelete(report.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {reports.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No scheduled reports</p>
              <p className="text-sm">Create one to automate your reporting</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ScheduleReportForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label>Report Name</Label>
        <Input placeholder="Weekly Summary Report" />
      </div>

      <div className="space-y-2">
        <Label>Report Type</Label>
        <Select defaultValue="executive">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="executive">Executive Summary</SelectItem>
            <SelectItem value="full">Full Analysis</SelectItem>
            <SelectItem value="sentiment">Sentiment Report</SelectItem>
            <SelectItem value="crisis">Crisis Alert</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Frequency</Label>
        <Select defaultValue="weekly">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Time</Label>
        <Input type="time" defaultValue="09:00" />
      </div>

      <div className="space-y-2">
        <Label>Recipients (comma-separated)</Label>
        <Input placeholder="team@company.com, manager@company.com" />
      </div>

      <Button onClick={onSubmit} className="w-full">
        Create Schedule
      </Button>
    </div>
  );
}
