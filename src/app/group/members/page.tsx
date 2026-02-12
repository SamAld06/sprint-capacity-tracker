"use client";

import { useEffect, useState } from "react";
import { MemberRow } from "../../../components/memberRow/memberRow";
import { NavBar } from "../../../components/navbar/navBar";
import { TabBar } from "../../../components/tabbar/tabBar";
import styles from "./styles.module.css";
import { groupMemberDetailsService } from "../../../services/groupMemberService";
import { groupMember } from "../../../types/groupMember";
import { AddUserButton } from "../../../components/membersTabButtons/addUserButton";

export default function Members() {
  const groupName = "Example group";
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [groupMemberData, setGroupMemberData] = useState<groupMember[] | null>(
    null,
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const groupcode = params.get("groupcode");
    if (!groupcode) {
      setErr("No group code could be retrieved");
      setLoading(false);
      return;
    }
    const fetchDetails = async () => {
      try {
        const groupMemberData =
          await groupMemberDetailsService.getAll(groupcode);
        if (groupMemberData) {
          setGroupMemberData(groupMemberData);
        } else {
          setGroupMemberData(null);
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
        <div className={styles.addButton}>
          <AddUserButton />
        </div>
        <div className={styles.memberRows}>
          {groupMemberData &&
            groupMemberData.map((groupMember) => (
              <MemberRow name={groupMember.name} />
            ))}
        </div>
      </main>
    </>
  );
}
