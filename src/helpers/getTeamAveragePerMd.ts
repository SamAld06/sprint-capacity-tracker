import { workProgress } from "../types/workProgress";

export function getTeamAveragePerMd(data: workProgress[]) {
  const helper = data.reduce(
    (total, member) => {
      total.sum += member.averagePerMd;
      total.count += 1;
      return total;
    },
    { sum: 0, count: 0 },
  );
  const result = (helper.sum / helper.count).toFixed(2);
  return result
}