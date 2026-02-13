import { group } from "../types/group";

export const settingsDetailsService = {
    getAll: async (groupcode: string): Promise<group[]> => {
        const res = await fetch(`/api/group/settings?groupcode=${groupcode}`)
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for group details failed with error:): ${err}`)
        }
        const data = await res.json()
        return data
    }
}