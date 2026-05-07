"use client";

import { Campaign } from "@/app/campaigns/[campaignId]/page";
import styles from "./CampaignEditor.module.css";
import { useState } from "react";
import { GenericModal } from "../generic-modal/GenericModal";

export function CampaignEditor({ campaign }: { campaign: Campaign }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<string[]>(campaign.notes|| []);
  const [draftNote, setDraftNote] = useState("");

  async function handleSaveNote() {
    // 1. Calculate the new array first!
    const updatedNotes = [...notes, draftNote];

    // 2. Update the React UI so the modal closes and the text appears instantly
    setNotes(updatedNotes);
    setDraftNote("");
    setIsOpen(false);

    // 3. Send the background request to MongoDB
    try {
      const response = await fetch(`/api/campaigns/${campaign._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: updatedNotes }), // <-- The Payload!
      });

      if (!response.ok) {
        console.error("Failed to save to database!");
        // (Advanced: If it fails, you would ideally revert the state here!)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>{campaign.name}</h1>
      <article>
        <h1>Notes:</h1>
        {notes.map((note, index) => (
          <p key={index}>{note}</p>
        ))}
        <button onClick={() => setIsOpen(true)}>+</button>
      </article>

      <GenericModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <textarea
          onChange={(e) => setDraftNote(e.target.value)}
          value={draftNote}
          placeholder="Add your notes here..."
          rows={10}
          cols={50}
        />{" "}
        <button
          onClick={() => {
            handleSaveNote();
          }}
        >
          save
        </button>
      </GenericModal>
    </div>
  );
}
