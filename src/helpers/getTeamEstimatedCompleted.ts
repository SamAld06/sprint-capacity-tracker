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
    //Get all users and the last 3 sprints of data before current one
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
    //Get sprint completion difference for each of the last 3 sprints
    const finalCompletionDifferencePercent = getTeamFewSprintCompletionDifference(completionDifferences)
    console.log("differences hereee", completionDifferences)
    console.log("FINAL DIFFERENCE HERE", finalCompletionDifferencePercent)
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
        console.log("ASFOASPFOKASF", userCapacityData)
        console.log("ASFOASPFOKASF", userProgressData)
        console.log("IFJAKJFAKF", user)
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
        console.log("averages here", sprintAverages)
        const fewSprintAverage = getUserFewSprintAveragePerMd(sprintAverages)
        console.log("3sprinbtsdasd", fewSprintAverage)
        const finalAvgPerMd = getUserFinalAveragePerMd(finalCompletionDifferencePercent, fewSprintAverage)
        console.log('finalavgpermd', finalAvgPerMd)
        console.log("afnasdfnadjoasd", nextSprintId)
        console.log(capacityData)
        const userMd = allUserCapacityData.find(data => data.sprintId === nextSprintId)?.md ?? 0
        console.log('usermd',userMd)
        const userEstimatedComplete = finalAvgPerMd * userMd
        usersSprintAverages.push(userEstimatedComplete)
    }
    //calculate final estimated completed for team
    console.log("ALL AVERAGES", usersSprintAverages)
    const FinalEstimatedCompleted = Math.round(usersSprintAverages.reduce((total, num) => total + num, 0));
    console.log(FinalEstimatedCompleted)
  return FinalEstimatedCompleted;
}