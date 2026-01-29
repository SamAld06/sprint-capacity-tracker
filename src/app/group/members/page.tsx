"use client";

import { NavBar } from '../../../components/navbar/navBar';
import { TabBar } from '../../../components/tabbar/tabBar';
import styles from './styles.module.css'

export default function Members() {
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
