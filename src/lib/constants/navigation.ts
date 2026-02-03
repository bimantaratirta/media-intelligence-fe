import {
    LayoutDashboard,
    TrendingUp,
    Heart,
    MapPin,
    Users,
    Bot,
    Cloud,
    MessageSquare,
    GitCompare,
    FileText,
    BarChart3,
    Target,
    FileBarChart,
    Settings,
    UserCog,
    Bell,
    Key,
} from 'lucide-react'

export const sidebarNavigation = [
    {
        title: 'Issue Monitoring',
        items: [
            {
                title: 'Overview',
                href: '/issue-monitoring/overview',
                icon: LayoutDashboard,
            },
            {
                title: 'Trends',
                href: '/issue-monitoring/trends',
                icon: TrendingUp,
            },
            {
                title: 'Sentiment',
                href: '/issue-monitoring/sentiment',
                icon: Heart,
            },
            {
                title: 'Geo Distribution',
                href: '/issue-monitoring/geo-distribution',
                icon: MapPin,
            },
            {
                title: 'Demographics',
                href: '/issue-monitoring/demographics',
                icon: Users,
            },
            {
                title: 'Influencers',
                href: '/issue-monitoring/influencers',
                icon: Bot,
            },
            {
                title: 'Word Cloud',
                href: '/issue-monitoring/wordcloud',
                icon: Cloud,
            },
            {
                title: 'Mentions',
                href: '/issue-monitoring/mentions/clusters',
                icon: MessageSquare,
            },
            {
                title: 'Comparison',
                href: '/issue-monitoring/comparison',
                icon: GitCompare,
            },
            {
                title: 'Reports',
                href: '/issue-monitoring/reports',
                icon: FileText,
            },
        ],
    },
    {
        title: 'Brand Analytics',
        items: [
            {
                title: 'Overview',
                href: '/brand-analytics/overview',
                icon: BarChart3,
            },
            {
                title: 'Competitor',
                href: '/brand-analytics/competitor',
                icon: Target,
            },
            {
                title: 'Content Perf',
                href: '/brand-analytics/content-perf',
                icon: FileBarChart,
            },
        ],
    },
    {
        title: 'Settings',
        items: [
            {
                title: 'Topic Config',
                href: '/settings/topic-config',
                icon: Settings,
            },
            {
                title: 'Team',
                href: '/settings/team',
                icon: UserCog,
            },
            {
                title: 'Notifications',
                href: '/settings/notifications',
                icon: Bell,
            },
            {
                title: 'API Keys',
                href: '/settings/api-keys',
                icon: Key,
            },
        ],
    },
]
