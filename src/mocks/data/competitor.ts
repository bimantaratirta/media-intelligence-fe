export interface CompetitorData {
  id: string;
  name: string;
  color: string;
  isOwn: boolean; // true for user's brand
  metrics: {
    mentions: number;
    sentimentScore: number;
    positivePercent: number;
    neutralPercent: number;
    negativePercent: number;
    reach: number;
    engagement: number;
    viralityIndex: number;
  };
  platforms: {
    twitter: number;
    instagram: number;
    tiktok: number;
    facebook: number;
    youtube: number;
    news: number;
  };
  trend: { date: string; value: number }[];
}

export const mockCompetitors: CompetitorData[] = [
  {
    id: "brand-x",
    name: "Brand X",
    color: "#3B82F6", // blue
    isOwn: true,
    metrics: {
      mentions: 45678,
      sentimentScore: 0.42,
      positivePercent: 48,
      neutralPercent: 34,
      negativePercent: 18,
      reach: 15200000,
      engagement: 4.5,
      viralityIndex: 8.1,
    },
    platforms: {
      twitter: 42,
      instagram: 28,
      tiktok: 15,
      facebook: 8,
      youtube: 4,
      news: 3,
    },
    trend: [
      { date: "2024-01-01", value: 2800 },
      { date: "2024-01-08", value: 3200 },
      { date: "2024-01-15", value: 3800 },
      { date: "2024-01-22", value: 4200 },
      { date: "2024-01-29", value: 4500 },
    ],
  },
  {
    id: "competitor-a",
    name: "Competitor A",
    color: "#22C55E", // green
    isOwn: false,
    metrics: {
      mentions: 30123,
      sentimentScore: 0.35,
      positivePercent: 42,
      neutralPercent: 38,
      negativePercent: 20,
      reach: 12100000,
      engagement: 5.2,
      viralityIndex: 7.2,
    },
    platforms: {
      twitter: 35,
      instagram: 32,
      tiktok: 18,
      facebook: 8,
      youtube: 5,
      news: 2,
    },
    trend: [
      { date: "2024-01-01", value: 2200 },
      { date: "2024-01-08", value: 2400 },
      { date: "2024-01-15", value: 2600 },
      { date: "2024-01-22", value: 2800 },
      { date: "2024-01-29", value: 3000 },
    ],
  },
  {
    id: "competitor-b",
    name: "Competitor B",
    color: "#F97316", // orange
    isOwn: false,
    metrics: {
      mentions: 25456,
      sentimentScore: 0.28,
      positivePercent: 38,
      neutralPercent: 40,
      negativePercent: 22,
      reach: 8500000,
      engagement: 3.8,
      viralityIndex: 5.5,
    },
    platforms: {
      twitter: 40,
      instagram: 25,
      tiktok: 20,
      facebook: 10,
      youtube: 3,
      news: 2,
    },
    trend: [
      { date: "2024-01-01", value: 1800 },
      { date: "2024-01-08", value: 2000 },
      { date: "2024-01-15", value: 2200 },
      { date: "2024-01-22", value: 2400 },
      { date: "2024-01-29", value: 2500 },
    ],
  },
];

export interface CompetitiveInsight {
  id: string;
  type: "strength" | "opportunity" | "trend" | "recommendation";
  icon: string;
  message: string;
}

export const mockCompetitiveInsights: CompetitiveInsight[] = [
  {
    id: "1",
    type: "strength",
    icon: "target",
    message:
      "Brand X leads in share of voice (45%) dengan margin 15% di atas kompetitor terdekat",
  },
  {
    id: "2",
    type: "opportunity",
    icon: "chart",
    message:
      "Competitor A memiliki engagement rate lebih tinggi (5.2% vs 4.5%). Perlu analisis strategi konten mereka",
  },
  {
    id: "3",
    type: "trend",
    icon: "trend",
    message:
      "Brand X menunjukkan growth rate tertinggi (+60% MoM) dibanding kompetitor",
  },
  {
    id: "4",
    type: "recommendation",
    icon: "lightbulb",
    message:
      "Fokus peningkatan presence di TikTok dimana Competitor B unggul dengan 20% share",
  },
];
