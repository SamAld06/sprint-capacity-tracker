import { availability } from "@/types/capacity"

export function getLatestAvaialbilityData(data: availability[]) {
    if (!data) {
        return null
    }
    return data.reduce((inital, current) => {
        return current.id > inital.id ? current : inital
    })
}