import { NavBar } from "@/components/Navbar/navBar";
import Link from "next/link";
import styles from './styles.module.css'

export default function Home() {
  return (
    <main className={styles.root}>
      <NavBar />
      <h1 className={styles.header}>Welcome to the sprint capacity tracker</h1>
      <div className={styles.navigation}>
        <Link href="/groups">
          <button className={styles.button}>Create group</button>
        </Link>
        <Link href="/account">
          <button className={styles.button}>Create account</button>
        </Link>
        <Link href="/groups">
          <button className={styles.button}>Join group</button>
        </Link>
      </div>
    </main>
  );
}
