"use client";

import { redirect } from 'next/dist/server/api-utils';
import { InfoBox } from '../../../components/dashboard-info-box/dashboard-info-box';
import { NavBar } from '../../../components/navbar/navBar';
import { TabBar } from '../../../components/tabbar/tabBar';
import { getLatestSprintData } from '../../../helpers/getLatestSprintData';
import { CreateServerClient } from '../../../lib/supabase/server';
import { sprintDetailsService } from '../../../services/sprintDetailsService';
import { sprint } from '../../../types/sprint';
import { supabase } from '../../api/_libs/supabaseclient';
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
        const sprintData = await sprintDetailsService.getAll()
        const latestData = getLatestSprintData(sprintData)
        setLatestSprint(latestData)
        setSprint(sprintData)
      } catch (err) {
        setErr((err as Error).message)
      } finally {
        setLoading(false)
      }
    };
    fetchSprint();
  }, []);
  if (loading) return <p>Loading sprints...</p>;
  if (err){return <p>Error: {err}</p>};
  return (
    <>
      <NavBar />
      <main className={styles.root}>
          <div>
        <header className={styles.groupName}>
          <h1>{groupName}</h1>
        </header>
        <section>
          <TabBar />
        </section>
        <section className={styles.info}>
          {sprint.filter((sprint) => sprint.sprintid === latestSprint?.sprintid).map((sprint) => (
          <>
          <InfoBox title="Work planned:" data={sprint.planned} />
          <div className={styles.sprintNumber}>
            <p>Current sprint:</p>
            <p key={sprint.sprintid}>{sprint.sprintid}</p>
          </div>
          <InfoBox title="Available MDs:" data={sprint.totalmd} />
          </>
          ))}
        </section>
        </div>
      </main>
    </>
  );
}
