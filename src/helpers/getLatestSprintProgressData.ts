import { workProgress } from "../types/workProgress"

export function getLatestSprintProgressData(data: workProgress[]) {
    if (!data || data.length === 0 ) {
        return null
    }
    return data.reduce((inital, current) => {
        return current.sprintid > inital.sprintid ? current : inital
    })
}