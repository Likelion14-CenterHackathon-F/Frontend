import { useEffect } from "react";

import bgStripe from "@/assets/splash/bg-stripe.png";
import glow1 from "@/assets/splash/glow-1.svg";
import glow2 from "@/assets/splash/glow-2.svg";
import glow3 from "@/assets/splash/glow-3.svg";
import glow4 from "@/assets/splash/glow-4.svg";
import glow5 from "@/assets/splash/glow-5.svg";
import glow6 from "@/assets/splash/glow-6.svg";
import glow7 from "@/assets/splash/glow-7.svg";
import logoMark from "@/assets/splash/logo-mark.svg";
import wordmark from "@/assets/splash/wordmark.svg";

interface SplashStepProps {
  onFinish: () => void;
}

// 스플래시가 노출되는 최소 시간(ms)
const SPLASH_DURATION = 1500;

// 피그마 245:4367 프레임(393x852) 기준 좌표.
// 각 글로우는 wrapper 박스가 아니라, 그 안의 inset(-N%)만큼 부풀려진 실제 블러 크기를 써야
// 피그마와 동일한 확산 느낌이 난다.
interface Glow {
  src: string;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  rotate: number;
}

const GLOWS: Glow[] = [
  { src: glow1, centerX: 164.4, centerY: 329.6, width: 340, height: 331.6, rotate: 116.71 },
  { src: glow2, centerX: 247.7, centerY: 410.7, width: 432.7, height: 331.6, rotate: 116.71 },
  { src: glow3, centerX: 196, centerY: 857, width: 645.6, height: 695.6, rotate: 90 },
  { src: glow4, centerX: 173.5, centerY: 513, width: 558.6, height: 419.6, rotate: 0 },
  { src: glow5, centerX: 32.7, centerY: 618.6, width: 413.1, height: 339.6, rotate: 93.91 },
  { src: glow5, centerX: 32.7, centerY: 673.6, width: 413.1, height: 339.6, rotate: 93.91 },
  { src: glow6, centerX: 196.5, centerY: 659, width: 413.4, height: 304.4, rotate: 180 },
  { src: glow7, centerX: 347.5, centerY: 797, width: 413.4, height: 304.4, rotate: 180 },
];

function SplashStep({ onFinish }: SplashStepProps) {
  useEffect(() => {
    const timer = setTimeout(onFinish, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-linear-to-b from-white via-[#e1e9ff] via-[14%] to-white to-[89.8%]">
      {/* 아래쪽으로 뒤집혀 깔리는 첫 번째 줄무늬 레이어 */}
      <img
        aria-hidden
        src={bgStripe}
        alt=""
        className="pointer-events-none absolute w-full rotate-180 object-cover"
        style={{ left: 0, top: "43.66%", height: "72.07%" }}
      />

      {/* 위→아래 색이 옅어지는 오버레이 (원본은 -scale-y-100으로 뒤집힌 그라디언트) */}
      <div
        aria-hidden
        className="pointer-events-none absolute w-full bg-linear-to-t from-transparent to-[#dedbf8] to-[60.866%]"
        style={{ left: 0, top: "72.07%", height: "24.65%" }}
      />

      {/* 화면 상단을 덮는 두 번째(정방향) 줄무늬 레이어 */}
      <img
        aria-hidden
        src={bgStripe}
        alt=""
        className="pointer-events-none absolute w-full object-cover"
        style={{ left: 0, top: 0, height: "72.07%" }}
      />

      {GLOWS.map((glow, index) => (
        <img
          key={index}
          aria-hidden
          src={glow.src}
          alt=""
          className="pointer-events-none absolute max-w-none"
          style={{
            left: glow.centerX,
            top: glow.centerY,
            width: glow.width,
            height: glow.height,
            transform: `translate(-50%, -50%) rotate(${glow.rotate}deg)`,
          }}
        />
      ))}

      <div className="relative flex flex-col items-center gap-4">
        <div className="relative flex size-15.5 items-center justify-center">
          <div
            aria-hidden
            className="animate-logo-orbit pointer-events-none absolute size-24 rounded-full blur-[6px]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 265deg, rgba(255,255,255,0.95) 300deg, transparent 335deg)",
            }}
          />
          <img
            src={logoMark}
            alt=""
            aria-hidden
            className="relative size-15.5"
          />
        </div>
        <img src={wordmark} alt="allway" className="h-8" />
      </div>
    </div>
  );
}

export default SplashStep;
