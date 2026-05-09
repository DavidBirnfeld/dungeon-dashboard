"use client";

import { Campaign, Character } from "@/app/campaigns/[campaignId]/page";
import styles from "./CampaignEditor.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GenericModal } from "../generic-modal/GenericModal";
import { PartyModal } from "../party-modal/PartyModal";
import { PartyDashboardModal } from "../party-dashboard-modal/PartyDashboardModal";

export function CampaignEditor({ campaign }: { campaign: Campaign }) {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<"note" | "quest" | null>(null);
  const [isPartyModalOpen, setIsPartyModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [notes, setNotes] = useState<string[]>(campaign.notes || []);
  const [draftNote, setDraftNote] = useState("");
  const [quests, setQuests] = useState<string[]>(campaign.quests || []);
  const [draftQuest, setDraftQuest] = useState("");
  const [party, setParty] = useState<Character[]>(campaign.party || []);

  async function handleSaveQuest() {
    const updatedQuests = [...quests, draftQuest];
    setQuests(updatedQuests);
    setDraftQuest("");
    setActiveModal(null);

    try {
      const response = await fetch(`/api/campaigns/${campaign._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quests: updatedQuests }),
      });

      if (!response.ok) {
        console.error("Failed to save to database!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSaveNote() {
    const updatedNotes = [...notes, draftNote];
    setNotes(updatedNotes);
    setDraftNote("");
    setActiveModal(null);

    try {
      const response = await fetch(`/api/campaigns/${campaign._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: updatedNotes }),
      });

      if (!response.ok) {
        console.error("Failed to save to database!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSaveCharacter(newChar: Character) {
    const updatedParty = [...party, newChar];
    setParty(updatedParty);
    try {
      await fetch(`/api/campaigns/${campaign._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ party: updatedParty }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateParty(updatedParty: Character[]) {
    setParty(updatedParty);
    try {
      await fetch(`/api/campaigns/${campaign._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ party: updatedParty }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteCampaign() {
    if (!window.confirm("Are you sure you want to delete this campaign? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/campaigns/${campaign._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to delete campaign");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{campaign.name}</h1>
        <button className={styles.dangerButton} onClick={handleDeleteCampaign}>
          Delete Campaign
        </button>
      </div>

      <div className={styles.contentGrid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Notes</h2>
          {notes.map((note, i) => (
            <p key={i} className={`${styles.item} ${styles.noteItem}`}>
              {note}
              <button
                className={styles.deleteButton}
                onClick={async () => {
                  // 1. Filter out the clicked item
                  const updatedNotes = notes.filter((_, index) => index !== i);
                  // 2. Update the UI instantly
                  setNotes(updatedNotes);
                  // 3. Use your existing PATCH logic to save the new array
                  await fetch(`/api/campaigns/${campaign._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ notes: updatedNotes }),
                  });
                }}
                aria-label="Delete note"
              >
                ✕
              </button>
            </p>
          ))}
          <button
            className={styles.addButton}
            onClick={() => setActiveModal("note")}
          >
            + Add Note
          </button>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Quests</h2>
          {quests.map((quest, i) => (
            <p key={i} className={styles.item}>
              {quest}
              <button
                className={styles.deleteButton}
                onClick={async () => {
                  // 1. Filter out the clicked item
                  const updatedQuests = quests.filter((_, index) => index !== i);
                  // 2. Update the UI instantly
                  setQuests(updatedQuests);
                  // 3. Use your existing PATCH logic to save the new array
                  await fetch(`/api/campaigns/${campaign._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quests: updatedQuests }),
                  });
                }}
                aria-label="Delete quest"
              >
                ✕
              </button>
            </p>
          ))}
          <button
            className={styles.addButton}
            onClick={() => setActiveModal("quest")}
          >
            + Add Quest
          </button>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Party</h2>
            <button className={styles.dashboardButton} onClick={() => setIsDashboardOpen(true)}>
              Dashboard
            </button>
          </div>
          {party.map((char, i) => (
            <div key={i} className={`${styles.item} ${styles.partyItem}`}>
              <div className={styles.itemText}>
                <strong>{char.name}</strong>
                <div className={styles.charMeta}>
                  <strong className={styles.hpDisplay}>HP: {char.hp}</strong> —{" "}
                  {Object.entries(char.stats).map(([k, v]) => `${k.substring(0, 1).toUpperCase()}:${v}`).join(" ")}
                </div>
              </div>
              <button
                className={styles.deleteButton}
                onClick={async () => {
                  if (
                    !window.confirm(
                      `Are you sure you want to remove ${char.name} from the party?`
                    )
                  )
                    return;
                  const updatedParty = party.filter((_, index) => index !== i);
                  setParty(updatedParty);
                  await fetch(`/api/campaigns/${campaign._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ party: updatedParty }),
                  });
                }}
                aria-label="Remove character"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            className={styles.addButton}
            onClick={() => setIsPartyModalOpen(true)}
          >
            + Add Character
          </button>
        </section>
      </div>

      <GenericModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
      >
        <div className={styles.modalForm}>
          <h2 className={styles.sectionTitle}>
            {activeModal === "note" ? "New Note" : "New Quest"}
          </h2>
          <textarea
            className={styles.textarea}
            onChange={(e) =>
              activeModal === "note"
                ? setDraftNote(e.target.value)
                : setDraftQuest(e.target.value)
            }
            value={activeModal === "note" ? draftNote : draftQuest}
            placeholder={
              activeModal === "note"
                ? "Add your notes here..."
                : "Describe the new quest..."
            }
          />
          <button
            className={styles.saveButton}
            onClick={activeModal === "note" ? handleSaveNote : handleSaveQuest}
          >
            Save {activeModal === "note" ? "Note" : "Quest"}
          </button>
        </div>
      </GenericModal>

      <PartyModal 
        isOpen={isPartyModalOpen} 
        onClose={() => setIsPartyModalOpen(false)} 
        onSave={handleSaveCharacter}
      />

      <PartyDashboardModal
        isOpen={isDashboardOpen}
        party={party}
        onClose={() => setIsDashboardOpen(false)}
        onUpdate={handleUpdateParty}
      />
    </div>
  );
}
