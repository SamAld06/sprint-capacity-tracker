// Will calculate the users average per md 

export function getUserFewSprintAveragePerMd(averages: number[]) {
  if (averages.length === 0 ) return 0;
  if (averages.length > 3) return NaN
  const sum = averages.reduce((total, value) => total + value, 0)
  const average = sum / averages.length
  //const average = (averages[0] + averages[1] + averages[2]) / 3
  return (average * 100) / 100;
}