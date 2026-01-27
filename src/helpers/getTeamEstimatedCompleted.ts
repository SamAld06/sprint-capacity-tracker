import { capacity } from "@/types/capacity";
import { workProgress } from "@/types/workProgress";
import { sprint } from "@/types/sprint";
import { getUserAveragePerMd } from "./getUserAveragePerMd";
import { getUserFewSprintAveragePerMd } from "./getUserFewSprintAveragePerMd";
import { getSprintCompletionDifference } from "./getSprintCompletionDifference";
import { getUserFinalAveragePerMd } from "./getUserFinalAveragePerMd";
import { getTeamFewSprintCompletionDifference } from "./getTeamFewSprintCompletionDifference";

//Will add all the individual estimates

export interface functionProps {
    progressData: workProgress[]
    capacityData: capacity[]
    sprintData: sprint[]
    nextSprintId: number
}

export function getTeamestimatedCompleted({
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
    for (const sprint of latestFewSprintData) {
        const sprintData = latestFewSprintData.find(
            data => data.sprintId === sprint.sprintId
        )
        if (sprintData?.totalCompleted && sprintData.planned) {
            const completionDifference = getSprintCompletionDifference(sprintData?.totalCompleted, sprintData?.planned)
            completionDifferences.push(completionDifference)
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
        usersSprintAverages.push(finalAvgPerMd)
    }
    console.log("ALL AVERAGES", usersSprintAverages)
  return ;
}