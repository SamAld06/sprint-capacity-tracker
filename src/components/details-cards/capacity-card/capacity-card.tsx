import { capacity } from "@/types/capacity";
import styles from "../styles.module.css";

export interface CapacityCardProps {
  capacityData: capacity
}

export const CapacityCard = ({capacityData}: CapacityCardProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>Team member: {capacityData.name}</h1>
      </div>
      <section className={styles.details}>
        <p className={styles.data}>Working Days: {capacityData.workingDays}</p>
        <p className={styles.data}>Available md's: {capacityData.md}</p>
        <p className={styles.data}>Out of office: {capacityData.outOfOffice}</p>
        <p className={styles.data}>Releases: {capacityData.releases}</p>
        <p className={styles.data}>Friday project: {capacityData.fridayProjects}</p>
        <p className={styles.data}>Maintenance: {capacityData.maintenance}</p>
      </section>
    </div>
  );
};