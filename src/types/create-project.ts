export interface CreateProjectFormData {
    // Step 1: Basic Info
    name: string
    description: string

    // Step 2: Keywords
    primaryKeywords: string[]
    mustContain: string[]
    excludeKeywords: string[]

    // Step 3: Platforms
    platforms: {
        twitter: boolean
        instagram: boolean
        tiktok: boolean
        youtube: boolean
        facebook: boolean
        threads: boolean
        newsPortal: boolean
        googleNews: boolean
    }

}

export const defaultFormData: CreateProjectFormData = {
    name: '',
    description: '',
    primaryKeywords: [],
    mustContain: [],
    excludeKeywords: [],
    platforms: {
        twitter: true,
        instagram: true,
        tiktok: true,
        youtube: true,
        facebook: true,
        threads: true,
        newsPortal: true,
        googleNews: true,
    },

}
