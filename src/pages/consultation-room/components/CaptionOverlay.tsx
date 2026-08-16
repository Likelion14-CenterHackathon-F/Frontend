interface CaptionOverlayProps {
  caption: string | null;
}

function CaptionOverlay({ caption }: CaptionOverlayProps) {
  if (!caption) return null;

  return (
    <p
      aria-live="polite"
      className="max-w-[min(420px,calc(100vw-32px))] rounded-lg bg-black/65 px-3 py-2 text-center text-base leading-[1.4] tracking-[-0.4px]"
    >
      {caption}
    </p>
  );
}

export default CaptionOverlay;
