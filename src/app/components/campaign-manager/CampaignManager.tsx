"use client";

import { CreateCampaignModal } from "../create-campaign-modal/CreateCampaignModal";
import { CampaignCard } from "../campaign-card/CampaignCard";
import { useState, useEffect } from "react";
import Link from "next/link";

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
    <article>
      <button onClick={() => setIsOpen(true)}>Create Campaign</button>
      <CreateCampaignModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCampaignCreated={handleAddCampaign}
      />
      {campaigns.map((campaign: Campaign) => (
        <Link href={`/campaigns/${campaign._id}`} key={campaign._id}>
        <CampaignCard
          
          name={campaign.name}
          description={campaign.description}
        />
        </Link>
      ))}
    </article>
  );
}
