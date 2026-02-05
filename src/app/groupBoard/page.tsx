import { GroupCard } from "../../components/groupCard/groupCard";
import { NavBar } from "../../components/navbar/navBar";
import styles from './styles.module.css'

export default function GroupsBoard() {
  return (
    <main className={styles.root}>
      <NavBar/>
      <GroupCard groupCode="testcode1"/>
    </main>
  );
}