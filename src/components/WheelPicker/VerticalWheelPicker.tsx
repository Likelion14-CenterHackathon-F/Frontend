import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";

const ITEM_HEIGHT = 60;

const SURROUNDING_COUNT = 2;

const WHEEL_HEIGHT = (SURROUNDING_COUNT * 2 + 1) * ITEM_HEIGHT;

// 원통 효과
function getItemStyle(distance: number) {
  if (distance === 0) {
    return { transform: "rotateX(0deg)", opacity: 1 };
  }

  const direction = distance > 0 ? -1 : 1;
  const step = Math.min(Math.abs(distance), SURROUNDING_COUNT);

  return {
    transform: `rotateX(${direction * step * 28}deg) scale(${1 - step * 0.08})`,
    opacity: 1 - step * 0.35,
  };
}

export interface VerticalWheelOption<T extends string> {
  value: T;
  label: string;
}

interface VerticalWheelPickerProps<T extends string> {
  label: string;
  options: readonly VerticalWheelOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

function VerticalWheelPicker<T extends string>({
  label,
  options,
  value,
  onChange,
}: VerticalWheelPickerProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const settleTimerRef = useRef<number>(undefined);

  const isSyncingRef = useRef(false);

  const selectedIndex = options.findIndex((option) => option.value === value);

  const [centeredIndex, setCenteredIndex] = useState(
    Math.max(selectedIndex, 0),
  );

  useEffect(() => {
    return () => window.clearTimeout(settleTimerRef.current);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list || selectedIndex < 0) return;

    if (isSyncingRef.current) {
      isSyncingRef.current = false;
      return;
    }

    setCenteredIndex(selectedIndex);
    list.scrollTo({ top: selectedIndex * ITEM_HEIGHT, behavior: "smooth" });
  }, [selectedIndex]);

  const handleScroll = () => {
    const list = listRef.current;
    if (!list) return;

    const index = Math.round(list.scrollTop / ITEM_HEIGHT);
    setCenteredIndex(Math.min(Math.max(index, 0), options.length - 1));

    // iOS Safari 지원이 늦어 타이머로 대체하는 용도
    window.clearTimeout(settleTimerRef.current);
    settleTimerRef.current = window.setTimeout(() => {
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
      className="relative w-52.5"
      style={{ height: WHEEL_HEIGHT }}
    >
      {/* 가운데 선택 영역 */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-15 w-38 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/36"
      />

      <div
        ref={listRef}
        onScroll={handleScroll}
        className={cn(
          "scrollbar-none h-full snap-y snap-mandatory overflow-y-auto overscroll-y-contain",
          "[&::-webkit-scrollbar]:hidden",
        )}
        style={{
          perspective: "600px",
          paddingBlock: SURROUNDING_COUNT * ITEM_HEIGHT,
        }}
      >
        {options.map((option, index) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              aria-current={isSelected}
              onClick={() => onChange(option.value)}
              style={getItemStyle(index - centeredIndex)}
              className={cn(
                "text-heading text-onboarding-title flex h-15 w-full snap-center items-center justify-center",
                "font-semibold transition-[transform,opacity] duration-150",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VerticalWheelPicker;
