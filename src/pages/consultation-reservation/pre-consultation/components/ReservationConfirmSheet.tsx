import { useTranslation } from "react-i18next";

import checkIcon from "@/assets/icons/consultation/check.svg";
import noCheckIcon from "@/assets/icons/consultation/no-check.svg";
import BottomSheet from "@/components/BottomSheet/BottomSheet";
import ConsultationFooter from "@/components/Footer/ConsultationFooter";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import type {
  ConsultationReservationSlot,
  SymptomType,
} from "@/types/consultationReservation.type";
import { formatAppointmentDateTime } from "@/utils/dateTime";

import ReservationSummary from "./ReservationSummary";

interface ReservationConfirmSheetProps {
  open: boolean;
  selectedSlot: ConsultationReservationSlot | null;
  selectedSymptoms: SymptomType[];
  agreed: boolean;
  onAgreeChange: (agreed: boolean) => void;
  onClose: () => void;
  onConfirm: () => void;
}

function ReservationConfirmSheet({
  open,
  selectedSlot,
  selectedSymptoms,
  agreed,
  onAgreeChange,
  onClose,
  onConfirm,
}: ReservationConfirmSheetProps) {
  const { t } = useTranslation("consultationReservation");
  const locale = usePreferencesStore((state) => state.locale);
  const timeZone = usePreferencesStore((state) => state.timeZone);
  const scheduledAt = selectedSlot
    ? formatAppointmentDateTime(selectedSlot.startsAt, { locale, timeZone })
    : "-";
  const symptoms = selectedSymptoms
    .map((symptom) => t(`preConsultation.symptoms.options.${symptom}`))
    .join(" · ");

  return (
    <BottomSheet
      open={open}
      title={t("preConsultation.confirm.title")}
      description={t("preConsultation.confirm.description")}
      onClose={onClose}
      footer={
        <ConsultationFooter
          position="static"
          disabled={!agreed || !selectedSlot}
          onClick={onConfirm}
        >
          {t("preConsultation.confirm.submit")}
        </ConsultationFooter>
      }
    >
      <ReservationSummary
        scheduledAt={scheduledAt}
        symptoms={symptoms || "-"}
        doctorName={t("preConsultation.confirm.mockDoctor")}
      />

      <section className="mt-[30px] mb-[38px] border-t border-border-input pt-6">
        <h3 className="text-[13px] font-semibold leading-[1.4] text-action-secondary-text">
          {t("preConsultation.confirm.noticeTitle")}
        </h3>
        <ul className="mt-5 list-disc pl-5 text-xs leading-[1.5] text-text-secondary">
          <li>{t("preConsultation.confirm.notice")}</li>
        </ul>

        <label className="mt-6 flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => onAgreeChange(event.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 rounded-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"
          >
            <img
              src={agreed ? checkIcon : noCheckIcon}
              alt=""
              className="size-full"
            />
          </span>
          <span className="text-[14px] leading-[1.4] text-action-disabled-text transition-colors peer-checked:text-primary">
            {t("preConsultation.confirm.agreement")}
          </span>
        </label>
      </section>
    </BottomSheet>
  );
}

export default ReservationConfirmSheet;
