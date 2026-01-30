import styles from "./styles.module.css"
//Button to add a user to a group


export const RemoveUserButton = ({member}: {member: string}) => {
  return (
    <button
    className={styles.button}
      onClick={async () => {
        if (!confirm(`Are you sure you want to add this team memberP:  ${member}\n\nThey will appear in the next created sprint`)) return;

        const res = await fetch(
          "http://localhost:3001/remove-member",
          {
            method: "DELETE",
            headers: { "content-Type": "application/json"},
            body: JSON.stringify({name: member})
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
