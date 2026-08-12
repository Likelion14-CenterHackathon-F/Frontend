import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

function BottomSheet({
  open,
  title,
  description,
  children,
  footer,
  onClose,
}: BottomSheetProps) {
  const titleId = useId();
  const descriptionId = useId();
  const sheetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    sheetRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 size-full bg-neutral-black/50"
      />

      <section
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[calc(100dvh-env(safe-area-inset-top))] w-full max-w-[430px] flex-col overflow-hidden rounded-t-[30px] bg-surface-footer outline-none"
      >
        <header className="shrink-0 px-5 pt-[34px]">
          <h2
            id={titleId}
            className="text-2xl font-semibold leading-[1.4] tracking-tight text-text-01"
          >
            {title}
          </h2>
          {description && (
            <p
              id={descriptionId}
              className="mt-1.5 text-[16px] leading-[1.4] tracking-tight text-[#646581]"
            >
              {description}
            </p>
          )}
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5">{children}</div>

        {footer && <div className="shrink-0">{footer}</div>}
      </section>
    </div>,
    document.body,
  );
}

export default BottomSheet;
