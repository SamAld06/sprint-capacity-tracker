"use client";

import { NavBar } from "../../../components/navbar/navBar";
import { TabBar } from "../../../components/tabbar/tabBar";
import { useNumberInputChange } from "../../../helpers/numberInput";
import styles from "./styles.module.css";

import { useEffect, useState } from "react";

export default function Settings() {
  const [defaultGroupCode, setGroupCode] = useState("Wi4p6Cy1");
  const [defaultGroupPassword, setGroupPassword] = useState("Password");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const groupName = "Example group";
  const sprintDaysInput = useNumberInputChange(14);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const groupcode = params.get("groupcode");
    if (!groupcode) {
      setErr("No group code could be retrieved");
      setLoading(false);
      return;
    }
  });
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
            <input type="text" {...sprintDaysInput} className={styles.inputs} />
            <input
              type="text"
              value={defaultGroupCode}
              className={styles.inputs}
              onChange={(e) => setGroupCode(e.target.value)}
            />
            <input
              type="text"
              value={defaultGroupPassword}
              className={styles.inputs}
              onChange={(e) => setGroupPassword(e.target.value)}
            />
          </section>
        </section>
      </main>
    </>
  );
}
