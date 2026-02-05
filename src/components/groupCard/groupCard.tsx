import { getGroupShortName } from "../../helpers/getGroupShortName";
import { getRandomColour } from "../../helpers/getRandomColour";
import styles from "./styles.module.css";

export interface GroupCardProps {
  groupCode: string;
  groupName: string
}

export const GroupCard = ({groupCode, groupName}: GroupCardProps) => {
  const shortenedName = getGroupShortName(groupName)
  return (
    <div className={styles.root}>
      <section className={styles.iconContainer} style={{ backgroundColor: getRandomColour()}}>
        <div className={styles.shortenedName}>
            {shortenedName}
        </div>
      </section>
      <div className={styles.fullName}>
        {groupName}
      </div>
    </div>
  );
};