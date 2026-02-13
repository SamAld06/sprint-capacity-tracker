import { workProgress } from "../types/workProgress";
import { getTeamAveragePerMd } from "./getTeamAveragePerMd";

//Should get the summary of all data for a groups sprint
export function getSprintProgressSummary(data: workProgress[]) {
    const totalWorkAssigned = data.reduce((total, member) => total + member.workassigned, 0)
    const totalWorkCompleted = data.reduce((total, member) => total + member.workcompleted, 0)
    const totalAveragePerMd = getTeamAveragePerMd(data)
    return{totalWorkAssigned, totalWorkCompleted, totalAveragePerMd}
}