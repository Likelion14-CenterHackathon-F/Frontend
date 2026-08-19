import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getChatImage } from "@/apis/chat";
import { cn } from "@/utils/cn";

interface PatientMessageProps {
  text?: string;
  imageUrl?: string;
  imageAlt: string;
  variant?: "chat" | "home";
}

interface ChatImageProps {
  src: string;
  alt: string;
  className: string;
}

function requiresAuthenticatedFetch(src: string): boolean {
  if (/^(blob:|data:)/.test(src)) return false;
  if (!/^https?:/.test(src)) return true;

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!apiBaseUrl) return false;

  try {
    return new URL(src).origin === new URL(apiBaseUrl).origin;
  } catch {
    return false;
  }
}

function ChatImage({ src, alt, className }: ChatImageProps) {
  const needsAuthentication = requiresAuthenticatedFetch(src);
  const { data: image, isPending, isError } = useQuery({
    queryKey: ["aiChat", "image", src],
    queryFn: () => getChatImage(src),
    enabled: needsAuthentication,
    staleTime: 5 * 60_000,
  });
  const objectUrl = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image],
  );

  useEffect(
    () => () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    },
    [objectUrl],
  );

  if (needsAuthentication && isPending) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(className, "animate-pulse bg-black/5")}
      />
    );
  }

  const displayUrl = needsAuthentication ? objectUrl : src;
  if (isError || !displayUrl) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          className,
          "flex items-center justify-center bg-black/5 px-2 text-center text-xs text-text-04",
        )}
      >
        {alt}
      </div>
    );
  }

  return <img src={displayUrl} alt={alt} className={className} />;
}

function PatientMessage({
  text,
  imageUrl,
  imageAlt,
  variant = "chat",
}: PatientMessageProps) {
  const isHome = variant === "home";
  const imageClassName = cn(
    "object-cover",
    isHome
      ? "h-35 w-27.5 rounded-[14px]"
      : "h-35 w-27.5 rounded-2xl",
  );

  return (
    <div className="flex flex-col items-end gap-3">
      {text && (
        <p
          className={cn(
            "max-w-72 rounded-3xl p-4 text-[0.9375rem] leading-[1.4] font-medium tracking-tight",
            isHome
              ? "bg-[rgba(255,255,255,0.84)] text-[#4b4b4e] backdrop-blur-[3.85px]"
              : "bg-chat-bubble text-chat-fg",
          )}
        >
          {text}
        </p>
      )}

      {imageUrl && (
        <ChatImage
          src={imageUrl}
          alt={imageAlt}
          className={imageClassName}
        />
      )}
    </div>
  );
}

export default PatientMessage;
