import { sprint } from "../types/sprint";

export const sprintDetailsService = {
    getAll: async (groupcode: string): Promise<sprint[]> => {
        const res = await fetch(`/api/group/sprint?groupcode=${groupcode}`)
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for sprint details failed with error:): ${err}`)
        }
        return res.json()
    }
}