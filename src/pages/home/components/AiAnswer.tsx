import logo from "@/assets/logo.svg";
import logoDark from "@/assets/logo-dark.svg";
import { cn } from "@/utils/cn";

interface AiAnswerProps {
  content: string;
  variant?: "chat" | "home";
}

function AiAnswer({ content, variant = "chat" }: AiAnswerProps) {
  const isHome = variant === "home";

  // 서버 답변은 문단을 줄바꿈으로 구분한 한 덩어리 문자열로 내려온다
  const paragraphs = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      <img
        aria-hidden
        src={isHome ? logoDark : logo}
        alt=""
        className="size-7"
      />

      <div
        className={cn(
          "flex flex-col gap-2",
          isHome ? "text-[#473787]/90" : "text-chat-fg/90",
        )}
      >
        {paragraphs.map((paragraph, index) => (
          <p
            key={`${index}-${paragraph.slice(0, 12)}`}
            className="text-body leading-normal font-medium tracking-tight"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export default AiAnswer;
