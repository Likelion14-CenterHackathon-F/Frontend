import { useTranslation } from "react-i18next";

function SubTitleSection() {
  const { t } = useTranslation("consultationReservation");

  return (
    <section>
      <h1 className="text-calendar-text text-2xl font-bold leading-[1.4] tracking-tight">
        {t("preConsultation.title.first")}
        <br />
        {t("preConsultation.title.second")}
      </h1>
      <p className="mt-1 text-base leading-[1.4] tracking-tight text-text-secondary">
        {t("preConsultation.description")}
      </p>
    </section>
  );
}

export default SubTitleSection;
