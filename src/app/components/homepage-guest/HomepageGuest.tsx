"use client";

import { signIn } from "next-auth/react";
import styles from "./HomepageGuest.module.css";

export default function HomepageGuest() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome to Dungeon Dashboard</h2>
      <p className={styles.description}>
        Your ultimate DM Command Center. Please log in to manage your campaigns, encounters, and players.
      </p>

      <button className={styles.loginButton} onClick={() => signIn()}>
        Enter the Dungeon
      </button>
    </div>
  );
}