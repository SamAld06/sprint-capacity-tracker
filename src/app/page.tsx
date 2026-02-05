import Link from "next/link";
import styles from './styles.module.css'
import { NavBar } from "../components/navbar/navBar";

export default function Home() {
  return (
    <main className={styles.root}>
      <NavBar/>
      <h1 className={styles.header}>Welcome to the sprint capacity wizard</h1>
      <p className={styles.description}>A tool to track sprint capacity as accuratley as possible</p>
      <div className={styles.navigation}>
        {/* remove once group functionality is implemented */}
        <Link href="/groupBoard">
          <button className={styles.button}>View groupBoard</button>
        </Link>
        <Link href="/create-account">
          <button className={styles.button}>Create account</button>
        </Link>
        <Link href="/login">
          <button className={styles.button}>Login</button>
        </Link>
        <Link href="/group/dashboard">
          <button className={styles.button}>View group</button>
        </Link>
      </div>
    </main>
  );
}