import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getAftercareHome } from "@/apis/patient";
import sidebarLeft from "@/assets/sidebar-left.svg";
import ChatBar from "@/components/ChatBar/ChatBar";
import HomeCard from "@/components/HomeCard/HomeCard";
import { useChatStore } from "@/stores/useChatStore";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { getDayOffset } from "@/utils/aftercare";
import { formatCalendarDate, formatCompactDate } from "@/utils/dateTime";

import HistoryDrawer from "./components/HistoryDrawer";
import HomeBackdrop from "./components/HomeBackdrop";

function HomePage() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  const locale = usePreferencesStore((state) => state.locale);
  const timeZone = usePreferencesStore((state) => state.timeZone);
  const startNewChat = useChatStore((state) => state.startNewChat);
  const setPendingQuestion = useChatStore((state) => state.setPendingQuestion);

  const [draft, setDraft] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const { data: home } = useQuery({
    queryKey: ["aftercare", "home"],
    queryFn: getAftercareHome,
  });

  const dayOffset = home?.aftercareProgress.elapsedDays ?? 0;
  const cautionDays = home?.aftercareProgress.totalCareDays ?? 0;
  const procedureName = home?.procedure.procedureName ?? "";

  const consultation = useMemo(() => {
    const appointment = home?.consultationAppointment;
    if (!appointment) return null;

    const scheduledAt = new Date(appointment.startsAt);

    return {
      date: formatCompactDate(scheduledAt, { locale, timeZone }),
      // 상담일이 미래면 getDayOffset이 음수를 주므로 부호를 뒤집는다
      daysLeft: -getDayOffset(formatCalendarDate(scheduledAt)),
    };
  }, [home?.consultationAppointment, locale, timeZone]);

  // 홈에서 입력한 첫 문장을 새 채팅방의 첫 문의로 넘긴다
  const sendToChat = () => {
    const question = draft.trim();
    if (!question) return;

    startNewChat();
    setPendingQuestion(question);
    setDraft("");
    navigate("/ai-chat");
  };

  return (
    <div className="relative flex min-h-dvh flex-col">
      <HomeBackdrop />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      <header className="relative flex items-center justify-between px-5 pt-2.5">
        <button
          type="button"
          aria-label={t("menu")}
          onClick={() => setIsHistoryOpen(true)}
          className="flex size-12 items-center justify-center rounded-[28px] bg-neutral-white/25"
        >
          <img aria-hidden src={sidebarLeft} alt="" className="size-5.25" />
        </button>

        <button
          type="button"
          aria-label={t("changeLanguage")}
          onClick={() => navigate("/settings/language")}
          className="flex size-12 items-center justify-center rounded-[28px] bg-neutral-white/25 text-neutral-white"
        >
          <span aria-hidden className="text-[1.0625rem] font-bold">
            가
            <span className="text-[0.8125rem] font-medium opacity-70">가</span>
          </span>
        </button>
      </header>

      <div className="relative mt-4 flex flex-col gap-2 px-5 text-neutral-white">
        <p className="text-title leading-[1.35] font-semibold">
          {t("progress.day", { day: dayOffset })}
          <span className="font-medium opacity-60">
            {t("progress.total", { total: cautionDays })}
          </span>
        </p>
        <h1 className="text-display leading-[1.35] font-semibold">
          {t("greeting")}
        </h1>
      </div>

      <p className="text-caption relative mx-auto mt-auto max-w-67 px-5 text-center font-medium text-neutral-white">
        {t("disclaimer")}
      </p>

      <div className="relative mt-5 px-5">
        <ChatBar
          value={draft}
          placeholder={t("chat.placeholder")}
          attachLabel={t("chat.attach")}
          sendLabel={t("chat.send")}
          onChange={setDraft}
          onSubmit={sendToChat}
        />
      </div>

      <div className="relative mt-9 flex gap-2.5 px-5 pb-15.5">
        <HomeCard
          badge={t("aftercare.badge", { day: dayOffset })}
          caption={procedureName}
          title={t("aftercare.title")}
          onClick={() => navigate("/aftercare")}
        />

        {consultation && (
          <HomeCard
            hasSymbol
            badge={t("consultation.badge", { days: consultation.daysLeft })}
            caption={t("consultation.scheduled", { date: consultation.date })}
            title={t("consultation.title")}
            onClick={() => navigate("/consultation")}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
