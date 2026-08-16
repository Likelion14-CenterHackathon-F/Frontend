import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import noHistoryIcon from "@/assets/icons/consultation/no-history.svg";
import Button from "@/components/Button/Button";

function EmptyConsultation() {
  const { t } = useTranslation("consultationHub");
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[640px] flex-col items-center px-5">
      <img
        src={noHistoryIcon}
        alt={t("empty.imageAlt")}
        className="h-[86px] w-[70px] mt-[156px]"
      />

      <p className="mt-[22px] text-center text-[15px] leading-[1.6] tracking-[-0.375px] text-[#65646D]">
        {t("empty.title")}
        <br />
        {t("empty.description")}
      </p>

      <Button
        variant="neutral"
        size="compact"
        className="mt-[22px] border border-[#D5D3DC] bg-transparent font-medium text-[#4B4B4E]"
        onClick={() => navigate("/consultation/reservation")}
      >
        {t("empty.reservationButton")}
      </Button>
    </div>
  );
}

export default EmptyConsultation;
