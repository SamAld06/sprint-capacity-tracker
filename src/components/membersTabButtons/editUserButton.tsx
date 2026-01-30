import styles from "./styles.module.css"
//Button to remove a user from a group


export const EditUserButton = ({member}: {member: string}) => {
  console.log(member)
  const groupCode = 't3stGr0up1'
  return (
    <button
    className={styles.button}
      onClick={async () => {
        const newName = prompt(`You are editing the name of ${member}. Please enter new name:`);
        if (!newName) return;

        const res = await fetch(
          "http://localhost:3001/edit-member",
          {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({currentName: member, groupCode: groupCode, newName: newName })
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
