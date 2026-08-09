import { useEffect, useRef } from 'react';
import MediaControlButton from './MediaControlButton';
import type { FacingMode } from '../hooks/useConsultationMedia';

import cameraIcon from '@/assets/icons/consultation/camera.svg';
import microphoneIcon from '@/assets/icons/consultation/microphone.svg';
import switchCameraIcon from '@/assets/icons/consultation/switch-camera.svg';

interface CameraPreviewProps {
  stream: MediaStream | null;
  facingMode: FacingMode;
  cameraOn: boolean;
  microphoneOn: boolean;
  isSpeaking: boolean;
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
  isSpeaking,
  isLoading,
  errorMessage,
  onToggleCamera,
  onToggleMicrophone,
  onSwitchCamera,
}: CameraPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.srcObject = stream;

    if (stream) {
      void video.play().catch((error) => {
        console.error('카메라 미리보기 재생 실패:', error);
      });
    }

    return () => {
      video.srcObject = null;
    };
  }, [stream]);

  return (
    <section className="relative aspect-3/4 overflow-hidden rounded-[20px] bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={[
          'size-full object-cover',
          facingMode === 'user' ? '-scale-x-100' : '',
          cameraOn ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      {isLoading && (
        <PreviewMessage>카메라를 연결하고 있습니다.</PreviewMessage>
      )}

      {!isLoading && errorMessage && (
        <PreviewMessage>{errorMessage}</PreviewMessage>
      )}

      {!isLoading && !errorMessage && !cameraOn && (
        <PreviewMessage>카메라가 꺼져 있습니다.</PreviewMessage>
      )}

      <div className="absolute right-3 top-3 flex flex-col gap-2.5">
        <MediaControlButton
          label={cameraOn ? '카메라 끄기' : '카메라 켜기'}
          active={cameraOn}
          onClick={onToggleCamera}
        >
          <img src={cameraIcon} alt="" className="size-6 object-contain" />
        </MediaControlButton>

        <MediaControlButton
          label={microphoneOn ? '마이크 끄기' : '마이크 켜기'}
          active={microphoneOn}
          emphasized={microphoneOn && isSpeaking}
          onClick={onToggleMicrophone}
        >
          <img src={microphoneIcon} alt="" className="size-5 object-contain" />
        </MediaControlButton>

        <MediaControlButton label="전후면 카메라 전환" onClick={onSwitchCamera}>
          <img
            src={switchCameraIcon}
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
    <div className="absolute inset-0 grid place-items-center bg-black px-6">
      <p className="text-center text-sm leading-6 text-white">{children}</p>
    </div>
  );
}

export default CameraPreview;
