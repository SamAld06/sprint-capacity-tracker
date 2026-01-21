export type sprint = {
    id: number;
    groupCode: string;
    sprintId: number
    planned: number;
    added: number;
    removed: number;
    totalCompleted: number;
    totalMd: number;
    plannedCompletedDifference: number;
}