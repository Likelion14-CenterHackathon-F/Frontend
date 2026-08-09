import ConsultationHeader from "@/components/header/ConsultationHeader";
import WaitingCheckListSection from "./components/WaitingCheckListSection";
import CameraPreview from "./components/CameraPreview";
import { useNavigate, useParams } from "react-router-dom";
import { useConsultationMedia } from "./hooks/useConsultationMedia";
import { useConsultationStore } from "@/stores/useConsultationStore";
import { useJoinConsultation } from "./hooks/useMutation/useJoinConsultation";
import axios from "axios";
import type { ApiErrorResponse } from "@/types/consultation.type";
import { getJoinErrorMessage } from "@/utils/getJoinErrorMessage";

function ConsultationWaitingPage() {
  const navigate = useNavigate();
  const { appointmentId } = useParams<{ appointmentId: string }>();

  const setRoomInfo = useConsultationStore((state) => state.setRoomInfo);

  const { mutateAsync: join, isPending } = useJoinConsultation();

  const handleEnterRoom = async () => {
    if (!appointmentId) return;

    try {
      const roomInfo = await join({
        appointmentId: Number(appointmentId),

        role: "PATIENT",

        agoraUid: 10001,

        userLanguage: "ko-KR",
      });

      setRoomInfo(roomInfo);

      navigate(`/consultations/${appointmentId}/room`);
    } catch (error) {
      if (!axios.isAxiosError<ApiErrorResponse>(error)) {
        console.error("알 수 없는 오류가 발생했습니다.");
        return;
      }

      const code = error.response?.data.code;

      const message = getJoinErrorMessage(code);

      console.error(message);
    }
  };

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

  return (
    <div className="flex min-h-dvh flex-col">
      <ConsultationHeader title="상담 대기실" onBack={() => navigate(-1)} />

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

      <footer className="mt-auto pb-[calc(28px+env(safe-area-inset-bottom))] px-5 pt-4">
        <button
          type="button"
          disabled={isLoading || !stream}
          onClick={handleEnterRoom}
          className={`w-full rounded-4xl ${
            isLoading || !stream
              ? "bg-white text-gray-400 border border-gray-400"
              : "bg-[#2A2A2A] text-white"
          }  text-center text-[16px] font-medium p-5`}
        >
          {isPending ? "입장 중..." : "입장하기"}
        </button>
      </footer>
    </div>
  );
}

export default ConsultationWaitingPage;
