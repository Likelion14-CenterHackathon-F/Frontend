import { useTranslation } from "react-i18next";

type ConsultationTab = "history" | "ongoing";

interface ConsultationTabsProps {
  activeTab: ConsultationTab;
  onChange: (tab: ConsultationTab) => void;
}

function ConsultationTabs({ activeTab, onChange }: ConsultationTabsProps) {
  const { t } = useTranslation("consultationHub");

  return (
    <nav
      aria-label={t("tabs.label")}
      className="flex h-[52px] items-end gap-6 px-5"
    >
      <button
        type="button"
        onClick={() => onChange("history")}
        className="flex w-20 flex-col items-center justify-between gap-3"
      >
        <span
          className={[
            "transition-colors duration-200",
            "text-lg tracking-[-0.45px]",
            activeTab === "history"
              ? "font-semibold text-[#32303A]"
              : "font-medium text-[#7B7A80]",
          ].join(" ")}
        >
          {t("tabs.history")}
        </span>

        <span
          className={[
            "transition-colors duration-200",
            "h-[2.5px] w-[68px]",
            activeTab === "history" ? "bg-[#32303A]" : "bg-transparent",
          ].join(" ")}
        />
      </button>

      <button
        type="button"
        onClick={() => onChange("ongoing")}
        className="flex w-20 flex-col items-center justify-between gap-3 transition-colors"
      >
        <span
          className={[
            "transition-colors duration-200",
            "text-lg tracking-[-0.45px]",
            activeTab === "ongoing"
              ? "font-semibold text-[#32303A]"
              : "font-medium text-[#7B7A80]",
          ].join(" ")}
        >
          {t("tabs.ongoing")}
        </span>

        <span
          className={[
            "transition-colors duration-200",
            "h-[2.5px] w-[68px]",
            activeTab === "ongoing" ? "bg-[#32303A]" : "bg-transparent",
          ].join(" ")}
        />
      </button>
    </nav>
  );
}

export default ConsultationTabs;
