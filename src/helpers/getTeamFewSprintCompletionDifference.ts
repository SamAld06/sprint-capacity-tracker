// Will calculate the amount of incomplete work
//Should only be used for team completed and planned


export function getTeamFewSprintCompletionDifference(differences: number[]) {
    const result =  (differences[0] + differences[1] + differences[2]) / 3
  return Math.round(result * 100) / 100;
}