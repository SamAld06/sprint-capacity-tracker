import { capacity } from "@/types/capacity";
import { workProgress } from "@/types/workProgress";
import { getTeamAveragePerMd } from "./getTeamAveragePerMd";

//Should get the total number of man days for all users for a sprint
export function getSprintProgressSummary(data: workProgress[]) {
    console.log(data)
    const totalWorkAssigned = data.reduce((total, member) => total + member.workAssigned, 0)
    const totalWorkCompleted = data.reduce((total, member) => total + member.workCompleted, 0)
    const totalAveragePerMd = getTeamAveragePerMd(data)
    // const totalCompletionDifference = data.reduce((total, member) => total + member.releases, 0)
    // const totalFridayProjects = data.reduce((total, member) => total + member.fridayProjects, 0)
    // const totalMaintenance = data.reduce((total, member) => total + member.maintenance, 0)
    return{totalWorkAssigned, totalWorkCompleted, totalAveragePerMd}
}