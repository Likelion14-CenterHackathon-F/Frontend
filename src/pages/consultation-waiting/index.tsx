import ConsultationHeader from "@/components/header/ConsultationHeader";
import WaitingCheckListSection from "./components/WaitingCheckListSection";
import CameraPreview from "./components/CameraPreview";
import { useNavigate, useParams } from "react-router-dom";
import { useConsultationMedia } from "./hooks/useConsultationMedia";
import { useEnterConsultation } from "./hooks/useEnterConsultation";
import { useTranslation } from "react-i18next";

function ConsultationWaitingPage() {
  const { t } = useTranslation("consultationWaiting");
  const navigate = useNavigate();
  const { appointmentId } = useParams<{ appointmentId: string }>();

  const {
    stream,
    cameraOn,
    microphoneOn,
    isSpeaking,
    isLoading,
    errorMessage,
    facingMode,
    toggleCamera,
    toggleMicrophone,
    switchCamera,
  } = useConsultationMedia();

  const { enterRoom, isEntering, enterErrorMessage } = useEnterConsultation({
    appointmentId,
  });

  return (
    <div className="flex min-h-dvh flex-col">
      <ConsultationHeader title={t("header.title")} onBack={() => navigate(-1)} />

      <main className="flex flex-1 flex-col gap-4 px-5">
        <CameraPreview
          stream={stream}
          facingMode={facingMode}
          cameraOn={cameraOn}
          microphoneOn={microphoneOn}
          isSpeaking={isSpeaking}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onToggleCamera={toggleCamera}
          onToggleMicrophone={toggleMicrophone}
          onSwitchCamera={switchCamera}
        />

        <WaitingCheckListSection />
      </main>

      {enterErrorMessage && <div>{enterErrorMessage}</div>}

      <footer className="mt-auto pb-[calc(28px+env(safe-area-inset-bottom))] px-5 pt-4">
        <button
          type="button"
          disabled={isLoading || !stream || isEntering}
          onClick={enterRoom}
          className={`w-full rounded-4xl ${
            isLoading || !stream
              ? "bg-white text-gray-400 border border-gray-400"
              : "bg-[#2A2A2A] text-white"
          }  text-center text-[16px] font-medium p-5`}
        >
          {isEntering ? t("footer.entering") : t("footer.enter")}
        </button>
      </footer>
    </div>
  );
}

export default ConsultationWaitingPage;
