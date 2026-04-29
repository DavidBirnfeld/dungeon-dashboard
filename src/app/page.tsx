import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import HomepageGuest from "./components/homepage-guest/HomepageGuest";
import { CampaignManager } from "./components/campaign-manager/CampaignManager";


export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Dungeon Dashboard</h1>
      <CampaignManager />
      {session ? (
        <div>
          <h2>Welcome back, {session.user?.name}!</h2>
          <p>Logged in as: {session.user?.email}</p>
          <img 
            src={session.user?.image || ""} 
            alt="Profile" 
          />
        </div>
      ) : (
        <HomepageGuest />
      )}
    </main>
  );
}