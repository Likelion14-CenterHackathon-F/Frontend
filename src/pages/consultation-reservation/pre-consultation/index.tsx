import { useTranslation } from "react-i18next";

import ConsultationFooter from "@/components/Footer/ConsultationFooter";
import { useConsultationReservationStore } from "@/stores/useConsultationReservationStore";

import NoticeCardSection from "./components/NoticeCardSection";
import PhotoUploadSection from "./components/PhotoUploadSection";
import SubTitleSection from "./components/SubTitleSection";
import SymptomSection from "./components/SymptomSection";

function PreConsultationPage() {
  const { t } = useTranslation("consultationReservation");
  const {
    selectedSymptoms,
    symptomDescription,
    imageFiles,
    toggleSymptom,
    setSymptomDescription,
    setImageFiles,
  } = useConsultationReservationStore();

  const canSubmit =
    selectedSymptoms.length > 0 && symptomDescription.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;

    // 예약 생성 API 연결 시 현재 store의 예약 일시와 사전 자료를 전송합니다.
  };

  return (
    <>
      <main className="bg-surface-soft flex-1 px-5 pb-[calc(110px+env(safe-area-inset-bottom))] pt-6">
        <SubTitleSection />

        <SymptomSection
          selectedSymptoms={selectedSymptoms}
          description={symptomDescription}
          onToggleSymptom={toggleSymptom}
          onChangeDescription={setSymptomDescription}
        />

        <PhotoUploadSection files={imageFiles} onChange={setImageFiles} />

        <NoticeCardSection />
      </main>

      <ConsultationFooter disabled={!canSubmit} onClick={handleSubmit}>
        {t("preConsultation.submit")}
      </ConsultationFooter>
    </>
  );
}

export default PreConsultationPage;
