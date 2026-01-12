"use client";

import { NavBar } from "@/components/navbar/navBar";
import styles from './styles.module.css'
import { TabBar } from "@/components/tabbar/tabBar";

export default function Availability() {
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
      </main>
    </>
  );
}
