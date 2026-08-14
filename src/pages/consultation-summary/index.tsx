import { useNavigate } from "react-router-dom";

import consultationPhoto from "@/assets/icons/consultation-summary/consultation-photo-2.png";
import ConsultationFooter from "@/components/Footer/ConsultationFooter";

import AiSummarySection from "./components/AiSummarySection";
import ConsultationReasonCard from "./components/ConsultationReasonCard";
import MedicalInstructionsCard, {
  type MedicalInstructionItem,
} from "./components/MedicalInstructionsCard";
import SummaryOverview from "./components/SummaryOverview";
import ConsultationHeader from "@/components/Header/ConsultationHeader";

const instructions: MedicalInstructionItem[] = [
  {
    title: "처방약 복용",
    description: "식후 30분에 3일간 복용해주세요.",
  },
  {
    title: "냉찜질",
    description: "하루 3회 진행해주세요.",
  },
  {
    title: "외출 시 주의",
    description: "외출 시 반드시 자외선 차단제를 바르세요.",
  },
];

const mockSummary = {
  patientName: "지수",
  consultationDate: "2026년 7월 30일",
  hospitalName: "서울 연세 병원",
  appointmentDateTime: "2026년 7월 30일 (목) 14:00",
  consultationReason: "붓기·멍",
  medicalStaffName: "박지태 의사",
  summary:
    "현재 시술 부위의 붓기는 정상적인 회복 과정입니다.\n처방해 드린 약을 3일간 꾸준히 복용하시고,\n격한 운동은 1주일간 피해주세요.",
  reasonTitle: "시술 후 붓기·멍 증상과 외출 시 주의사항 문의",
  reasonDescription:
    "얼굴에 붓기가 있고 멍도 좀 들었어요. 이거 정상인가요? 그리고 외출해도 되나요?",
};

function ConsultationSummaryPage() {
  const navigate = useNavigate();
  const navigateHome = () => navigate("/home", { replace: true });

  return (
    <div className="min-h-dvh bg-[#F6F6F9] text-[#32303A]">
      <ConsultationHeader title="상담 일정" onBack={navigateHome} />

      <main className="px-5 pb-[calc(124px+env(safe-area-inset-bottom))]">
        <SummaryOverview
          patientName={mockSummary.patientName}
          consultationDate={mockSummary.consultationDate}
          hospitalName={mockSummary.hospitalName}
          appointmentDateTime={mockSummary.appointmentDateTime}
          consultationReason={mockSummary.consultationReason}
          medicalStaffName={mockSummary.medicalStaffName}
        />

        <div className="mt-10.5 h-px bg-[#E4E3E8]" />

        <AiSummarySection summary={mockSummary.summary} />
        <MedicalInstructionsCard instructions={instructions} />
        <ConsultationReasonCard
          title={mockSummary.reasonTitle}
          description={mockSummary.reasonDescription}
          imageSrc={consultationPhoto}
        />
      </main>

      <ConsultationFooter onClick={navigateHome} className="bg-[#F6F6F9]">
        홈으로 돌아가기
      </ConsultationFooter>
    </div>
  );
}

export default ConsultationSummaryPage;
