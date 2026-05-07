import { useRef, useEffect, useState } from "react";
import { Campaign } from "../campaign-manager/CampaignManager";

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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
      console.log(responseData);
      onClose();
    } else {
      console.log(responseData);
    }
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen && !dialogRef.current.open) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);
  return (
    <dialog ref={dialogRef} onClose={onClose}>
      <button type="button" onClick={onClose}>
        X
      </button>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="campaign-name">Campaign Name:</label>
        <input
          type="text"
          id="campaign-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="campaign-description">Description</label>
        <input
          type="text"
          id="campaign-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </dialog>
  );
}
