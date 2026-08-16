import { useEffect, useRef } from "react";
import MediaControlButton from "./MediaControlButton";
import type { FacingMode } from "../hooks/useConsultationMedia";

import cameraIcon from "@/assets/icons/consultation/camera.svg";
import cameraOffIcon from "@/assets/icons/consultation/camera-off.svg";
import microphoneIcon from "@/assets/icons/consultation/microphone.svg";
import microphoneOffIcon from "@/assets/icons/consultation/microphone-off.svg";
import switchCameraIcon from "@/assets/icons/consultation/switch-camera.svg";
import unswitchCameraIcon from "@/assets/icons/consultation/unswitch-camera.svg";
import waitingLogo from "@/assets/icons/consultation/waiting-logo.svg";
import { useTranslation } from "react-i18next";

interface CameraPreviewProps {
  stream: MediaStream | null;
  facingMode: FacingMode;
  cameraOn: boolean;
  microphoneOn: boolean;
  isLoading: boolean;
  errorMessage: string;
  onToggleCamera: () => void;
  onToggleMicrophone: () => void;
  onSwitchCamera: () => void;
}

function CameraPreview({
  stream,
  facingMode,
  cameraOn,
  microphoneOn,
  isLoading,
  errorMessage,
  onToggleCamera,
  onToggleMicrophone,
  onSwitchCamera,
}: CameraPreviewProps) {
  const { t } = useTranslation("consultationWaiting");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.srcObject = stream;

    if (stream) {
      void video.play().catch((error) => {
        console.error("카메라 미리보기 재생 실패:", error);
      });
    }

    return () => {
      video.srcObject = null;
    };
  }, [stream]);

  return (
    <section className="relative h-[476px] w-full shrink-0 overflow-hidden rounded-[24px] bg-[#2C2D2F]">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={[
          "size-full object-cover",
          facingMode === "user" ? "-scale-x-100" : "",
          cameraOn ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {isLoading && <PreviewMessage>{t("preview.connecting")}</PreviewMessage>}

      {!isLoading && errorMessage && (
        <PreviewMessage>{errorMessage}</PreviewMessage>
      )}

      {!isLoading && !errorMessage && !cameraOn && (
        <div className="absolute inset-0 grid place-items-center">
          <img src={waitingLogo} alt="" className="size-[50px]" />
          <span className="sr-only">{t("preview.cameraOff")}</span>
        </div>
      )}

      <div className="absolute right-4 top-4 flex flex-col gap-2.5">
        <MediaControlButton
          label={
            cameraOn
              ? t("preview.controls.cameraOff")
              : t("preview.controls.cameraOn")
          }
          active={cameraOn}
          onClick={onToggleCamera}
        >
          <img src={cameraOn ? cameraIcon : cameraOffIcon} alt="" />
        </MediaControlButton>

        <MediaControlButton
          label={
            microphoneOn
              ? t("preview.controls.microphoneOff")
              : t("preview.controls.microphoneOn")
          }
          active={microphoneOn}
          onClick={onToggleMicrophone}
        >
          <img src={microphoneOn ? microphoneIcon : microphoneOffIcon} alt="" />
        </MediaControlButton>

        <MediaControlButton
          label={t("preview.controls.switchCamera")}
          onClick={onSwitchCamera}
        >
          <img
            src={
              facingMode === "environment"
                ? unswitchCameraIcon
                : switchCameraIcon
            }
            alt=""
            className="size-[19px] object-contain"
          />
        </MediaControlButton>
      </div>
    </section>
  );
}

function PreviewMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-black/80 px-6">
      <p className="text-center text-sm leading-6 text-white">{children}</p>
    </div>
  );
}

export default CameraPreview;
