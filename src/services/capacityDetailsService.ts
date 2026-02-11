import { capacity } from "../types/capacity";

export const capacityDetailsService = {
    getAll: async (groupcode: string): Promise<capacity[]> => {
        const res = await fetch(`http://localhost:3000/api/group/capacity?groupcode=${groupcode}`)
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for capacity details failed with error:): ${err}`)
        }
        const data = await res.json()
        return data
    }
}