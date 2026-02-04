"use client"

import { NavBar } from '../../components/navbar/navBar';
import styles from './styles.module.css'
import { useState } from "react";

export default function CreateAccount() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(currentUsername, currentPassword)
    const res = await fetch("http://localhost:3001/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: currentUsername, password: currentPassword})
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      localStorage.setItem("webToken", data.webToken);
    }
  };
  return (
    <main className={styles.root}>
    <NavBar/>
      <h1 className={styles.header}>Sprint capacity tracker</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p className={styles.formTitle}>Create an account</p>
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
        <button className={styles.button}>Create account</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}
