// Re-export all constants from shared package
export {
  // Platform
  PLATFORMS,
  PLATFORM_COLORS,
  getPlatformInfo,
  getPlatformColor,

  // Sentiment & Emotion
  SENTIMENTS,
  SENTIMENT_COLORS,
  SENTIMENT_TEXT_CLASSES,
  SENTIMENT_BG_CLASSES,
  EMOTIONS,
  getSentimentColor,
  getEmotionInfo,

  // Location
  PROVINCES,
  PROVINCE_GEOJSON_MAP,
  getProvince,
  getGeoJsonId,

  // User roles
  USER_ROLES,
  ROLE_PERMISSIONS,
  hasPermission,
  getRoleName,

  // Alerts & Webhooks
  ALERT_METRICS,
  ALERT_CONDITIONS,
  TIME_WINDOWS,
  WEBHOOK_EVENTS,

  // Export
  EXPORT_FORMATS,
  getExportFormatInfo,

  // Bot detection
  BOT_RISK_LEVELS,
  getBotRiskLevel,
  getBotRiskColor,

  // Entities & Influencers
  ENTITY_TYPES,
  INFLUENCER_TYPES,

  // Colors
  GENDER_COLORS,
  CHART_COLORS,
  getChartColor,
} from '@asha/shared'

// =============================================================================
// Frontend-specific constants
// =============================================================================

/**
 * Sequential blue scale for heatmaps and age distribution charts
 */
export const BLUE_SEQUENTIAL_SCALE = [
  '#EFF6FF', // blue-50
  '#BFDBFE', // blue-200
  '#60A5FA', // blue-400
  '#2563EB', // blue-600
  '#1E40AF', // blue-800
] as const
