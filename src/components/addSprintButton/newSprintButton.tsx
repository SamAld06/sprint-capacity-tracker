import styles from "./styles.module.css"
//Button to create a new sprint row for each user in a specific group
export const NewSprintButton = () => {
  return (
    <button
    className={styles.button}
      onClick={async () => {
        if (!confirm("Are you sure you want to create a new sprint?")) return;

        const res = await fetch(
          "http://localhost:3001/availability/new-sprint",
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
