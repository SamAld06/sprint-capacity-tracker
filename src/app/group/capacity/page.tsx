"use client";

import { NewSprintButton } from "../../../components/addSprintButton/newSprintButton";
import { CapacityCard } from "../../../components/details-cards/capacity-card/capacity-card";
import { CapacityForm } from "../../../components/details-forms/capacity-form/capacity-form";
import { NavBar } from "../../../components/navbar/navBar";
import { CapacitySummaryCard } from "../../../components/summary-cards/capacity-summary-card/capacity-summary-card";
import { TabBar } from "../../../components/tabbar/tabBar";
import { getLatestCapacityData } from "../../../helpers/getLatestCapacityData";
import { capacityDetailsService } from "../../../services/capacityDetailsService";
import { capacity } from "../../../types/capacity";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

export default function Capacity() {
  const groupName = "Example group";
  const [latestSprint, setLatestSprint] = useState<number>(1);
  const [capacity, setCapacity] = useState<capacity[] | null>(null);
  const [currentSprint, setCurrentSprint] = useState<number>(1);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const getAllCapacity = capacity?.filter(
    (capacity) => capacity.sprintid === currentSprint,
  );
  const filteredData = getAllCapacity;

  const handleSubmit = async (data: capacity) => {
    const res = await fetch("http://localhost:3000/api/group/capacity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setIsOpen(false);
    if (res.ok) {
      window.location.reload();
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const groupcode = params.get("groupcode");
    if (!groupcode) {
      setErr("No group code could be retrieved");
      setLoading(false);
      return;
    }
    const fetchSprint = async () => {
      try {
        const data = await capacityDetailsService.getAll(groupcode);
        const latestData = getLatestCapacityData(data);
        if (data) {
          setCapacity(data);
        } else {
          setCapacity(null);
        }
        if (latestData) {
          setLatestSprint(latestData?.sprintid);
          setCurrentSprint(latestData.sprintid);
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
          <div className={styles.summaryCard}>
            {filteredData && (
              <CapacitySummaryCard capacityData={filteredData} />
            )}
          </div>
          <div className={styles.cards}>
            {!capacity && <h1>Error loading data</h1>}
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
