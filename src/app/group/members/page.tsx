"use client";

import { useEffect, useState } from 'react';
import { MemberRow } from '../../../components/memberRow/memberRow';
import { NavBar } from '../../../components/navbar/navBar';
import { TabBar } from '../../../components/tabbar/tabBar';
import styles from './styles.module.css'
import { sprintProgressDetailsService } from '../../../services/sprintProgressDetailsService';
import { getLatestSprintProgressData } from '../../../helpers/getLatestSprintProgressData';
import { getLatestCapacityData } from '../../../helpers/getLatestCapacityData';
import { capacityDetailsService } from '../../../services/capacityDetailsService';
import { capacity } from '../../../types/capacity';
import { workProgress } from '../../../types/workProgress';

export default function Members() {
  const groupName = "Example group";
  const [latestSprint, setLatestSprint] = useState<number>(1);
  const [sprintProgress, setSprintProgress] = useState<workProgress[] | null>(
    null,
  );
  const [currentSprint, setCurrentSprint] = useState<number>(1);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [capacityData, setCapacityData] = useState<capacity[] | null>(null);
  const filteredProgressData = sprintProgress?.filter(
    (sprintProgress) => sprintProgress.sprintId === currentSprint,
  );
  const filteredCapacityData = capacityData?.filter(
    (capacityData) => capacityData.sprintId === currentSprint,
  );

  useEffect(() => {
    const fetchSprint = async () => {
      try {
        const sprintProgressData = await sprintProgressDetailsService.getAll();
        const latestSprintProgressData =
          getLatestSprintProgressData(sprintProgressData);
        const capacityData = await capacityDetailsService.getAll();
        const latestCapacityData = getLatestCapacityData(capacityData);
        if (sprintProgressData) {
          setSprintProgress(sprintProgressData);
        } else {
          setSprintProgress(null);
        }

        if (capacityData) {
          setCapacityData(capacityData);
        } else {
          setCapacityData(null);
        }

        if (latestSprintProgressData) {
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
        <div className={styles.memberRows}>
          {filteredCapacityData &&
            filteredCapacityData.map((capacity) => (
              <MemberRow name={capacity.name} />
            ))}
        </div>
      </main>
    </>
  );
} 
