// Will calculate the amount of incomplete work
//Should only be used for team completed and planned

export function getSprintCompletionDifference(
    teamCompleted: number,
    teamPlanned: number
) {
    const result = 100 - (teamCompleted / teamPlanned * 100)
  return Math.round(result * 100) / 100 ;
}