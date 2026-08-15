import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getChatRoomMessages, postSymptomMessage } from "@/apis/chat";
import logo from "@/assets/logo.svg";
import sidebarLeft from "@/assets/sidebar-left.svg";
import { useChatStore } from "@/stores/useChatStore";

import AiAnswer from "./components/AiAnswer";
import ChatBackdrop from "./components/ChatBackdrop";
import ChatComposer from "./components/ChatComposer";
import PatientMessage from "./components/PatientMessage";

// 대화가 안내 문구에 이만큼 가까워지면 지워지기 시작
const NOTICE_FADE_DISTANCE = 80;
const NOTICE_MAX_OPACITY = 0.7;

function AiChatPage() {
  const { t } = useTranslation("aiChat");
  const queryClient = useQueryClient();

  const roomId = useChatStore((state) => state.roomId);
  const openRoom = useChatStore((state) => state.openRoom);
  const startNewChat = useChatStore((state) => state.startNewChat);
  const pendingQuestion = useChatStore((state) => state.pendingQuestion);
  const setPendingQuestion = useChatStore((state) => state.setPendingQuestion);

  const [draft, setDraft] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [noticeOpacity, setNoticeOpacity] = useState(NOTICE_MAX_OPACITY);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const noticeRef = useRef<HTMLParagraphElement>(null);

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

  // 홈 화면에서 입력하고 넘어온 첫 문장을 그대로 이어서 보낸다
  useEffect(() => {
    if (!pendingQuestion) return;

    send({ question: pendingQuestion });
    setPendingQuestion(null);
  }, [pendingQuestion, send, setPendingQuestion]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAnswering]);

  // 미리보기로 만든 objectURL은 이미지가 바뀌거나 화면을 떠날 때 정리한다
  useEffect(() => {
    if (!imagePreview) return;

    return () => URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  /*
    대화가 안내 문구에 가까워질수록 문구를 옅게 만든다.
    딱 닿는 순간 사라지면 눈에 띄어서, 여유 구간을 두고 서서히 지우게 구현하였다
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

  const handleSubmit = () => {
    const question = draft.trim();
    if (!question || isAnswering) return;

    send({
      roomId: roomId ?? undefined,
      question,
      image: image ?? undefined,
    });

    setDraft("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleNewChat = () => {
    startNewChat();
    setDraft("");
    setImage(null);
    setImagePreview(null);
  };

  const isEmptyRoom = messages.length === 0 && !isAnswering;

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
        {isEmptyRoom && (
          <div className="flex flex-col gap-6.5 ps-4">
            <img aria-hidden src={logo} alt="" className="size-7" />
            <h1 className="text-2xl leading-[1.4] font-semibold tracking-tight">
              {t("greeting")}
            </h1>
          </div>
        )}

        <div ref={contentRef} className="flex flex-col gap-10">
          {messages.map((message) =>
            message.role === "USER" ? (
              <PatientMessage
                key={message.messageId}
                text={message.content}
                imageUrl={message.imageUrl ?? undefined}
                imageAlt={t("attachedImage")}
              />
            ) : (
              <AiAnswer key={message.messageId} content={message.content} />
            ),
          )}

          {isAnswering && (
            <>
              {sending && (
                <PatientMessage
                  text={sending.question}
                  imageUrl={imagePreview ?? undefined}
                  imageAlt={t("attachedImage")}
                />
              )}

              <div className="flex flex-col gap-6">
                <img aria-hidden src={logo} alt="" className="size-7" />
                <p className="text-body leading-normal font-medium opacity-90">
                  {t("thinking")}
                </p>
              </div>
            </>
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
            if (!file) return;

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
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
          onStop={() => undefined}
        />
      </div>
    </div>
  );
}

export default AiChatPage;
