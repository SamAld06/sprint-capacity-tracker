import { capacity } from "@/types/capacity";
import styles from "../styles.module.css";
import { getCapacitySummary } from "@/helpers/getCapacitySummary";
import { workProgress } from "@/types/workProgress";

export interface CapacityCardProps {
  SprintProgressData: workProgress[]|  null
}

export const SprintProgressSummaryCard = ({SprintProgressData}: CapacityCardProps) => {
    if (!SprintProgressData) {
        return null
    }
    const summaryData = getCapacitySummary(SprintProgressData)
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>Summary</h1>
      </div>
      <section className={styles.details}>
        <p className={styles.data}>Team working days: {summaryData.totalWorkingDays}</p>
        <p className={styles.data}>Team available md's: {summaryData.totalMd}</p>
        <p className={styles.data}>Team out of office days: {summaryData.totalOutOfOffice}</p>
        <p className={styles.data}>Team release days: {summaryData.totalReleases}</p>
        <p className={styles.data}>Team friday projects: {summaryData.totalFridayProjects}</p>
        <p className={styles.data}>Team maintenance days: {summaryData.totalMaintenance}</p>
      </section>
    </div>
  );
};