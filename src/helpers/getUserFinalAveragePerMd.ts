//average per md (3 sprints) - (average per md (3 sprints) X planned vs completed %)

export function getUserFinalAveragePerMd(completedDifference: number, avgPerMd: number) {
    const result = avgPerMd - (avgPerMd * (completedDifference / 100))
  return Math.round(result * 100) / 100;
}