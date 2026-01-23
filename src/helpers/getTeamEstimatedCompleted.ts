import { capacity } from "@/types/capacity";
import { workProgress } from "@/types/workProgress";

//Will add all the individual estimates

export interface functionProps {
    progressData: workProgress[]
    capacityData: capacity[]
    nextSprintId: Number
}

export function getTeamestimatedCompleted({
    progressData,
    capacityData,
    nextSprintId
}: functionProps) {
    console.log(progressData);
    console.log(capacityData)
    console.log(nextSprintId)
  return ;
}