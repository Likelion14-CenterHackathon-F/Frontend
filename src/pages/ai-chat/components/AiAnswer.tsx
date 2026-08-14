import logo from "@/assets/logo.svg";

export interface AnswerSection {
  title: string;
  items: string[];
  /** 분석 결과처럼 글머리표 없이 문장만 늘어놓는 묶음 */
  isPlain?: boolean;
}

interface AiAnswerProps {
  sections: AnswerSection[];
}

function AiAnswer({ sections }: AiAnswerProps) {
  return (
    <div className="flex flex-col gap-6">
      <img aria-hidden src={logo} alt="" className="size-7" />

      {sections.map((section) => (
        <section key={section.title} className="text-chat-fg/90 flex flex-col">
          <h2 className="text-lg leading-[1.4] font-semibold tracking-tight">
            {section.title}
          </h2>

          <ul
            className={
              section.isPlain
                ? "mt-2 flex flex-col gap-1"
                : "mt-2 flex list-disc flex-col gap-1 ps-5"
            }
          >
            {section.items.map((item) => (
              <li
                key={item}
                className="text-body leading-normal font-semibold tracking-tight"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default AiAnswer;
