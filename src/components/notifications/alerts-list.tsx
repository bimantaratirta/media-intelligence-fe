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
import {
  Bell,
  Plus,
  Edit,
  Trash2,
  Mail,
  MessageSquare,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AlertConfigForm } from "./alert-config-form";
import type { AlertConfig } from "@/mocks/data/notifications";
import {
  metricLabels,
  conditionLabels,
  timeWindowLabels,
} from "@/mocks/data/notifications";

interface AlertsListProps {
  alerts: AlertConfig[];
  onToggle: (id: string, enabled: boolean) => void;
  onEdit: (alert: AlertConfig) => void;
  onDelete: (id: string) => void;
  onAdd: (alert: Omit<AlertConfig, "id" | "createdAt">) => void;
}

export function AlertsList({
  alerts,
  onToggle,
  onEdit,
  onDelete,
  onAdd,
}: AlertsListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<AlertConfig | null>(null);

  const formatTrigger = (alert: AlertConfig) => {
    const { trigger } = alert;
    const metric = metricLabels[trigger.metric];
    const condition = conditionLabels[trigger.condition];
    const unit = trigger.unit === "percent" ? "%" : "";
    const window = timeWindowLabels[trigger.timeWindow];

    return `When ${metric} ${condition} ${trigger.value}${unit} in ${window}`;
  };

  const getChannelIcons = (alert: AlertConfig) => {
    const icons = [];
    if (alert.channels.email.enabled)
      icons.push(<Mail key="email" className="h-4 w-4" />);
    if (alert.channels.slack.enabled)
      icons.push(<MessageSquare key="slack" className="h-4 w-4" />);
    if (alert.channels.push.enabled)
      icons.push(<Smartphone key="push" className="h-4 w-4" />);
    return icons;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Real-Time Alerts
        </CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Alert</DialogTitle>
            </DialogHeader>
            <AlertConfigForm
              onSubmit={(config) => {
                onAdd(config);
                setIsAddDialogOpen(false);
              }}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "p-4 border rounded-lg transition-colors",
              alert.enabled ? "bg-background" : "bg-muted/50"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Switch
                  checked={alert.enabled}
                  onCheckedChange={(checked) => onToggle(alert.id, checked)}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{alert.name}</h4>
                    <Badge variant={alert.enabled ? "default" : "secondary"}>
                      {alert.enabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatTrigger(alert)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      Channels:
                    </span>
                    <div className="flex gap-1 text-muted-foreground">
                      {getChannelIcons(alert)}
                    </div>
                  </div>
                  {alert.lastTriggered && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Last triggered:{" "}
                      {new Date(alert.lastTriggered).toLocaleString("id-ID")}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-1">
                <Dialog
                  open={editingAlert?.id === alert.id}
                  onOpenChange={(open) => !open && setEditingAlert(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingAlert(alert)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Alert</DialogTitle>
                    </DialogHeader>
                    {editingAlert && (
                      <AlertConfigForm
                        initialValues={editingAlert}
                        onSubmit={(config) => {
                          onEdit({ ...editingAlert, ...config });
                          setEditingAlert(null);
                        }}
                        onCancel={() => setEditingAlert(null)}
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => onDelete(alert.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No alerts configured</p>
            <p className="text-sm">
              Create one to get notified about important events
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
