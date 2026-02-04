export type ContentType = "image" | "video" | "text" | "link" | "carousel";
export type Platform =
  | "twitter"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "youtube";

export interface ContentItem {
  id: string;
  type: ContentType;
  platform: Platform;
  content: string;
  thumbnailUrl?: string;
  originalUrl: string;
  publishedAt: string;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
    reach: number;
    engagementRate: number;
  };
  sentiment: "positive" | "neutral" | "negative";
  sentimentScore: number;
  hashtags: string[];
  mentions: string[];
}

export const mockContentItems: ContentItem[] = [
  {
    id: "c1",
    type: "video",
    platform: "tiktok",
    content:
      "Tutorial menggunakan produk terbaru kami! 🔥 #BrandX #Tutorial",
    thumbnailUrl: "/content/thumb1.jpg",
    originalUrl: "https://tiktok.com/@brandx/video/123",
    publishedAt: "2024-01-28T14:30:00Z",
    metrics: {
      likes: 45200,
      comments: 1230,
      shares: 890,
      views: 1200000,
      reach: 1500000,
      engagementRate: 8.5,
    },
    sentiment: "positive",
    sentimentScore: 0.85,
    hashtags: ["#BrandX", "#Tutorial", "#FYP"],
    mentions: [],
  },
  {
    id: "c2",
    type: "image",
    platform: "instagram",
    content:
      "Behind the scenes dari photoshoot campaign terbaru ✨ #BrandX #BTS",
    thumbnailUrl: "/content/thumb2.jpg",
    originalUrl: "https://instagram.com/p/abc123",
    publishedAt: "2024-01-27T10:00:00Z",
    metrics: {
      likes: 12500,
      comments: 432,
      shares: 156,
      reach: 450000,
      engagementRate: 5.2,
    },
    sentiment: "positive",
    sentimentScore: 0.72,
    hashtags: ["#BrandX", "#BTS", "#Campaign"],
    mentions: ["@photographer", "@model"],
  },
  {
    id: "c3",
    type: "text",
    platform: "twitter",
    content:
      "Terima kasih atas dukungan kalian! Brand X sudah menemani 1 juta customer 🎉",
    originalUrl: "https://twitter.com/brandx/status/123",
    publishedAt: "2024-01-26T16:45:00Z",
    metrics: {
      likes: 3200,
      comments: 245,
      shares: 567,
      reach: 89000,
      engagementRate: 3.8,
    },
    sentiment: "positive",
    sentimentScore: 0.65,
    hashtags: ["#1MillionCustomers"],
    mentions: [],
  },
  {
    id: "c4",
    type: "image",
    platform: "facebook",
    content: "Promo spesial weekend! Diskon hingga 50% untuk semua produk.",
    thumbnailUrl: "/content/thumb4.jpg",
    originalUrl: "https://facebook.com/brandx/posts/123",
    publishedAt: "2024-01-25T09:00:00Z",
    metrics: {
      likes: 1800,
      comments: 89,
      shares: 234,
      reach: 45000,
      engagementRate: 2.1,
    },
    sentiment: "neutral",
    sentimentScore: 0.45,
    hashtags: ["#Promo", "#Weekend"],
    mentions: [],
  },
  {
    id: "c5",
    type: "video",
    platform: "youtube",
    content: "Review lengkap produk Brand X terbaru | Worth it gak sih?",
    thumbnailUrl: "/content/thumb5.jpg",
    originalUrl: "https://youtube.com/watch?v=abc123",
    publishedAt: "2024-01-24T12:00:00Z",
    metrics: {
      likes: 8900,
      comments: 567,
      shares: 123,
      views: 250000,
      reach: 320000,
      engagementRate: 4.2,
    },
    sentiment: "positive",
    sentimentScore: 0.58,
    hashtags: ["#Review", "#BrandX"],
    mentions: [],
  },
];

// Generate more items for pagination demo
for (let i = 6; i <= 50; i++) {
  const platforms: Platform[] = [
    "twitter",
    "instagram",
    "tiktok",
    "facebook",
    "youtube",
  ];
  const types: ContentType[] = ["image", "video", "text", "link"];
  const sentiments: ("positive" | "neutral" | "negative")[] = [
    "positive",
    "neutral",
    "negative",
  ];

  mockContentItems.push({
    id: `c${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    content: `Sample content ${i} - Lorem ipsum dolor sit amet...`,
    originalUrl: `https://example.com/post/${i}`,
    publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
    metrics: {
      likes: Math.floor(Math.random() * 10000),
      comments: Math.floor(Math.random() * 500),
      shares: Math.floor(Math.random() * 200),
      views: Math.floor(Math.random() * 100000),
      reach: Math.floor(Math.random() * 500000),
      engagementRate: Math.random() * 10,
    },
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    sentimentScore: Math.random(),
    hashtags: ["#BrandX"],
    mentions: [],
  });
}

export const mockContentSummary = {
  totalPosts: mockContentItems.length,
  avgEngagement: 4.5,
  totalReach: 15200000,
  topPlatform: "TikTok",
};

export const mockPlatformPerformance = [
  { platform: "TikTok", avgEngagement: 8.5, posts: 45 },
  { platform: "Instagram", avgEngagement: 5.2, posts: 78 },
  { platform: "YouTube", avgEngagement: 4.2, posts: 23 },
  { platform: "X/Twitter", avgEngagement: 3.8, posts: 56 },
  { platform: "Facebook", avgEngagement: 2.1, posts: 32 },
];

export const mockContentTypeBreakdown = [
  { type: "Image", percentage: 45, count: 105 },
  { type: "Video", percentage: 35, count: 82 },
  { type: "Text", percentage: 15, count: 35 },
  { type: "Link", percentage: 5, count: 12 },
];
