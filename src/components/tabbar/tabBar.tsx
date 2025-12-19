import Link from "next/link";
import styles from "./styles.module.css"

export const TabBar = () => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.infoTabs}>
            <button>Dashboard</button>
            <button>Capacity</button>
            <button>Availabilty</button>
            <button>Members</button>
        </div>
        <button className={styles.settings}>Settings</button>
      </div>
    </>
  );
};