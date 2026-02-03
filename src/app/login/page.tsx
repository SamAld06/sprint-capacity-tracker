"use client"

import styles from './styles.module.css'
import { useState } from "react";

export default function Login() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/login", {});
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      localStorage.setItem("webToken", data.webToken);
    }
  };
  return (
    <main className={styles.root}>
      <h1 className={styles.header}>Sprint capacity tracker</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p className={styles.formTitle}>Login here</p>
        <input
          className={styles.input}
          placeholder="Enter a username"
          value={currentUsername}
          onChange={(e) => setCurrentUsername(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Enter a password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <button className={styles.button}>Login</button>
      </form>
    </main>
  );
}
