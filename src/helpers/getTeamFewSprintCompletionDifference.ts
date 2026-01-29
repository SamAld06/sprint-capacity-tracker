// Will calculate the completion difference for the last few sprints on avg
//Should only be used for team completed and planned (whole sprint) differences

export function getTeamFewSprintCompletionDifference(differences: number[]) {
  if (differences.length > 3 || differences.length === 0) return NaN
  const sum = differences.reduce((total, value) => total + value, 0)
  const result = sum / differences.length
  return Math.round(result * 100) / 100;
}
