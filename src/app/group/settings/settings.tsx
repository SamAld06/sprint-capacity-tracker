import { NavBar } from "@/components/navbar/navBar";
import styles from './group/dashboard/styles.module.css'
import { InfoBox } from "@/components/dashboard-info-box/dashboard-info-box";
import { TabBar } from "@/components/tabbar/tabBar";

export default function Home() {
  const sprintNumber = 'Sprint 42'
  const groupName = "Example group"
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
        <section className={styles.info}>
          <InfoBox title="Sprint Capacity:" data={21} />
          <div className={styles.sprintNumber}>
            <p>Current sprint:</p>
            <p>{sprintNumber}</p>
          </div>
          <InfoBox title="Available MDs:" data={52} />
        </section>
      </main>
    </>
  );
}
