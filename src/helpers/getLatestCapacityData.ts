import { capacity } from "@/types/workProgress"

export function getLatestCapacityData(data: capacity[]) {
    if (!data) {
        return null
    }
    return data.reduce((inital, current) => {
        return current.id > inital.id ? current : inital
    })
}