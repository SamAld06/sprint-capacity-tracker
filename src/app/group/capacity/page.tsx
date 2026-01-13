"use client";

import { NavBar } from "@/components/navbar/navBar";
import styles from './styles.module.css'
import { TabBar } from "@/components/tabbar/tabBar";
import { useEffect, useState } from "react";
import { CapacityCard } from "@/components/capacity-card/capacity-card";
import { getLatestAvaialbilityData } from "@/helpers/getLatestAvailabilityData";
import { availabilityDetailsService } from "@/services/availabilityDetailsService";
import { capacity } from "@/types/capacity";

export default function Capacity() {
  const groupName = "Example group"
  const [capacity, setCapacity] = useState<capacity | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchSprint = async () => {
      try {
        const data = await availabilityDetailsService.getAll()
        const latestData = getLatestAvaialbilityData(data)
        setCapacity(latestData)
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
          {capacity && <h1 className={styles.sprintHeader}>Current sprint:{capacity?.sprintId}</h1>}
          {!capacity && <h1>Error loading data</h1>}
          {capacity && <CapacityCard capacityData={capacity} />}
        </section>
      </main>
    </>
  );
}