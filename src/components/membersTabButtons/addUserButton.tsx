import styles from "./styles.module.css";
//Button to add a user to a group

export const AddUserButton = () => {
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

        const res = await fetch("http://localhost:3001/add-member", {
          method: "POST",
          headers: { "content-Type": "application/json" },
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
