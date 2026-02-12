"use client";

import { useEffect, useState } from "react";
import { NavBar } from "../../components/navbar/navBar";
import styles from "./styles.module.css";
import { group } from "../../types/group";
import { GroupCard } from "../../components/groupCard/groupCard";
import { groupDetailsService } from "../../services/groupDetailsService";
import { NewGroup } from "../../types/newGroup";
import { NewGroupForm } from "../../components/details-forms/new-group-form/new-group-form";

export default function GroupsBoard() {
  const [groupData, setGroupData] = useState<group[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSubmit = async (data: NewGroup) => {
    const res = await fetch("http://localhost:3000/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json()
    setIsOpen(false);
    if (!res.ok) {
      console.error("Server error", result);
    }
    if (res.ok) {
      window.location.reload();
    }
  };
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await groupDetailsService.getAll();
        if (data) {
          setGroupData(data);
        } else {
          setGroupData(null);
        }
      } catch (err) {
        setErr((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  if (loading) return <p>Loading groups...</p>;
  if (err) return <p>Error: {err}</p>;
  return (
    <main className={styles.root}>
      <NavBar />
      <h1 className={styles.pageTitle}>Group board</h1>
      <div className={styles.separator} />
      <div className={styles.cards}>
        <button className={styles.button} onClick={() => setIsOpen(true)}>
          <div className={styles.cardRoot}>
            <section className={styles.iconContainer}>
              <div className={styles.shortenedName}>+</div>
            </section>
            <div className={styles.fullName}>Create group</div>
          </div>
        </button>
        {groupData &&
          groupData.map((groupData) => <GroupCard groupData={groupData} />)}
      </div>
      {isOpen && (
        <NewGroupForm
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}
