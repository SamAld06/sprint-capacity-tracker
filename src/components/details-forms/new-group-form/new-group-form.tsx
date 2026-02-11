import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { NewGroup } from "../../../types/newGroup";
import { supabase } from "../../../app/api/_libs/supabaseclient";
import { generateGroupCode } from "../../../helpers/generateGroupCode";

export interface SprintProgressFormProps {
  onClose: () => void;
  onSubmit: (data: NewGroup) => void;
}

export const NewGroupForm = ({
  onClose,
  onSubmit,
}: SprintProgressFormProps) => {
  const currentGroup = "t3stGr0up1";
  const [currentGroupName, setCurrentGroupName] = useState<string>("");
  const [currentCreator, setCurrentCreator] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (error || !user?.email) {
        console.error("Supabase get user error:", error);
      } else {
        setCurrentCreator(user?.email);
      }
    };
    fetchUser();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    const payload = {
      groupname: currentGroupName,
      creator: currentCreator,
      password: password,
    };
    e.preventDefault();
    if (
      currentGroupName == null ||
      currentCreator == null ||
      password == null 
    ) {
      alert("All fields must be filled");
      return;
    }
    if (confirmPassword != password) {
        alert("Passwords must match")
    }
    console.log('payload here', payload)
    await onSubmit(payload);
  };

  return (
    <div className={styles.root}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <div className={styles.inputRow}>
              <label>Group name</label>
              <input
                className={styles.inputBox}
                type="text"
                value={currentGroupName}
                onChange={(e) => setCurrentGroupName(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputRow}>
              <label>Group password</label>
              <input
                className={styles.inputBox}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputRow}>
              <label>Confirm group password</label>
              <input
                className={styles.inputBox}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
          </div>
          <button type="submit" disabled={false} className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};