"use client";

import styles from "./styles.module.css";
import { useState } from "react";
import { ViewGroupForm } from "../components/view-group-form/viewGroupForm";
import Link from "next/link";
import NavBar from "../components/nav-bar/navBar";

export default function Home() {
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
        <ViewGroupForm
          onClose={() => setIsOpen(false)}
        />
      )}
    </main>
  );
}
