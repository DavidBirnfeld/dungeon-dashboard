"use client";

import { CreateCampaignModal } from "../create-campaign-modal/CreateCampaignModal";
import { CampaignCard } from "../campaign-card/CampaignCard";
import { useState, useEffect } from "react";
import Link from "next/link";
// 1. Import the CSS module
import styles from "./CampaignManager.module.css"; 

export interface Campaign {
  _id: string;
  name: string;
  description: string;
}

export function CampaignManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const handleAddCampaign = (newCampaign: Campaign) => {
    setCampaigns([...campaigns, newCampaign]);
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await fetch("/api/campaigns", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    // 2. Wrap the whole component in the container style
    <div className={styles.container}>
      
      {/* 3. Wrap your mapped cards in the responsive grid */}
      <section className={styles.grid}>
        {campaigns.map((campaign: Campaign) => (
          <Link 
            href={`/campaigns/${campaign._id}`} 
            key={campaign._id}
            className={styles.cardLink} // Applied link styling
          >
            <CampaignCard
              name={campaign.name}
              description={campaign.description}
            />
          </Link>
        ))}
      </section>

      {/* 4. Wrap the button in its container and apply the button styles */}
      <div className={styles.buttonContainer}>
        <button 
          onClick={() => setIsOpen(true)} 
          className={styles.createButton}
        >
          + Create Campaign
        </button>
      </div>

      <CreateCampaignModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCampaignCreated={handleAddCampaign}
      />
    </div>
  );
}