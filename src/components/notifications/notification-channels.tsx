"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Bell, Phone, Settings } from "lucide-react";
import type { NotificationChannel } from "@/mocks/data/notifications";

interface NotificationChannelsProps {
  channels: NotificationChannel[];
  onConnect: (channelId: string) => void;
  onManage: (channelId: string) => void;
}

const channelIcons: Record<string, React.ReactNode> = {
  email: <Mail className="h-5 w-5" />,
  slack: <MessageSquare className="h-5 w-5" />,
  push: <Bell className="h-5 w-5" />,
  whatsapp: <Phone className="h-5 w-5" />,
};

export function NotificationChannels({
  channels,
  onConnect,
  onManage,
}: NotificationChannelsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Notification Channels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="p-4 border rounded-lg flex flex-col items-center text-center"
            >
              <div className="p-3 bg-muted rounded-full mb-3">
                {channelIcons[channel.type]}
              </div>
              <h4 className="font-medium">{channel.name}</h4>
              <Badge
                variant={channel.connected ? "default" : "secondary"}
                className="mt-2"
              >
                {channel.connected ? "Connected" : "Not Setup"}
              </Badge>

              {channel.connected && channel.config && (
                <p className="text-xs text-muted-foreground mt-2">
                  {channel.type === "slack" &&
                    (channel.config.channel as string)}
                  {channel.type === "email" &&
                    `${(channel.config.recipients as string[])?.length || 0} recipients`}
                </p>
              )}

              <Button
                variant={channel.connected ? "ghost" : "outline"}
                size="sm"
                className="mt-3"
                onClick={() =>
                  channel.connected
                    ? onManage(channel.id)
                    : onConnect(channel.id)
                }
              >
                {channel.connected ? (
                  <>
                    <Settings className="h-4 w-4 mr-1" />
                    Manage
                  </>
                ) : (
                  "Connect"
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
