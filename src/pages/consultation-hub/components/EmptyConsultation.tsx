import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import noHistoryIcon from "@/assets/icons/consultation/no-history.svg";
import Button from "@/components/Button/Button";

function EmptyConsultation() {
  const { t } = useTranslation("consultationHub");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center px-5 pb-21 pt-32.5">
      <img src={noHistoryIcon} alt={t("empty.imageAlt")} />

      <p className="mt-6 text-center text-base leading-[1.6] tracking-[-0.4px] text-[#65646D]">
        {t("empty.title")}
        <br />
        {t("empty.description")}
      </p>

      <Button
        variant="neutral"
        size="compact"
        className="mt-[26px]"
        onClick={() => navigate("/consultation/reservation")}
      >
        {t("empty.reservationButton")}
      </Button>
    </div>
  );
}

export default EmptyConsultation;
