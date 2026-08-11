import { useTranslation } from "react-i18next";

function WaitingCheckListSection() {
  const { t } = useTranslation("consultationWaiting");

  return (
    <section className="rounded-[10px] bg-[#F6F6F6] px-[17px] py-[15px]">
      <h2 className="text-sm text-[#3E3E3E] font-medium ">
        {t("checklist.title")}
      </h2>

      <ul className="mt-[6px] text-xs leading-5 text-[#6D6D6D]">
        <li>· {t("checklist.items.purpose")}</li>
        <li>· {t("checklist.items.recording")}</li>
        <li>· {t("checklist.items.orientation")}</li>
      </ul>
    </section>
  );
}

export default WaitingCheckListSection;
