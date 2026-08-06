import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { getPatientCase } from "@/apis/patient";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { getDayOffset } from "@/utils/aftercare";
import {
  formatAppointmentDateTime,
  formatDate,
  parseCalendarDate,
} from "@/utils/dateTime";

interface SummaryItemProps {
  label: string;
  value: string;
}

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <span className="text-[11px] text-[#1F2937]">{label}</span>
      <span className="text-xs text-[#1F2937]">{value}</span>
    </div>
  );
}

function HomePage() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const locale = usePreferencesStore((state) => state.locale);
  const timeZone = usePreferencesStore((state) => state.timeZone);

  const patientCase = useMemo(() => getPatientCase(), []);
  const dateContext = { locale, timeZone };
  const dayOffset = getDayOffset(patientCase.procedureDate);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="pt-6 text-xl font-bold text-[#1F2937]">
        {t("greeting", { name: patientCase.name })}
      </h1>

      <Card title={t("aftercare.title")}>
        <div className="flex flex-wrap gap-x-4">
          <SummaryItem
            label={t("aftercare.procedureName")}
            value={patientCase.procedureName}
          />
          <SummaryItem
            label={t("aftercare.procedureDate")}
            value={formatDate(
              parseCalendarDate(patientCase.procedureDate),
              locale,
            )}
          />
          <SummaryItem
            label={t("aftercare.cautionPeriod")}
            value={t("aftercare.cautionValue", {
              day: dayOffset,
              total: patientCase.cautionDays,
            })}
          />
        </div>

        <Button className="self-start" onClick={() => navigate("/aftercare")}>
          {t("aftercare.detail")}
        </Button>
      </Card>

      <Card title={t("aiGuide.title")}>
        <p className="text-xs text-[#1F2937]">{t("aiGuide.description")}</p>
        <p className="text-[11px] text-[#1F2937]">{t("aiGuide.disclaimer")}</p>

        <Button className="self-start" onClick={() => navigate("/ai-chat")}>
          {t("aiGuide.start")}
        </Button>
      </Card>

      <Card title={t("consultation.title")}>
        {patientCase.upcomingConsultationAt ? (
          <>
            <p className="text-[11px] text-[#1F2937]">
              {t("consultation.scheduled")}
            </p>
            <p className="text-xs text-[#1F2937]">
              {formatAppointmentDateTime(
                patientCase.upcomingConsultationAt,
                dateContext,
              )}
            </p>
            <p className="text-[11px] text-[#1F2937]">
              {t("consultation.entryNotice")}
            </p>
          </>
        ) : (
          <p className="text-[11px] text-[#1F2937]">{t("consultation.none")}</p>
        )}

        <Button className="self-start" onClick={() => navigate("/consultation")}>
          {t("consultation.detail")}
        </Button>
      </Card>
    </div>
  );
}

export default HomePage;
