"use client";

import { NavBar } from "../../../components/navbar/navBar";
import { ChangeGroupNameButton } from "../../../components/settingsTabButtons/change-groupname-button";
import { ChangeGroupPasswordButton } from "../../../components/settingsTabButtons/change-password-button";
import { TabBar } from "../../../components/tabbar/tabBar";
import { settingsDetailsService } from "../../../services/settingsDetailsService";
import { group } from "../../../types/group";
import { supabase } from "../../api/_libs/supabaseclient";
import styles from "./styles.module.css";

import { useEffect, useState } from "react";

export default function Settings() {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<group[] | null>(null);
  const [groupcode, setGroupCode] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const groupcode = params.get("groupcode");
    if (!groupcode) {
      setErr("No group code could be retrieved");
      setLoading(false);
      return;
    }
    setGroupCode(groupcode);
    const fetchDetails = async () => {
      try {
        const data = await settingsDetailsService.getAll(groupcode);
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!data || data.length === 0 || data.length > 1) {
          setErr("An error occured in obtaining your groups data");
        } else {
          if (data) {
            setGroup(data);
          } else {
            setGroup(null);
          }
        }
        if (err || !user?.email) {
          console.error("Supabase get user error:", err);
        } else {
          setUserEmail(user?.email);
        }
      } catch (err) {
        setErr((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, []);

  if (loading) return <p>Loading settings...</p>;
  if (err) return <p>Error: {err}</p>;
  if (!group) return <p>Error: The group could not be retrieved</p>
  return (
    <>
      <NavBar />
      <main className={styles.root}>
        <header className={styles.groupName}>
          <h1>{group[0].groupname}</h1>
        </header>
        <section>
          <TabBar />
        </section>
        <section className={styles.settings}>
          <ChangeGroupNameButton groupcode={groupcode} userEmail={userEmail} />
          <ChangeGroupPasswordButton groupcode={groupcode} userEmail={userEmail}/>
          {err && <p className={styles.error}>{err}</p>}
        </section>
      </main>
    </>
  );
}
