import styles from "./styles.module.css"
//Button to remove a user from a group


export const ChangeGroupPasswordButton = () => {
  return (
    <button
    className={styles.button}
      onClick={async () => {

        const res = await fetch(
          "http://localhost:3000/api/group/settings/change-group-password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({currentPassword: password, groupCode: groupCode, newPassword: newPassword, userEmail: userEmail })
          }
        );
        if (res.ok) {
          window.location.reload()
        }
      }}
    >
      Change group password
    </button>
  );
};