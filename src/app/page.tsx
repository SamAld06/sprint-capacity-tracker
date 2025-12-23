'use client';

import { NavBar } from "@/components/navbar/navBar";
import Link from "next/link";
import styles from './group/capacity/styles.module.css'
import { TabBar } from "@/components/tabbar/tabBar";

export default function Home() {
  const groupName = 'Example group'
  const nextSprintDate = '31/12/25'
    const handleClick = () => {
    alert('Button clicked!');
  };
  return (
<<<<<<< HEAD
    <main className={styles.root}>
      <NavBar/>
      <h1 className={styles.header}>Welcome to the sprint capacity wizard</h1>
      <p className={styles.description}>A tool to track sprint capacity as accuratley as possible</p>
      <div className={styles.navigation}>
        <Link href="/groups">
          <button className={styles.button}>Create group</button>
        </Link>
        <Link href="/account">
          <button className={styles.button}>Create account</button>
        </Link>
        <Link href="/groups">
          <button className={styles.button}>Join group</button>
        </Link>
        <Link href="/group/dashboard">
          <button className={styles.button}>View single dashboard</button>
        </Link>
      </div>
    </main>
=======
    <>
      <NavBar />
      <main className={styles.root}>
        <header className={styles.groupName}>
          <h1>{groupName}</h1>
        </header>
        <TabBar />
        <section className={styles.capacityNotif}>
          <p>Your next sprint starts on: {nextSprintDate}</p>
        </section>
        <section className={styles.buttonSection}>
          <button className={styles.button} onClick={handleClick}>Add row</button>
          <button className={styles.button} onClick={handleClick}>Add column</button>
          <button className={styles.button} onClick={handleClick}>New table</button>
        </section>
        <section className={styles.tableSection}>
          <p className={styles.placeHolder}>TABLE PLACEHOLDER</p>
        </section>
      </main>
    </>
>>>>>>> ae1d468 (SCT-17 Add sprint end date text)
  );
}
