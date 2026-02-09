# CLAUDE.md - Frontend

Project frontend untuk Asha Intelligence (N4P Platform) - Dashboard monitoring dan analytics media sosial.

## Commands

```bash
npm run dev      # Start dev server di localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

## Tech Stack

- **Next.js 16** dengan App Router (React 19)
- **Zustand** untuk client state (auth, project, UI)
- **TanStack React Query** untuk server state dan caching
- **shadcn/ui + Radix UI** untuk komponen
- **Tailwind CSS 4** dengan next-themes (dark mode)
- **Recharts** untuk visualisasi chart
- **react-simple-maps** untuk peta Indonesia
- **React Hook Form + Zod** untuk form validation

## Directory Structure (`src/`)

```
app/                        # Next.js App Router
├── auth/login/             # Halaman login
├── portal/                 # Daftar proyek dan wizard create
│   ├── projects/           # List semua topic/project
│   └── create/             # Wizard pembuatan topic baru
└── (dashboard)/[topicId]/  # Dashboard utama (dynamic route per topic)
    ├── issue-monitoring/   # Trends, sentiment, geo, demographics, influencers, dll
    ├── brand-analytics/    # Overview, competitor, content
    └── settings/           # Topic config, team, notifications, API keys

components/
├── ui/                     # shadcn/ui base components (button, card, dialog, dll)
├── charts/                 # Recharts visualizations (20+ komponen)
├── shared/                 # Domain components (mention-card, stat-card, date-picker, dll)
├── layout/                 # Sidebar, Topbar
├── maps/                   # Indonesia map component
├── influencers/            # Influencer-related components
├── comparison/             # Topic comparison components
├── competitor/             # Competitor analytics components
├── reports/                # Report generation components
└── providers/              # ThemeProvider, QueryProvider

stores/                     # Zustand stores dengan persist middleware
├── auth-store.ts           # User authentication state
├── project-store.ts        # Selected topic context
└── ui-store.ts             # Sidebar collapse, mobile menu state

lib/
├── utils.ts                # cn(), formatCompact(), getSentimentColor(), getPlatformColor()
├── constants/index.ts      # PLATFORMS, SENTIMENTS, EMOTIONS, PROVINCES
├── constants/navigation.ts # Sidebar navigation config
├── api/hooks/              # React Query hooks
│   ├── use-topics.ts       # Topic CRUD
│   ├── use-issue-monitoring.ts
│   └── use-brand-analytics.ts
└── validations/            # Zod schemas

mocks/data/                 # Mock data files untuk development
types/
├── index.ts                # Core types: Platform, Sentiment, Topic, Mention, dll
└── create-project.ts       # Types untuk project wizard

hooks/
└── use-media-query.ts      # Responsive breakpoint hook
```

## Key Patterns

### Routing
- Multi-tenant via `[topicId]` dynamic segment
- Root `/` redirect ke `/portal/projects`
- Dashboard pages di dalam `(dashboard)` route group

### Data Fetching
- Mock data dengan simulated delays di `lib/api/hooks/`
- React Query untuk caching dan refetching
- Untuk integrasi API real: ganti fetch function, pertahankan struktur React Query

### Styling
- Gunakan `cn()` dari `lib/utils.ts` untuk class merging
- Component variants via Class Variance Authority (CVA)
- Dark mode support via `next-themes` dan Tailwind `dark:` prefix

### Path Alias
- `@/*` maps ke `./src/*`

## Core Types

```typescript
// Platform yang didukung
type Platform = "twitter" | "instagram" | "tiktok" | "youtube" | "facebook" | "threads" | "news"

// Sentiment analysis
type Sentiment = "positive" | "neutral" | "negative"

// Emotion detection
type Emotion = "joy" | "anger" | "sadness" | "fear" | "surprise" | "disgust" | "neutral"

// User roles
type Role = "owner" | "admin" | "analyst" | "viewer"
```

## Utility Functions (`lib/utils.ts`)

```typescript
cn(...classes)                    // Merge Tailwind classes
formatCompact(num)                // 1500 → "1.5K", 2000000 → "2.0M"
formatPercentage(num)             // 5.5 → "+5.5%"
formatRelative(date)              // Date → "2h ago", "3d ago"
getSentimentColor(sentiment)      // → Tailwind text color class
getSentimentBgColor(sentiment)    // → Tailwind bg color class
getPlatformColor(platform)        // → Hex color string
```

## Constants (`lib/constants/index.ts`)

- `PLATFORMS` - List platform dengan id, name, icon
- `SENTIMENTS` - Sentiment dengan color mapping
- `EMOTIONS` - 7 emotion types dengan icon dan color
- `SENTIMENT_COLORS` - Hex colors untuk chart
- `PLATFORM_COLORS` - Brand colors (muted) untuk chart
- `GENDER_COLORS` - Male/female/unknown colors
- `PROVINCES` - 34 provinsi Indonesia dengan id dan nama

## Chart Colors

Gunakan warna yang konsisten untuk chart:
- Sentiment: `SENTIMENT_COLORS` dari constants
- Platform: `PLATFORM_COLORS` atau `getPlatformColor()`
- Heatmap/sequential: `BLUE_SEQUENTIAL_SCALE` dari utils

## Component Conventions

### UI Components
- Semua di `components/ui/` adalah shadcn/ui components
- Jangan modifikasi langsung, extend dengan wrapper jika perlu

### Chart Components
- Prefix sesuai tipe: `mention-trend-chart`, `sentiment-donut`, `engagement-chart`
- Gunakan `ResponsiveContainer` dari Recharts
- Consistent color scheme via utility functions

### Shared Components
- `StatCard` - Stat dengan label, value, change percentage
- `MentionCard` - Card untuk display mention dengan author info
- `DateRangePicker` - Picker tanggal untuk filtering
- `InsightPanel` - AI-generated insights display

## Data Refresh

- Data di-refresh **setiap 24 jam sekali** (fixed)
- `lastCrawledAt` pada Topic menunjukkan kapan data terakhir diperbarui
- Tidak ada real-time updates - polling only

## Hidden Features (Belum Diaktifkan)

Fitur-fitur berikut sudah ada di codebase tapi di-hide dari UI:
- **Notifications** - Alert settings (`/settings/notifications`)
- **API Keys** - API key management (`/settings/api-keys`)
- **Bell icon** - Notification indicator di topbar

Untuk mengaktifkan, uncomment di:
- `lib/constants/navigation.ts` - Sidebar menu items
- `components/layout/topbar.tsx` - Bell notification icon

## Development Notes

- Mock data di `mocks/data/` - siap integrasi API real
- Indonesia provinces GeoJSON di `public/indonesia-provinces.json`
- Form validation schemas di `lib/validations/`
- Semua pages support dark mode
