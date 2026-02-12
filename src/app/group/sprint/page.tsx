"use client";

import { NewSprintButton } from "../../../components/addSprintButton/newSprintButton";
import { SprintProgressCard } from "../../../components/details-cards/sprint-progress-card/sprint-progress-card";
import { SprintProgressForm } from "../../../components/details-forms/sprint-progress-form/sprint-progress-form";
import { SprintSummaryForm } from "../../../components/details-forms/sprint-summary-form/sprint-summary-form";
import { NavBar } from "../../../components/navbar/navBar";
import { SprintProgressSummaryCard } from "../../../components/summary-cards/sprint-progress-summary-card/sprint-progress-summary-card";
import { TabBar } from "../../../components/tabbar/tabBar";
import { getLatestSprintData } from "../../../helpers/getLatestSprintData";
import { getLatestSprintProgressData } from "../../../helpers/getLatestSprintProgressData";
import { getTeamEstimatedCompleted } from "../../../helpers/getTeamEstimatedCompleted";
import { capacityDetailsService } from "../../../services/capacityDetailsService";
import { settingsDetailsService } from "../../../services/settingsDetailsService";
import { sprintDetailsService } from "../../../services/sprintDetailsService";
import { sprintProgressDetailsService } from "../../../services/sprintProgressDetailsService";
import { capacity } from "../../../types/capacity";
import { sprint } from "../../../types/sprint";
import { workProgress } from "../../../types/workProgress";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

export default function Sprint() {
  const [estimatedCompleted, setEstimatedCompleted] = useState<
    number | undefined
  >(undefined);
  const [latestSprint, setLatestSprint] = useState<number>(1);
  const [sprintProgress, setSprintProgress] = useState<workProgress[] | null>(
    null,
  );
  const [currentSprint, setCurrentSprint] = useState<number>(1);
  const [err, setErr] = useState<string | null>(null);
  const [sprintData, setSprintData] = useState<sprint[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  const [capacityData, setCapacityData] = useState<capacity[] | null>(null);
  const [summaryFormIsOpen, setSummaryFormIsOpen] = useState<boolean>(false);
  const filteredProgressData = sprintProgress?.filter(
    (sprintProgress) => sprintProgress.sprintid === currentSprint,
  );
  const filteredSprintData = sprintData?.filter(
    (sprintData) => sprintData.sprintid === currentSprint,
  );
  const filteredCapacityData = capacityData?.filter(
    (capacityData) => capacityData.sprintid === currentSprint,
  );

  const handleSubmit = async (data: workProgress) => {
    const res = await fetch("http://localhost:3000/api/group/workprogress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setIsOpen(false);
    if (res.ok) {
      window.location.reload();
    }
  };

  const handleSummaryFormSubmit = async (data: sprint) => {
    const res = await fetch("http://localhost:3000/api/group/sprint", {
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
        const sprintData = await sprintDetailsService.getAll(groupcode);
        const sprintProgressData =
          await sprintProgressDetailsService.getAll(groupcode);
        const latestSprintProgressData =
          getLatestSprintProgressData(sprintProgressData);
        const latestSprintData = getLatestSprintData(sprintData);
        const groupData = await settingsDetailsService.getAll(groupcode);
        const capacityData = await capacityDetailsService.getAll(groupcode);
        if (!groupData) {
          setErr("group data is missing");
        }
        setGroupName(groupData[0].groupname);
        if (sprintProgressData) {
          setSprintProgress(sprintProgressData);
        } else {
          setSprintProgress(null);
        }

        if (sprintData) {
          setSprintData(sprintData);
        } else {
          setSprintData(null);
        }

        if (capacityData) {
          setCapacityData(capacityData);
        } else {
          setCapacityData(null);
        }

        if (latestSprintProgressData && latestSprintData) {
          setLatestSprint(latestSprintProgressData?.sprintid);
          setCurrentSprint(latestSprintProgressData.sprintid);
        } else {
          setLatestSprint(0);
          setCurrentSprint(0);
        }
        if (
          sprintProgressData &&
          capacityData &&
          sprintData &&
          latestSprintProgressData
        ) {
          setEstimatedCompleted(
            getTeamEstimatedCompleted({
              progressData: sprintProgressData,
              capacityData: capacityData,
              sprintData: sprintData,
              nextSprintId: latestSprintProgressData.sprintid,
            }),
          );
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
            <h1 className={styles.sprintHeader}>
              Current sprint: {currentSprint}
            </h1>
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
            <button
              className={styles.dataButton}
              onClick={() => setSummaryFormIsOpen(true)}
            >
              Edit summary
            </button>
            <NewSprintButton />
          </div>
          {isOpen && (
            <SprintProgressForm
              onClose={() => setIsOpen(false)}
              data={sprintProgress}
              capacityData={capacityData}
              onSubmit={handleSubmit}
            />
          )}
          {summaryFormIsOpen && (
            <SprintSummaryForm
              onClose={() => setSummaryFormIsOpen(false)}
              progressData={sprintProgress}
              summaryData={sprintData}
              onSubmit={handleSummaryFormSubmit}
            />
          )}
          <div className={styles.summaryCard}>
            {filteredProgressData &&
              filteredSprintData &&
              sprintData &&
              capacityData &&
              sprintProgress && (
                <SprintProgressSummaryCard
                  sprintProgressData={filteredProgressData}
                  sprintData={filteredSprintData}
                  estimatedCompletion={estimatedCompleted}
                  allSprintData={sprintData}
                  allCapacityData={capacityData}
                  allProgressData={sprintProgress}
                  currentSprint={currentSprint}
                />
              )}
          </div>
          <div className={styles.cards}>
            {!sprintProgress && <h1>Error loading data</h1>}
            {filteredProgressData &&
              filteredProgressData.map((sprintProgress) => (
                <SprintProgressCard sprintData={sprintProgress} />
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
