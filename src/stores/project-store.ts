import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProjectState {
    topicId: string | null
    topicName: string | null
    setTopic: (id: string, name: string) => void
    clearTopic: () => void
}

export const useProjectStore = create<ProjectState>()(
    persist(
        (set) => ({
            topicId: null,
            topicName: null,
            setTopic: (id, name) => set({ topicId: id, topicName: name }),
            clearTopic: () => set({ topicId: null, topicName: null }),
        }),
        {
            name: 'project-storage',
        }
    )
)
