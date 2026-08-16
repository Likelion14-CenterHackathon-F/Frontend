import { useTranslation } from "react-i18next";

function WaitingCheckListSection() {
  const { t } = useTranslation("consultationWaiting");

  return (
    <section className="rounded-[18px] bg-black/5 px-[17px] py-[15px]">
      <h2 className="text-sm font-medium leading-[1.4] tracking-[-0.35px] text-[#3E3E3E]">
        {t("checklist.title")}
      </h2>

      <ul className="mt-1.5 flex flex-col gap-1.5 text-xs leading-normal text-[#6D6D6D]">
        <li>· {t("checklist.items.purpose")}</li>
        <li>· {t("checklist.items.recording")}</li>
        <li>· {t("checklist.items.orientation")}</li>
      </ul>
    </section>
  );
}

export default WaitingCheckListSection;
