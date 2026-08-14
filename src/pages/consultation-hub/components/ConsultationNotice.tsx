import { useTranslation } from "react-i18next";

import errorIcon from "@/assets/icons/consultation/error.svg";

function ConsultationNotice() {
  const { t } = useTranslation("consultationHub");

  return (
    <aside className="mt-4 rounded-[18px] bg-[#ECECF3] p-5">
      <div className="flex items-center gap-1">
        <img src={errorIcon} alt="" className="size-6 shrink-0" />

        <h3 className="text-base font-semibold tracking-[-0.4px] text-[#4B4B4E]">
          {t("notice.title")}
        </h3>
      </div>

      <ul className="mt-1.5 flex list-disc flex-col gap-1.5 pl-[25px] text-sm leading-[1.4] text-[#65646D]">
        <li>{t("notice.items.device")}</li>
        <li>{t("notice.items.recording")}</li>
      </ul>
    </aside>
  );
}

export default ConsultationNotice;
