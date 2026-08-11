import type { Consultation } from "@/pages/consultation-hub/components/ConsultationCard";

export const historyConsultations: Consultation[] = [
  {
    id: 1,
    status: "completed",
    medicalStaffName: "김현수",
    medicalStaffRole: "의사",
    subject: "두통 및 어지러움",
    timezone: "한국 표준시 (KST)",
    scheduledAt: "2026년 8월 2일 (일) 오후 4:15",
  },
  {
    id: 2,
    status: "completed",
    medicalStaffName: "이민정",
    medicalStaffRole: "간호사",
    subject: "피부 발진",
    timezone: "한국 표준시 (KST)",
    scheduledAt: "2026년 8월 1일 (토) 오전 10:30",
  },
];

export const ongoingConsultations: Consultation[] = [
  {
    id: 3,
    status: "reserved",
    medicalStaffName: "박지태",
    medicalStaffRole: "의사",
    subject: "붓기·멍",
    timezone: "한국 표준시 (KST)",
    scheduledAt: "2026.07.30 (목) 오후 2:00",
  },
];
