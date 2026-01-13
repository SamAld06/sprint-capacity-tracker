"use client";

import { NavBar } from "@/components/navbar/navBar";
import styles from './styles.module.css'
import { TabBar } from "@/components/tabbar/tabBar";
import { useEffect, useState } from "react";
import { sprint } from "@/types/sprint";
import { sprintDetailsService } from "@/services/sprintDetailsService";
import { getLatestSprintData } from "@/helpers/getLatestSprintData";
import { CapacityCard } from "@/components/capacity-card/capacity-card";
import { capacity } from "@/types/capacity";
import { getLatestCapacityData } from "@/helpers/getLatestCapacityData";
import { capacityDetailsService } from "@/services/capacityDetailsService";

export default function Capacity() {
  const groupName = "Example group"
  const [sprint, setSprint] = useState<sprint | null>(null)
  const [capacity, setCapacity] = useState<capacity | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchSprint = async () => {
      try {
        const data = await sprintDetailsService.getAll()
        const latestData = getLatestSprintData(data)
        setSprint(latestData)
        const data2 = await capacityDetailsService.getAll()
        const latestData2 = getLatestCapacityData(data2)
        setCapacity(latestData2)
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
  console.log("data2:", capacity)
  return (
    <>
      <NavBar />
      <main className={styles.root}>
        <header className={styles.groupName}>
          <h1>{groupName}</h1>
        </header>
        <section>
          <TabBar />
        </section>
        <section>
          {sprint && <h1 className={styles.sprintHeader}>Current sprint:{capacity?.sprintId}</h1>}
          {!sprint && <h1>Error loading data</h1>}
          {capacity && sprint && <CapacityCard capacityData={capacity} sprintData={sprint}/>}
        </section>
      </main>
    </>
  );
}