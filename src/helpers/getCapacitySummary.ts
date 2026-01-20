import { capacity } from "@/types/capacity";

//Should get the total number of man days for all users for a sprint
export function getCapacitySummary(data: capacity[]) {
    const totalWorkingDays = data.reduce((total, member) => total + member.workingDays, 0)
    const totalMd = data.reduce((total, member) => total + member.md, 0)
    const totalOutOfOffice = data.reduce((total, member) => total + member.outOfOffice, 0)
    const totalReleases = data.reduce((total, member) => total + member.releases, 0)
    const totalFridayProjects = data.reduce((total, member) => total + member.fridayProjects, 0)
    const totalMaintenance = data.reduce((total, member) => total + member.maintenance, 0)

    return{totalWorkingDays, totalMd, totalOutOfOffice, totalReleases, totalFridayProjects, totalMaintenance}
}