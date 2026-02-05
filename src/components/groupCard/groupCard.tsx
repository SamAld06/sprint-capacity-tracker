import styles from "./styles.module.css";

export interface GroupCardProps {
  groupCode: string;
}

export const GroupCard = ({groupCode}: GroupCardProps) => {
  return (
    <div className={styles.root}>
      <section className={styles.iconContainer}>
        <div className={styles.shortenedName}>
            {groupCode}
        </div>
      </section>
      <div className={styles.fullName}>
        Group name here
      </div>
    </div>
  );
};