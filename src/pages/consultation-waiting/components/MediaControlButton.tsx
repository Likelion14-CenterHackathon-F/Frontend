import type { ReactNode } from 'react';

interface MediaControlButtonProps {
  label: string;
  active?: boolean;
  emphasized?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

function MediaControlButton({
  label,
  active = true,
  emphasized = false,
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
        active ? 'bg-black/45' : 'bg-red-500/90',
        emphasized ? 'scale-110 ring-4 ring-green-400/70' : '',
        disabled ? 'cursor-not-allowed opacity-40' : '',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export default MediaControlButton;
