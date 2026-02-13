import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export interface ViewGroupFormProps {
  onClose: () => void;
}

export const ViewGroupForm = ({ onClose }: ViewGroupFormProps) => {
  const [groupcode, setgroupcode] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      `/api/group/view`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({groupcode, password})
      },
    );
    const data = await res.json();
    if (res.ok) {
      window.location.href = `/group/dashboard?groupcode=${groupcode}`;
    } else {
      setError(data.error || "Group code or password credentials are incorrect")
    }
  };
  return (
    <div className={styles.formRoot}>
      <div className={styles.modal}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.headerWrapper}>
            <p className={styles.formTitle}>View group</p>
            <button type="button" onClick={onClose} className={styles.closeButton}>
              X
            </button>
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
          <button className={styles.button}>View</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};
