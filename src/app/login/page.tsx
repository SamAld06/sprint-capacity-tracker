"use client";

import { NavBar } from "../../components/navbar/navBar";
import styles from "./styles.module.css";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "../api/_libs/supabaseclient";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    }
    if (!error) {
      window.location.href = "/";
    }
  };
  return (
    <main className={styles.root}>
      <NavBar />
      <h1 className={styles.header}>Sprint capacity tracker</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p className={styles.formTitle}>Login here</p>
        <input
          className={styles.input}
          placeholder="Enter an email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
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
        <button className={styles.button}>Login</button>
        <div className={styles.createOption}>
          <p>Want to make an account?</p>
          <Link href="/create-account">
            <p className={styles.createRedirect}>Click here</p>
          </Link>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}
