import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export interface ViewGroupFormProps {
  onClose: () => void;
  onSubmit: (data: sprint) => void;
}

export const ViewGroupForm = ({
  onClose,
  onSubmit,
}: ViewGroupFormProps) => {
  const [groupcode, setgroupcode] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    const payload = {
      groupcode: groupcode,
      sprintid: Number(currentSprint),
      planned: Number(workPlanned),
      added: Number(workAdded),
      removed: Number(workRemoved),
      totalcompleted: Number(workCompleted),
      totalmd: Number(totalMd),
      plannedcompleteddifference: getSprintCompletionDifference(Number(workCompleted), Number(workPlanned))
    };
    e.preventDefault();
    if (
      currentSprint == null ||
      workPlanned == null ||
      workAdded == null ||
      workRemoved == null ||
      workCompleted == null ||
      totalMd == null ||
      completionDifference == null 
    ) {
      alert("All fields must be filled");
      return;
    }
    await onSubmit(payload);
  };
return (
    <div className={styles.formRoot}>
          <div className={styles.modal}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.headerWrapper}>
            <p className={styles.formTitle}>View group</p>
          </div>
          <div className={styles.inputsWrapper}>
            <input
              className={styles.input}
              placeholder="Enter a group code"
              value={groupcode}
              onChange={(e) => setgroupcode(e.target.value)}
            />
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.showPassword}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button className={styles.button}>Login</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        </div>
        </div>
)
}