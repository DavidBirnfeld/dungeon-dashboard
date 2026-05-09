import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import HomepageGuest from "./components/homepage-guest/HomepageGuest";
import { CampaignManager } from "./components/campaign-manager/CampaignManager";
import styles from "./page.module.css";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className={styles.main}>
      {session ? (
        <div className={styles.dashboardContainer}>
          <header className={styles.header}>
            <h1 className={styles.title}>Dungeon Dashboard</h1>
          </header>
          
          <section className={styles.content}>
            <CampaignManager />
          </section>
        </div>
      ) : (
        <div className={styles.guestContainer}>
          <HomepageGuest />
        </div>
      )}
    </main>
  );
}