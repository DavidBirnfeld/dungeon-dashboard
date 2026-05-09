import { useRef, useEffect } from "react";
import styles from "./GenericModal.module.css";

export function GenericModal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
    <dialog className={styles.dialog} ref={dialogRef} onClose={onClose}>
      <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close">
        ✕
      </button>
      {children}
    </dialog>
  );
}