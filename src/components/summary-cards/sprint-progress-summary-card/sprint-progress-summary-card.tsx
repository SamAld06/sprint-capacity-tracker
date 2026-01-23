import styles from "../styles.module.css";
import { workProgress } from "@/types/workProgress";
import { getSprintProgressSummary } from "@/helpers/getSprintProgressSummary";
import { sprint } from "@/types/sprint";
import { getTeamAveragePerMd } from "@/helpers/getTeamAveragePerMd";
import { getTeamestimatedCompleted } from "@/helpers/getTeamEstimatedCompleted";

export interface SprintProgressCardProps {
  sprintProgressData: workProgress[] |  null;
  sprintData: sprint[] | null;
}

export const SprintProgressSummaryCard = ({sprintProgressData, sprintData}: SprintProgressCardProps) => {
    if (!sprintProgressData || !sprintData) {
        return null
    }
    const progressSummaryData = getSprintProgressSummary(sprintProgressData)
    console.log('SPRINTHEREeeee',sprintProgressData)
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>Summary</h1>
      </div>
      <section className={styles.details}>
        <p className={styles.data}>Team Estimated completed:</p>
        <p className={styles.data}>Team work planned: {sprintData[0].planned}</p>
        <p className={styles.data}>Team work added: {sprintData[0].added}</p>
        <p className={styles.data}>Team work removed: {sprintData[0].removed}</p>
        <p className={styles.data}>Team total md: {sprintData[0].totalMd}</p>
        <p className={styles.data}>Team work completed: {progressSummaryData.totalWorkCompleted}</p>
        <p className={styles.data}>Team averagePerMd | current sprint: {progressSummaryData.totalAveragePerMd}</p>
        <p className={styles.data}>Team completion difference: {sprintData[0].plannedCompletedDifference}</p>
      </section>
    </div>
  );
};