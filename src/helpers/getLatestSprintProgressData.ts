import { workProgress } from "@/types/workProgress"

export function getLatestSprintProgressData(data: workProgress[]) {
    if (!data) {
        return null
    }
    return data.reduce((inital, current) => {
        return current.id > inital.id ? current : inital
    })
}