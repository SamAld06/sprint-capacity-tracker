import styles from "./styles.module.css"

export interface ChangeGroupPasswordButtonProps {
  groupcode: string;
  userEmail: string;
}

export const ChangeGroupPasswordButton = ({
  groupcode,
  userEmail,
}: ChangeGroupPasswordButtonProps) => {
  return (
    <button
    className={styles.button}
      onClick={async () => {
        const currentPassword = prompt("Enter current password:");
        if (!currentPassword) return;

        const newPassword = prompt("Enter new password:");
        if (!newPassword) return;

        const res = await fetch(
          "/api/group/settings/change-group-password",
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({currentPassword: currentPassword, groupcode: groupcode, newPassword: newPassword, userEmail: userEmail })
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