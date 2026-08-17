import { useEffect, useRef, type FormEvent } from "react";

import AttachButton from "@/components/AttachButton/AttachButton";
import { cn } from "@/utils/cn";

interface ChatComposerProps {
  value: string;
  placeholder: string;
  attachLabel: string;
  cameraLabel: string;
  photoLabel: string;
  sendLabel: string;
  stopLabel: string;
  imagePreview?: string | null;
  variant?: "chat" | "home";
  /** 답변을 기다리는 동안에는 보내기 자리가 중단 버튼으로 바뀐다 */
  isAnswering: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onImageSelect: (file: File) => void;
  onRemoveImage: () => void;
  onStop: () => void;
}

function ChatComposer({
  value,
  placeholder,
  attachLabel,
  cameraLabel,
  photoLabel,
  sendLabel,
  stopLabel,
  imagePreview = null,
  variant = "chat",
  isAnswering,
  onChange,
  onSubmit,
  onImageSelect,
  onRemoveImage,
  onStop,
}: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isEmpty = value.trim().length === 0 && !imagePreview;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isEmpty || isAnswering) return;

    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-2.5 rounded-[30px] p-2.5",
        variant === "home"
          ? "bg-[rgba(255,255,255,0.84)] shadow-[0_4px_4.5px_rgba(0,0,0,0.04)] backdrop-blur-[3.85px]"
          : "bg-chat-bar",
      )}
    >
      {imagePreview && (
        <div className="relative size-16 shrink-0">
          <img
            src={imagePreview}
            alt=""
            className="size-16 rounded-2xl object-cover"
          />
          <button
            type="button"
            aria-label="Remove"
            onClick={onRemoveImage}
            className="bg-neutral-black/60 absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full text-[0.625rem] text-neutral-white"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex items-end gap-2.5">
        <AttachButton
          attachLabel={attachLabel}
          cameraLabel={cameraLabel}
          photoLabel={photoLabel}
          onImageSelect={onImageSelect}
        />

        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit(event);
            }
          }}
          placeholder={placeholder}
          className="text-body text-text-01 placeholder:text-text-04 my-2 max-h-18 min-w-0 flex-1 resize-none bg-transparent leading-normal outline-none"
        />

        {isAnswering ? (
          <button
            type="button"
            aria-label={stopLabel}
            onClick={onStop}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-black"
          >
            <span
              aria-hidden
              className="size-3 rounded-[3px] bg-neutral-white"
            />
          </button>
        ) : (
          <button
            type="submit"
            aria-label={sendLabel}
            disabled={isEmpty}
            className="bg-primary-10 text-icon-in flex size-10 shrink-0 items-center justify-center rounded-full transition-opacity disabled:opacity-40"
          >
            <span aria-hidden className="text-body leading-none">
              ↑
            </span>
          </button>
        )}
      </div>
    </form>
  );
}

export default ChatComposer;
