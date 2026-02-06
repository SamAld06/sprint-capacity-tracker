"use client"

import Link from 'next/link';
import { NavBar } from '../../components/navbar/navBar';
import styles from './styles.module.css'
import { useState } from "react";

export default function CreateAccount() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/account/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: currentUsername, password: currentPassword})
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      localStorage.setItem("webToken", data.webToken);
      setSuccessMessage(true)
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
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
        <div className={styles.loginOption}>
          <p>Already have an account?</p>
          <Link href='/login'>
          <p className={styles.loginRedirect}>Click here</p>
          </Link>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      {successMessage && 
      <div className={styles.backdrop}>
        <div className={styles.container}>
          <p className={styles.success}>Account successfully created</p>
          <p className={styles.success}>Redirecting to login</p>
        </div>
      </div>
      }
    </main>
  );
}
