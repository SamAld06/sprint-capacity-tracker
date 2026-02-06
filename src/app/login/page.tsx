"use client"

import { navigate } from 'next/dist/client/components/segment-cache/navigation';
import { NavBar } from '../../components/navbar/navBar';
import styles from './styles.module.css'
import { useState } from "react";
import Link from 'next/link';

export default function Login() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: currentUsername, password: currentPassword})
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      localStorage.setItem("webToken", data.webToken);
      window.location.href = "/groupBoard"
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
        <div className={styles.createOption}>
          <p>Want to make an account?</p>
          <Link href='/create-account'>
          <p className={styles.createRedirect}>Click here</p>
          </Link>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}
