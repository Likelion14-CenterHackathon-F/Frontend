import { useEffect, useRef, type FormEvent } from "react";

interface ChatComposerProps {
  value: string;
  placeholder: string;
  attachLabel: string;
  sendLabel: string;
  stopLabel: string;
  /** 답변을 기다리는 동안에는 보내기 자리가 중단 버튼으로 바뀐다 */
  isAnswering: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onAttach: () => void;
  onStop: () => void;
}

function ChatComposer({
  value,
  placeholder,
  attachLabel,
  sendLabel,
  stopLabel,
  isAnswering,
  onChange,
  onSubmit,
  onAttach,
  onStop,
}: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isEmpty = value.trim().length === 0;

  /*
    입력한 줄 수만큼 높이를 늘린다.
    auto로 되돌린 뒤 scrollHeight를 읽어야 글을 지울 때도 따라 줄어든다.
    상한은 max-h로 걸어두었다.
  */
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
      className="bg-chat-bar flex items-end gap-2.5 rounded-[30px] p-2.5"
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

      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          // 줄바꿈은 Shift와 함께 눌렀을 때만
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
    </form>
  );
}

export default ChatComposer;
