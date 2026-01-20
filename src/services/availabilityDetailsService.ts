import { capacity } from "@/types/capacity";

const APIURL = "http://localhost:3001/availability"

export const availabilityDetailsService = {
    getAll: async (): Promise<capacity[]> => {
        const res = await fetch(APIURL)
        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Api fetch for capacity details failed with error:): ${err}`)
        }
        const data = await res.json()
        console.log("res", data)
        return data
    }
}