"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Webhook, Plus, Trash2, RefreshCw } from "lucide-react";
import type { Webhook as WebhookType } from "@/mocks/data/api-keys";

interface WebhookEvent {
  id: string;
  name: string;
  description: string;
}

interface WebhooksTableProps {
  webhooks: WebhookType[];
  events: WebhookEvent[];
  onAdd: (
    webhook: Omit<WebhookType, "id" | "createdAt" | "secret" | "failureCount">
  ) => void;
  onToggle: (id: string, enabled: boolean) => void;
  onDelete: (id: string) => void;
  onTest: (id: string) => void;
}

export function WebhooksTable({
  webhooks,
  events,
  onAdd,
  onToggle,
  onDelete,
  onTest,
}: WebhooksTableProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const handleAdd = () => {
    onAdd({
      name,
      url,
      events: selectedEvents,
      enabled: true,
    });
    setIsAddOpen(false);
    setName("");
    setUrl("");
    setSelectedEvents([]);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString("id-ID");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Webhook className="h-5 w-5" />
          Webhooks
        </CardTitle>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Webhook
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Webhook</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="e.g., Mention Notifications"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Endpoint URL</Label>
                <Input
                  placeholder="https://api.yourapp.com/webhooks"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Events to Subscribe</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-2 p-2 border rounded"
                    >
                      <Checkbox
                        id={event.id}
                        checked={selectedEvents.includes(event.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedEvents([...selectedEvents, event.id]);
                          } else {
                            setSelectedEvents(
                              selectedEvents.filter((e) => e !== event.id)
                            );
                          }
                        }}
                      />
                      <div>
                        <Label htmlFor={event.id} className="cursor-pointer">
                          {event.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAdd}
                disabled={!name || !url || selectedEvents.length === 0}
              >
                Add Webhook
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {webhooks.length > 0 ? (
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Switch
                      checked={webhook.enabled}
                      onCheckedChange={(checked) =>
                        onToggle(webhook.id, checked)
                      }
                    />
                    <div>
                      <h4 className="font-medium">{webhook.name}</h4>
                      <code className="text-xs text-muted-foreground">
                        {webhook.url}
                      </code>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {webhook.events.map((event) => (
                          <Badge
                            key={event}
                            variant="outline"
                            className="text-xs"
                          >
                            {event}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Last triggered: {formatDate(webhook.lastTriggeredAt)}
                        {webhook.failureCount > 0 && (
                          <span className="text-red-500 ml-2">
                            ({webhook.failureCount} failures)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onTest(webhook.id)}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => onDelete(webhook.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Webhook className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No webhooks configured</p>
            <p className="text-sm">
              Webhooks allow you to receive real-time notifications when events
              occur.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
