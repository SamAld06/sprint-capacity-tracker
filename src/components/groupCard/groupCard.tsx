import { getGroupShortName } from "../../helpers/getGroupShortName";
import { getRandomColour } from "../../helpers/getRandomColour";
import { group } from "../../types/group";
import styles from "./styles.module.css";

export interface GroupCardProps {
  groupData: group;
}

export const GroupCard = ({groupData}: GroupCardProps) => {
  const shortenedName = getGroupShortName(groupData.groupName)
  return (
    <button className={styles.button} onClick={async () => {
        const res = await fetch(
          "http://localhost:3000/api/group/",
          {
            method: "POST",
          }
        );
        if (res.ok) {
          window.location.reload()
        }
      }}>
    <div className={styles.root}>
      <section className={styles.iconContainer} style={{ backgroundColor: getRandomColour()}}>
        <div className={styles.shortenedName}>
            {shortenedName}
        </div>
      </section>
      <div className={styles.fullName}>
        {groupData.groupName}
      </div>
    </div>
    </button>
  );
};