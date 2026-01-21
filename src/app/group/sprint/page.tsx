"use client";

import { NavBar } from "@/components/navbar/navBar";
import styles from './styles.module.css'
import { TabBar } from "@/components/tabbar/tabBar";
import { useEffect, useState } from "react";
import { NewSprintButton } from "@/components/addSprintButton/newSprintButton";
import { sprintProgressDetailsService } from "@/services/sprintProgressDetailsService";
import { getLatestSprintProgressData } from "@/helpers/getLatestSprintProgressData";
import { workProgress } from "@/types/workProgress";
import { SprintProgressCard } from "@/components/details-cards/sprint-progress-card/sprint-progress-card";

export default function Sprint() {
  const groupName = "Example group"
  const [latestSprint, setLatestSprint] = useState<number>(1);
  const [sprintProgress, setSprintProgress] = useState<workProgress[] | null>(null);
  const [currentSprint, setCurrentSprint] = useState<number>(1);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const getAllCapacity = sprintProgress?.filter(
    (sprintProgress) => sprintProgress.sprintId === currentSprint,
  );
  const filteredData = getAllCapacity;
  useEffect(() => {
    const fetchSprint = async () => {
      try {
        const data = await sprintProgressDetailsService.getAll();
        const latestData = getLatestSprintProgressData(data)
        if (data) {
          setSprintProgress(data);
        } else {
          setSprintProgress(null);
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
              Edit capacity
            </button>
            <NewSprintButton/>
          </div>
          {isOpen && (
            <SprintForm
              onClose={() => setIsOpen(false)}
              data={sprintProgress}
              onSubmit={handleSubmit}
            />
          )}
          <div className={styles.summaryCard}>
            {/* {filteredData && <SprintSummaryCard capacityData={filteredData} />} */}
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

