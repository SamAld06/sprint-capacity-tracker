import styles from "./styles.module.css"
//Button to remove a user from a group


export const RemoveUserButton = ({member}: {member: string}) => {
  const groupCode = 't3stGr0up1'
  return (
    <button
    className={styles.button}
      onClick={async () => {
        if (!confirm(`Are you sure you want to remove this team member: ${member}\n\nThey will no longer be in future sprints`)) return;

        const res = await fetch(
          "http://localhost:3000/api/group/remove-member",
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({name: member, groupCode: groupCode })
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
