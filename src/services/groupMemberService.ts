import { groupMember } from "../types/groupMember";

export const groupMemberDetailsService = {
    getAll: async (groupcode: string): Promise<groupMember[]> => {
        const res = await fetch(`/api/group/group-members?groupcode=${groupcode}`)
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for group member details failed with error:): ${err}`)
        }
        const data = await res.json()
        return data
    }
}