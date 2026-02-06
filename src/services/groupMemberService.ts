import { groupMember } from "../types/groupMember";

export const groupMemberDetailsService = {
    getAll: async (): Promise<groupMember[]> => {
        const res = await fetch("http://localhost:3000/api/group/groupMember")
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for capacity details failed with error:): ${err}`)
        }
        const data = await res.json()
        return data
    }
}