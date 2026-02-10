// Re-export all types from shared package
export type {
  // Core types
  Platform,
  PlatformConfig,
  PlatformInfo,
  Sentiment,
  Emotion,
  SentimentBreakdown,
  SentimentResult,
  EmotionResult,
  EmotionInfo,
  User,
  UserRole,
  TeamMember,
  RolePermission,
  Province,
  MentionLocation,
  Entity,
  EntityType,
  Influencer,
  InfluencerType,
  InfluencerPost,
  GenderDistribution,
  AgeGroup,

  // Domain types
  Topic,
  TopicStatus,
  TopicConfig,
  KeywordConfig,
  Mention,
  MentionAuthor,
  MentionEngagement,
  MentionCluster,
  MentionClusterType,
  StatValue,
  OverviewStats as SharedOverviewStats,
  MentionTrendPoint,
  PlatformDistribution,
  WordData,
  TrendAnomaly,
  TrendAnomalyRootCause,
  HeatmapData,
  PeakActivity,
  PeriodMetrics,
  TrendOverlayData,
  PlatformComparisonData,
  ComparisonInsight,
  Insight,
  InsightType,
  TopicCluster,
  CoOccurrence,
  KeywordTrendData,
  ContentItem,
  ContentType,
  CompetitorData,
  ProvinceData as SharedProvinceData,

  // API types
  ExportFormat,
  ExportRequest,
  ExportStatus,
  AlertMetric,
  AlertCondition,
  TimeWindow,
  AlertTrigger,
  AlertChannels,
  AlertOptions,
  AlertConfig,
  WebhookEvent,
  Webhook,
  WebhookEventInfo,
  ApiKeyPermission,
  ApiKey,
  CreateApiKeyRequest,
  CreateApiKeyResponse,
  BotRiskLevel,
  BotAccount,
  BotScoreDistribution,
  BotRiskSummary,
  NetworkNode,
  NetworkLink,
  ClusterAnalysis,
  NotificationChannelType,
  NotificationChannel,
  EmailScheduleType,
  EmailSchedule,
} from '@asha/shared'

// =============================================================================
// Frontend-specific types / backward compatibility aliases
// =============================================================================

import type { Sentiment, StatValue, MentionTrendPoint } from '@asha/shared'

/**
 * Simple overview stats (legacy format for simpler components)
 * Use SharedOverviewStats for full StatValue structure
 */
export interface OverviewStats {
  totalMentions: number
  mentionChange: number
  reach: number
  reachChange: number
  sentimentScore: number
  sentimentChange: number
  viralityIndex: number
  viralityChange: number
}

/**
 * Simple time series point (legacy format)
 * Use MentionTrendPoint for full structure
 */
export interface TimeSeriesPoint {
  date: string
  value: number
  positive?: number
  neutral?: number
  negative?: number
}

/**
 * Simple province data for maps (legacy format)
 * Use SharedProvinceData for full analytics structure
 */
export interface ProvinceData {
  id: string
  name: string
  value: number
  sentiment: Sentiment
}

// =============================================================================
// Helper functions to convert between formats
// =============================================================================

/**
 * Convert StatValue to simple number + change format
 */
export function toSimpleStats(stats: {
  totalMentions: StatValue
  reach: StatValue
  sentimentScore: StatValue
  viralityIndex: StatValue
}): OverviewStats {
  return {
    totalMentions: stats.totalMentions.value,
    mentionChange: stats.totalMentions.change,
    reach: stats.reach.value,
    reachChange: stats.reach.change,
    sentimentScore: stats.sentimentScore.value,
    sentimentChange: stats.sentimentScore.change,
    viralityIndex: stats.viralityIndex.value,
    viralityChange: stats.viralityIndex.change,
  }
}

/**
 * Convert MentionTrendPoint to TimeSeriesPoint
 */
export function toTimeSeriesPoint(point: MentionTrendPoint): TimeSeriesPoint {
  return {
    date: point.date,
    value: point.total ?? point.positive + point.neutral + point.negative,
    positive: point.positive,
    neutral: point.neutral,
    negative: point.negative,
  }
}
