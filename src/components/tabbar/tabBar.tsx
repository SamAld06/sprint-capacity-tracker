import Link from "next/link";
import styles from "./styles.module.css"

export const TabBar = () => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.infoTabs}>
            <Link href="/group/dashboard">
              <button>Dashboard</button>
            </Link>
            <Link href="/group/sprint">
              <button>Sprint</button>
            </Link>
            <Link href="/group/availability">
              <button>Availability</button>
            </Link>
            <Link href="/group/members">
              <button>Members</button>
            </Link>
        </div>
        <Link href="/group/settings">
        <button className={styles.settings}>Settings</button>
        </Link>
      </div>
    </>
  );
};