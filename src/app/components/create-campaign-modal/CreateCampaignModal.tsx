"use client";

import { useRef, useEffect, useState } from "react";
import { Campaign } from "../campaign-manager/CampaignManager";
import { X } from "lucide-react";
import styles from "./CreateCampaignModal.module.css";

export function CreateCampaignModal({
  isOpen,
  onClose,
  onCampaignCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated: (data: Campaign) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Clear form state when closing
  const handleClose = () => {
    setName("");
    setDescription("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = JSON.stringify({ name, description });
    
    const response = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    
    const responseData = await response.json();
    
    if (response.ok) {
      onCampaignCreated(responseData);
      handleClose();
    } else {
      console.error(responseData);
    }
  };

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen && !dialogRef.current.open) {
        dialogRef.current.showModal();
      } else if (!isOpen && dialogRef.current.open) {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} onClose={handleClose} className={styles.modal}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create New Campaign</h2>
        <button type="button" onClick={handleClose} className={styles.closeIconButton}>
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="campaign-name" className={styles.label}>
            Campaign Name
          </label>
          <input
            type="text"
            id="campaign-name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Curse of Strahd"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="campaign-description" className={styles.label}>
            Description
          </label>
          <textarea
            id="campaign-description"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe your world..."
            rows={4}
            required
          />
        </div>

        <div className={styles.footer}>
          <button type="button" onClick={handleClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={styles.submitButton}>
            Create
          </button>
        </div>
      </form>
    </dialog>
  );
}