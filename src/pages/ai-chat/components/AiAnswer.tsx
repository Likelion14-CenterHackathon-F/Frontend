import logo from "@/assets/logo.svg";

interface AiAnswerProps {
  content: string;
}

function AiAnswer({ content }: AiAnswerProps) {
  // 서버 답변은 문단을 빈 줄로 구분한 한 덩어리 문자열로 내려온다
  const paragraphs = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      <img aria-hidden src={logo} alt="" className="size-7" />

      <div className="text-chat-fg/90 flex flex-col gap-2">
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
