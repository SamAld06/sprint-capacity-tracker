import { group } from "../types/group";

export const groupDetailsService = {
    getAll: async (creator: string): Promise<group[]> => {
        const res = await fetch(`http://localhost:3000/api/groups?creator=${creator}`)
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for group details failed with error:): ${err}`)
        }
        const data = await res.json()
        return data
    }
}