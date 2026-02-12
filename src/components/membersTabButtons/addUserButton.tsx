import { useEffect, useState } from "react";
import styles from "./styles.module.css";
//Button to add a user to a group

export const AddUserButton = () => {
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
        const newUser = prompt("Team member name:");
        if (!newUser) return;

        if (
          !confirm(
            `Are you sure you want to add this team member:  ${newUser}\n\nThey will appear in the next created sprint`,
          )
        )
          return;

        const res = await fetch(`http://localhost:3000/api/group/group-members?groupcode=${groupcode}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newUser }),
        });
        if (res.ok) {
          window.location.reload();
        }
      }}
    >
      Add member
    </button>
  );
};
