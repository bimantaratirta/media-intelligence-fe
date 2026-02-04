export interface PeriodMetrics {
  id: string;
  label: string;
  dateRange: { start: string; end: string };
  totalMentions: number;
  sentimentScore: number;
  reachEstimate: number;
  positivePercent: number;
  neutralPercent: number;
  negativePercent: number;
  viralityIndex: number;
  botPresence: number;
  engagementRate: number;
  avgResponseTime: number;
}

export const mockPeriodA: PeriodMetrics = {
  id: "period-a",
  label: "Period A",
  dateRange: { start: "2024-01-01", end: "2024-01-15" },
  totalMentions: 45678,
  sentimentScore: 0.35,
  reachEstimate: 12500000,
  positivePercent: 42,
  neutralPercent: 33,
  negativePercent: 25,
  viralityIndex: 6.2,
  botPresence: 12,
  engagementRate: 3.8,
  avgResponseTime: 4.5,
};

export const mockPeriodB: PeriodMetrics = {
  id: "period-b",
  label: "Period B",
  dateRange: { start: "2024-01-16", end: "2024-01-31" },
  totalMentions: 52341,
  sentimentScore: 0.42,
  reachEstimate: 15200000,
  positivePercent: 48,
  neutralPercent: 34,
  negativePercent: 18,
  viralityIndex: 8.1,
  botPresence: 8,
  engagementRate: 4.5,
  avgResponseTime: 3.2,
};

// Trend data for overlay chart
export interface TrendOverlayData {
  day: number; // day 1-15
  periodA: number;
  periodB: number;
}

export const mockTrendOverlay: TrendOverlayData[] = [
  { day: 1, periodA: 2800, periodB: 3200 },
  { day: 2, periodA: 3100, periodB: 3500 },
  { day: 3, periodA: 2900, periodB: 3800 },
  { day: 4, periodA: 3300, periodB: 3600 },
  { day: 5, periodA: 3500, periodB: 4200 },
  { day: 6, periodA: 2200, periodB: 2800 },
  { day: 7, periodA: 2000, periodB: 2500 },
  { day: 8, periodA: 3200, periodB: 3900 },
  { day: 9, periodA: 3400, periodB: 4100 },
  { day: 10, periodA: 3600, periodB: 4300 },
  { day: 11, periodA: 3800, periodB: 4500 },
  { day: 12, periodA: 4200, periodB: 4800 },
  { day: 13, periodA: 2500, periodB: 3000 },
  { day: 14, periodA: 2300, periodB: 2700 },
  { day: 15, periodA: 3300, periodB: 3800 },
];

// Platform comparison data
export interface PlatformComparisonData {
  platform: string;
  periodA: number;
  periodB: number;
}

export const mockPlatformComparison: PlatformComparisonData[] = [
  { platform: "X/Twitter", periodA: 45, periodB: 42 },
  { platform: "Instagram", periodA: 25, periodB: 28 },
  { platform: "TikTok", periodA: 15, periodB: 18 },
  { platform: "News", periodA: 10, periodB: 8 },
  { platform: "Others", periodA: 5, periodB: 4 },
];

// Available topics for comparison
export interface Topic {
  id: string;
  name: string;
}

export const mockTopics: Topic[] = [
  { id: "topic-1", name: "Brand X Monitoring" },
  { id: "topic-2", name: "Competitor Y" },
  { id: "topic-3", name: "Industry Trends" },
  { id: "topic-4", name: "Product Launch" },
];

// AI-generated insights
export interface ComparisonInsight {
  id: string;
  type: "improvement" | "decline" | "observation" | "recommendation";
  icon: string;
  message: string;
}

export const mockComparisonInsights: ComparisonInsight[] = [
  {
    id: "1",
    type: "improvement",
    icon: "📈",
    message:
      "Period B menunjukkan peningkatan 14.6% mentions dengan sentimen lebih positif (+0.07 score)",
  },
  {
    id: "2",
    type: "improvement",
    icon: "🎯",
    message:
      "Penurunan bot presence dari 12% ke 8% menunjukkan percakapan lebih organik di Period B",
  },
  {
    id: "3",
    type: "observation",
    icon: "📊",
    message:
      "TikTok menunjukkan growth terbesar (+3%), sementara News Portal mengalami penurunan (-2%)",
  },
  {
    id: "4",
    type: "recommendation",
    icon: "💡",
    message:
      "Rekomendasi: Analisis faktor yang menyebabkan improvement untuk replikasi di periode berikutnya",
  },
];
