import { NavBar } from "@/components/navbar/navBar";
import Link from "next/link";
import styles from './styles.module.css'
import { useEffect, useState } from "react";
import { sprint } from "@/types/sprint";
import { sprintDetailsService } from "@/services/sprintDetailsService";

export default function Home() {
  const [sprint, setSprint] = useState<sprint[]>([])
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const data = await sprintDetailsService.getAll()
        setSprint(data)
      } catch (err) {
        setErr((err as Error).message)
      } finally {
        setLoading(false)
      }
    };
    fetchSprints();
  }, []);
  return (
    <main className={styles.root}>
      <NavBar/>
      <h1 className={styles.header}>Welcome to the sprint capacity wizard</h1>
      <p className={styles.description}>A tool to track sprint capacity as accuratley as possible</p>
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
      {sprint.map((sprint) => (
        <p>{sprint.planned}</p>
      ))}
    </main>
  );
}
