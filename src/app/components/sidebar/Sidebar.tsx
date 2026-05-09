"use client";

import { Home, LogOut } from "lucide-react";
import styles from "./Sidebar.module.css";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface SidebarProps {
  userName?: string;
  userImage?: string;
  onHomeClick?: () => void;
}

export default function Sidebar({
  userName = "User",
  userImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  onHomeClick,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      {/* Profile Section */}
      <div className={styles.profileSection}>
        <div className={styles.profileImageWrapper}>
          <img src={userImage} alt={userName} className={styles.profileImage} />
        </div>
        <div className={styles.profileName}>{userName}</div>
      </div>

      {/* Menu Section */}
      <div className={styles.menuSection}>
        <Link
          href="/"
          className={styles.menuItem}
          onClick={onHomeClick}
          title="Home"
        >
          <Home className={styles.icon} />
          <span className={styles.menuText}>Home</span>
        </Link>
      </div>

      {/* Sign Out Section */}
      <div className={styles.signoutSection}>
        <button
          className={styles.signoutButton}
          onClick={() => signOut()}
          title="Sign Out"
        >
          <LogOut className={styles.signoutIcon} />
          <span className={styles.signoutText}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
