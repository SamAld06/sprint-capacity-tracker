"use client";

import { useEffect, useState } from "react";
import { MemberRow } from "../../../components/memberRow/memberRow";
import { TabBar } from "../../../components/tabbar/tabBar";
import styles from "./styles.module.css";
import { groupMemberDetailsService } from "../../../services/groupMemberService";
import { groupMember } from "../../../types/groupMember";
import { AddUserButton } from "../../../components/membersTabButtons/addUserButton";
import { settingsDetailsService } from "../../../services/settingsDetailsService";
import NavBar from "../../../components/nav-bar/navBar";

export default function Members() {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [groupName, setGroupName] = useState<string>("");
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
        const groupData = await settingsDetailsService.getAll(groupcode);
        if (!groupData) {
          setErr("group data is missing");
        }
        setGroupName(groupData[0].groupname);
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
  if (loading) return <p>Loading members...</p>;
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
