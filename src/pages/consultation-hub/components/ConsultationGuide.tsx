import { useTranslation } from "react-i18next";

const guideKeys = ["video", "requirements", "agreement"] as const;

function ConsultationGuide() {
  const { t } = useTranslation("consultationHub");

  return (
    <>
      <h2 className="text-base font-semibold tracking-[-0.4px] text-[#4B4B4E]">
        {t("guide.title")}
      </h2>

      <ul className="mt-[14px] flex flex-col gap-[14px]">
        {guideKeys.map((key) => (
          <li key={key} className="pl-5">
            <p className="relative text-[15px] font-medium leading-[1.4] text-[#504E59] before:absolute before:-left-[14px] before:content-['•']">
              {t(`guide.items.${key}.title`)}
            </p>

            <p className="mt-1.5 text-[13px] leading-[1.4] text-[#7B7A80]">
              {t(`guide.items.${key}.description`)}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ConsultationGuide;
