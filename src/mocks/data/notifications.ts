export type AlertMetric =
  | "total_mentions"
  | "positive"
  | "negative"
  | "sentiment_score"
  | "influencer"
  | "bot_activity";
export type AlertCondition =
  | "increases_by"
  | "decreases_by"
  | "exceeds"
  | "falls_below";
export type AlertChannel = "email" | "slack" | "push";
export type TimeWindow = "15min" | "1hour" | "6hours" | "24hours" | "7days";

export interface AlertConfig {
  id: string;
  name: string;
  enabled: boolean;
  trigger: {
    metric: AlertMetric;
    condition: AlertCondition;
    value: number;
    unit: "percent" | "absolute";
    timeWindow: TimeWindow;
  };
  channels: {
    email: { enabled: boolean; recipients: string[] };
    slack: { enabled: boolean; channel: string };
    push: { enabled: boolean };
  };
  options: {
    cooldownMinutes: number;
    includeSamples: boolean;
    includeComparison: boolean;
    includeDashboardLink: boolean;
  };
  lastTriggered?: string;
  createdAt: string;
}

export const mockAlerts: AlertConfig[] = [
  {
    id: "a1",
    name: "Mention Spike",
    enabled: true,
    trigger: {
      metric: "total_mentions",
      condition: "increases_by",
      value: 100,
      unit: "percent",
      timeWindow: "1hour",
    },
    channels: {
      email: {
        enabled: true,
        recipients: ["team@company.com", "alert@company.com"],
      },
      slack: { enabled: true, channel: "#social-monitoring" },
      push: { enabled: false },
    },
    options: {
      cooldownMinutes: 60,
      includeSamples: true,
      includeComparison: true,
      includeDashboardLink: true,
    },
    lastTriggered: "2024-01-28T14:30:00Z",
    createdAt: "2023-06-01T00:00:00Z",
  },
  {
    id: "a2",
    name: "Negative Sentiment Surge",
    enabled: true,
    trigger: {
      metric: "negative",
      condition: "exceeds",
      value: 40,
      unit: "percent",
      timeWindow: "24hours",
    },
    channels: {
      email: { enabled: true, recipients: ["crisis@company.com"] },
      slack: { enabled: false, channel: "" },
      push: { enabled: true },
    },
    options: {
      cooldownMinutes: 120,
      includeSamples: true,
      includeComparison: true,
      includeDashboardLink: true,
    },
    createdAt: "2023-08-15T00:00:00Z",
  },
  {
    id: "a3",
    name: "Influencer Mention",
    enabled: true,
    trigger: {
      metric: "influencer",
      condition: "exceeds",
      value: 100000,
      unit: "absolute",
      timeWindow: "15min",
    },
    channels: {
      email: { enabled: true, recipients: ["pr@company.com"] },
      slack: { enabled: true, channel: "#influencer-alerts" },
      push: { enabled: true },
    },
    options: {
      cooldownMinutes: 15,
      includeSamples: true,
      includeComparison: false,
      includeDashboardLink: true,
    },
    lastTriggered: "2024-01-25T10:15:00Z",
    createdAt: "2023-10-01T00:00:00Z",
  },
];

export interface EmailSchedule {
  id: string;
  type: "daily" | "weekly";
  enabled: boolean;
  time: string;
  dayOfWeek?: number;
  recipients: string[];
}

export const mockEmailSchedules: EmailSchedule[] = [
  {
    id: "e1",
    type: "daily",
    enabled: true,
    time: "09:00",
    recipients: ["team@company.com"],
  },
  {
    id: "e2",
    type: "weekly",
    enabled: true,
    time: "09:00",
    dayOfWeek: 1,
    recipients: ["team@company.com", "management@company.com"],
  },
];

export interface NotificationChannel {
  id: string;
  type: "email" | "slack" | "push" | "whatsapp";
  name: string;
  connected: boolean;
  config?: Record<string, unknown>;
}

export const mockChannels: NotificationChannel[] = [
  {
    id: "ch1",
    type: "email",
    name: "Email",
    connected: true,
    config: { recipients: ["team@company.com", "crisis@company.com"] },
  },
  {
    id: "ch2",
    type: "slack",
    name: "Slack",
    connected: true,
    config: { workspace: "Company Workspace", channel: "#social-monitoring" },
  },
  {
    id: "ch3",
    type: "push",
    name: "Push Notifications",
    connected: true,
    config: { browser: true, mobile: false },
  },
  {
    id: "ch4",
    type: "whatsapp",
    name: "WhatsApp",
    connected: false,
  },
];

export const metricLabels: Record<AlertMetric, string> = {
  total_mentions: "Total Mentions",
  positive: "Positive Mentions",
  negative: "Negative Mentions",
  sentiment_score: "Sentiment Score",
  influencer: "Influencer Mentions",
  bot_activity: "Bot Activity",
};

export const conditionLabels: Record<AlertCondition, string> = {
  increases_by: "increases by",
  decreases_by: "decreases by",
  exceeds: "exceeds",
  falls_below: "falls below",
};

export const timeWindowLabels: Record<TimeWindow, string> = {
  "15min": "15 minutes",
  "1hour": "1 hour",
  "6hours": "6 hours",
  "24hours": "24 hours",
  "7days": "7 days",
};
