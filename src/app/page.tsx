"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import { NavBar } from "../components/navbar/navBar";
import { useState } from "react";

export default function Home() {
  const [groupcode, setgroupcode] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupcode || !password) {
      setError("All fields are required");
      return;
    }
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
      <h1 className={styles.header}>Welcome to the sprint capacity wizard</h1>
      <p className={styles.description}>
        A tool to track sprint capacity as accuratley as possible
      </p>
      <div className={styles.navigation}>
        <Link href="/create-account">
          <button className={styles.button}>Create account</button>
        </Link>
        <Link href="/login">
          <button className={styles.button}>Login</button>
        </Link>
        <button className={styles.button} onClick={() => setIsOpen(true)}>
          View group
        </button>
      </div>
      {isOpen && (
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
      )}
    </main>
  );
}
