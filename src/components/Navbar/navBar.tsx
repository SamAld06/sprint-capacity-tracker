import Link from "next/link";
import styles from "./styles.module.css"

//Navbar component for groups tab
export default function NavBar () {
  return (
      <div className={styles.root}>
        <Link href="/" className={styles.title}>
          Sprint capacity Tracker
        </Link>
        <div className={styles.tabs}>
          <Link href="/" className={styles.navigation}>
            Home
          </Link>
          <Link href="/groupBoard" className={styles.navigation}>
            Groups
          </Link>
          <Link href="/account" className={styles.navigation}>
            Account
          </Link>
        </div>
      </div>
  );
};
