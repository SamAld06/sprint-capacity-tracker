import { sprint } from "@/types/sprint";

export function getLatestSprintData(data: sprint[]) {
    if (!data) {
        return null
    }
    return data.reduce((inital, current) => {
        return current.id > inital.id ? current : inital
    })
}


