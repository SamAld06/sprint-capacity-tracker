import { getUserAveragePerMd } from "./getUserAveragePerMd";
import { getUserFewSprintAveragePerMd } from "./getUserFewSprintAveragePerMd";
import { getSprintCompletionDifference } from "./getSprintCompletionDifference";
import { getUserFinalAveragePerMd } from "./getUserFinalAveragePerMd";
import { getTeamFewSprintCompletionDifference } from "./getTeamFewSprintCompletionDifference";
import { sprint } from "../types/sprint";
import { capacity } from "../types/capacity";
import { workProgress } from "../types/workProgress";

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
    //Get all users and the last 3 sprints of data before current one
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
    //Get sprint completion difference for each of the last 3 sprints
    const finalCompletionDifferencePercent = getTeamFewSprintCompletionDifference(completionDifferences)
    for (const user of users) {
        //Get required data for a user in users from each data
        const allUserCapacityData = capacityData.filter(
            data => data.name === user
        )
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
        const sprintAverages: number[] = []
        for (const sprint of userCapacityData && userProgressData) {
            //Get user average md for each sprint
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
        //Calculate the users few sprint average md before and after completion
        //difference, then calculate user estimated capacity and push to array
        const fewSprintAverage = getUserFewSprintAveragePerMd(sprintAverages)
        const finalAvgPerMd = getUserFinalAveragePerMd(finalCompletionDifferencePercent, fewSprintAverage)
        const userMd = allUserCapacityData.find(data => data.sprintId === nextSprintId)?.md ?? 0
        const userEstimatedComplete = finalAvgPerMd * userMd
        usersSprintAverages.push(userEstimatedComplete)
    }
    //calculate final estimated completed for team
    const FinalEstimatedCompleted = Math.round(usersSprintAverages.reduce((total, num) => total + num, 0));
  return FinalEstimatedCompleted;
}