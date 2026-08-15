import { useCallback, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import ConsultationFooter from "@/components/Footer/ConsultationFooter";
import { useConsultationReservationStore } from "@/stores/useConsultationReservationStore";
import type { ApiErrorResponse } from "@/types/consultation.type";
import type {
  SymptomCategory,
  SymptomType,
} from "@/types/consultationReservation.type";

import NoticeCardSection from "./components/NoticeCardSection";
import PhotoUploadSection from "./components/PhotoUploadSection";
import ReservationConfirmSheet from "./components/ReservationConfirmSheet";
import SubTitleSection from "./components/SubTitleSection";
import SymptomSection from "./components/SymptomSection";
import { useCreateConsultationAppointment } from "./hooks/useCreateConsultationAppointment";

const MOCK_CASE_ID = 1;

const SYMPTOM_CATEGORY_BY_TYPE: Record<SymptomType, SymptomCategory> = {
  pain: "PAIN",
  swelling: "SWELLING",
  redness: "REDNESS",
  heat: "HEAT",
  bleeding: "BLEEDING",
  itching: "ITCHING",
  bruise: "BRUISING",
  other: "OTHER",
};

function PreConsultationPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("consultationReservation");
  const [isConfirmSheetOpen, setIsConfirmSheetOpen] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null,
  );
  const { mutateAsync: createAppointment, isPending: isSubmitting } =
    useCreateConsultationAppointment();
  const {
    selectedSymptoms,
    selectedSlot,
    symptomDescription,
    imageFiles,
    toggleSymptom,
    setSymptomDescription,
    setImageFiles,
  } = useConsultationReservationStore();

  const canSubmit =
    selectedSymptoms.length > 0 ||
    symptomDescription.trim().length > 0 ||
    imageFiles.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitErrorMessage(null);
    setIsConfirmSheetOpen(true);
  };

  const handleCloseConfirmSheet = useCallback(() => {
    setIsConfirmSheetOpen(false);
    setHasAgreed(false);
    setSubmitErrorMessage(null);
  }, []);

  const handleConfirmReservation = async () => {
    if (!hasAgreed || !selectedSlot || isSubmitting) return;

    setSubmitErrorMessage(null);

    try {
      const appointment = await createAppointment({
        caseId: MOCK_CASE_ID,
        slotId: selectedSlot.slotId,
        symptomCategory: selectedSymptoms[0]
          ? SYMPTOM_CATEGORY_BY_TYPE[selectedSymptoms[0]]
          : undefined,
        symptomNote: symptomDescription,
        files: imageFiles.map(({ file }) => file),
      });

      handleCloseConfirmSheet();
      navigate(`/consultation/${appointment.appointmentId}/confirmed`, {
        replace: true,
      });
    } catch (error) {
      const message = axios.isAxiosError<ApiErrorResponse>(error)
        ? error.response?.data.message
        : null;
      setSubmitErrorMessage(
        message ?? "예약을 생성하지 못했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
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

      <ReservationConfirmSheet
        open={isConfirmSheetOpen}
        selectedSlot={selectedSlot}
        selectedSymptoms={selectedSymptoms}
        agreed={hasAgreed}
        onAgreeChange={setHasAgreed}
        onClose={handleCloseConfirmSheet}
        onConfirm={handleConfirmReservation}
        isSubmitting={isSubmitting}
        errorMessage={submitErrorMessage}
      />
    </>
  );
}

export default PreConsultationPage;
