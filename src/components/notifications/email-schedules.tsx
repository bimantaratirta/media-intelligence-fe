"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Clock, Calendar } from "lucide-react";
import type { EmailSchedule } from "@/mocks/data/notifications";

interface EmailSchedulesProps {
  schedules: EmailSchedule[];
  onToggle: (id: string, enabled: boolean) => void;
  onUpdate: (id: string, updates: Partial<EmailSchedule>) => void;
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

export function EmailSchedules({
  schedules,
  onToggle,
  onUpdate,
}: EmailSchedulesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="flex items-start gap-4 p-4 border rounded-lg"
          >
            <Switch
              checked={schedule.enabled}
              onCheckedChange={(checked) => onToggle(schedule.id, checked)}
            />
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  {schedule.type === "daily"
                    ? "Daily Summary Report"
                    : "Weekly Digest"}
                </Label>
              </div>

              <div className="flex flex-wrap gap-4">
                {schedule.type === "weekly" && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={schedule.dayOfWeek?.toString()}
                      onValueChange={(v) =>
                        onUpdate(schedule.id, { dayOfWeek: parseInt(v) })
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dayNames.map((day, idx) => (
                          <SelectItem key={idx} value={idx.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={schedule.time}
                    onChange={(e) =>
                      onUpdate(schedule.id, { time: e.target.value })
                    }
                    className="w-[120px]"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Recipients
                </Label>
                <Input
                  placeholder="email@example.com, another@example.com"
                  value={schedule.recipients.join(", ")}
                  onChange={(e) =>
                    onUpdate(schedule.id, {
                      recipients: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
