import { useEffect, useRef } from "react";
import { useImageModalWidth, Orientation } from "~/hooks/useImageModalWidth";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  screenWidth: number;
  orientation: Orientation;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function CustomModal({
  isOpen,
  onClose,
  screenWidth,
  orientation,
  footer,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageModalWidth = useImageModalWidth(screenWidth, orientation);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // showModal() provides the native modal backdrop and focus behavior.
      dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    // Keep the page behind the modal from scrolling. Lock both the document
    // and body because browsers differ in which element owns the scrollbar.
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousDocumentOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isOpen]);

  // Handle ESC key press close requests organically.
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  // A click whose target is the dialog itself landed outside its content.
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleDialogClick}
      style={{ width: `${imageModalWidth}px` }}
      className="m-auto backdrop:bg-black/50 backdrop:backdrop-blur-sm rounded-sm p-1 shadow-2xl open:flex open:flex-col animate-in fade-in zoom-in-95 duration-200 outline-none"
    >
      {/* close button */}
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-gray-700 hover:bg-white focus:outline-none focus:ring-2 touch-manipulation"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="text-sm text-gray-600">{children}</div>
      {/* footer/caption centered at the bottom */}
      {footer && (
        <div className="w-full border-t bg-white/90 px-4 py-2 text-center text-sm text-gray-700">
          {footer}
        </div>
      )}
    </dialog>
  );
}
