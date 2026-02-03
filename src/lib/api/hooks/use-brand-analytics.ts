import { useQuery } from '@tanstack/react-query'

async function fetchBrandOverview(topicId: string) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const data = await import('@/mocks/data/brand-analytics.json')
    return data.default
}

export function useBrandOverview(topicId: string) {
    return useQuery({
        queryKey: ['brand-overview', topicId],
        queryFn: () => fetchBrandOverview(topicId),
        enabled: !!topicId,
    })
}
