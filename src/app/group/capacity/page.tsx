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
  const latestSprintId = 3
  const [capacity, setCapacity] = useState<capacity[] | null>(null)
  const [currentSprint, setCurrentSprint] = useState<number>(1)
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const getAllCapacity = capacity?.filter(capacity => capacity.sprintId === currentSprint)
  useEffect(() => {
    const fetchSprint = async () => {
      try {
        const data = await availabilityDetailsService.getAll()
        console.log('data:', data)
        const latestData = getLatestAvaialbilityData(data)
        setCapacity(data)
        setCurrentSprint(latestData.sprintId)
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
  console.log("current:",currentSprint)
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
          <header className={styles.navigation}>
            <button onClick={() => setCurrentSprint(currentSprint - 1)} className= {currentSprint != 1 ? styles.selector : styles.hidden}>&lt;-</button>
            {capacity && <h1 className={styles.sprintHeader}>Current sprint:{currentSprint}</h1>}
            <button onClick={() => setCurrentSprint(currentSprint + 1)} className= {currentSprint != latestSprintId ? styles.selector : styles.hidden}>-&gt;</button>
          </header>
          {!capacity && <h1>Error loading data</h1>}
          {getAllCapacity.map(capacity => (
            <CapacityCard capacityData={capacity} />
          ))}
          
        </section>
      </main>
    </>
  );
}