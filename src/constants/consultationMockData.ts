import type { Consultation } from "@/pages/consultation-hub/components/ConsultationCard";

export const historyConsultations: Consultation[] = [
  {
    id: 1,
    status: "completed",
    medicalStaffName: "김현수",
    medicalStaffRole: "doctor",
    subject: "두통 및 어지러움",
    scheduledAt: "2026-08-02T16:15:00+09:00",
  },
  {
    id: 2,
    status: "completed",
    medicalStaffName: "이민정",
    medicalStaffRole: "nurse",
    subject: "피부 발진",
    scheduledAt: "2026-08-01T10:30:00+09:00",
  },
];

export const ongoingConsultations: Consultation[] = [
  {
    id: 3,
    status: "reserved",
    medicalStaffName: "박지태",
    medicalStaffRole: "doctor",
    subject: "붓기·멍",
    scheduledAt: "2026-07-30T14:00:00+09:00",
  },
];
