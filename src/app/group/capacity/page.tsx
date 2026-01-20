"use client";

import { NavBar } from "@/components/navbar/navBar";
import styles from "./styles.module.css";
import { TabBar } from "@/components/tabbar/tabBar";
import { useEffect, useState } from "react";
import { CapacityCard } from "@/components/capacity-card/capacity-card";
import { getLatestAvaialbilityData } from "@/helpers/getLatestAvailabilityData";
import { availabilityDetailsService } from "@/services/availabilityDetailsService";
import { capacity } from "@/types/capacity";
import { CapacityForm } from "@/components/capacity-form/capacity-form";
import { NewSprintButton } from "@/components/addSprintButton/newSprintButton";
import { CapacitySummaryCard } from "@/components/capacity-summary-card/capacity-summary-card";

export default function Capacity() {
  const groupName = "Example group";
  const [latestSprint, setLatestSprint] = useState<number>(1);
  const [capacity, setCapacity] = useState<capacity[] | null>(null);
  const [currentSprint, setCurrentSprint] = useState<number>(1);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const getAllCapacity = capacity?.filter(
    (capacity) => capacity.sprintId === currentSprint,
  );
  const filteredData = getAllCapacity;

  const handleSubmit = async (data: capacity) => {
    await fetch("http://localhost:3001/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("databug:", data);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchSprint = async () => {
      try {
        const data = await availabilityDetailsService.getAll();
        const latestData = getLatestAvaialbilityData(data);
        if (data) {
          setCapacity(data);
        } else {
          setCapacity(null);
        }
        if (latestData) {
          setLatestSprint(latestData?.sprintId);
          setCurrentSprint(latestData.sprintId);
        } else {
          setLatestSprint(0);
          setCurrentSprint(0);
        }
      } catch (err) {
        setErr((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchSprint();
  }, []);

  if (loading) return <p>Loading sprints...</p>;
  if (err) return <p>Error: {err}</p>;
  return (
    <>
      <NavBar />
      <main className={styles.root}>
        <header className={styles.groupName}>
          <h1>{groupName}</h1>
        </header>
        <div>
          <TabBar />
        </div>
        <div>
          <header className={styles.navigation}>
            <button
              onClick={() => setCurrentSprint(currentSprint - 1)}
              className={currentSprint != 1 ? styles.selector : styles.hidden}
            >
              &lt;-
            </button>
            {capacity && (
              <h1 className={styles.sprintHeader}>
                Current sprint: {currentSprint}
              </h1>
            )}
            <button
              onClick={() => setCurrentSprint(currentSprint + 1)}
              className={
                currentSprint != latestSprint ? styles.selector : styles.hidden
              }
            >
              -&gt;
            </button>
          </header>
          <div className={styles.buttonSection}>
            <button
              className={styles.dataButton}
              onClick={() => setIsOpen(true)}
            >
              Edit capacity
            </button>
            <NewSprintButton />
          </div>
          {isOpen && (
            <CapacityForm
              onClose={() => setIsOpen(false)}
              data={capacity}
              onSubmit={handleSubmit}
            />
          )}
          <div className={styles.cards}>
            {!capacity && <h1>Error loading data</h1>}
            {filteredData && <CapacitySummaryCard capacityData={filteredData} />}
            {getAllCapacity &&
              getAllCapacity.map((capacity) => (
                <CapacityCard capacityData={capacity} />
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
