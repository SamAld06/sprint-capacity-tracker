import { useEffect, useState } from "react";
import styles from "./styles.module.css"
//Button to remove a user from a group


export const EditUserButton = ({member}: {member: string}) => {
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
        const newName = prompt(`You are editing the name of ${member}. Please enter new name:`);
        if (!newName) return;

        const res = await fetch(
          `http://localhost:3000/api/group/group-members?groupcode=${groupcode}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({currentName: member , newName: newName })
          }
        );
        if (res.ok) {
          window.location.reload()
        }
      }}
    >
      Edit member
    </button>
  );
};
