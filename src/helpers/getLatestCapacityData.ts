import { capacity } from "../types/capacity"

export function getLatestCapacityData(data: capacity[]) {
    if (!data || data.length === 0) {
        return null
    }
    return data.reduce((inital, current) => {
        return current.sprintid > inital.sprintid ? current : inital
    })
}