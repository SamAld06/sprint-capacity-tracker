import { useEffect, useState } from "react";
import styles from "./styles.module.css";
//Button to remove a user from a group

export const RemoveUserButton = ({ member }: { member: string }) => {
  const [err, setErr] = useState("");
  const [groupcode, setgroupcode] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const groupcode = params.get("groupcode");
    if (!groupcode) {
      setErr("No group code could be retrieved");
      return;
    }
    setgroupcode(groupcode);
  });
  return (
    <button
      className={styles.button}
      onClick={async () => {
        if (
          !confirm(
            `Are you sure you want to remove this team member: ${member}\n\nThey will no longer be in future sprints`,
          )
        )
          return;

        const res = await fetch(
          `/api/group/group-members?groupcode=${groupcode}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: member }),
          },
        );
        if (res.ok) {
          window.location.reload();
        }
      }}
    >
      Remove
    </button>
  );
};
