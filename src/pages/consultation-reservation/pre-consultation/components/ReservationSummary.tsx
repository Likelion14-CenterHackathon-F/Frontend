import { useTranslation } from "react-i18next";

interface ReservationSummaryProps {
  scheduledAt: string;
  symptoms: string;
  doctorName: string;
}

function ReservationSummary({
  scheduledAt,
  symptoms,
  doctorName,
}: ReservationSummaryProps) {
  const { t } = useTranslation("consultationReservation");
  const rows = [
    [t("preConsultation.confirm.summary.date"), scheduledAt],
    [t("preConsultation.confirm.summary.reason"), symptoms],
    [t("preConsultation.confirm.summary.doctor"), doctorName],
  ];

  return (
    <div className="rounded-[14px] bg-surface-notice px-4 py-5 mt-9">
      {rows.map(([label, value], index) => (
        <div
          key={label}
          className={
            index === 0
              ? "flex justify-between gap-4"
              : "mt-3 flex justify-between gap-4"
          }
        >
          <div className="shrink-0 text-[15px] text-text-secondary">
            {label}
          </div>
          <div className="text-right text-[15px] font-medium text-action-secondary-text">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReservationSummary;
