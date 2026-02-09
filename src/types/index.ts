// Platform types
export type Platform = 'twitter' | 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'threads' | 'news'

// Sentiment types
export type Sentiment = 'positive' | 'neutral' | 'negative'

// Emotion types
export type Emotion = 'joy' | 'anger' | 'sadness' | 'fear' | 'surprise' | 'disgust' | 'neutral'

// Topic/Project
export interface Topic {
    id: string
    name: string
    description: string
    status: 'active' | 'paused' | 'archived'
    createdAt: string
    updatedAt: string
    mentionCount: number
    lastCrawledAt: string  // Data di-refresh setiap 24 jam
}

// User
export interface User {
    id: string
    email: string
    name: string
    avatar?: string
    role: 'owner' | 'admin' | 'analyst' | 'viewer'
}

// Mention
export interface Mention {
    id: string
    content: string
    platform: Platform
    author: {
        id: string
        username: string
        displayName: string
        avatarUrl?: string
        followers: number
        isVerified: boolean
        botScore: number
    }
    engagement: {
        likes: number
        comments: number
        shares: number
        views?: number
    }
    sentiment: {
        auto: Sentiment
        autoScore: number
        manual?: Sentiment
    }
    emotion: {
        primary: Emotion
        score: number
    }
    location?: {
        provinceId: string
        provinceName: string
    }
    originalUrl: string
    createdAt: string
}

// Stats
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

// Time series
export interface TimeSeriesPoint {
    date: string
    value: number
    positive?: number
    neutral?: number
    negative?: number
}

// Province data
export interface ProvinceData {
    id: string
    name: string
    value: number
    sentiment: Sentiment
}
