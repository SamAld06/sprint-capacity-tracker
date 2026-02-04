"use client";

import { InfoBox } from '../../../components/dashboard-info-box/dashboard-info-box';
import { NavBar } from '../../../components/navbar/navBar';
import { TabBar } from '../../../components/tabbar/tabBar';
import { getLatestSprintData } from '../../../helpers/getLatestSprintData';
import { sprintDetailsService } from '../../../services/sprintDetailsService';
import { sprint } from '../../../types/sprint';
import styles from './styles.module.css'
import { useEffect, useState } from "react";

export default function Dashboard() {
  const groupName = "Example group"
  const [sprint, setSprint] = useState<sprint[]>([])
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [latestSprint, setLatestSprint] = useState<sprint | null>()
  useEffect(() => {
    const fetchSprint = async () => {
      try {
        const data = await sprintDetailsService.getAll()
        const latestData = getLatestSprintData(data)
        setLatestSprint(latestData)
        setSprint(data)
      } catch (err) {
        setErr((err as Error).message)
      } finally {
        setLoading(false)
      }
    };
    fetchSprint();
  }, []);
  if (loading) return <p>Loading sprints...</p>;
  if (err) return <p>Error: {err}</p>;
  console.log(latestSprint)
  return (
    <>
      <NavBar />
      <main className={styles.root}>
        {sprint.filter((sprint) => sprint.sprintId=== latestSprint?.sprintId).map((sprint) => (
          <div>
        <header className={styles.groupName}>
          <h1>{groupName}</h1>
        </header>
        <section>
          <TabBar />
        </section>
        <section className={styles.info}>
          <InfoBox title="Work planned:" data={sprint.planned} />
          <div className={styles.sprintNumber}>
            <p>Current sprint:</p>
            <p key={sprint.sprintId}>{sprint.sprintId}</p>
          </div>
          <InfoBox title="Available MDs:" data={sprint.totalMd} />
        </section>
        </div>
        ))}
      </main>
    </>
  );
}
