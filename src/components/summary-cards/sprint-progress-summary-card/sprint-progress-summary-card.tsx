import styles from "../styles.module.css";
import { workProgress } from "@/types/workProgress";
import { getSprintProgressSummary } from "@/helpers/getSprintProgressSummary";
import { sprint } from "@/types/sprint";
import { getTeamAveragePerMd } from "@/helpers/getTeamAveragePerMd";

export interface SprintProgressCardProps {
  sprintProgressData: workProgress[] |  null;
  sprintData: sprint[] | null;
}

export const SprintProgressSummaryCard = ({sprintProgressData, sprintData}: SprintProgressCardProps) => {
    if (!sprintProgressData) {
        return null
    }
    const summaryData = getSprintProgressSummary(sprintProgressData)
    console.log('sprintProgressData:', sprintProgressData)
    console.log('sprintData:', sprintData)
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>Summary</h1>
      </div>
      <section className={styles.details}>
        <p className={styles.data}>Team work assigned: {summaryData.totalWorkAssigned}</p>
        <p className={styles.data}>Team work completed: {summaryData.totalWorkCompleted}</p>
        <p className={styles.data}>Team averagePerMd | current sprint: {summaryData.totalAveragePerMd}</p>
        <p className={styles.data}>Team completion difference: BLANK</p>
      </section>
    </div>
  );
};