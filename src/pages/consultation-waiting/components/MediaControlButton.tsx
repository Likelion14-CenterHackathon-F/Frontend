import type { ReactNode } from 'react';

interface MediaControlButtonProps {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

function MediaControlButton({
  label,
  active = true,
  disabled = false,
  onClick,
  children,
}: MediaControlButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={!active}
      disabled={disabled}
      onClick={onClick}
      className={[
        'grid size-[42px] place-items-center rounded-full',
        'transition-all duration-150',
        'bg-black/45',
        disabled ? 'cursor-not-allowed opacity-40' : '',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export default MediaControlButton;
