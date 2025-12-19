import Link from "next/link";
import styles from "./styles.module.css"

export interface InfoBoxProps {
    title: string;
    data: number;
}

export const InfoBox = ({ title, data }: InfoBoxProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <Link href="/">
          <button className={styles.redirect}>View more</button>
        </Link>
      </div>
      <p className={styles.data}>{data}</p>
    </div>
  );
};