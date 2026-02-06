import { workProgress } from "../types/workProgress";

export const sprintProgressDetailsService = {
    getAll: async (): Promise<workProgress[]> => {
        const res = await fetch("http://localhost:3000/api/group/workprogress")
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for sprint progress details failed with error:): ${err}`)
        }
        return res.json()
    }
}