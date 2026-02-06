"use client"

import { NavBar } from '../../components/navbar/navBar';
import styles from './styles.module.css'
import { useState } from "react";
import Link from 'next/link';
import { CreateSuperbaseBrowserClient } from '../../lib/supabase/browser';

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const supabase = CreateSuperbaseBrowserClient()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(email, password)
    const { error }= await supabase.auth.signInWithPassword({email, password})
    console.log(error)
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
        <input
          className={styles.input}
          placeholder="Enter a password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
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
