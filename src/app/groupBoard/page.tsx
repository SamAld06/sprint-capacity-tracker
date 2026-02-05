import { GroupCard } from "../../components/groupCard/groupCard";
import { NavBar } from "../../components/navbar/navBar";
import styles from './styles.module.css'

export default function GroupsBoard() {
  return (
    <main className={styles.root}>
      <NavBar/>
      <h1 className={styles.pageTitle}>
        Group board
      </h1>
      <div className={styles.separator}/>
      <GroupCard groupCode="testcode1" groupName="Test group 1"/>
    </main>
  );
}