// 100 - (completed / planned x 100)

export interface functionProps {
    latestDifference: number
    middleDifference: number
    oldestDifference: number
}

export function getAvgCompletionDiffernce({
    latestDifference,
    middleDifference,
    oldestDifference
}: functionProps) {
    const result = (latestDifference + middleDifference + oldestDifference) / 3
  return result;
}