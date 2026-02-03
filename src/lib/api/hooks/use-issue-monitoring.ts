import { useQuery } from '@tanstack/react-query'

async function fetchIssueOverview(topicId: string) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const data = await import('@/mocks/data/issue-monitoring-overview.json')
    return data.default
}

export function useIssueOverview(topicId: string) {
    return useQuery({
        queryKey: ['issue-overview', topicId],
        queryFn: () => fetchIssueOverview(topicId),
        enabled: !!topicId,
    })
}
