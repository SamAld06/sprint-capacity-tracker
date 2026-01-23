import { capacity } from "@/types/capacity";
import { workProgress } from "@/types/workProgress";

//Will calculate the estimated completed for the current
//sprint for 1 user

export interface functionProps {
    progressData: workProgress[]
    capacityData: capacity[]
    nextSprintId: Number
}

export function getUserEstimatedCompleted({
    progressData,
    capacityData,
    nextSprintId
}: functionProps) {
    console.log(progressData);
    console.log(capacityData)
    
  return ;
}