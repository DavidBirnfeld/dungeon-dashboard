import { useRef, useEffect } from "react";

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
      {children}
    </dialog>
  );
}
