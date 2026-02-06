export const PLATFORMS = [
    { id: 'twitter', name: 'X/Twitter', icon: 'twitter' },
    { id: 'instagram', name: 'Instagram', icon: 'instagram' },
    { id: 'tiktok', name: 'TikTok', icon: 'music' },
    { id: 'youtube', name: 'YouTube', icon: 'youtube' },
    { id: 'facebook', name: 'Facebook', icon: 'facebook' },
    { id: 'threads', name: 'Threads', icon: 'at-sign' },
    { id: 'news', name: 'News Portal', icon: 'newspaper' },
] as const

export const SENTIMENTS = [
    { id: 'positive', name: 'Positive', color: 'green' },
    { id: 'neutral', name: 'Neutral', color: 'slate' },
    { id: 'negative', name: 'Negative', color: 'red' },
] as const

export const EMOTIONS = [
    { id: 'joy', name: 'Joy', icon: '😊', color: '#16A34A' },      // green-600 (muted from #22C55E)
    { id: 'anger', name: 'Anger', icon: '😠', color: '#DC2626' },  // red-600 (muted from #EF4444)
    { id: 'sadness', name: 'Sadness', icon: '😢', color: '#2563EB' }, // blue-600 (muted from #3B82F6)
    { id: 'fear', name: 'Fear', icon: '😨', color: '#7C3AED' },    // violet-600 (muted from #8B5CF6)
    { id: 'surprise', name: 'Surprise', icon: '😲', color: '#D97706' }, // amber-600 (muted from #F59E0B)
    { id: 'disgust', name: 'Disgust', icon: '🤢', color: '#78716C' }, // stone-500 (neutral gray-brown)
    { id: 'neutral', name: 'Neutral', icon: '😐', color: '#64748B' }, // slate-500 (tetap)
] as const

// Sentiment colors (muted version)
export const SENTIMENT_COLORS = {
    positive: '#16A34A', // green-600
    neutral: '#64748B',  // slate-500
    negative: '#DC2626', // red-600
} as const

// Platform colors (muted brand colors)
export const PLATFORM_COLORS = {
    twitter: '#1D9BF0',   // slightly muted
    instagram: '#C13584', // more muted pink
    tiktok: '#475569',    // slate-600
    youtube: '#B91C1C',   // red-700
    facebook: '#1877F2',
    threads: '#475569',   // slate-600
    news: '#6B7280',
} as const

// Gender colors (neutral)
export const GENDER_COLORS = {
    male: '#2563EB',   // blue-600
    female: '#9333EA', // purple-600 (not pink)
    unknown: '#6B7280', // gray-500
} as const

export const PROVINCES = [
    { id: 'AC', name: 'Aceh' },
    { id: 'SU', name: 'Sumatera Utara' },
    { id: 'SB', name: 'Sumatera Barat' },
    { id: 'RI', name: 'Riau' },
    { id: 'JA', name: 'Jambi' },
    { id: 'SS', name: 'Sumatera Selatan' },
    { id: 'BE', name: 'Bengkulu' },
    { id: 'LA', name: 'Lampung' },
    { id: 'BB', name: 'Kepulauan Bangka Belitung' },
    { id: 'KR', name: 'Kepulauan Riau' },
    { id: 'JK', name: 'DKI Jakarta' },
    { id: 'JB', name: 'Jawa Barat' },
    { id: 'JT', name: 'Jawa Tengah' },
    { id: 'YO', name: 'DI Yogyakarta' },
    { id: 'JI', name: 'Jawa Timur' },
    { id: 'BT', name: 'Banten' },
    { id: 'BA', name: 'Bali' },
    { id: 'NB', name: 'Nusa Tenggara Barat' },
    { id: 'NT', name: 'Nusa Tenggara Timur' },
    { id: 'KB', name: 'Kalimantan Barat' },
    { id: 'KT', name: 'Kalimantan Tengah' },
    { id: 'KS', name: 'Kalimantan Selatan' },
    { id: 'KI', name: 'Kalimantan Timur' },
    { id: 'KU', name: 'Kalimantan Utara' },
    { id: 'SA', name: 'Sulawesi Utara' },
    { id: 'ST', name: 'Sulawesi Tengah' },
    { id: 'SN', name: 'Sulawesi Selatan' },
    { id: 'SG', name: 'Sulawesi Tenggara' },
    { id: 'GO', name: 'Gorontalo' },
    { id: 'SR', name: 'Sulawesi Barat' },
    { id: 'MA', name: 'Maluku' },
    { id: 'MU', name: 'Maluku Utara' },
    { id: 'PB', name: 'Papua Barat' },
    { id: 'PA', name: 'Papua' },
] as const
