import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

interface ConsultationEndModalProps {
  open: boolean;
  ending: boolean;
  onContinue: () => void;
  onConfirm: () => void | Promise<void>;
}

function ConsultationEndModal({
  open,
  ending,
  onContinue,
  onConfirm,
}: ConsultationEndModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !ending) onContinue();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [ending, onContinue, open]);

  if (!open) return null;

  return createPortal(
    <div
      onClick={(event) => event.stopPropagation()}
      className="fixed inset-0 z-50 grid place-items-center bg-black/37 px-5 backdrop-blur-[2px]"
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        aria-busy={ending}
        tabIndex={-1}
        className="min-h-[165px] w-full max-w-[320px] rounded-[28px] bg-[rgba(68,68,68,0.8)] px-4 py-5 text-center text-white shadow-xl backdrop-blur-[5px] outline-none"
      >
        {ending ? (
          <div className="flex min-h-[125px] flex-col items-center justify-center" aria-live="polite">
            <div aria-hidden="true" className="mb-4 flex items-center gap-1.5">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className="size-2 animate-bounce rounded-full bg-white/90 motion-reduce:animate-pulse"
                  style={{ animationDelay: `${index * 120}ms` }}
                />
              ))}
            </div>
            <h2
              id={titleId}
              className="text-lg font-semibold leading-[1.4] tracking-[-0.45px]"
            >
              AI 상담 요약 중입니다
            </h2>
            <p
              id={descriptionId}
              className="mt-1 text-sm leading-[1.4] tracking-[-0.35px] text-white/80"
            >
              통화가 종료될 때까지 잠시만 기다려주세요.
            </p>
          </div>
        ) : (
          <>
            <h2
              id={titleId}
              className="text-lg font-semibold leading-[1.4] tracking-[-0.45px]"
            >
              상담을 종료하시겠습니까?
            </h2>
            <p
              id={descriptionId}
              className="mt-0.5 text-sm leading-[1.25] tracking-[-0.35px]"
            >
              종료 후 상담 요약이 케이스에 저장됩니다.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onContinue}
                className="h-[52px] rounded-[30px] bg-[#D8D8D8] text-base font-medium tracking-[-0.4px] text-[#414141]"
              >
                계속 상담
              </button>
              <button
                type="button"
                onClick={() => void onConfirm()}
                className="h-[52px] rounded-[30px] bg-[#DB4036] text-base font-semibold tracking-[-0.4px] text-white"
              >
                통화 종료
              </button>
            </div>
          </>
        )}
      </section>
    </div>,
    document.body,
  );
}

export default ConsultationEndModal;
