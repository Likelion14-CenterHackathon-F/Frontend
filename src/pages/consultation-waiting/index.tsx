import ConsultationHeader from "@/components/Header/ConsultationHeader";
import ConsultationFooter from "@/components/Footer/ConsultationFooter";
import WaitingCheckListSection from "./components/WaitingCheckListSection";
import CameraPreview from "./components/CameraPreview";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useConsultationMedia } from "./hooks/useConsultationMedia";
import { useEnterConsultation } from "./hooks/useEnterConsultation";
import { useTranslation } from "react-i18next";
import type { ParticipantRole } from "@/types/consultation.type";

function ConsultationWaitingPage() {
  const { t } = useTranslation("consultationWaiting");
  const navigate = useNavigate();
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [searchParams] = useSearchParams();
  const role: ParticipantRole =
    searchParams.get("role")?.toUpperCase() === "MEDICAL_STAFF"
      ? "MEDICAL_STAFF"
      : "PATIENT";

  const {
    stream,
    cameraOn,
    microphoneOn,
    isLoading,
    errorMessage,
    facingMode,
    toggleCamera,
    toggleMicrophone,
    switchCamera,
  } = useConsultationMedia();

  const { enterRoom, isEntering, enterErrorMessage } = useEnterConsultation({
    appointmentId,
    role,
  });

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#F6F6F9] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_82%_8%,rgba(222,219,248,0.82),transparent_34%),radial-gradient(circle_at_12%_60%,rgba(237,234,252,0.82),transparent_42%),radial-gradient(circle_at_92%_88%,rgba(225,222,246,0.62),transparent_36%)]">
      <ConsultationHeader
        title={t("header.title")}
        onBack={() => navigate(-1)}
        className="relative z-10 bg-transparent"
      />

      <main className="relative z-10 flex flex-1 flex-col overflow-y-auto px-5 pb-[calc(138px+env(safe-area-inset-bottom))]">
        <div className="mx-auto flex w-full max-w-[353px] flex-col gap-3">
          <CameraPreview
            stream={stream}
            facingMode={facingMode}
            cameraOn={cameraOn}
            microphoneOn={microphoneOn}
            isLoading={isLoading}
            errorMessage={errorMessage}
            onToggleCamera={toggleCamera}
            onToggleMicrophone={toggleMicrophone}
            onSwitchCamera={switchCamera}
          />

          <WaitingCheckListSection />

          {enterErrorMessage && (
            <p className="px-1 text-center text-sm text-red-600">
              {enterErrorMessage}
            </p>
          )}
        </div>
      </main>

      <ConsultationFooter
        disabled={isLoading || !stream || isEntering}
        onClick={enterRoom}
        className="bg-[#FCFCFC]"
      >
        {isEntering ? t("footer.entering") : t("footer.enter")}
      </ConsultationFooter>
    </div>
  );
}

export default ConsultationWaitingPage;
