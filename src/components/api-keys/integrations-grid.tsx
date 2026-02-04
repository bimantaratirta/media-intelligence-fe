"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, ExternalLink } from "lucide-react";
import type { Integration } from "@/mocks/data/api-keys";

interface IntegrationsGridProps {
  integrations: Integration[];
  onConnect: (id: string) => void;
  onManage: (id: string) => void;
}

export function IntegrationsGrid({
  integrations,
  onConnect,
  onManage,
}: IntegrationsGridProps) {
  const groupedIntegrations = {
    messaging: integrations.filter((i) => i.type === "messaging"),
    bi: integrations.filter((i) => i.type === "bi"),
    analytics: integrations.filter((i) => i.type === "analytics"),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Third-Party Integrations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Messaging Integrations */}
        {groupedIntegrations.messaging.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Messaging
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {groupedIntegrations.messaging.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  onConnect={() => onConnect(integration.id)}
                  onManage={() => onManage(integration.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* BI Integrations */}
        {groupedIntegrations.bi.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Business Intelligence
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {groupedIntegrations.bi.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  onConnect={() => onConnect(integration.id)}
                  onManage={() => onManage(integration.id)}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function IntegrationCard({
  integration,
  onConnect,
  onManage,
}: {
  integration: Integration;
  onConnect: () => void;
  onManage: () => void;
}) {
  return (
    <div className="p-4 border rounded-lg text-center">
      <span className="text-3xl">{integration.icon}</span>
      <h4 className="font-medium mt-2">{integration.name}</h4>
      <Badge
        variant={integration.connected ? "default" : "secondary"}
        className="mt-2"
      >
        {integration.connected ? "Connected" : "Not Setup"}
      </Badge>
      <p className="text-xs text-muted-foreground mt-2">
        {integration.description}
      </p>
      {integration.connected && integration.config && (
        <p className="text-xs text-muted-foreground mt-1">
          {(integration.config.workspace as string) ||
            (integration.config.account as string)}
        </p>
      )}
      <Button
        variant={integration.connected ? "ghost" : "outline"}
        size="sm"
        className="mt-3 w-full"
        onClick={integration.connected ? onManage : onConnect}
      >
        {integration.connected ? (
          <>
            <Settings className="h-4 w-4 mr-1" />
            Manage
          </>
        ) : (
          <>
            <ExternalLink className="h-4 w-4 mr-1" />
            Connect
          </>
        )}
      </Button>
    </div>
  );
}
