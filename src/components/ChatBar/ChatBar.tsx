import type { FormEvent } from "react";

import AttachButton from "@/components/AttachButton/AttachButton";

interface ChatBarProps {
  value: string;
  placeholder: string;
  attachLabel: string;
  cameraLabel: string;
  photoLabel: string;
  sendLabel: string;
  hasImage?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onImageSelect: (url: string) => void;
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
  hasImage = false,
  onChange,
  onSubmit,
  onImageSelect,
  onFocus,
  onBlur,
}: ChatBarProps) {
  const isEmpty = value.trim().length === 0 && !hasImage;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isEmpty) return;

    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-home-bar flex items-center gap-2.5 rounded-[30px] p-2.5 shadow-[0_4px_4.5px_0_rgba(0,0,0,0.04)]"
    >
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
    </form>
  );
}

export default ChatBar;
