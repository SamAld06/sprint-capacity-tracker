import styles from "./styles.module.css";

export interface ChangeGroupNameButtonProps {
  groupcode: string;
  userEmail: string;
}

export const ChangeGroupNameButton = ({
  groupcode,
  userEmail,
}: ChangeGroupNameButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={async () => {
        const newName = prompt("New group name:");
        if (!newName) return;

        if (
          !confirm(
            `Are you sure you want to change the group name to: ${newName}\n\n?`,
          )
        )
          return;

        const res = await fetch(
          "http://localhost:3000/api/group/settings/change-group-name",
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: newName,
              groupcode: groupcode,
              userEmail,
            }),
          },
        );
        if (res.ok) {
          window.location.reload();
        }
      }}
    >
      Change group name
    </button>
  );
};
