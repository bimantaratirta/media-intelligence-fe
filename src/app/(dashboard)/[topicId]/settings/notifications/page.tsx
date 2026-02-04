"use client";

import { useState } from "react";
import { toast } from "sonner";
import { EmailSchedules } from "@/components/notifications/email-schedules";
import { AlertsList } from "@/components/notifications/alerts-list";
import { NotificationChannels } from "@/components/notifications/notification-channels";
import {
  mockAlerts,
  mockEmailSchedules,
  mockChannels,
} from "@/mocks/data/notifications";
import type { AlertConfig, EmailSchedule } from "@/mocks/data/notifications";

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [schedules, setSchedules] = useState(mockEmailSchedules);

  const handleToggleAlert = (id: string, enabled: boolean) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled } : a))
    );
    toast.success(enabled ? "Alert Enabled" : "Alert Disabled", {
      description: `The alert has been ${enabled ? "enabled" : "disabled"}`,
    });
  };

  const handleEditAlert = (alert: AlertConfig) => {
    setAlerts((prev) => prev.map((a) => (a.id === alert.id ? alert : a)));
    toast.success("Alert Updated", {
      description: "Your changes have been saved",
    });
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    toast.success("Alert Deleted", {
      description: "The alert has been removed",
    });
  };

  const handleAddAlert = (config: Omit<AlertConfig, "id" | "createdAt">) => {
    const newAlert: AlertConfig = {
      ...config,
      id: `a${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setAlerts((prev) => [...prev, newAlert]);
    toast.success("Alert Created", {
      description: "Your new alert is now active",
    });
  };

  const handleToggleSchedule = (id: string, enabled: boolean) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled } : s))
    );
    toast.success(enabled ? "Schedule Enabled" : "Schedule Disabled");
  };

  const handleUpdateSchedule = (
    id: string,
    updates: Partial<EmailSchedule>
  ) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const handleConnectChannel = (channelId: string) => {
    toast.info("Coming Soon", {
      description: "Channel connection will be available soon",
    });
  };

  const handleManageChannel = (channelId: string) => {
    toast.info("Channel Settings", {
      description: "Opening channel settings...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Notification Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Configure alerts and notifications
        </p>
      </div>

      {/* Email Schedules */}
      <EmailSchedules
        schedules={schedules}
        onToggle={handleToggleSchedule}
        onUpdate={handleUpdateSchedule}
      />

      {/* Real-Time Alerts */}
      <AlertsList
        alerts={alerts}
        onToggle={handleToggleAlert}
        onEdit={handleEditAlert}
        onDelete={handleDeleteAlert}
        onAdd={handleAddAlert}
      />

      {/* Notification Channels */}
      <NotificationChannels
        channels={mockChannels}
        onConnect={handleConnectChannel}
        onManage={handleManageChannel}
      />
    </div>
  );
}
