// Will calculate the users average per md for a few sprints

export function getUserFewSprintAveragePerMd(averages: number[]) {
  if (averages.length > 3 || averages.length === 0 ) return NaN
  const sum = averages.reduce((total, value) => total + value, 0)
  const average = sum / averages.length
  return (average * 100) / 100;
}