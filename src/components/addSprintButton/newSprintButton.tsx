import { useEffect, useState } from "react";
import styles from "./styles.module.css"
//Button to create a new sprint row for each user in a specific group
export const NewSprintButton = () => {
  const [err, setErr] = useState("")
  const [groupcode, setgroupcode] = useState("")
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const groupcode = params.get("groupcode");
      if (!groupcode) {
        setErr("No group code could be retrieved");
        return;
      }
      setgroupcode(groupcode)
    })
  return (
    <button
    className={styles.button}
      onClick={async () => {
        if (!confirm("Are you sure you want to create a new sprint?\n\nEnsure all sprint data for the current sprint is accurate")) return;

        const res = await fetch(
          `/api/group/newSprint?groupcode=${groupcode}`,
          {
            method: "POST",
          }
        );
        if (res.ok) {
          window.location.reload()
        }
      }}
    >
      Add sprint
    </button>
  );
};
