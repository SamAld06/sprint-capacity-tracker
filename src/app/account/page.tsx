"use client";

import { NavBar } from "../../components/navbar/NavBar";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { SignOutButton } from "../../components/sign-out/sign-out-button";
import { supabase } from "../api/_libs/supabaseclient";

export default function Account() {
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<string | undefined>("")
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id)
      if (error) {
        console.error("Supabase get user error:", error);
      } else {
        setUser(user);
      }
    };
    fetchUser();
  }, []);
    return (
      <main className={styles.root}>
        <NavBar />
        <h1 className={styles.header}>Account</h1>
        <div className={styles.info}>
            <p>Account email: {user?.email}</p>
            <SignOutButton />
            {error && <p className={styles.error}>{error}</p>}
        </div>
      </main>
    );
  };

