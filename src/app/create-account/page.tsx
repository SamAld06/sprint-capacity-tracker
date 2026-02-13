"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import { useState } from "react";
import { supabase } from "../api/_libs/supabaseclient";
import NavBar from "../../components/navbar/navBar";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (confirmPassword != password) {
      setError("The passwords do not match");
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError("Unable to create an account, please try again!");
    } else {
      setSuccessMessage(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 4000);
    }
  };
  return (
    <main className={styles.root}>
      <NavBar />
      <h1 className={styles.header}>Sprint capacity tracker</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p className={styles.formTitle}>Create an account</p>
        <div>
          <input
            className={styles.input}
            placeholder="Enter an email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            className={styles.input}
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.showPassword}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className={styles.passwordWrapper}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.showPassword}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button className={styles.button}>Create account</button>
        <div className={styles.loginOption}>
          <p>Already have an account?</p>
          <Link href="/login">
            <p className={styles.loginRedirect}>Click here</p>
          </Link>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      {successMessage && (
        <div className={styles.backdrop}>
          <div className={styles.container}>
            <p className={styles.success}>
              Please check your email for confirmation
            </p>
            <p className={styles.success}>Redirecting to login</p>
          </div>
        </div>
      )}
    </main>
  );
}
