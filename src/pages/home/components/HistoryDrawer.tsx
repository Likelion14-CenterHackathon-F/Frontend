import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getChatRooms } from "@/apis/chat";
import logoDark from "@/assets/logo-dark.svg";
import { useChatStore } from "@/stores/useChatStore";
import type { ChatRoomSummary } from "@/types/aiChat.type";
import { cn } from "@/utils/cn";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DAY_MS = 24 * 60 * 60 * 1000;

type GroupId = "today" | "lastWeek";

/*
  서버는 채팅방을 최근 대화순으로만 내려주므로,
  화면에 필요한 "오늘 / 지난 7일" 구분은 여기서 나눈다.
  7일보다 오래된 대화는 목록에 넣지 않는다.
*/
function groupRooms(rooms: ChatRoomSummary[]) {
  const now = Date.now();
  const startOfToday = new Date().setHours(0, 0, 0, 0);

  const groups: { id: GroupId; rooms: ChatRoomSummary[] }[] = [
    { id: "today", rooms: [] },
    { id: "lastWeek", rooms: [] },
  ];

  for (const room of rooms) {
    const time = new Date(room.lastMessageAt).getTime();

    if (time >= startOfToday) {
      groups[0].rooms.push(room);
    } else if (now - time <= 7 * DAY_MS) {
      groups[1].rooms.push(room);
    }
  }

  return groups.filter((group) => group.rooms.length > 0);
}

function HistoryDrawer({ isOpen, onClose }: HistoryDrawerProps) {
  const { t } = useTranslation("settings");
  const navigate = useNavigate();

  const openRoom = useChatStore((state) => state.openRoom);

  const { data: rooms } = useQuery({
    queryKey: ["aiChat", "rooms"],
    queryFn: getChatRooms,
    enabled: isOpen,
  });

  const groups = useMemo(() => groupRooms(rooms ?? []), [rooms]);

  // 열려 있는 동안 뒤 화면이 스크롤되지 않도록 막는다
  useEffect(() => {
    if (!isOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, onClose]);

  const handleSelect = (roomId: number) => {
    openRoom(roomId);
    onClose();
    navigate("/ai-chat");
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        isOpen ? "visible" : "invisible delay-300",
      )}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label={t("history.close")}
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-neutral-black/30 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        aria-label={t("history.title")}
        className={cn(
          "bg-history absolute inset-y-0 left-0 w-[85%] max-w-90 overflow-y-auto",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <header className="flex items-center gap-3 px-5 pt-5 pb-4">
          <img src={logoDark} alt="" aria-hidden className="size-7" />
          <span className="text-heading font-semibold text-text-01">
            Kanage
          </span>
        </header>

        {groups.map((group) => (
          <section key={group.id} className="mt-6 px-5">
            <h2 className="text-[1.125rem] leading-normal font-semibold tracking-tight text-text-history px-3">
              {t(`history.${group.id}`)}
            </h2>

            <ul className="mt-2">
              {group.rooms.map((room, index) => (
                <li key={room.roomId}>
                  <button
                    type="button"
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => handleSelect(room.roomId)}
                    className={cn(
                      "text-body flex h-12 w-full items-center rounded-xl px-3 text-left text-text-history",
                      // 가장 최근 질문만 강조된다
                      group.id === "today" && index === 0 && "bg-primary-10",
                    )}
                  >
                    <span className="truncate">{room.roomTitle}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </aside>
    </div>
  );
}

export default HistoryDrawer;
