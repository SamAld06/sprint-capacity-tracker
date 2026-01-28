import { capacity } from "@/types/capacity";
import { workProgress } from "@/types/workProgress";
import { sprint } from "@/types/sprint";
import { getUserAveragePerMd } from "./getUserAveragePerMd";
import { getUserFewSprintAveragePerMd } from "./getUserFewSprintAveragePerMd";
import { getSprintCompletionDifference } from "./getSprintCompletionDifference";
import { getUserFinalAveragePerMd } from "./getUserFinalAveragePerMd";
import { getTeamFewSprintCompletionDifference } from "./getTeamFewSprintCompletionDifference";

//Tmrw to do list:
//
//Add functionality to update sprint data 
// (estimate completed, work completed, totalMd, teamAveragePerMd, 
// team completion difference)
//
//When:
//A new sprint is created
//When a team member updates their sprint progress

export interface functionProps {
    progressData: workProgress[]
    capacityData: capacity[]
    sprintData: sprint[]
    nextSprintId: number
}

export function getTeamEstimatedCompleted({
    progressData,
    capacityData,
    sprintData,
    nextSprintId
}: functionProps) {
    const sprints = Array.from(new Set(sprintData.map(data => data.sprintId)))
    const users = Array.from(new Set(progressData.map(data => data.name)))
    const latestFewSprintData = sprintData.filter(
      (data) =>
        data.sprintId < nextSprintId &&
        data.sprintId >= nextSprintId - 3,
    );
    const usersSprintAverages: number[] = []
    const completionDifferences: number[] = []
    console.log("FUNCTION HERE", progressData)
    console.log("FUNCTION HERE", capacityData)
    console.log("FUNCTION HERE", sprintData)
    console.log("FUNCTION HERE", nextSprintId)
    for (const sprint of latestFewSprintData) {
        const sprintData = latestFewSprintData.find(
            data => data.sprintId === sprint.sprintId
        )
        if (sprintData?.totalCompleted && sprintData.planned) {
            const completionDifference = getSprintCompletionDifference(sprintData?.totalCompleted, sprintData?.planned)
            completionDifferences.push(completionDifference)
            console.log("start here", sprintData)
            console.log(completionDifference)
        } else {
            const completionDifference = 0
            completionDifferences.push(completionDifference)
        }
    }
    const finalCompletionDifferencePercent = getTeamFewSprintCompletionDifference(completionDifferences)
    console.log("differences hereee", completionDifferences)
    console.log("FINAL DIFFERENCE HERE", finalCompletionDifferencePercent)
    for (const user of users) {
        const userCapacityData = capacityData.filter(
            data => data.name === user && 
            data.sprintId < nextSprintId && 
            data.sprintId >= nextSprintId - 3
        )
        const userProgressData = progressData.filter(
            data => data.name === user &&
            data.sprintId < nextSprintId && 
            data.sprintId >= nextSprintId - 3
        )
        console.log("ASFOASPFOKASF", userCapacityData)
        console.log("ASFOASPFOKASF", userProgressData)
        console.log("IFJAKJFAKF", user)
        const sprintAverages: number[] = []
        for (const sprint of userCapacityData && userProgressData) {
            const sprintProgress = userProgressData.find(
                data => data.sprintId === sprint.sprintId
            )
            const sprintCapacity = userCapacityData.find(
                data => data.sprintId === sprint.sprintId
            )
            if (sprintProgress?.workCompleted && sprintCapacity?.md) {
                const averagePerMd = getUserAveragePerMd(sprintProgress?.workCompleted, sprintCapacity?.md)
                sprintAverages.push(averagePerMd)
            } else {
                const averagePerMd = 0
                sprintAverages.push(averagePerMd)
            }
        }
        console.log("averages here", sprintAverages)
        const fewSprintAverage = getUserFewSprintAveragePerMd(sprintAverages)
        console.log("3sprinbtsdasd", fewSprintAverage)
        const finalAvgPerMd = getUserFinalAveragePerMd(finalCompletionDifferencePercent, fewSprintAverage)
        console.log(finalAvgPerMd)
        console.log("afnasdfnadjoasd", nextSprintId)
        const userMd = capacityData.find(data => data.sprintId === nextSprintId)?.md ?? 0
        console.log(userMd)
        const userEstimatedComplete = finalAvgPerMd * userMd
        usersSprintAverages.push(userEstimatedComplete)
    }
    console.log("ALL AVERAGES", usersSprintAverages)
    const FinalEstimatedCompleted = usersSprintAverages.reduce((total, num) => total + num, 0)
    console.log(FinalEstimatedCompleted)
  return FinalEstimatedCompleted;
}