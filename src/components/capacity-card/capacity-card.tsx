import { capacity } from "@/types/capacity";
import styles from "./styles.module.css"
import { sprint } from "@/types/sprint";

export interface CapacityCardProps {
  capacityData: capacity
  sprintData: sprint
}

export const CapacityCard = ({capacityData, sprintData}: CapacityCardProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>Team member: {capacityData.name}</h1>
      </div>
      <section className={styles.details}>
        <p className={styles.data}>Available md's: {capacityData.workAssigned}</p>
        <p className={styles.data}>Out of office: {capacityData.workCompleted}</p>
        <p className={styles.data}>Releases: {capacityData.averagePerMd}</p>
        <p className={styles.data}>Friday project: {sprintData.planned}</p>
        <p className={styles.data}>Maintenance: {sprintData.planned}</p>
      </section>
    </div>
  );
};