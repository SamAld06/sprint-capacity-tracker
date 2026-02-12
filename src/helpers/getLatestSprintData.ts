import { sprint } from "../types/sprint"


export function getLatestSprintData(data: sprint[]) {
    if (!data || data.length === 0) {
        return null
    }
    return data.reduce((inital, current) => {
        return current.sprintid > inital.sprintid ? current : inital
    }, data[0])
}


