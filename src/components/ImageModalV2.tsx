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
  console.log(imageModalWidth);
  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      style={{ width: `${imageModalWidth}px` }}
      // className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4"
      className={`m-auto backdrop:bg-black/50 backdrop:backdrop-blur-sm rounded-sm p-1 shadow-2xl open:flex open:flex-col animate-in fade-in zoom-in-95 duration-200 outline-none`}
      // className={`w-[${imageModalWidth * 0.25}rem]`}
    >
      {/* <div className="flex items-center justify-between mb-4"> */}
        {/* close button */}
        <button
          // ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 touch-manipulation"
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
        {/* <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-sm font-medium p-1 rounded-md hover:bg-gray-100 transition"
          >
            ✕
          </button> */}
      {/* </div> */}
      <div className="text-sm text-gray-600">{children}</div>
      {/* footer/caption centered at the bottom */}
      {footer && (
        // <div>footer</div>
        <div className="w-full border-t bg-white/90 px-4 py-2 text-center text-sm text-gray-700">
          {footer}
        </div>
      )}
    </dialog>
  );
}
