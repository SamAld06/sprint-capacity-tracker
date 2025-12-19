import { NavBar } from "@/components/navbar/navBar";
import Link from "next/link";
import styles from './group/settings/styles.module.css'
import { TabBar } from "@/components/tabbar/tabBar";

export default function Home() {
  const sprintDays = 14
  const groupCode = 'Wi4p6Cy1'
  const groupPassword = 'Password'
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
        <section className={styles.settings}>
          <section className={styles.options}>
            <p>Sprint length</p>
            <p>Group code</p>
            <p>Group password</p>
          </section>
          <section className={styles.inputFields}>
            <input type="text" value={sprintDays} className={styles.inputs}/>
            <input type="text" value={groupCode} className={styles.inputs}/>
            <input type="text" value={groupPassword} className={styles.inputs}/>
          </section>
        </section>
      </main>
    </>
  );
}
