import { useEffect, useRef } from "react";

import { cn } from "@/utils/cn";

// w-22와 같은 값
const ITEM_WIDTH = 88;

export interface WheelOption {
  value: number;
  label: string;
}

interface WheelPickerProps {
  label: string;
  options: readonly WheelOption[];
  value: number;
  onChange: (value: number) => void;
}

function WheelPicker({ label, options, value, onChange }: WheelPickerProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // 스크롤 → onChange → scrollTo 무한 반복 방지
  const isSyncingRef = useRef(false);

  const selectedIndex = options.findIndex((option) => option.value === value);

  useEffect(() => {
    const list = listRef.current;
    if (!list || selectedIndex < 0) return;

    if (isSyncingRef.current) {
      isSyncingRef.current = false;
      return;
    }

    list.scrollTo({ left: selectedIndex * ITEM_WIDTH, behavior: "smooth" });
  }, [selectedIndex]);

  // scrollend는 iOS Safari 지원이 늦어 타이머로 대체
  const settleTimerRef = useRef<number>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(settleTimerRef.current);
  }, []);

  const handleScroll = () => {
    window.clearTimeout(settleTimerRef.current);

    settleTimerRef.current = window.setTimeout(() => {
      const list = listRef.current;
      if (!list) return;

      const index = Math.round(list.scrollLeft / ITEM_WIDTH);
      const option = options[index];
      if (!option || option.value === value) return;

      isSyncingRef.current = true;
      onChange(option.value);
    }, 120);
  };

  return (
    <div
      role="group"
      aria-label={label}
      className="flex w-full flex-col items-center"
    >
      <div
        ref={listRef}
        onScroll={handleScroll}
        className={cn(
          "flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
          "scrollbar-none px-[calc(50%-44px)] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              aria-current={isSelected}
              onClick={() => onChange(option.value)}
              className="flex w-22 shrink-0 snap-center flex-col items-center gap-3"
            >
              <span
                className={cn(
                  "text-[2rem] leading-normal font-medium tracking-tight",
                  isSelected ? "text-neutral-white" : "text-neutral-white/40",
                )}
              >
                {option.label}
              </span>
              <span
                aria-hidden
                className={cn(
                  "h-2.5 w-1.5",
                  isSelected ? "bg-accent" : "bg-neutral-white/40",
                )}
              />
            </button>
          );
        })}
      </div>

      <div aria-hidden className="h-1 w-full bg-neutral-white/40" />
    </div>
  );
}

export default WheelPicker;
