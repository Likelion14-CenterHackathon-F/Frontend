import type { FormEvent } from "react";

import AttachButton from "@/components/AttachButton/AttachButton";

interface ChatBarProps {
  value: string;
  placeholder: string;
  attachLabel: string;
  cameraLabel: string;
  photoLabel: string;
  sendLabel: string;
  imagePreview?: string | null;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onImageSelect: (file: File) => void;
  onRemoveImage: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

function ChatBar({
  value,
  placeholder,
  attachLabel,
  cameraLabel,
  photoLabel,
  sendLabel,
  imagePreview = null,
  onChange,
  onSubmit,
  onImageSelect,
  onRemoveImage,
  onFocus,
  onBlur,
}: ChatBarProps) {
  const isEmpty = value.trim().length === 0 && !imagePreview;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isEmpty) return;

    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-home-bar flex flex-col gap-2.5 rounded-[30px] p-2.5 shadow-[0_4px_4.5px_0_rgba(0,0,0,0.04)]"
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

      <div className="flex items-center gap-2.5">
        <AttachButton
          attachLabel={attachLabel}
          cameraLabel={cameraLabel}
          photoLabel={photoLabel}
          onImageSelect={onImageSelect}
        />

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="text-body min-w-0 flex-1 bg-transparent text-text-01 outline-none placeholder:text-text-04"
        />

        <button
          type="submit"
          aria-label={sendLabel}
          disabled={isEmpty}
          className="text-body flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-10 text-icon-in disabled:opacity-40"
        >
          <span aria-hidden>↑</span>
        </button>
      </div>
    </form>
  );
}

export default ChatBar;
