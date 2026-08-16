import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

import OnboardingBackground from "./OnboardingBackground";

interface OnboardingLayoutProps {
  title: ReactNode;
  description: ReactNode;
  confirmLabel: string;
  previousLabel: string;
  // 없으면 이전 버튼이 비활성화
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
    <div className="bg-onboarding-bg relative flex min-h-dvh flex-col overflow-hidden">
      <OnboardingBackground />

      <header className="text-onboarding-title relative flex flex-col gap-3.5 px-5 pt-16">
        <h1 className="text-title leading-[1.4] font-semibold whitespace-pre-line">
          {title}
        </h1>
        <p className="text-onboarding-description text-body font-medium whitespace-pre-line">
          {description}
        </p>
      </header>

      <div className="relative flex flex-1 items-center justify-center py-10">
        {children}
      </div>

      <footer className="relative flex gap-5 px-5 pb-7">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!onPrevious}
          className={cn(
            "text-body h-15.5 flex-1 rounded-full font-medium",
            "text-onboarding-previous-text bg-white/44 backdrop-blur-sm",
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
            "text-body h-15.5 flex-1 rounded-full font-semibold",
            "bg-onboarding-confirm-bg text-onboarding-confirm-text backdrop-blur-sm",
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
