import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import logo from "@/assets/logo.svg";
import sidebarLeft from "@/assets/sidebar-left.svg";
import { useChatStore } from "@/stores/useChatStore";

import AiAnswer, { type AnswerSection } from "./components/AiAnswer";
import ChatBackdrop from "./components/ChatBackdrop";
import ChatComposer from "./components/ChatComposer";
import PatientMessage from "./components/PatientMessage";

/* 명세 확정 전까지 쓰는 응답 지연 */
const ANSWER_DELAY_MS = 1200;

/* 대화가 안내 문구에 이만큼 가까워지면 지워지기 시작한다 */
const NOTICE_FADE_DISTANCE = 80;
const NOTICE_MAX_OPACITY = 0.7;

const ANSWER_KEYS = ["analysis", "reassuring", "lifestyle", "redFlags"];

function AiChatPage() {
  const { t } = useTranslation("aiChat");

  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const clearMessages = useChatStore((state) => state.clearMessages);

  const [draft, setDraft] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  const [noticeOpacity, setNoticeOpacity] = useState(NOTICE_MAX_OPACITY);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const answerTimerRef = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const noticeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAnswering]);

  // 화면을 벗어날 때 예약된 응답이 남지 않도록 정리한다
  useEffect(() => {
    return () => {
      if (answerTimerRef.current) window.clearTimeout(answerTimerRef.current);
    };
  }, []);

  /*
    대화가 안내 문구에 가까워질수록 문구를 옅게 만든다.
    딱 닿는 순간 사라지면 눈에 띄어서, 여유 구간을 두고 서서히 지운다.
  */
  useEffect(() => {
    const update = () => {
      const content = contentRef.current;
      const notice = noticeRef.current;
      if (!content || !notice) return;

      const gap =
        notice.getBoundingClientRect().top -
        content.getBoundingClientRect().bottom;
      const ratio = Math.min(Math.max(gap / NOTICE_FADE_DISTANCE, 0), 1);

      setNoticeOpacity(ratio * NOTICE_MAX_OPACITY);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [messages, isAnswering]);

  const answerSections: AnswerSection[] = ANSWER_KEYS.map((key) => ({
    title: t(`${key}.title`),
    items: t(`${key}.items`, { returnObjects: true }) as string[],
    // 분석 결과만 글머리표 없이 문장으로 늘어놓는다
    isPlain: key === "analysis",
  }));

  const stopAnswering = () => {
    if (answerTimerRef.current) window.clearTimeout(answerTimerRef.current);
    setIsAnswering(false);
  };

  const handleSubmit = () => {
    const text = draft.trim();
    if (!text && !imageUrl) return;

    addMessage({
      id: crypto.randomUUID(),
      role: "patient",
      kind: "text",
      text: text || undefined,
      imageUrl: imageUrl ?? undefined,
    });

    setDraft("");
    setImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    // 실제로는 여기서 분석 API를 호출한다
    setIsAnswering(true);
    answerTimerRef.current = window.setTimeout(() => {
      addMessage({ id: crypto.randomUUID(), role: "ai", kind: "guidance" });
      setIsAnswering(false);
    }, ANSWER_DELAY_MS);
  };

  const handleNewChat = () => {
    stopAnswering();
    clearMessages();
    setDraft("");
    setImageUrl(null);
  };

  return (
    <div className="text-chat-fg relative flex min-h-dvh flex-col">
      <ChatBackdrop />

      <header className="relative flex items-center justify-between px-5 pt-2.5">
        <button
          type="button"
          aria-label={t("menu")}
          className="flex size-12 items-center justify-center rounded-[28px]"
        >
          <img aria-hidden src={sidebarLeft} alt="" className="size-5.25" />
        </button>

        <button
          type="button"
          onClick={handleNewChat}
          className="text-body leading-[1.4] font-semibold tracking-tight"
        >
          {t("newChat")}
        </button>
      </header>

      <main className="relative flex-1 px-5 pt-6 pb-10">
        {messages.length === 0 && (
          <div className="flex flex-col gap-6.5 ps-4">
            <img aria-hidden src={logo} alt="" className="size-7" />
            <h1 className="text-2xl leading-[1.4] font-semibold tracking-tight">
              {t("greeting")}
            </h1>
          </div>
        )}

        <div ref={contentRef} className="flex flex-col gap-10">
          {messages.map((message) =>
            message.role === "patient" ? (
              <PatientMessage
                key={message.id}
                text={message.text}
                imageUrl={message.imageUrl}
                imageAlt={t("attachedImage")}
              />
            ) : (
              <AiAnswer key={message.id} sections={answerSections} />
            ),
          )}

          {isAnswering && (
            <div className="flex flex-col gap-6">
              <img aria-hidden src={logo} alt="" className="size-7" />
              <p className="text-body leading-normal font-medium opacity-90">
                {t("thinking")}
              </p>
            </div>
          )}
        </div>

        <div ref={bottomRef} />
      </main>

      <div className="sticky bottom-0 flex flex-col gap-4 px-5 pt-6 pb-10">
        <p
          ref={noticeRef}
          aria-hidden={noticeOpacity === 0}
          style={{ opacity: noticeOpacity }}
          className="text-caption mx-auto max-w-68 text-center leading-[1.55]"
        >
          {t("disclaimer")}
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) setImageUrl(URL.createObjectURL(file));
          }}
        />

        <ChatComposer
          value={draft}
          placeholder={t("inputPlaceholder")}
          attachLabel={t("attach")}
          sendLabel={t("send")}
          stopLabel={t("stop")}
          isAnswering={isAnswering}
          onChange={setDraft}
          onSubmit={handleSubmit}
          onAttach={() => fileInputRef.current?.click()}
          onStop={stopAnswering}
        />
      </div>
    </div>
  );
}

export default AiChatPage;
