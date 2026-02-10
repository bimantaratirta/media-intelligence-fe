import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  SENTIMENT_TEXT_CLASSES,
  SENTIMENT_BG_CLASSES,
  getPlatformColor as getSharedPlatformColor,
} from '@asha/shared'
import type { Sentiment, Platform } from '@asha/shared'

// Re-export utils from shared package
export {
  formatCompact,
  formatPercentage,
  formatPercent,
  formatNumber,
  formatNumberId,
  formatRelative,
  formatShortDate,
  formatFullDate,
  formatISODate,
  formatTime,
  formatDateTime,
  formatFileSize,
  formatDuration,
  truncate,
  capitalize,
  titleCase,
} from '@asha/shared'

// =============================================================================
// Frontend-specific utilities
// =============================================================================

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get sentiment text color class (Tailwind)
 */
export function getSentimentColor(sentiment: Sentiment): string {
  return SENTIMENT_TEXT_CLASSES[sentiment]
}

/**
 * Get sentiment background color class (Tailwind)
 */
export function getSentimentBgColor(sentiment: Sentiment): string {
  return SENTIMENT_BG_CLASSES[sentiment]
}

/**
 * Get platform color (hex)
 * Wrapper for shared getPlatformColor with fallback
 */
export function getPlatformColor(platform: string): string {
  return getSharedPlatformColor(platform as Platform)
}

/**
 * Sequential scale for heatmaps and age charts (5 levels)
 */
export const BLUE_SEQUENTIAL_SCALE = [
  '#EFF6FF', // blue-50
  '#BFDBFE', // blue-200
  '#60A5FA', // blue-400
  '#2563EB', // blue-600
  '#1E40AF', // blue-800
]
