import { useState } from "react";
import { GroupCard } from "../../components/groupCard/groupCard";
import { NavBar } from "../../components/navbar/navBar";
import styles from './styles.module.css'
import { group } from "../../types/group";

export default function GroupsBoard() {
  const [groupMemberData, setGroupMemberData] = useState<group[] | null>(null)
  return (
    <main className={styles.root}>
      <NavBar/>
      <h1 className={styles.pageTitle}>
        Group board
      </h1>
      <div className={styles.separator}/>
      <div className={styles.cards}>
            {!groups && <h1>Error loading data</h1>}
            {groupData &&
              groupData.map((groupData) => (
                <GroupCard groupData={groupData}/>
              ))}
          </div>
    </main>
  );
}