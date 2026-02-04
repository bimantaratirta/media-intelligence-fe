"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ApiKeysTable } from "@/components/api-keys/api-keys-table";
import { ApiDocumentation } from "@/components/api-keys/api-documentation";
import { WebhooksTable } from "@/components/api-keys/webhooks-table";
import { IntegrationsGrid } from "@/components/api-keys/integrations-grid";
import {
  mockApiKeys,
  mockWebhooks,
  mockIntegrations,
  apiEndpoints,
  availableWebhookEvents,
} from "@/mocks/data/api-keys";
import type { ApiKey, Webhook } from "@/mocks/data/api-keys";

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState(mockApiKeys);
  const [webhooks, setWebhooks] = useState(mockWebhooks);

  const handleGenerateKey = async (
    name: string,
    permissions: string[]
  ): Promise<string> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const fullKey = `n4p_sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const newKey: ApiKey = {
      id: `key${Date.now()}`,
      name,
      keyPrefix: `n4p_sk_***...${fullKey.slice(-3)}`,
      permissions,
      createdAt: new Date().toISOString(),
    };

    setApiKeys((prev) => [...prev, newKey]);

    toast.success("API Key Generated", {
      description: "Your new API key has been created",
    });

    return fullKey;
  };

  const handleRevokeKey = (keyId: string) => {
    setApiKeys((prev) => prev.filter((k) => k.id !== keyId));
    toast.success("API Key Revoked", {
      description: "The API key has been permanently deleted",
    });
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("Copied", {
      description: "API key copied to clipboard",
    });
  };

  const handleCopyBaseUrl = () => {
    navigator.clipboard.writeText("https://api.n4p.id/v1");
    toast.success("Copied", {
      description: "Base URL copied to clipboard",
    });
  };

  const handleAddWebhook = (
    webhook: Omit<Webhook, "id" | "createdAt" | "secret" | "failureCount">
  ) => {
    const newWebhook: Webhook = {
      ...webhook,
      id: `wh${Date.now()}`,
      secret: `whsec_${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString(),
      failureCount: 0,
    };
    setWebhooks((prev) => [...prev, newWebhook]);
    toast.success("Webhook Created", {
      description: "Your webhook endpoint has been registered",
    });
  };

  const handleToggleWebhook = (id: string, enabled: boolean) => {
    setWebhooks((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled } : w))
    );
    toast.success(enabled ? "Webhook Enabled" : "Webhook Disabled");
  };

  const handleDeleteWebhook = (id: string) => {
    setWebhooks((prev) => prev.filter((w) => w.id !== id));
    toast.success("Webhook Deleted", {
      description: "The webhook has been removed",
    });
  };

  const handleTestWebhook = (id: string) => {
    toast.success("Test Event Sent", {
      description: "A test event has been sent to your webhook",
    });
  };

  const handleConnectIntegration = (id: string) => {
    toast.info("Coming Soon", {
      description: "This integration will be available soon",
    });
  };

  const handleManageIntegration = (id: string) => {
    toast.info("Integration Settings", {
      description: "Opening integration settings...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          API Keys & Integrations
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Manage API access and third-party integrations
        </p>
      </div>

      {/* API Keys */}
      <ApiKeysTable
        keys={apiKeys}
        onGenerate={handleGenerateKey}
        onRevoke={handleRevokeKey}
        onCopy={handleCopyKey}
      />

      {/* API Documentation */}
      <ApiDocumentation
        baseUrl="https://api.n4p.id/v1"
        endpoints={apiEndpoints}
        onCopyBaseUrl={handleCopyBaseUrl}
      />

      {/* Webhooks */}
      <WebhooksTable
        webhooks={webhooks}
        events={availableWebhookEvents}
        onAdd={handleAddWebhook}
        onToggle={handleToggleWebhook}
        onDelete={handleDeleteWebhook}
        onTest={handleTestWebhook}
      />

      {/* Integrations */}
      <IntegrationsGrid
        integrations={mockIntegrations}
        onConnect={handleConnectIntegration}
        onManage={handleManageIntegration}
      />
    </div>
  );
}
