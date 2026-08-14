import arrowUpRight from "@/assets/arrow-up-right.svg";
import cardSymbol from "@/assets/card-symbol.svg";

interface HomeCardProps {
  badge: string;
  caption: string;
  title: string;
  // 의료진 상담 카드에만 들어가는 장식
  hasSymbol?: boolean;
  onClick: () => void;
}

function HomeCard({
  badge,
  caption,
  title,
  hasSymbol = false,
  onClick,
}: HomeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-45 flex-1 flex-col justify-between overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_center,var(--color-card-glow)_29%,var(--color-neutral-white)_100%)] p-5 text-left"
    >
      {hasSymbol && (
        <img
          aria-hidden
          src={cardSymbol}
          alt=""
          className="pointer-events-none absolute -top-2 -right-6 h-15 mix-blend-overlay"
        />
      )}

      <div className="relative flex items-start justify-between">
        <span className="text-caption font-medium text-primary-deep">
          {badge}
        </span>
        <img aria-hidden src={arrowUpRight} alt="" className="size-2.75" />
      </div>

      <div className="relative flex flex-col gap-1.5">
        <span className="text-caption text-text-muted">{caption}</span>
        <span className="text-heading font-bold text-text-01">{title}</span>
      </div>
    </button>
  );
}

export default HomeCard;
