import { useTranslation } from "react-i18next";

type ConsultationTab = "history" | "ongoing";

interface ConsultationTabsProps {
  activeTab: ConsultationTab;
  ongoingCount: number;
  onChange: (tab: ConsultationTab) => void;
}

function ConsultationTabs({
  activeTab,
  ongoingCount,
  onChange,
}: ConsultationTabsProps) {
  const { t } = useTranslation("consultationHub");

  const tabClassName = (isActive: boolean) =>
    [
      "flex items-center justify-center overflow-hidden rounded-[30px]",
      "px-[22px] py-4 text-base font-medium leading-[1.4] tracking-[-0.4px]",
      "transition-colors duration-200",
      isActive
        ? "bg-[#FDFDFF] text-[#32303A]"
        : "bg-[rgba(253,253,255,0.44)] text-[#6A6581]",
    ].join(" ");

  return (
    <nav
      aria-label={t("tabs.label")}
      className="flex items-center gap-3 px-5 pt-5"
    >
      <button
        type="button"
        onClick={() => onChange("history")}
        className={tabClassName(activeTab === "history")}
      >
        {t("tabs.history")}
      </button>

      <button
        type="button"
        onClick={() => onChange("ongoing")}
        className={tabClassName(activeTab === "ongoing")}
      >
        <span>{t("tabs.ongoing")}</span>
        {ongoingCount > 0 && (
          <span className="ml-1.5 max-w-[42px] font-semibold text-[#684BDB]">
            {ongoingCount}건
          </span>
        )}
      </button>
    </nav>
  );
}

export default ConsultationTabs;
