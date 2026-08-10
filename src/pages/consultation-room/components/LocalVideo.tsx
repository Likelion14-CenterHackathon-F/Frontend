import { useEffect, useRef } from "react";
import type { ICameraVideoTrack } from "agora-rtc-sdk-ng";

interface LocalVideoProps {
  track: ICameraVideoTrack | null;
  cameraOn: boolean;
}

function LocalVideo({ track, cameraOn }: LocalVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!track || !container) return;

    track.play(container, { fit: "cover", mirror: true });

    return () => {
      track.stop();
    };
  }, [track]);

  return (
    <section
      aria-label="내 카메라 화면"
      className="absolute right-5 top-5 aspect-[160/118] w-[clamp(118px,18.8vw,160px)] overflow-hidden rounded-[11px] border-2 border-white bg-[#333] shadow-lg"
    >
      <div
        ref={containerRef}
        className={cameraOn ? "size-full" : "invisible size-full"}
      />

      {!cameraOn && (
        <div className="absolute inset-0 grid place-items-center bg-[#333] text-xs text-white/70">
          카메라 꺼짐
        </div>
      )}
    </section>
  );
}

export default LocalVideo;
