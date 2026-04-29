"use client";

import { CreateCampaignModal } from "../create-campaign-modal/CreateCampaignModal";
import { useState } from "react";

export function CampaignManager() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <article>
      <button onClick={() => setIsOpen(true)}>Create Campaign</button>
      <CreateCampaignModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </article>
  );
}
