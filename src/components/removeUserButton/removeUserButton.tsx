import styles from "./styles.module.css"
//Button to remove a user from a group


export const RemoveUserButton = ({member}: {member: string}) => {
  return (
    <button
    className={styles.button}
      onClick={async () => {
        if (!confirm("Are you sure you want to remove this team member: ${member}\n\nThey will no longer be in future sprints")) return;

        const res = await fetch(
          "http://localhost:3001/remove-member",
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          window.location.reload()
        }
      }}
    >
      Remove
    </button>
  );
};
