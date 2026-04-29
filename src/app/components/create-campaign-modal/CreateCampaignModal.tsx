import { useRef, useEffect, useState } from "react";

export function CreateCampaignModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted!");
    onClose();
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
