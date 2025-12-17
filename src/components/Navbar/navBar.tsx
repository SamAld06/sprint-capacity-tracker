import Link from "next/link";
import styles from "./styles.module.css"

export const NavBar = () => {
  return (
    <>
      <div className={styles.root}>
        <Link href="/" className={styles.title}>
          Sprint capacity Tracker
        </Link>
        <div className={styles.tabs}>
          <Link href="/" className={styles.home}>
            Home
          </Link>
          <Link href="/about" className={styles.groups}>
            Groups
          </Link>
          <Link href="/contact" className={styles.account}>
            Account
          </Link>
        </div>
      </div>
    </>
  );
};
