"use client";

import { NavBar } from "@/components/navbar/navBar";
import styles from "./styles.module.css";
import { TabBar } from "@/components/tabbar/tabBar";
import { useEffect, useState } from "react";
import { NewSprintButton } from "@/components/addSprintButton/newSprintButton";
import { sprintProgressDetailsService } from "@/services/sprintProgressDetailsService";
import { getLatestSprintProgressData } from "@/helpers/getLatestSprintProgressData";
import { workProgress } from "@/types/workProgress";
import { SprintProgressCard } from "@/components/details-cards/sprint-progress-card/sprint-progress-card";
import { SprintProgressSummaryCard } from "@/components/summary-cards/sprint-progress-summary-card/sprint-progress-summary-card";
import { sprintDetailsService } from "@/services/sprintDetailsService";
import { getLatestSprintData } from "@/helpers/getLatestSprintData";
import { sprint } from "@/types/sprint";
import { SprintProgressForm } from "@/components/details-forms/sprint-progress-form/sprint-progress-form";

export default function Sprint() {
  const groupName = "Example group";
  const [latestSprint, setLatestSprint] = useState<number>(1);
  const [sprintProgress, setSprintProgress] = useState<workProgress[] | null>(
    null,
  );
  const [currentSprint, setCurrentSprint] = useState<number>(1);
  const [err, setErr] = useState<string | null>(null);
  const [sprintData, setSprintData] = useState<sprint[] | null>(null) 
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const getAllCapacity = sprintProgress?.filter(
    (sprintProgress) => sprintProgress.sprintId === currentSprint
  );
  const filteredData = sprintData?.filter(
    (sprintData) => sprintData.sprintId === currentSprint
  );

  const handleSubmit = async (data: workProgress) => {
    console.log("data", data)
      const res = await fetch("http://localhost:3001/capacity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setIsOpen(false);
      if (res.ok) {
        window.location.reload()
      }
  };

  useEffect(() => {
    const fetchSprint = async () => {
      try {
        const sprintData = await sprintDetailsService.getAll();
        const sprintProgressdata = await sprintProgressDetailsService.getAll();
        const latestSprintProgressData = getLatestSprintProgressData(sprintProgressdata);
        const latestSprintData = getLatestSprintData(sprintData)

        if (sprintProgressdata) {
          setSprintProgress(sprintProgressdata);
        } else {
          setSprintProgress(null);
        }

        if (sprintData) {
          setSprintData(sprintData)
        } else {
          setSprintData(null)
        }

        if (latestSprintProgressData && latestSprintData) {
          setLatestSprint(latestSprintProgressData?.sprintId);
          setCurrentSprint(latestSprintProgressData.sprintId);
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
  console.log('sprint', sprintData)
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
            {/* {capacity && ( */}
            <h1 className={styles.sprintHeader}>
              Current sprint: {currentSprint}
            </h1>
            {/* )} */}
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
              Edit sprint progress
            </button>
            <NewSprintButton />
          </div>
          {isOpen && (
            <SprintProgressForm
              onClose={() => setIsOpen(false)}
              data={sprintProgress}
              onSubmit={handleSubmit}
            />
          )}
          <div className={styles.summaryCard}>
            {getAllCapacity && filteredData && (
              <SprintProgressSummaryCard sprintProgressData={getAllCapacity} sprintData={filteredData}/>
            )}
          </div>
          <div className={styles.cards}>
            {!sprintProgress && <h1>Error loading data</h1>}
            {getAllCapacity &&
              getAllCapacity.map((sprintProgress) => (
                <SprintProgressCard sprintData={sprintProgress} />
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
