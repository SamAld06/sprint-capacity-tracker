"use client";

import { NewSprintButton } from "../../../components/addSprintButton/newSprintButton";
import { CapacityCard } from "../../../components/details-cards/capacity-card/capacity-card";
import { CapacityForm } from "../../../components/details-forms/capacity-form/capacity-form";
import { NavBar } from "../../../components/navbar/NavBar";
import { CapacitySummaryCard } from "../../../components/summary-cards/capacity-summary-card/capacity-summary-card";
import { TabBar } from "../../../components/tabbar/tabBar";
import { getLatestCapacityData } from "../../../helpers/getLatestCapacityData";
import { capacityDetailsService } from "../../../services/capacityDetailsService";
import { settingsDetailsService } from "../../../services/settingsDetailsService";
import { capacity } from "../../../types/capacity";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

export default function Capacity() {
  const [latestSprint, setLatestSprint] = useState<number>(1);
  const [capacity, setCapacity] = useState<capacity[]>([]);
  const [currentSprint, setCurrentSprint] = useState<number>(1);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  const getAllCapacity = capacity?.filter(
    (capacity) => capacity.sprintid === currentSprint,
  ) ?? [];
  const handleSubmit = async (data: capacity) => {
    const params = new URLSearchParams(window.location.search);
    const groupcode = params.get("groupcode");
    if (!groupcode) {
      setErr("No group code could be retrieved");
      return;
    }
    const res = await fetch(`/api/group/capacity?groupcode=${groupcode}`, {
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
        const groupData = await settingsDetailsService.getAll(groupcode);
        const latestData = getLatestCapacityData(data);
        if (!groupData) {
          setErr("group data is missing");
        }
        setGroupName(groupData[0].groupname);
        if (data) {
          setCapacity(data);
        } else {
          setCapacity([]);
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
  if (loading) return <p>Loading capacity...</p>;
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
              className={currentSprint >0 ? styles.selector : styles.hidden}
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
            {getAllCapacity && currentSprint > 0 && (
              <CapacitySummaryCard capacityData={getAllCapacity} />
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
