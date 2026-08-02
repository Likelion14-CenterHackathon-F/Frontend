import { type ReactNode, useEffect, useId } from "react";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function BottomSheet({
  open,
  title,
  children,
  onClose,
}: BottomSheetProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <section
        className="
          absolute inset-x-0 bottom-0 mx-auto
          flex max-h-[90dvh] w-full max-w-[430px]
          flex-col rounded-t-3xl bg-white
          shadow-[0_-8px_30px_rgba(0,0,0,0.15)]
        "
      >
        <div className="flex justify-center py-3">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        <header className="flex items-center justify-between px-6 pb-4">
          <h2 id={titleId} className="text-lg font-semibold text-[#1F2937]">
            {title}
          </h2>

          <button
            type="button"
            className="flex size-8 items-center justify-center"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-[calc(24px+env(safe-area-inset-bottom))]">
          {children}
        </div>
      </section>
    </div>,
    document.body,
  );
}
