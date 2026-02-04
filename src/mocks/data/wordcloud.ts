export interface WordData {
  text: string
  value: number
  sentiment: 'positive' | 'neutral' | 'negative'
  change: number // percentage change vs last period
  type: 'keyword' | 'hashtag' | 'mention'
}

export const mockWords: WordData[] = [
  { text: 'kualitas', value: 892, sentiment: 'positive', change: 23, type: 'keyword' },
  { text: 'harga', value: 756, sentiment: 'neutral', change: -5, type: 'keyword' },
  { text: 'pelayanan', value: 654, sentiment: 'negative', change: 45, type: 'keyword' },
  { text: '#brandx', value: 567, sentiment: 'positive', change: 12, type: 'hashtag' },
  { text: 'produk', value: 543, sentiment: 'neutral', change: 8, type: 'keyword' },
  { text: 'pengiriman', value: 498, sentiment: 'negative', change: 67, type: 'keyword' },
  { text: '#recommended', value: 456, sentiment: 'positive', change: 34, type: 'hashtag' },
  { text: 'bagus', value: 432, sentiment: 'positive', change: 15, type: 'keyword' },
  { text: 'lambat', value: 398, sentiment: 'negative', change: 89, type: 'keyword' },
  { text: '#review', value: 376, sentiment: 'neutral', change: 5, type: 'hashtag' },
  { text: 'worth it', value: 345, sentiment: 'positive', change: 28, type: 'keyword' },
  { text: 'kecewa', value: 321, sentiment: 'negative', change: 56, type: 'keyword' },
  { text: '#promo', value: 298, sentiment: 'positive', change: -12, type: 'hashtag' },
  { text: 'mahal', value: 287, sentiment: 'negative', change: 23, type: 'keyword' },
  { text: 'mantap', value: 265, sentiment: 'positive', change: 18, type: 'keyword' },
  { text: '@brandx', value: 243, sentiment: 'neutral', change: 10, type: 'mention' },
  { text: 'rusak', value: 232, sentiment: 'negative', change: 45, type: 'keyword' },
  { text: '#unboxing', value: 221, sentiment: 'positive', change: 67, type: 'hashtag' },
  { text: 'fast response', value: 198, sentiment: 'positive', change: 12, type: 'keyword' },
  { text: 'terbaik', value: 187, sentiment: 'positive', change: 8, type: 'keyword' },
  { text: '#viral', value: 176, sentiment: 'neutral', change: 234, type: 'hashtag' },
  { text: 'murah', value: 165, sentiment: 'positive', change: -8, type: 'keyword' },
  { text: 'komplain', value: 154, sentiment: 'negative', change: 34, type: 'keyword' },
  { text: '@cs_brandx', value: 143, sentiment: 'neutral', change: 56, type: 'mention' },
  { text: 'original', value: 132, sentiment: 'positive', change: 12, type: 'keyword' }
]

// Keyword trend data
export interface KeywordTrendData {
  keyword: string
  data: { date: string; value: number }[]
}

export const mockKeywordTrends: KeywordTrendData[] = [
  {
    keyword: 'kualitas',
    data: [
      { date: '2024-01-01', value: 120 },
      { date: '2024-01-08', value: 145 },
      { date: '2024-01-15', value: 180 },
      { date: '2024-01-22', value: 210 },
      { date: '2024-01-29', value: 250 }
    ]
  },
  {
    keyword: 'harga',
    data: [
      { date: '2024-01-01', value: 100 },
      { date: '2024-01-08', value: 110 },
      { date: '2024-01-15', value: 105 },
      { date: '2024-01-22', value: 120 },
      { date: '2024-01-29', value: 115 }
    ]
  },
  {
    keyword: 'pelayanan',
    data: [
      { date: '2024-01-01', value: 80 },
      { date: '2024-01-08', value: 95 },
      { date: '2024-01-15', value: 150 },
      { date: '2024-01-22', value: 180 },
      { date: '2024-01-29', value: 165 }
    ]
  }
]

// Co-occurrence matrix data
export interface CoOccurrence {
  word1: string
  word2: string
  count: number
  percentage: number
}

export const mockCoOccurrences: CoOccurrence[] = [
  { word1: 'kualitas', word2: 'bagus', count: 234, percentage: 78 },
  { word1: 'kualitas', word2: 'produk', count: 198, percentage: 65 },
  { word1: 'harga', word2: 'mahal', count: 176, percentage: 58 },
  { word1: 'harga', word2: 'worth it', count: 145, percentage: 48 },
  { word1: 'pengiriman', word2: 'lambat', count: 189, percentage: 72 },
  { word1: 'pengiriman', word2: 'cepat', count: 98, percentage: 32 },
  { word1: 'pelayanan', word2: 'kecewa', count: 156, percentage: 52 },
  { word1: 'produk', word2: 'rusak', count: 87, percentage: 28 },
  { word1: 'produk', word2: 'original', count: 112, percentage: 38 }
]

// Topic clusters
export interface TopicCluster {
  id: string
  name: string
  icon: string
  keywords: string[]
  mentions: number
  sentiment: {
    positive: number
    neutral: number
    negative: number
  }
  dominantSentiment: 'positive' | 'neutral' | 'negative'
}

export const mockTopicClusters: TopicCluster[] = [
  {
    id: '1',
    name: 'Product Quality',
    icon: '📦',
    keywords: ['kualitas', 'bagus', 'jelek', 'rusak', 'awet', 'original'],
    mentions: 12432,
    sentiment: { positive: 38, neutral: 10, negative: 52 },
    dominantSentiment: 'negative'
  },
  {
    id: '2',
    name: 'Pricing',
    icon: '💰',
    keywords: ['harga', 'mahal', 'murah', 'worth it', 'promo', 'diskon'],
    mentions: 8765,
    sentiment: { positive: 65, neutral: 20, negative: 15 },
    dominantSentiment: 'positive'
  },
  {
    id: '3',
    name: 'Delivery',
    icon: '🚚',
    keywords: ['pengiriman', 'lambat', 'cepat', 'kurir', 'paket', 'tracking'],
    mentions: 5432,
    sentiment: { positive: 25, neutral: 17, negative: 58 },
    dominantSentiment: 'negative'
  },
  {
    id: '4',
    name: 'Customer Service',
    icon: '💬',
    keywords: ['pelayanan', 'CS', 'response', 'komplain', 'admin'],
    mentions: 4321,
    sentiment: { positive: 42, neutral: 23, negative: 35 },
    dominantSentiment: 'positive'
  }
]
