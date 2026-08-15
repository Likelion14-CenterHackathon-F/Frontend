import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import xIcon from "@/assets/x.svg";

const REPORT = {
  patientName: "김지수",
  patientNameEn: "KIM, JISOO",
  birthDate: "1995.06.20",
  gender: "여성",
  genderEn: "Female",
  procedureDate: "2026.07.16",
  procedureName: "복합 레이저 토닝",
  procedureNameEn: "Complex Laser Toning",
  materials: [
    "국소 마취 크림 (Lidocaine 9.6%)",
    "피부 쿨링 겔 (Medical Cooling Gel)",
  ],
  medications: ["세파클러 (Cefaclor) - 항생제"],
  allergies: [
    "페니실린 (Penicillin) 계열",
    "이부프로펜 (Ibuprofen) - 진통소염제",
  ],
  clinicHotline: "+82-2-1234-5678",
  guardianPhone: "+82-10-9876-5432",
};

interface SectionProps {
  title: string;
  titleEn: string;
  children: ReactNode;
}

function Section({ title, titleEn, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-3.5 pt-9">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-[18px] leading-[1.5] font-semibold tracking-[-0.45px] text-[#32303a]">
          {title}
        </h2>
        <p className="text-xs leading-[1.4] text-[#7b7a80] uppercase">
          {titleEn}
        </p>
        <div className="mt-1.5 h-px w-full bg-[#e0e0e0]" />
      </div>

      <dl className="flex flex-col">{children}</dl>
    </section>
  );
}

interface RowProps {
  label: string;
  labelEn: string;
  children: ReactNode;
}

function Row({ label, labelEn, children }: RowProps) {
  return (
    <div className="flex items-start">
      <dt className="w-[117px] shrink-0 py-2 text-[15px] leading-[1.4] font-medium tracking-[-0.375px] text-[#302f31]">
        {label} <span className="whitespace-nowrap">({labelEn})</span>
      </dt>
      <dd className="flex-1 py-2 text-[15px] leading-[1.4] tracking-[-0.375px] text-[#4b4b4e]">
        {children}
      </dd>
    </div>
  );
}

function EmergencyReportPage() {
  const { t } = useTranslation("report");
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-[#fcfcfc] px-5 pt-16.5 pb-12">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label={t("close")}
          className="flex size-14 items-center justify-center rounded-full bg-[#e6e6e6]/50"
        >
          <img aria-hidden src={xIcon} alt="" className="size-6" />
        </button>
      </div>

      <div className="mt-1.5 flex flex-col gap-2.5">
        <h1 className="text-[32px] leading-[1.5] font-semibold tracking-[-0.8px] text-[#32303a]">
          지수님의
          <br />
          의료 요약 리포트
        </h1>
        <p className="text-xl leading-[1.4] text-[#7b7a80]">
          Global Medical Summary
        </p>
      </div>

      <div className="mt-9 flex flex-col gap-4">
        <p className="text-sm leading-[1.4] text-[#9795a0]">
          본 문서는 환자의 응급 상황 발생 시 현지 의료진의 판단을 돕기 위한 참고
          자료입니다. 정식 의료 진단을 대체하지 않습니다.
        </p>
        <p className="text-sm leading-[1.4] text-[#9795a0]">
          NOTICE: This document is provided solely as a reference to assist
          local medical professionals in emergencies. It does not replace a
          formal medical diagnosis.
        </p>
        <div className="h-px w-full bg-[#e0e0e0]" />
      </div>

      <Section title="환자 기본 정보" titleEn="Patient Information">
        <Row label="성명" labelEn="Name">
          {REPORT.patientName} ({REPORT.patientNameEn})
        </Row>
        <Row label="생년월일" labelEn="DOB">
          {REPORT.birthDate}
        </Row>
        <Row label="성별" labelEn="Gender">
          {REPORT.gender} ({REPORT.genderEn})
        </Row>
      </Section>

      <Section title="시술 기록" titleEn="Procedure Details">
        <Row label="시술일자" labelEn="Date">
          {REPORT.procedureDate}
        </Row>
        <Row label="시술 명칭" labelEn="Procedure">
          <span className="block">{REPORT.procedureName}</span>
          <span className="block text-xs leading-[1.375] text-[#7b7a80] uppercase">
            ({REPORT.procedureNameEn})
          </span>
        </Row>
        <Row label="사용 재료" labelEn="Materials">
          {REPORT.materials.map((material) => (
            <span key={material} className="block">
              {material}
            </span>
          ))}
        </Row>
      </Section>

      <Section title="약물 및 알레르기" titleEn="Medication & Allergies">
        <Row label="처방/복용 약물" labelEn="Medications">
          {REPORT.medications.map((medication) => (
            <span key={medication} className="block">
              {medication}
            </span>
          ))}
        </Row>
        {REPORT.allergies.map((allergy) => (
          <Row key={allergy} label="알레르기 반응" labelEn="Allergies">
            {allergy}
          </Row>
        ))}
      </Section>

      <Section title="비상 연락망" titleEn="Emergency Contacts">
        <Row label="시술 병원" labelEn="Clinic Hotline">
          <a href={`tel:${REPORT.clinicHotline}`}>{REPORT.clinicHotline}</a>
        </Row>
        <Row label="보호자" labelEn="Guardian">
          <a href={`tel:${REPORT.guardianPhone}`}>{REPORT.guardianPhone}</a>
        </Row>
      </Section>
    </div>
  );
}

export default EmergencyReportPage;
