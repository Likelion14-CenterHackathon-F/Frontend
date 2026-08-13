import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface OnboardingLayoutProps {
  title: ReactNode;
  description: ReactNode;
  // 단계마다 "다음", "맞아요", "시작하기"로 달라짐
  confirmLabel: string;
  previousLabel: string;
  // 없으면 이전 버튼이 비활성화됨
  onPrevious?: () => void;
  onConfirm: () => void;
  isConfirmDisabled?: boolean;
  children: ReactNode;
}

function OnboardingLayout({
  title,
  description,
  confirmLabel,
  previousLabel,
  onPrevious,
  onConfirm,
  isConfirmDisabled = false,
  children,
}: OnboardingLayoutProps) {
  return (
    <div className="from-gradient-from via-gradient-via to-gradient-to flex min-h-dvh flex-col bg-linear-to-b via-35%">
      <header className="flex flex-col gap-3.5 px-5 pt-16 text-neutral-white">
        <h1 className="text-title leading-[1.4] font-semibold whitespace-pre-line">
          {title}
        </h1>
        <p className="text-body font-medium whitespace-pre-line">
          {description}
        </p>
      </header>

      <div className="flex flex-1 items-center justify-center py-10">
        {children}
      </div>

      <footer className="flex gap-5 px-5 pb-7">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!onPrevious}
          className={cn(
            "text-body h-15.5 flex-1 rounded-full font-semibold",
            "border border-surface-soft text-neutral-white",
            "disabled:opacity-40",
          )}
        >
          {previousLabel}
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isConfirmDisabled}
          className={cn(
            "text-body h-15.5 flex-1 rounded-full font-medium",
            "bg-surface-soft text-text-01",
            "disabled:opacity-40",
          )}
        >
          {confirmLabel}
        </button>
      </footer>
    </div>
  );
}

export default OnboardingLayout;
