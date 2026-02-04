// Influencer types
export type InfluencerType = "verified" | "media" | "kol" | "organic";

// Influencer data
export interface Influencer {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  platform: string;
  followers: number;
  mentions: number;
  impactScore: number;
  type: InfluencerType;
  isVerified: boolean;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  recentPosts: {
    content: string;
    engagement: number;
    sentiment: "positive" | "neutral" | "negative";
    date: string;
  }[];
}

export const mockInfluencers: Influencer[] = [
  {
    id: "1",
    username: "@influencer_mega",
    displayName: "Mega Influencer",
    avatarUrl: "/avatars/1.jpg",
    platform: "twitter",
    followers: 2500000,
    mentions: 45,
    impactScore: 92,
    type: "verified",
    isVerified: true,
    sentiment: { positive: 60, neutral: 25, negative: 15 },
    recentPosts: [
      {
        content:
          "Produk ini sangat recommended! Sudah pakai 3 bulan dan hasilnya luar biasa 🔥",
        engagement: 15420,
        sentiment: "positive",
        date: "2024-01-28",
      },
    ],
  },
  {
    id: "2",
    username: "@portal_berita",
    displayName: "Portal Berita Nasional",
    avatarUrl: "/avatars/2.jpg",
    platform: "twitter",
    followers: 1800000,
    mentions: 32,
    impactScore: 85,
    type: "media",
    isVerified: true,
    sentiment: { positive: 30, neutral: 55, negative: 15 },
    recentPosts: [
      {
        content:
          "BREAKING: Brand X meluncurkan produk terbaru di pasar Indonesia",
        engagement: 8750,
        sentiment: "neutral",
        date: "2024-01-27",
      },
    ],
  },
  {
    id: "3",
    username: "@tech_reviewer",
    displayName: "Tech Reviewer ID",
    avatarUrl: "/avatars/3.jpg",
    platform: "youtube",
    followers: 500000,
    mentions: 28,
    impactScore: 78,
    type: "kol",
    isVerified: false,
    sentiment: { positive: 45, neutral: 35, negative: 20 },
    recentPosts: [
      {
        content:
          "Review jujur: Produk ini punya kelebihan di X tapi masih kurang di Y",
        engagement: 12300,
        sentiment: "neutral",
        date: "2024-01-26",
      },
    ],
  },
  {
    id: "4",
    username: "@beauty_diary",
    displayName: "Beauty Diary",
    avatarUrl: "/avatars/4.jpg",
    platform: "instagram",
    followers: 350000,
    mentions: 24,
    impactScore: 72,
    type: "kol",
    isVerified: true,
    sentiment: { positive: 70, neutral: 20, negative: 10 },
    recentPosts: [
      {
        content: "Skincare routine dengan produk terbaru dari Brand X! 💕",
        engagement: 9800,
        sentiment: "positive",
        date: "2024-01-25",
      },
    ],
  },
  {
    id: "5",
    username: "@food_hunter",
    displayName: "Food Hunter Jakarta",
    avatarUrl: "/avatars/5.jpg",
    platform: "tiktok",
    followers: 280000,
    mentions: 18,
    impactScore: 65,
    type: "organic",
    isVerified: false,
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    recentPosts: [
      {
        content: "Cobain menu baru di outlet Brand X! Worth it gak ya?",
        engagement: 45000,
        sentiment: "neutral",
        date: "2024-01-24",
      },
    ],
  },
];

// Influencer type distribution
export const mockInfluencerTypeDistribution = [
  { type: "kol", label: "KOL", count: 45, percentage: 35 },
  { type: "media", label: "Media", count: 32, percentage: 25 },
  { type: "verified", label: "Verified", count: 26, percentage: 20 },
  { type: "organic", label: "Organic", count: 26, percentage: 20 },
];

// Bot detection data
export interface BotAccount {
  id: string;
  username: string;
  botScore: number;
  riskLevel: "low" | "medium" | "high";
  signals: string[];
  accountAge: number; // days
  postingFrequency: number; // posts per day
  followerRatio: number;
  profileComplete: boolean;
  createdAt: string;
}

export const mockBotAccounts: BotAccount[] = [
  {
    id: "b1",
    username: "@user_a1b2c3",
    botScore: 0.92,
    riskLevel: "high",
    signals: ["New account", "Bulk posting", "Similar text patterns"],
    accountAge: 15,
    postingFrequency: 87,
    followerRatio: 0.02,
    profileComplete: false,
    createdAt: "2024-01-15",
  },
  {
    id: "b2",
    username: "@bot_spam_xyz",
    botScore: 0.87,
    riskLevel: "high",
    signals: ["No profile picture", "Auto-generated name", "Copy-paste content"],
    accountAge: 7,
    postingFrequency: 120,
    followerRatio: 0.01,
    profileComplete: false,
    createdAt: "2024-01-23",
  },
  {
    id: "b3",
    username: "@promo_account_01",
    botScore: 0.75,
    riskLevel: "medium",
    signals: ["High posting frequency", "Repetitive content", "Promotional language"],
    accountAge: 45,
    postingFrequency: 45,
    followerRatio: 0.15,
    profileComplete: true,
    createdAt: "2023-12-15",
  },
  {
    id: "b4",
    username: "@new_user_2024",
    botScore: 0.62,
    riskLevel: "medium",
    signals: ["New account", "Limited engagement"],
    accountAge: 20,
    postingFrequency: 25,
    followerRatio: 0.08,
    profileComplete: true,
    createdAt: "2024-01-10",
  },
];

// Bot score distribution for histogram
export const mockBotScoreDistribution = [
  { range: "0.0-0.1", count: 4500, percentage: 36 },
  { range: "0.1-0.2", count: 2800, percentage: 22 },
  { range: "0.2-0.3", count: 1750, percentage: 14 },
  { range: "0.3-0.4", count: 1000, percentage: 8 },
  { range: "0.4-0.5", count: 750, percentage: 6 },
  { range: "0.5-0.6", count: 500, percentage: 4 },
  { range: "0.6-0.7", count: 450, percentage: 3.6 },
  { range: "0.7-0.8", count: 400, percentage: 3.2 },
  { range: "0.8-0.9", count: 250, percentage: 2 },
  { range: "0.9-1.0", count: 150, percentage: 1.2 },
];

export const mockBotRiskSummary = {
  lowRisk: { count: 9050, percentage: 72 },
  mediumRisk: { count: 2250, percentage: 18 },
  highRisk: { count: 1250, percentage: 10 },
};

// Network graph data
export interface NetworkNode {
  id: string;
  username: string;
  followers: number;
  botScore: number;
  group: number; // cluster ID
  x?: number;
  y?: number;
}

export interface NetworkLink {
  source: string;
  target: string;
  type: "retweet" | "reply" | "mention" | "quote";
  weight: number;
}

export const mockNetworkNodes: NetworkNode[] = [
  // Cluster 1 - Bot Network (suspicious)
  { id: "n1", username: "@main_bot_hub", followers: 500, botScore: 0.88, group: 1 },
  { id: "n2", username: "@bot_worker_1", followers: 50, botScore: 0.92, group: 1 },
  { id: "n3", username: "@bot_worker_2", followers: 45, botScore: 0.89, group: 1 },
  { id: "n4", username: "@bot_worker_3", followers: 42, botScore: 0.91, group: 1 },
  { id: "n5", username: "@bot_worker_4", followers: 48, botScore: 0.87, group: 1 },
  { id: "n6", username: "@bot_worker_5", followers: 51, botScore: 0.9, group: 1 },

  // Cluster 2 - Organic Community
  {
    id: "n7",
    username: "@influencer_real",
    followers: 250000,
    botScore: 0.12,
    group: 2,
  },
  { id: "n8", username: "@fan_account_1", followers: 1500, botScore: 0.18, group: 2 },
  { id: "n9", username: "@fan_account_2", followers: 2000, botScore: 0.15, group: 2 },
  { id: "n10", username: "@regular_user", followers: 500, botScore: 0.08, group: 2 },

  // Cluster 3 - Media Network
  { id: "n11", username: "@news_portal", followers: 1500000, botScore: 0.05, group: 3 },
  { id: "n12", username: "@journalist_1", followers: 50000, botScore: 0.1, group: 3 },
  { id: "n13", username: "@media_company", followers: 800000, botScore: 0.08, group: 3 },

  // Isolated nodes
  { id: "n14", username: "@random_user_1", followers: 200, botScore: 0.25, group: 0 },
  { id: "n15", username: "@random_user_2", followers: 150, botScore: 0.2, group: 0 },
];

export const mockNetworkLinks: NetworkLink[] = [
  // Bot cluster connections (dense)
  { source: "n1", target: "n2", type: "retweet", weight: 25 },
  { source: "n1", target: "n3", type: "retweet", weight: 23 },
  { source: "n1", target: "n4", type: "retweet", weight: 22 },
  { source: "n1", target: "n5", type: "retweet", weight: 24 },
  { source: "n1", target: "n6", type: "retweet", weight: 21 },
  { source: "n2", target: "n3", type: "reply", weight: 15 },
  { source: "n3", target: "n4", type: "reply", weight: 14 },
  { source: "n4", target: "n5", type: "reply", weight: 16 },
  { source: "n5", target: "n6", type: "reply", weight: 13 },
  { source: "n6", target: "n2", type: "reply", weight: 12 },

  // Organic cluster connections
  { source: "n7", target: "n8", type: "mention", weight: 8 },
  { source: "n7", target: "n9", type: "reply", weight: 5 },
  { source: "n8", target: "n10", type: "retweet", weight: 3 },
  { source: "n9", target: "n10", type: "mention", weight: 2 },

  // Media cluster connections
  { source: "n11", target: "n12", type: "mention", weight: 10 },
  { source: "n11", target: "n13", type: "quote", weight: 8 },
  { source: "n12", target: "n13", type: "reply", weight: 6 },

  // Cross-cluster connections
  { source: "n7", target: "n11", type: "mention", weight: 4 },
  { source: "n8", target: "n14", type: "retweet", weight: 1 },
];

export interface ClusterAnalysis {
  id: number;
  name: string;
  accountCount: number;
  behavior: string;
  hubAccount: string;
  avgBotScore: number;
  description: string;
}

export const mockClusterAnalysis: ClusterAnalysis[] = [
  {
    id: 1,
    name: "Cluster A",
    accountCount: 23,
    behavior: "Coordinated amplification",
    hubAccount: "@main_bot_123",
    avgBotScore: 0.84,
    description:
      "High-frequency retweet network with similar posting patterns",
  },
  {
    id: 2,
    name: "Cluster B",
    accountCount: 12,
    behavior: "Reply chain manipulation",
    hubAccount: "@reply_farm_x",
    avgBotScore: 0.76,
    description: "Accounts that systematically reply to boost engagement",
  },
  {
    id: 3,
    name: "Cluster C",
    accountCount: 8,
    behavior: "Quote tweet spam",
    hubAccount: "@quote_spammer",
    avgBotScore: 0.71,
    description: "Promotional accounts using quote tweets for visibility",
  },
];
