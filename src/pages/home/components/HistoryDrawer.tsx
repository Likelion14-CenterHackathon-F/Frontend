import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { getQuestionHistory } from "@/apis/chat";
import logoDark from "@/assets/logo-dark.svg";
import { cn } from "@/utils/cn";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function HistoryDrawer({ isOpen, onClose }: HistoryDrawerProps) {
  const { t } = useTranslation("settings");
  const groups = useMemo(() => getQuestionHistory(), []);

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
            allway
          </span>
        </header>

        {groups.map((group) => (
          <section key={group.id} className="mt-6 px-5">
            <h2 className="text-[1.125rem] leading-normal font-semibold tracking-tight text-text-history px-3">
              {t(`history.${group.id}`)}
            </h2>

            <ul className="mt-2">
              {group.questions.map((question, index) => (
                <li key={question}>
                  <button
                    type="button"
                    tabIndex={isOpen ? 0 : -1}
                    onClick={onClose}
                    className={cn(
                      "text-body flex h-12 w-full items-center rounded-xl px-3 text-left text-text-history",
                      // 가장 최근 질문만 강조된다
                      group.id === "today" && index === 0 && "bg-primary-10",
                    )}
                  >
                    {question}
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
