export type ReportType = 'executive' | 'full' | 'sentiment' | 'competitor' | 'crisis' | 'custom'
export type ReportFormat = 'pdf' | 'pptx' | 'docx' | 'html'
export type ReportStatus = 'completed' | 'generating' | 'failed' | 'scheduled'

export interface ReportTemplate {
  id: ReportType
  name: string
  description: string
  pages: string
  sections: string[]
}

export const reportTemplates: ReportTemplate[] = [
  {
    id: 'executive',
    name: 'Executive Summary',
    description: 'High-level overview untuk stakeholders',
    pages: '1-2 pages',
    sections: ['KPIs', 'Key Insights', 'Recommendations']
  },
  {
    id: 'full',
    name: 'Full Analysis Report',
    description: 'Comprehensive analysis dengan semua metrics',
    pages: '10-15 pages',
    sections: ['Overview', 'Trends', 'Sentiment', 'Demographics', 'Influencers', 'Recommendations']
  },
  {
    id: 'sentiment',
    name: 'Sentiment Deep-dive',
    description: 'Focus pada sentiment analysis dan emotion tracking',
    pages: '5-7 pages',
    sections: ['Sentiment Overview', 'Emotion Analysis', 'Drivers', 'Platform Breakdown']
  },
  {
    id: 'competitor',
    name: 'Competitor Comparison',
    description: 'Perbandingan dengan kompetitor',
    pages: '5-8 pages',
    sections: ['Share of Voice', 'Sentiment Comparison', 'Key Differentiators']
  },
  {
    id: 'crisis',
    name: 'Crisis Report',
    description: 'Alert report untuk situasi krisis',
    pages: '3-5 pages',
    sections: ['Situation Summary', 'Timeline', 'Key Actors', 'Response Plan']
  },
  {
    id: 'custom',
    name: 'Custom Template',
    description: 'Buat template report sendiri',
    pages: 'Variable',
    sections: ['Customizable']
  }
]

export interface ReportSection {
  id: string
  name: string
  description: string
  default: boolean
}

export const reportSections: ReportSection[] = [
  { id: 'overview', name: 'Overview Metrics', description: 'KPIs dan summary statistics', default: true },
  { id: 'trends', name: 'Trend Analysis', description: 'Volume trends dan anomaly detection', default: true },
  { id: 'sentiment', name: 'Sentiment Breakdown', description: 'Positive/Neutral/Negative distribution', default: true },
  { id: 'mentions', name: 'Top Mentions', description: 'Viral dan high-impact mentions', default: true },
  { id: 'insights', name: 'AI Insights', description: 'AI-generated recommendations', default: true },
  { id: 'demographics', name: 'Demographics', description: 'Gender dan age breakdown', default: false },
  { id: 'geo', name: 'Geographic Distribution', description: 'Province-level analysis', default: false },
  { id: 'influencers', name: 'Influencer Analysis', description: 'Top voices dan impact', default: false },
  { id: 'raw', name: 'Raw Data Export', description: 'CSV/Excel data export', default: false }
]

export interface GeneratedReport {
  id: string
  name: string
  type: ReportType
  format: ReportFormat
  dateRange: { start: string; end: string }
  generatedAt: string
  generatedBy: string
  status: ReportStatus
  fileSize?: string
  downloadUrl?: string
}

export const mockRecentReports: GeneratedReport[] = [
  {
    id: 'r1',
    name: 'Weekly Report Jan W4',
    type: 'executive',
    format: 'pptx',
    dateRange: { start: '2024-01-22', end: '2024-01-28' },
    generatedAt: '2024-01-28T09:00:00Z',
    generatedBy: 'John Doe',
    status: 'completed',
    fileSize: '2.4 MB',
    downloadUrl: '/reports/weekly-jan-w4.pptx'
  },
  {
    id: 'r2',
    name: 'Crisis Alert Jan 15',
    type: 'crisis',
    format: 'pdf',
    dateRange: { start: '2024-01-14', end: '2024-01-16' },
    generatedAt: '2024-01-15T14:30:00Z',
    generatedBy: 'System (Auto)',
    status: 'completed',
    fileSize: '1.8 MB',
    downloadUrl: '/reports/crisis-jan-15.pdf'
  },
  {
    id: 'r3',
    name: 'Monthly Dec 2023',
    type: 'full',
    format: 'pdf',
    dateRange: { start: '2023-12-01', end: '2023-12-31' },
    generatedAt: '2024-01-02T10:00:00Z',
    generatedBy: 'Jane Smith',
    status: 'completed',
    fileSize: '5.2 MB',
    downloadUrl: '/reports/monthly-dec-2023.pdf'
  },
  {
    id: 'r4',
    name: 'Sentiment Report',
    type: 'sentiment',
    format: 'pptx',
    dateRange: { start: '2024-01-01', end: '2024-01-31' },
    generatedAt: '2024-01-30T16:45:00Z',
    generatedBy: 'John Doe',
    status: 'generating'
  }
]

export interface ScheduledReport {
  id: string
  name: string
  type: ReportType
  format: ReportFormat
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly'
    dayOfWeek?: number // 0-6 for weekly
    dayOfMonth?: number // 1-31 for monthly
    time: string // HH:mm
  }
  recipients: string[]
  condition?: {
    metric: string
    operator: 'gt' | 'lt' | 'change_gt' | 'change_lt'
    value: number
  }
  enabled: boolean
  lastRun?: string
  nextRun: string
}

export const mockScheduledReports: ScheduledReport[] = [
  {
    id: 's1',
    name: 'Weekly Summary',
    type: 'executive',
    format: 'pptx',
    schedule: {
      frequency: 'weekly',
      dayOfWeek: 1, // Monday
      time: '09:00'
    },
    recipients: ['team@company.com'],
    enabled: true,
    lastRun: '2024-01-29T09:00:00Z',
    nextRun: '2024-02-05T09:00:00Z'
  },
  {
    id: 's2',
    name: 'Daily Alert',
    type: 'crisis',
    format: 'pdf',
    schedule: {
      frequency: 'daily',
      time: '08:00'
    },
    recipients: ['crisis@company.com', 'pr@company.com'],
    condition: {
      metric: 'negative_spike',
      operator: 'change_gt',
      value: 50
    },
    enabled: true,
    lastRun: '2024-01-30T08:00:00Z',
    nextRun: '2024-01-31T08:00:00Z'
  }
]
