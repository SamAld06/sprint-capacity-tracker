import { workProgress } from "../types/workProgress";

export const sprintProgressDetailsService = {
    getAll: async (groupcode: string): Promise<workProgress[]> => {
        const res = await fetch(`/api/group/workprogress?groupcode=${groupcode}`)
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for sprint progress details failed with error:): ${err}`)
        }
        return res.json()
    }
}