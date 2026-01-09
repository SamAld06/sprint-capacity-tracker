import { availability } from "@/types/availability";

const APIURL = "http://localhost:3001/availability"

export const availabilityDetailsService = {
    getAll: async (): Promise<availability[]> => {
        const res = await fetch(APIURL)
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for availability details failed with error:): ${err}`)
        }
        return res.json()
    }
}