import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format number with K, M suffix
export function formatCompact(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Format percentage
export function formatPercentage(num: number, decimals = 1): string {
  return `${num >= 0 ? '+' : ''}${num.toFixed(decimals)}%`
}

// Format date relative
export function formatRelative(date: string | Date): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return then.toLocaleDateString()
}

// Get sentiment color
export function getSentimentColor(sentiment: 'positive' | 'neutral' | 'negative'): string {
  const colors = {
    positive: 'text-green-600 dark:text-green-400',
    neutral: 'text-slate-600 dark:text-slate-400',
    negative: 'text-red-600 dark:text-red-400',
  }
  return colors[sentiment]
}

// Get sentiment background color
export function getSentimentBgColor(sentiment: 'positive' | 'neutral' | 'negative'): string {
  const colors = {
    positive: 'bg-green-100 dark:bg-green-900/30',
    neutral: 'bg-slate-100 dark:bg-slate-800',
    negative: 'bg-red-100 dark:bg-red-900/30',
  }
  return colors[sentiment]
}

// Get platform color
export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    twitter: '#1DA1F2',
    instagram: '#E4405F',
    tiktok: '#000000',
    youtube: '#FF0000',
    facebook: '#1877F2',
    threads: '#000000',
    news: '#6B7280',
  }
  return colors[platform] || '#6B7280'
}
