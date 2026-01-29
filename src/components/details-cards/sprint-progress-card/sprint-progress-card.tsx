import { workProgress } from "../../../types/workProgress";
import styles from "../styles.module.css";


export interface SprintCardProps {
    sprintData: workProgress
}

export const SprintProgressCard = ({sprintData}: SprintCardProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>Team member: {sprintData.name}</h1>
      </div>
      <section className={styles.details}>
        <p className={styles.data}>Work assigned: {sprintData.workAssigned}</p>
        <p className={styles.data}>Work completed: {sprintData.workCompleted}</p>
        <p className={styles.data}>Avg per md: {sprintData.averagePerMd}</p>
      </section>
    </div>
  );
};