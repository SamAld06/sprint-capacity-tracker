import { capacity } from "@/types/capacity"

export function getLatestAvaialbilityData(data: capacity[]) {
    if (!data) {
        return null
    }
    return data.reduce((inital, current) => {
        return current.id > inital.id ? current : inital
    })
}