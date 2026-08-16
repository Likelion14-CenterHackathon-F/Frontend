import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { getPatientCase } from "@/apis/patient";
import logoDark from "@/assets/logo-dark.svg";
import sidebarLeft from "@/assets/sidebar-left.svg";
import ChatBar from "@/components/ChatBar/ChatBar";
import HomeCard from "@/components/HomeCard/HomeCard";
import { useChatStore } from "@/stores/useChatStore";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { getDayOffset } from "@/utils/aftercare";
import { cn } from "@/utils/cn";
import { formatCalendarDate, formatCompactDate } from "@/utils/dateTime";

import HistoryDrawer from "./components/HistoryDrawer";
import HomeBackdrop from "./components/HomeBackdrop";
import AiAnswer, { type AnswerSection } from "./components/AiAnswer";
import ChatComposer from "./components/ChatComposer";
import PatientMessage from "./components/PatientMessage";

const ANSWER_DELAY_MS = 1200;
const ANSWER_KEYS = ["analysis", "reassuring", "lifestyle", "redFlags"];

function HomePage() {
  const { t } = useTranslation(["home", "aiChat"]);
  const navigate = useNavigate();

  const locale = usePreferencesStore((state) => state.locale);
  const timeZone = usePreferencesStore((state) => state.timeZone);
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);

  const [draft, setDraft] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isChatFocused, setIsChatFocused] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);

  const answerTimerRef = useRef<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isConversationActive = messages.length > 0 || isAnswering;

  const patientCase = useMemo(() => getPatientCase(), []);
  const dayOffset = getDayOffset(patientCase.procedureDate);

  const consultation = useMemo(() => {
    if (!patientCase.upcomingConsultationAt) return null;

    const scheduledAt = new Date(patientCase.upcomingConsultationAt);

    return {
      date: formatCompactDate(scheduledAt, { locale, timeZone }),
      daysLeft: -getDayOffset(formatCalendarDate(scheduledAt)),
    };
  }, [patientCase.upcomingConsultationAt, locale, timeZone]);

  const answerSections: AnswerSection[] = ANSWER_KEYS.map((key) => ({
    title: t(`aiChat:${key}.title`),
    items: t(`aiChat:${key}.items`, { returnObjects: true }) as string[],
    isPlain: key === "analysis",
  }));

  useEffect(() => {
    return () => {
      if (answerTimerRef.current) window.clearTimeout(answerTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isConversationActive) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isAnswering, isConversationActive]);

  const stopAnswering = () => {
    if (answerTimerRef.current) {
      window.clearTimeout(answerTimerRef.current);
      answerTimerRef.current = null;
    }
    setIsAnswering(false);
  };

  const sendToChat = () => {
    const text = draft.trim();
    if ((!text && !imageUrl) || isAnswering) return;

    addMessage({
      id: crypto.randomUUID(),
      role: "patient",
      kind: "text",
      text: text || undefined,
      imageUrl: imageUrl ?? undefined,
    });

    setDraft("");
    setImageUrl(null);
    setIsAnswering(true);

    answerTimerRef.current = window.setTimeout(() => {
      addMessage({ id: crypto.randomUUID(), role: "ai", kind: "guidance" });
      setIsAnswering(false);
      answerTimerRef.current = null;
    }, ANSWER_DELAY_MS);
  };

  return (
    <div
      className={cn(
        "relative flex min-h-dvh flex-col",
        !isConversationActive && "pb-10.5",
      )}
    >
      <HomeBackdrop />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      <header className="relative flex items-center justify-between px-5 pt-6">
        <button
          type="button"
          aria-label={t("menu")}
          onClick={() => setIsHistoryOpen(true)}
          className="bg-neutral-white/70 flex size-14.5 items-center justify-center rounded-[30px]"
        >
          <img aria-hidden src={sidebarLeft} alt="" className="size-5.25" />
        </button>

        <button
          type="button"
          aria-label={t("changeLanguage")}
          onClick={() => navigate("/settings/language")}
          className="bg-neutral-white/70 flex size-14.5 items-center justify-center rounded-[30px] text-[#47425b] transition-colors"
        >
          <span aria-hidden className="text-[1.0625rem] font-bold">
            가
            <span className="text-[0.8125rem] font-medium text-[#68657c] opacity-70">
              가
            </span>
          </span>
        </button>
      </header>

      {isConversationActive ? (
        <>
          <main className="relative flex-1 px-5 pt-6 pb-6">
            <div className="flex flex-col gap-10">
              {messages.map((message) =>
                message.role === "patient" ? (
                  <PatientMessage
                    key={message.id}
                    text={message.text}
                    imageUrl={message.imageUrl}
                    imageAlt={t("aiChat:attachedImage")}
                    variant="home"
                  />
                ) : (
                  <AiAnswer
                    key={message.id}
                    sections={answerSections}
                    variant="home"
                  />
                ),
              )}

              {isAnswering && (
                <div className="flex w-50 flex-col gap-4">
                  <img aria-hidden src={logoDark} alt="" className="size-7" />
                  <p className="bg-linear-to-r from-[#473787] from-27% to-[#c2b3fb] bg-clip-text text-[0.9375rem] leading-[1.4] font-medium tracking-tight text-transparent opacity-60">
                    {t("aiChat:thinking")}
                  </p>
                </div>
              )}
            </div>
            <div ref={bottomRef} />
          </main>

          <div className="sticky bottom-0 z-10 px-5 pt-6 pb-10">
            <ChatComposer
              value={draft}
              placeholder={t("aiChat:inputPlaceholder")}
              attachLabel={t("aiChat:attach")}
              cameraLabel={t("aiChat:camera")}
              photoLabel={t("aiChat:photo")}
              sendLabel={t("aiChat:send")}
              stopLabel={t("aiChat:stop")}
              hasImage={imageUrl !== null}
              isAnswering={isAnswering}
              variant="home"
              onChange={setDraft}
              onSubmit={sendToChat}
              onImageSelect={setImageUrl}
              onStop={stopAnswering}
            />
          </div>
        </>
      ) : (
        <>
          <div className="relative mx-auto mt-14 flex max-w-75 flex-col items-center gap-2 px-5 text-center">
            <p className="text-[1.25rem] leading-[1.45] font-medium tracking-tight text-text-02">
              {t("progress.day", { day: dayOffset })}
              {t("progress.total", { total: patientCase.cautionDays })}
            </p>
            <h1 className="text-title font-bold tracking-tight text-greeting">
              {t("greeting", { name: patientCase.name })}
            </h1>
          </div>

          <p className="text-disclaimer relative mx-auto mt-auto max-w-62 px-5 text-center text-[0.8125rem] leading-[1.4]">
            {t("disclaimer")}
          </p>

          <div className="relative mt-6.25 px-5">
            <ChatBar
              value={draft}
              placeholder={t("chat.placeholder")}
              attachLabel={t("chat.attach")}
              cameraLabel={t("chat.camera")}
              photoLabel={t("chat.photo")}
              sendLabel={t("chat.send")}
              hasImage={imageUrl !== null}
              onChange={setDraft}
              onSubmit={sendToChat}
              onImageSelect={setImageUrl}
              onFocus={() => setIsChatFocused(true)}
              onBlur={() => setIsChatFocused(false)}
            />
          </div>

          <div
            className={cn(
              "relative mt-2.5 flex gap-[9px] overflow-hidden px-5 transition-[max-height] duration-300 ease-out",
              isChatFocused ? "max-h-4.5" : "max-h-45",
            )}
          >
            <HomeCard
              variant="consultation"
              badge={
                consultation
                  ? t("consultation.badge", { days: consultation.daysLeft })
                  : t("consultation.empty.badge")
              }
              caption={
                consultation
                  ? t("consultation.scheduled", { date: consultation.date })
                  : t("consultation.empty.caption")
              }
              title={
                consultation
                  ? t("consultation.title")
                  : t("consultation.empty.title")
              }
              onClick={() => navigate("/consultation")}
            />

            <HomeCard
              badge={t("aftercare.badge", { day: dayOffset })}
              caption={patientCase.procedureName}
              title={t("aftercare.title")}
              onClick={() => navigate("/aftercare")}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
