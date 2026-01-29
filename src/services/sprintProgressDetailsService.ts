import { workProgress } from "../types/workProgress";

const APIURL = "http://localhost:3001/capacity"

export const sprintProgressDetailsService = {
    getAll: async (): Promise<workProgress[]> => {
        const res = await fetch(APIURL)
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for capacity details failed with error:): ${err}`)
        }
        return res.json()
    }
}