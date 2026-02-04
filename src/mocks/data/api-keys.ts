export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  fullKey?: string; // Only shown once when created
  permissions: string[];
  createdAt: string;
  lastUsedAt?: string;
  expiresAt?: string;
}

export const mockApiKeys: ApiKey[] = [
  {
    id: "key1",
    name: "Production",
    keyPrefix: "n4p_sk_***...abc",
    permissions: ["read", "write"],
    createdAt: "2024-01-01T00:00:00Z",
    lastUsedAt: "2024-01-30T14:30:00Z",
  },
  {
    id: "key2",
    name: "Development",
    keyPrefix: "n4p_sk_***...xyz",
    permissions: ["read"],
    createdAt: "2024-01-05T00:00:00Z",
    lastUsedAt: "2024-01-28T10:15:00Z",
  },
  {
    id: "key3",
    name: "Analytics Export",
    keyPrefix: "n4p_sk_***...def",
    permissions: ["read", "export"],
    createdAt: "2024-01-15T00:00:00Z",
  },
];

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
  createdAt: string;
  lastTriggeredAt?: string;
  failureCount: number;
}

export const mockWebhooks: Webhook[] = [
  {
    id: "wh1",
    name: "Mention Notifications",
    url: "https://api.myapp.com/webhooks/mentions",
    events: ["mention.created", "mention.sentiment_changed"],
    secret: "whsec_***...abc",
    enabled: true,
    createdAt: "2024-01-10T00:00:00Z",
    lastTriggeredAt: "2024-01-30T12:00:00Z",
    failureCount: 0,
  },
];

export const availableWebhookEvents = [
  {
    id: "mention.created",
    name: "New Mention",
    description: "When a new mention is detected",
  },
  {
    id: "mention.sentiment_changed",
    name: "Sentiment Changed",
    description: "When sentiment is manually corrected",
  },
  {
    id: "alert.triggered",
    name: "Alert Triggered",
    description: "When an alert condition is met",
  },
  {
    id: "report.generated",
    name: "Report Generated",
    description: "When a report is ready",
  },
  {
    id: "spike.detected",
    name: "Spike Detected",
    description: "When anomaly detection finds a spike",
  },
];

export interface Integration {
  id: string;
  name: string;
  type: "messaging" | "analytics" | "bi";
  icon: string;
  connected: boolean;
  config?: Record<string, unknown>;
  description: string;
}

export const mockIntegrations: Integration[] = [
  {
    id: "int1",
    name: "Slack",
    type: "messaging",
    icon: "💬",
    connected: true,
    config: { workspace: "Company Workspace" },
    description: "Send alerts and reports to Slack channels",
  },
  {
    id: "int2",
    name: "Discord",
    type: "messaging",
    icon: "🎮",
    connected: false,
    description: "Send notifications to Discord servers",
  },
  {
    id: "int3",
    name: "Telegram",
    type: "messaging",
    icon: "📱",
    connected: false,
    description: "Send alerts via Telegram bot",
  },
  {
    id: "int4",
    name: "Google Data Studio",
    type: "bi",
    icon: "📊",
    connected: false,
    description: "Connect data to Google Data Studio dashboards",
  },
  {
    id: "int5",
    name: "Power BI",
    type: "bi",
    icon: "📈",
    connected: false,
    description: "Stream data to Microsoft Power BI",
  },
  {
    id: "int6",
    name: "Tableau",
    type: "bi",
    icon: "📉",
    connected: false,
    description: "Connect to Tableau for advanced visualization",
  },
];

export const apiEndpoints = [
  {
    method: "GET",
    path: "/topics/:id/mentions",
    description: "Get mentions list",
  },
  {
    method: "GET",
    path: "/topics/:id/stats",
    description: "Get topic statistics",
  },
  {
    method: "GET",
    path: "/topics/:id/sentiment",
    description: "Get sentiment breakdown",
  },
  {
    method: "POST",
    path: "/topics/:id/export",
    description: "Export data to CSV/JSON",
  },
  {
    method: "PATCH",
    path: "/mentions/:id/sentiment",
    description: "Update mention sentiment",
  },
];
