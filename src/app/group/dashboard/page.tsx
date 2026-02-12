"use client";

import { InfoBox } from "../../../components/dashboard-info-box/dashboard-info-box";
import { NavBar } from "../../../components/navbar/navBar";
import { TabBar } from "../../../components/tabbar/tabBar";
import { getLatestSprintData } from "../../../helpers/getLatestSprintData";
import { sprintDetailsService } from "../../../services/sprintDetailsService";
import { sprint } from "../../../types/sprint";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { settingsDetailsService } from "../../../services/settingsDetailsService";

export default function Dashboard() {
  const [sprint, setSprint] = useState<sprint[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [latestSprint, setLatestSprint] = useState<sprint | null>();
  const [groupName, setGroupName] = useState<string>("");
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
        const groupData = await settingsDetailsService.getAll(groupcode);
        if (sprintData) {
          const latestData = getLatestSprintData(sprintData);
          setLatestSprint(latestData);
        } else {
          const latestData = null
          setLatestSprint(latestData);
        }
        setSprint(sprintData);
        if (!sprintData || !groupData) {
          setErr("Sprint data / group data is missing");
        }
        setGroupName(groupData[0].groupname);
      } catch (err) {
        setErr((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchSprint();
  }, []);
  if (loading) return <p>Loading sprints...</p>;
  if (err) {
    return <p>Error: {err}</p>;
  }
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
            {sprint.length === 0  &&
            <p className={styles.tipMessage}>Add some sprint data to get started!</p>
            }
            {sprint
              .filter((sprint) => sprint.sprintid === latestSprint?.sprintid)
              .map((sprint) => (
                <>
                  <InfoBox title="Work planned:" data={sprint.planned ?? "NaN"} />
                  <div className={styles.sprintNumber}>
                    <p>Current sprint:</p>
                    <p key={sprint.sprintid}>{sprint.sprintid}</p>
                  </div>
                  <InfoBox title="Available MDs:" data={sprint.totalmd ?? "NaN"} />
                </>
              ))}
          </section>
        </div>
      </main>
    </>
  );
}
