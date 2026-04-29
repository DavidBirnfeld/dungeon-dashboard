import { useRef, useEffect } from "react";
export function CreateCampaignModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
        if (isOpen && !dialogRef.current.open) {
            dialogRef.current.showModal()
        } else {
            dialogRef.current.close()
        }
    }
  }, [isOpen]);
  return (
    <dialog ref={dialogRef} onClose={() => onClose()}>
      <button type="button" onClick={() => onClose()}>
        X
      </button>
      <form action="">
        <label htmlFor="campaign-name">Campaign Name:</label>
        <input type="text" id="campaign-name" />

        <label htmlFor="campaign-description">Description</label>
        <input type="text" id="campaign-description" />
      </form>
    </dialog>
  );
}
