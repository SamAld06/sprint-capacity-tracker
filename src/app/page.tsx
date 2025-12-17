import { NavBar } from "@/components/Navbar/navBar";
import Link from "next/link";
import styles from './styles.module.css'

export default function Home() {
  return (
    <main className={styles.root}>
      <NavBar />
      <h1>Sprint Capacity Tracker</h1>
      <Link href="/dashboard">
        <button>
          Go to Dashboard
        </button>
      </Link>
    </main>
  );
}
