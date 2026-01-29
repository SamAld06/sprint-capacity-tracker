import { workProgress } from "../types/workProgress";
import { getTeamAveragePerMd } from "./getTeamAveragePerMd";

//Should get the summary of all data for a groups sprint
export function getSprintProgressSummary(data: workProgress[]) {
    const totalWorkAssigned = data.reduce((total, member) => total + member.workAssigned, 0)
    const totalWorkCompleted = data.reduce((total, member) => total + member.workCompleted, 0)
    const totalAveragePerMd = getTeamAveragePerMd(data)
    // const totalCompletionDifference = data.reduce((total, member) => total + member.releases, 0)
    return{totalWorkAssigned, totalWorkCompleted, totalAveragePerMd}
}