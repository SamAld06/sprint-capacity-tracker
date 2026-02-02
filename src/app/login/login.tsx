import styles from './styles.module.css'
import { useState } from "react";

export default function Login() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/login", {});

    if (!res.ok) {
      setError(data.error);
    } else {
      localStorage.setItem("webToken", data.webToken);
    }
  };
  return (
    <main className={styles.root}>
      <h1 className={styles.header}>Please login here</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter a username"
          value={currentUsername}
          onChange={(e) => setCurrentUsername(e.target.value)}
        />
        <input
          placeholder="Enter a password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </main>
  );
}
