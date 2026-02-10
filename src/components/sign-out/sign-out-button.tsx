import { useState } from "react";
import { supabase } from "../../app/api/_libs/supabaseclient";
import styles from "./styles.module.css";


export const SignOutButton = () => {
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    const { error } = await supabase.auth.signOut();
    if (!confirm(`Are you sure you want to sign out?`)) return;
    if (error) {
      setError(error.message || "An error occured");
    }
    if (!error) {
      window.location.href = "/"
    }
  };
  return (
    <>
      <button className={styles.button} onClick={handleSubmit}>
        Sign out
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};
