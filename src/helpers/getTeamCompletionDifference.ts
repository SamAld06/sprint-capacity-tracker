// Will calculate the amount of incomplete work
//Should only be used for team completed and planned

export interface functionProps {
    teamCompleted: number
    teamPlanned: number
}

export function getTeamCompletionDifference({
    teamCompleted,
    teamPlanned
}: functionProps) {
    const result = 100 - (teamCompleted / teamPlanned * 100)
  return result ;
}