import { groupMember } from "../types/groupMember";

const APIURL = "http://localhost:3001/groupMember"

export const capacityDetailsService = {
    getAll: async (): Promise<groupMember[]> => {
        const res = await fetch(APIURL)
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for capacity details failed with error:): ${err}`)
        }
        const data = await res.json()
        return data
    }
}