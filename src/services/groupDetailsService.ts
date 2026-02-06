import { group } from "../types/group";

const APIURL = "http://localhost:3001/groups"

export const groupMemberDetailsService = {
    getAll: async (): Promise<group> => {
        const res = await fetch(APIURL)
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for groups details failed with error:): ${err}`)
        }
        const data = await res.json()
        return data
    }
}