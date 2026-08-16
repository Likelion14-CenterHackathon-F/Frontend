import { cn } from "@/utils/cn";

interface PatientMessageProps {
  text?: string;
  imageUrl?: string;
  imageAlt: string;
  variant?: "chat" | "home";
}

function PatientMessage({
  text,
  imageUrl,
  imageAlt,
  variant = "chat",
}: PatientMessageProps) {
  const isHome = variant === "home";

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
        <img
          src={imageUrl}
          alt={imageAlt}
          className={cn(
            "object-cover",
            isHome
              ? "h-35 w-27.5 rounded-[14px]"
              : "h-35 w-27.5 rounded-2xl",
          )}
        />
      )}
    </div>
  );
}

export default PatientMessage;
