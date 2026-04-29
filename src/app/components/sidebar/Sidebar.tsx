"use client";

import { Settings, LogOut } from "lucide-react";
import styles from "./Sidebar.module.css";
import { signOut } from "next-auth/react";

interface SidebarProps {
  userName?: string;
  userImage?: string;
  onSettingsClick?: () => void;
}

export default function Sidebar({
  userName = "User",
  userImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  onSettingsClick,
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
        <button
          className={styles.menuItem}
          onClick={onSettingsClick}
          title="Account Settings"
        >
          <Settings className={styles.icon} />
          <span className={styles.menuText}>Settings</span>
        </button>
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
