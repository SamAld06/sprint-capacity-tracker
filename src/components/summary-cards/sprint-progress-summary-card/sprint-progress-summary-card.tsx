import styles from "../styles.module.css";
import { workProgress } from "@/types/workProgress";
import { getSprintProgressSummary } from "@/helpers/getSprintProgressSummary";
import { sprint } from "@/types/sprint";
import { getTeamAveragePerMd } from "@/helpers/getTeamAveragePerMd";
import { getTeamEstimatedCompleted } from "@/helpers/getTeamEstimatedCompleted";
import { capacity } from "@/types/capacity";

export interface SprintProgressCardProps {
  sprintProgressData: workProgress[] |  null;
  sprintData: sprint[] | null;
  estimatedCompletion : number | undefined
  allSprintData: sprint[];
  allCapacityData: capacity[];
  allProgressData: workProgress[];
  currentSprint: number;
}

export const SprintProgressSummaryCard = ({sprintProgressData, sprintData, estimatedCompletion, allSprintData, allCapacityData, allProgressData, currentSprint}: SprintProgressCardProps) => {
    if (!sprintProgressData || !sprintData) {
        return null
    }
    const totalAveragePerMd = getTeamAveragePerMd(sprintProgressData)
    console.log('SPRINTHEREeeee***',sprintProgressData)
    console.log('LOOK HERE', sprintData)
    console.log(estimatedCompletion)
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>Summary</h1>
      </div>
      <section className={styles.details}>
        <p className={styles.data}>Team Estimated completed: {getTeamEstimatedCompleted({
              progressData: allProgressData,
              capacityData: allCapacityData,
              sprintData: allSprintData,
              nextSprintId: currentSprint
            })}</p>
        <p className={styles.data}>Team work planned: {sprintData[0].planned}</p>
        <p className={styles.data}>Team work added: {sprintData[0].added}</p>
        <p className={styles.data}>Team work removed: {sprintData[0].removed}</p>
        <p className={styles.data}>Team total md: {sprintData[0].totalMd}</p>
        <p className={styles.data}>Team work completed: {sprintData[0].totalCompleted}</p>
        <p className={styles.data}>Team averagePerMd | current sprint: {totalAveragePerMd}</p>
        <p className={styles.data}>Team completion difference: {sprintData[0].plannedCompletedDifference}%</p>
      </section>
    </div>
  );
};