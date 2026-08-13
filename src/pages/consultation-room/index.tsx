import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { useConsultationStore } from "@/stores/useConsultationStore";

import speakerIcon from "@/assets/icons/consultation-room/speaker.svg";
import CaptionOverlay from "./components/CaptionOverlay";
import ConnectionStatus from "./components/ConnectionStatus";
import ConsultationControls from "./components/ConsultationControls";
import LocalVideo from "./components/LocalVideo";
import RemoteVideo from "./components/RemoteVideo";
import { useAgoraRTC } from "./hooks/useAgoraRTC";
import { useStartSttAgent } from "./hooks/useStartSttAgent";
import type { ApiErrorResponse } from "@/types/consultation.type";

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function ConsultationRoomPage() {
  const navigate = useNavigate();
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const roomInfo = useConsultationStore((state) => state.roomInfo);
  const clearRoomInfo = useConsultationStore((state) => state.clearRoomInfo);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const sttRequestedRef = useRef(false);
  const [sttErrorMessage, setSttErrorMessage] = useState<string | null>(null);
  const { mutateAsync: startSttAgent } = useStartSttAgent();

  const {
    localVideoTrack,
    remoteVideoTrack,
    microphoneOn,
    cameraOn,
    speakerOn,
    connectionState,
    errorMessage,
    tokenWillExpire,
    peerAudioPublished,
    caption,
    join,
    leave,
    toggleMicrophone,
    toggleCamera,
    toggleSpeaker,
    switchCamera,
  } = useAgoraRTC(roomInfo);

  const waitingPath = useMemo(
    () => `/consultation/${appointmentId ?? ""}/waiting`,
    [appointmentId],
  );

  useEffect(() => {
    if (!roomInfo) {
      navigate(waitingPath, { replace: true });
      return;
    }

    // Strict Mode의 effect 재실행 전에 첫 join이 시작되지 않도록 다음 task로 미룹니다.
    const joinTimer = window.setTimeout(() => {
      void join().catch(() => undefined);
    }, 0);

    return () => window.clearTimeout(joinTimer);
  }, [join, navigate, roomInfo, waitingPath]);

  useEffect(() => {
    if (connectionState !== "CONNECTED") return;

    const timerId = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1_000);

    return () => window.clearInterval(timerId);
  }, [connectionState]);

  useEffect(() => {
    if (!roomInfo || !peerAudioPublished || sttRequestedRef.current) return;
    sttRequestedRef.current = true;

    const start = async () => {
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          await startSttAgent(roomInfo.appointmentId);
          setSttErrorMessage(null);
          return;
        } catch (error) {
          const code = axios.isAxiosError<ApiErrorResponse>(error)
            ? error.response?.data.code
            : undefined;
          if (code === "CONSULTATION_409_2" && attempt < 2) {
            await new Promise((resolve) => window.setTimeout(resolve, 1_000));
            continue;
          }
          setSttErrorMessage(
            code === "CONSULTATION_409_2"
              ? "상대방 정보가 등록되지 않아 자막을 시작하지 못했습니다."
              : "자막을 사용할 수 없습니다. 영상 상담은 계속할 수 있습니다.",
          );
          return;
        }
      }
    };

    void start();
  }, [peerAudioPublished, roomInfo, startSttAgent]);

  const handleEnd = async () => {
    await leave();
    clearRoomInfo();
    navigate("/", { replace: true });
  };

  const controlsDisabled = connectionState !== "CONNECTED";

  return (
    <main
      className={[
        "relative isolate h-dvh min-h-[390px] w-full overflow-hidden bg-[#1A1A1A] text-white",
        "[@media_(orientation:landscape)_and_(pointer:coarse)]:left-1/2",
        "[@media_(orientation:landscape)_and_(pointer:coarse)]:w-screen",
        "[@media_(orientation:landscape)_and_(pointer:coarse)]:min-h-0",
        "[@media_(orientation:landscape)_and_(pointer:coarse)]:-translate-x-1/2",
      ].join(" ")}
    >
      <RemoteVideo
        track={remoteVideoTrack}
        isConnecting={
          connectionState === "IDLE" || connectionState === "CONNECTING"
        }
        errorMessage={errorMessage}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35" />

      <button
        type="button"
        aria-label={speakerOn ? "스피커 끄기" : "스피커 켜기"}
        aria-pressed={speakerOn}
        onClick={toggleSpeaker}
        className="absolute left-[30px] top-[30px] grid size-6 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <img
          src={speakerIcon}
          alt=""
          className={`size-6 object-contain ${speakerOn ? "" : "opacity-45"}`}
        />
      </button>

      <time className="absolute left-1/2 top-[30px] -translate-x-1/2 text-sm leading-5 tracking-[-0.35px]">
        {formatDuration(elapsedSeconds)}
      </time>

      <LocalVideo track={localVideoTrack} cameraOn={cameraOn} />

      <ConnectionStatus
        connectionState={connectionState}
        tokenWillExpire={tokenWillExpire}
      />

      {sttErrorMessage && (
        <div
          role="status"
          className="absolute left-1/2 top-16 w-max max-w-[calc(100%-32px)] -translate-x-1/2 rounded-full bg-black/65 px-4 py-2 text-center text-xs text-white"
        >
          {sttErrorMessage}
        </div>
      )}

      <p className="absolute bottom-5 left-[30px] text-[15px] leading-[1.4] tracking-[-0.375px] sm:bottom-[18px]">
        박지태 의사
      </p>

      <div className="absolute inset-x-0 bottom-[calc(8px+env(safe-area-inset-bottom))] flex flex-col items-center gap-2 px-4 sm:bottom-[calc(10px+env(safe-area-inset-bottom))]">
        <CaptionOverlay caption={caption} />

        <ConsultationControls
          microphoneOn={microphoneOn}
          cameraOn={cameraOn}
          disabled={controlsDisabled}
          onToggleMicrophone={toggleMicrophone}
          onToggleCamera={toggleCamera}
          onSwitchCamera={switchCamera}
          onEnd={handleEnd}
        />
      </div>
    </main>
  );
}

export default ConsultationRoomPage;
