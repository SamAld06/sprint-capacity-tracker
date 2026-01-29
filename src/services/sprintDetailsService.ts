import { sprint } from "../types/sprint";

const APIURL = "http://localhost:3001/sprint"

export const sprintDetailsService = {
    getAll: async (): Promise<sprint[]> => {
        const res = await fetch(APIURL)
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for sprint details failed with error:): ${err}`)
        }
        return res.json()
    }
}