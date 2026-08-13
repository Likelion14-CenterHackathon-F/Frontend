import type { FormEvent } from "react";

interface ChatBarProps {
  value: string;
  placeholder: string;
  attachLabel: string;
  sendLabel: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onAttach?: () => void;
}

function ChatBar({
  value,
  placeholder,
  attachLabel,
  sendLabel,
  onChange,
  onSubmit,
  onAttach,
}: ChatBarProps) {
  const isEmpty = value.trim().length === 0;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isEmpty) return;

    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border-soft flex items-center gap-2.5 rounded-[30px] border-[1.5px] bg-neutral-white p-2.5"
    >
      <button
        type="button"
        aria-label={attachLabel}
        onClick={onAttach}
        className="flex size-10 shrink-0 items-center justify-center rounded-full"
      >
        <span aria-hidden className="relative block size-3.5">
          <span className="bg-text-03 absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rounded-lg" />
          <span className="bg-text-03 absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 rounded-lg" />
        </span>
      </button>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
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
