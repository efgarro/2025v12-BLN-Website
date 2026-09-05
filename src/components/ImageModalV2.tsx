import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function CustomModal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // openModal() handles focus trapping & browser backdrop semantics natively
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Handle ESC key press close requests organically
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      className="backdrop:bg-black/50 backdrop:backdrop-blur-sm rounded-xl p-6 shadow-2xl max-w-md w-full bg-white open:flex open:flex-col animate-in fade-in zoom-in-95 duration-200 outline-none"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-sm font-medium p-1 rounded-md hover:bg-gray-100 transition"
        >
          ✕
        </button>
      </div>
      <div className="text-sm text-gray-600">{children}</div>
    </dialog>
  );
}
