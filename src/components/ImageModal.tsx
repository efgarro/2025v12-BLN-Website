import React, { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode; // caption or controls shown at the bottom, centered
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const scrollYRef = useRef<number>(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus the close button when modal opens
    closeBtnRef.current?.focus();

    // Close on Escape
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // Lock background scroll in a way that works on iOS:
    scrollYRef.current = window.scrollY || window.pageYOffset;
    const prevStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    };
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.removeEventListener("keydown", onKey);
      // restore body scroll
      document.body.style.position = prevStyle.position;
      document.body.style.top = prevStyle.top;
      document.body.style.left = prevStyle.left;
      document.body.style.right = prevStyle.right;
      document.body.style.width = prevStyle.width;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Backdrop click (works for touch and mouse)
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Simple vertical swipe-to-close support (downwards swipe)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    // no-op: we only need start/finish to compute delta
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = Math.abs(t.clientX - start.x);
    const dy = t.clientY - start.y; // positive when swiping down
    // if mostly vertical and enough distance, close
    if (dy > 80 && dy > dx) {
      onClose();
    }
    touchStartRef.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4"
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className="relative w-full max-w-[98vw] max-h-[95vh] bg-white rounded overflow-hidden shadow-xl"
        // allow inner scrolling on iOS with momentum
        style={{ WebkitOverflowScrolling: "touch" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Close button (top-right) */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content area: scrollable if it overflows */}
        <div className="flex flex-col items-center justify-center w-full max-h-[calc(95vh-48px)] overflow-auto p-2 sm:p-4">
          {title && (
            <h2 id="modal-title" className="sr-only sm:not-sr-only mb-2 text-center text-lg font-semibold text-gray-900">
              {title}
            </h2>
          )}
          <div className="w-full flex items-center justify-center">{children}</div>
        </div>

        {/* Footer / caption area fixed to bottom inside modal */}
        {footer && (
          <div className="w-full border-t bg-white/90 px-4 py-2 text-center text-sm text-gray-700">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;