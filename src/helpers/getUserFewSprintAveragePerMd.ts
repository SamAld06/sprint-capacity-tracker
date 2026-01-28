// Will calculate the users average per md 

export function getUserFewSprintAveragePerMd(averages: number[]) {
    const average = (averages[0] + averages[1] + averages[2]) / 3
  return (average * 100) / 100;
}