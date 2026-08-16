import logo from "@/assets/logo-dark.svg";
import { cn } from "@/utils/cn";

type LoadingStateVariant = "page" | "section" | "inline";

interface LoadingStateProps {
  message: string;
  variant?: LoadingStateVariant;
  className?: string;
}

const containerClass: Record<LoadingStateVariant, string> = {
  page: "min-h-dvh bg-[#F6F6F9]",
  section: "min-h-[640px]",
  inline: "py-4",
};

export default function LoadingState({
  message,
  variant = "section",
  className,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center justify-center",
        containerClass[variant],
        className,
      )}
    >
      <img
        src={logo}
        alt=""
        className={cn(
          "animate-pulse opacity-60",
          variant === "inline" ? "size-6" : "size-9",
        )}
      />
      <span className="sr-only">{message}</span>
    </div>
  );
}
