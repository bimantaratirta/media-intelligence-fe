import { useQuery } from '@tanstack/react-query'
import type { Topic } from '@/types'

// Mock fetch function - replace with actual API call
async function fetchTopics(): Promise<Topic[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Import mock data
    const data = await import('@/mocks/data/topics.json')
    return data.default as Topic[]
}

export function useTopics() {
    return useQuery({
        queryKey: ['topics'],
        queryFn: fetchTopics,
    })
}
