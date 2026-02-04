"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  AlertConfig,
  AlertMetric,
  AlertCondition,
  TimeWindow,
} from "@/mocks/data/notifications";
import {
  metricLabels,
  conditionLabels,
  timeWindowLabels,
} from "@/mocks/data/notifications";

interface AlertConfigFormProps {
  initialValues?: AlertConfig;
  onSubmit: (config: Omit<AlertConfig, "id" | "createdAt">) => void;
  onCancel: () => void;
}

export function AlertConfigForm({
  initialValues,
  onSubmit,
  onCancel,
}: AlertConfigFormProps) {
  const [name, setName] = useState(initialValues?.name || "");
  const [metric, setMetric] = useState<AlertMetric>(
    initialValues?.trigger.metric || "total_mentions"
  );
  const [condition, setCondition] = useState<AlertCondition>(
    initialValues?.trigger.condition || "increases_by"
  );
  const [value, setValue] = useState(initialValues?.trigger.value || 50);
  const [unit, setUnit] = useState<"percent" | "absolute">(
    initialValues?.trigger.unit || "percent"
  );
  const [timeWindow, setTimeWindow] = useState<TimeWindow>(
    initialValues?.trigger.timeWindow || "1hour"
  );

  const [emailEnabled, setEmailEnabled] = useState(
    initialValues?.channels.email.enabled ?? true
  );
  const [emailRecipients, setEmailRecipients] = useState(
    initialValues?.channels.email.recipients.join(", ") || ""
  );
  const [slackEnabled, setSlackEnabled] = useState(
    initialValues?.channels.slack.enabled ?? false
  );
  const [slackChannel, setSlackChannel] = useState(
    initialValues?.channels.slack.channel || ""
  );
  const [pushEnabled, setPushEnabled] = useState(
    initialValues?.channels.push.enabled ?? false
  );

  const [cooldown, setCooldown] = useState(
    initialValues?.options.cooldownMinutes || 30
  );
  const [includeSamples, setIncludeSamples] = useState(
    initialValues?.options.includeSamples ?? true
  );
  const [includeComparison, setIncludeComparison] = useState(
    initialValues?.options.includeComparison ?? true
  );
  const [includeDashboardLink, setIncludeDashboardLink] = useState(
    initialValues?.options.includeDashboardLink ?? true
  );

  const handleSubmit = () => {
    onSubmit({
      name,
      enabled: initialValues?.enabled ?? true,
      trigger: {
        metric,
        condition,
        value,
        unit,
        timeWindow,
      },
      channels: {
        email: {
          enabled: emailEnabled,
          recipients: emailRecipients
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        slack: {
          enabled: slackEnabled,
          channel: slackChannel,
        },
        push: {
          enabled: pushEnabled,
        },
      },
      options: {
        cooldownMinutes: cooldown,
        includeSamples,
        includeComparison,
        includeDashboardLink,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-2">
        <Label>Alert Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Mention Spike Alert"
        />
      </div>

      {/* Trigger Condition */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Trigger Condition</Label>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Metric</Label>
            <Select
              value={metric}
              onValueChange={(v) => setMetric(v as AlertMetric)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(metricLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Condition</Label>
            <Select
              value={condition}
              onValueChange={(v) => setCondition(v as AlertCondition)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(conditionLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Value</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
              />
              <Select
                value={unit}
                onValueChange={(v) => setUnit(v as "percent" | "absolute")}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percent">%</SelectItem>
                  <SelectItem value="absolute">Count</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Time Window</Label>
            <Select
              value={timeWindow}
              onValueChange={(v) => setTimeWindow(v as TimeWindow)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(timeWindowLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Notification Channels */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Notification Channels</Label>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 border rounded-lg">
            <Checkbox
              checked={emailEnabled}
              onCheckedChange={(checked) => setEmailEnabled(!!checked)}
            />
            <div className="flex-1">
              <Label>Email</Label>
              <Input
                placeholder="email@example.com, another@example.com"
                value={emailRecipients}
                onChange={(e) => setEmailRecipients(e.target.value)}
                disabled={!emailEnabled}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 border rounded-lg">
            <Checkbox
              checked={slackEnabled}
              onCheckedChange={(checked) => setSlackEnabled(!!checked)}
            />
            <div className="flex-1">
              <Label>Slack</Label>
              <Input
                placeholder="#channel-name"
                value={slackChannel}
                onChange={(e) => setSlackChannel(e.target.value)}
                disabled={!slackEnabled}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <Checkbox
              checked={pushEnabled}
              onCheckedChange={(checked) => setPushEnabled(!!checked)}
            />
            <Label>Push Notification</Label>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Alert Options</Label>

        <div className="space-y-2">
          <Label>Cooldown (don&apos;t re-alert within)</Label>
          <Select
            value={cooldown.toString()}
            onValueChange={(v) => setCooldown(parseInt(v))}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
              <SelectItem value="360">6 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Include in alert:</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={includeSamples}
                onCheckedChange={(c) => setIncludeSamples(!!c)}
              />
              <span className="text-sm">Top 5 sample mentions</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={includeComparison}
                onCheckedChange={(c) => setIncludeComparison(!!c)}
              />
              <span className="text-sm">Comparison with previous period</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={includeDashboardLink}
                onCheckedChange={(c) => setIncludeDashboardLink(!!c)}
              />
              <span className="text-sm">Direct link to dashboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!name}>
          {initialValues ? "Save Changes" : "Create Alert"}
        </Button>
      </div>
    </div>
  );
}
