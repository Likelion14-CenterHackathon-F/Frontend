import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getChatRoomMessages, postSymptomMessage } from "@/apis/chat";
import { getAftercareHome } from "@/apis/patient";
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
import AiAnswer from "./components/AiAnswer";
import ChatComposer from "./components/ChatComposer";
import PatientMessage from "./components/PatientMessage";

function HomePage() {
  const { t } = useTranslation(["home", "aiChat"]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const locale = usePreferencesStore((state) => state.locale);
  const timeZone = usePreferencesStore((state) => state.timeZone);
  const roomId = useChatStore((state) => state.roomId);
  const openRoom = useChatStore((state) => state.openRoom);

  const [draft, setDraft] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isChatFocused, setIsChatFocused] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: home } = useQuery({
    queryKey: ["aftercare", "home"],
    queryFn: getAftercareHome,
  });

  const { data: room } = useQuery({
    queryKey: ["aiChat", "room", roomId],
    queryFn: () => getChatRoomMessages(roomId as number),
    enabled: roomId !== null,
  });

  const messages = useMemo(() => room?.messages ?? [], [room]);

  const {
    mutate: send,
    isPending: isAnswering,
    variables: sending,
  } = useMutation({
    mutationFn: postSymptomMessage,
    onSuccess: (data) => {
      openRoom(data.roomId);
      queryClient.setQueryData(["aiChat", "room", data.roomId], data);
      // 마지막 대화 시각이 바뀌어 채팅방 목록 순서도 달라진다
      void queryClient.invalidateQueries({ queryKey: ["aiChat", "rooms"] });
    },
    onSettled: () => {
      // 답변에 첨부 이미지가 담겨 돌아온 뒤에야 임시 미리보기를 지운다
      setImage(null);
      setImagePreview(null);
    },
  });

  const isConversationActive = messages.length > 0 || isAnswering;

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

  useEffect(() => {
    if (!isConversationActive) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isAnswering, isConversationActive]);

  // 미리보기로 만든 objectURL은 이미지가 바뀌거나 화면을 떠날 때 정리한다
  useEffect(() => {
    if (!imagePreview) return;

    return () => URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  const selectImage = (file: File) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const sendToChat = () => {
    const question = draft.trim();
    if ((!question && !image) || isAnswering) return;

    send({
      roomId: roomId ?? undefined,
      question,
      image: image ?? undefined,
    });

    setDraft("");
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
                message.role === "USER" ? (
                  <PatientMessage
                    key={message.messageId}
                    text={message.content}
                    imageUrl={message.imageUrl ?? undefined}
                    imageAlt={t("aiChat:attachedImage")}
                    variant="home"
                  />
                ) : (
                  <AiAnswer
                    key={message.messageId}
                    content={message.content}
                    variant="home"
                  />
                ),
              )}

              {isAnswering && (
                <>
                  {sending && (
                    <PatientMessage
                      text={sending.question}
                      imageUrl={imagePreview ?? undefined}
                      imageAlt={t("aiChat:attachedImage")}
                      variant="home"
                    />
                  )}

                  <div className="flex w-50 flex-col gap-4">
                    <img aria-hidden src={logoDark} alt="" className="size-7" />
                    <p className="bg-linear-to-r from-[#473787] from-27% to-[#c2b3fb] bg-clip-text text-[0.9375rem] leading-[1.4] font-medium tracking-tight text-transparent opacity-60">
                      {t("aiChat:thinking")}
                    </p>
                  </div>
                </>
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
              hasImage={image !== null}
              isAnswering={isAnswering}
              variant="home"
              onChange={setDraft}
              onSubmit={sendToChat}
              onImageSelect={selectImage}
              onStop={() => undefined}
            />
          </div>
        </>
      ) : (
        <>
          <div className="relative mx-auto mt-14 flex max-w-75 flex-col items-center gap-2 px-5 text-center">
            <p className="text-text-02 text-[1.25rem] leading-[1.45] font-medium tracking-tight">
              {t("progress.day", { day: dayOffset })}
              {t("progress.total", { total: cautionDays })}
            </p>
            <h1 className="text-title text-greeting font-bold tracking-tight">
              {t("greeting")}
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
              hasImage={image !== null}
              onChange={setDraft}
              onSubmit={sendToChat}
              onImageSelect={selectImage}
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
              caption={procedureName}
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
