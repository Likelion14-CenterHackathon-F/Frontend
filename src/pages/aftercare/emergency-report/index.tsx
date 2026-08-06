import { useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { getMedicalReport } from "@/apis/patient";

interface SectionProps {
  title: string;
  titleEn: string;
  children: ReactNode;
}

function Section({ title, titleEn, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-3 pt-7">
      <div className="flex flex-col border-b-2 border-black pb-2.5">
        <h2 className="text-base leading-6 font-black text-black">{title}</h2>
        <p className="text-[11px] leading-4 text-[#555] uppercase">{titleEn}</p>
      </div>

      <dl className="flex flex-col">{children}</dl>
    </section>
  );
}

interface RowProps {
  label: string;
  children: ReactNode;
}

function Row({ label, children }: RowProps) {
  return (
    <div className="flex border-b border-[#E0E0E0]">
      <dt className="w-[133px] shrink-0 px-1 py-3 text-[13px] leading-5 font-bold text-black">
        {label}
      </dt>
      <dd className="flex-1 px-1 py-3 text-sm leading-[21px] text-[#222]">
        {children}
      </dd>
    </div>
  );
}

function EmergencyReportPage() {
  const { t } = useTranslation("report");
  const navigate = useNavigate();
  const report = useMemo(() => getMedicalReport(), []);

  return (
    <div className="flex flex-col gap-1 bg-white px-5 py-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate("/aftercare")}
          aria-label={t("close")}
          className="text-2xl leading-9 font-light text-black"
        >
          ✕
        </button>
      </div>

      <h1 className="pt-3 text-[22px] leading-8 font-black tracking-[-0.5px] text-black uppercase">
        {t("title")}
      </h1>
      <p className="pb-5 text-sm leading-[21px] text-[#555]">{t("subtitle")}</p>

      <div className="flex flex-col gap-2 border-2 border-black p-[18px]">
        <p className="text-[13px] leading-5 font-bold text-black">
          {t("disclaimer")}
        </p>
        <p className="text-[11px] leading-4 text-[#333]">{t("disclaimerEn")}</p>
      </div>

      <Section title={t("patient.title")} titleEn="Patient Information">
        <Row label={t("patient.name")}>{report.name}</Row>
        <Row label={t("patient.birthDate")}>{report.birthDate}</Row>
        <Row label={t("patient.gender")}>{t(`gender.${report.gender}`)}</Row>
      </Section>

      <Section title={t("procedure.title")} titleEn="Procedure Details">
        <Row label={t("procedure.date")}>{report.procedureDate}</Row>
        <Row label={t("procedure.name")}>
          <span className="block">{report.procedureName}</span>
          <span className="block text-xs leading-[18px] text-[#555]">
            {report.procedureNameEn}
          </span>
        </Row>
        <Row label={t("procedure.materials")}>
          {report.materials.map((material: string) => (
            <span key={material} className="block">
              {material}
            </span>
          ))}
        </Row>
      </Section>

      <Section title={t("medication.title")} titleEn="Medication &amp; Allergies">
        <Row label={t("medication.medications")}>
          <ul className="list-disc pl-4">
            {report.medications.map((medication: string) => (
              <li key={medication}>{medication}</li>
            ))}
          </ul>
        </Row>
        <Row label={t("medication.allergies")}>
          <span className="underline">{report.allergies}</span>
        </Row>
      </Section>

      <Section title={t("emergency.title")} titleEn="Emergency Contacts">
        <Row label={t("emergency.clinic")}>
          <a href={`tel:${report.clinicHotline}`} className="underline">
            {report.clinicHotline}
          </a>
        </Row>
        <Row label={t("emergency.guardian")}>
          <a href={`tel:${report.guardianPhone}`} className="underline">
            {report.guardianPhone}
          </a>
        </Row>
      </Section>

      <div className="mt-9 h-px w-full bg-black" />
    </div>
  );
}

export default EmergencyReportPage;
