import previousIcon from "@/assets/icons/header/previous-icon.svg";
import { cn } from "@/utils/cn";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  className?: string;
}

export default function ConsultationHeader({ title, onBack, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "relative bg-surface-soft flex h-16.5 items-center px-5 pt-[env(safe-area-inset-top)]",
        className,
      )}
    >
      {onBack && (
        <button type="button" onClick={onBack}>
          <img src={previousIcon} alt="뒤로가기 버튼" />
        </button>
      )}

      <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
        {title}
      </h1>
    </header>
  );
}
