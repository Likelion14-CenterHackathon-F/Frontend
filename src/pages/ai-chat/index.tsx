import { useEffect, useRef, useState, type FormEvent } from "react";
import { Trans, useTranslation } from "react-i18next";

import { useChatStore } from "@/stores/useChatStore";

function GuidanceList({ titleKey, itemsKey }: { titleKey: string; itemsKey: string }) {
  const { t } = useTranslation("aiChat");
  const items = t(itemsKey, { returnObjects: true }) as string[];

  return (
    <div className="flex flex-col gap-1.5 rounded border-l-2 border-black bg-[#F9F9F9] py-2.5 pr-3 pl-3.5">
      <h3 className="text-xs font-bold text-black">{t(titleKey)}</h3>
      <ul className="flex list-disc flex-col gap-[3px] pl-4">
        {items.map((item) => (
          <li key={item} className="text-xs leading-[15.6px] text-[#333]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AiGuidance() {
  const { t } = useTranslation("aiChat");

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex w-fit flex-col rounded border border-black bg-[#F9F9F9] px-3 py-3">
        <h3 className="border-b border-[#DDD] pb-2 text-xs font-bold text-black">
          {t("analysis.title")}
        </h3>

        <dl className="flex flex-col gap-1 pt-3 text-xs">
          <div className="flex gap-1">
            <dt className="text-[#666]">{t("analysis.statusLabel")}</dt>
            <dd className="font-bold text-black">{t("analysis.status")}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-[#666]">{t("analysis.doctorLabel")}</dt>
            <dd className="font-bold text-black">{t("analysis.doctor")}</dd>
          </div>
        </dl>
      </div>

      <GuidanceList titleKey="reassuring.title" itemsKey="reassuring.items" />
      <GuidanceList titleKey="lifestyle.title" itemsKey="lifestyle.items" />
      <GuidanceList titleKey="redFlags.title" itemsKey="redFlags.items" />

      <div className="flex flex-col gap-1 rounded border-l-2 border-black bg-[#F5F5F5] py-2 pr-4 pl-3">
        <p className="text-xs leading-[15.6px] font-bold text-[#333]">
          {t("notice.title")}
        </p>
        <p className="text-xs leading-[15.6px] text-[#333]">{t("notice.body")}</p>
      </div>
    </div>
  );
}

function AiChatPage() {
  const { t } = useTranslation("aiChat");
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);

  const [draft, setDraft] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const text = draft.trim();
    if (!text && !imageUrl) return;

    addMessage({
      id: crypto.randomUUID(),
      role: "patient",
      kind: "text",
      text: text || undefined,
      imageUrl: imageUrl ?? undefined,
    });

    // 실제로는 여기서 AI 분석 API를 호출한다. 명세 확정 전까지 고정 응답을 붙인다.
    addMessage({
      id: crypto.randomUUID(),
      role: "ai",
      kind: "guidance",
    });

    setDraft("");
    setImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div className="rounded border border-[#DDD] bg-[#F5F5F5] px-3 py-3 text-[13px] leading-[18.2px] text-black">
          <Trans
            t={t}
            i18nKey="welcome"
            components={[<span className="font-bold" />]}
          />
        </div>

        {messages.map((message) =>
          message.role === "patient" ? (
            <div key={message.id} className="flex flex-col items-end gap-1">
              {message.text && (
                <p className="max-w-[80%] rounded bg-black px-3 py-2.5 text-[13px] leading-[18.2px] text-white">
                  {message.text}
                </p>
              )}
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt={t("attachedImage")}
                  className="size-[60px] rounded border border-[#999] object-cover"
                />
              )}
            </div>
          ) : (
            <AiGuidance key={message.id} />
          ),
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 flex items-end gap-1.5 bg-white p-2"
      >
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={t("inputPlaceholder")}
          className="min-w-0 flex-1 rounded border border-[#999] px-3 py-2.5 text-[13px] text-black placeholder:text-[#999]"
        />

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

        <button
          type="button"
          aria-label={t("attach")}
          onClick={() => fileInputRef.current?.click()}
          className="size-9 shrink-0 rounded border border-[#999] bg-white text-base"
        >
          📎
        </button>

        <button
          type="submit"
          aria-label={t("send")}
          className="size-9 shrink-0 rounded border border-black bg-black text-base text-white"
        >
          ➤
        </button>
      </form>
    </div>
  );
}

export default AiChatPage;
