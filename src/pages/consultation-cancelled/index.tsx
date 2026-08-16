import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ConsultationFooter from "@/components/Footer/ConsultationFooter";
import ConsultationHeader from "@/components/Header/ConsultationHeader";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import type { CancelledAppointmentNavigationState } from "@/types/consultationReservation.type";
import { formatConsultationCardDateTime } from "@/utils/dateTime";

interface InformationRowProps {
  label: string;
  value: string;
}

function InformationRow({ label, value }: InformationRowProps) {
  return (
    <div className="flex items-start justify-between gap-5 text-[15px] leading-[1.4] tracking-tight">
      <dt className="shrink-0 text-[#7B7A80]">{label}</dt>
      <dd className="text-right font-medium text-[#4B4B4E]">{value}</dd>
    </div>
  );
}

function ConsultationCancelledPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation("consultationReservation");
  const locale = usePreferencesStore((value) => value.locale);
  const timeZone = usePreferencesStore((value) => value.timeZone);
  const cancellation = state as CancelledAppointmentNavigationState | null;

  if (!cancellation?.cancelledAt || !cancellation.startsAt) {
    return <Navigate to="/consultation" replace />;
  }

  const dateContext = { locale, timeZone };
  const cancelReason = t(
    `confirmed.cancelSheet.reasons.${cancellation.cancelReason}`,
  );

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#FCFCFC] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_54%_7%,rgba(222,219,248,0.72),transparent_40%),radial-gradient(circle_at_6%_67%,rgba(233,230,250,0.58),transparent_38%),radial-gradient(circle_at_92%_76%,rgba(225,222,246,0.46),transparent_36%)]">
      <ConsultationHeader
        title={t("schedule.headerTitle")}
        onBack={() => navigate("/consultation", { replace: true })}
        className="relative z-10 bg-transparent"
      />

      <main className="relative z-10 flex-1 px-5 pb-[calc(144px+env(safe-area-inset-bottom))] pt-10.5">
        <h1 className="text-2xl font-semibold leading-[1.4] tracking-tight text-[#32303A]">
          {t("cancelled.title", { defaultValue: "예약을 취소했어요" })}
        </h1>

        <div className="mt-[52px] flex flex-col gap-[52px]">
          <section>
            <h2 className="text-xl font-semibold leading-[1.4] tracking-tight text-[#32303A]">
              {t("cancelled.cancelInfo", { defaultValue: "취소 정보" })}
            </h2>
            <dl className="mt-6 flex flex-col gap-4">
              <InformationRow
                label={t("cancelled.cancelledAt", {
                  defaultValue: "취소 일시",
                })}
                value={formatConsultationCardDateTime(
                  cancellation.cancelledAt,
                  dateContext,
                )}
              />
              <InformationRow
                label={t("cancelled.cancelReason", {
                  defaultValue: "취소 사유",
                })}
                value={cancelReason}
              />
            </dl>
          </section>

          <section>
            <h2 className="text-xl font-semibold leading-[1.4] tracking-tight text-[#32303A]">
              {t("confirmed.infoTitle")}
            </h2>
            <dl className="mt-6 flex flex-col gap-4">
              <InformationRow
                label={t("confirmed.summary.date")}
                value={formatConsultationCardDateTime(
                  cancellation.startsAt,
                  dateContext,
                )}
              />
              <InformationRow
                label={t("confirmed.summary.reason")}
                value={cancellation.symptoms}
              />
              <InformationRow
                label={t("confirmed.summary.doctor")}
                value={cancellation.doctor}
              />
            </dl>
          </section>
        </div>
      </main>

      <ConsultationFooter
        onClick={() => navigate("/consultation", { replace: true })}
        className="bg-[#FCFCFC]"
        buttonClassName="bg-action-secondary text-action-secondary-text"
      >
        {t("cancelled.close", { defaultValue: "닫기" })}
      </ConsultationFooter>
    </div>
  );
}

export default ConsultationCancelledPage;
