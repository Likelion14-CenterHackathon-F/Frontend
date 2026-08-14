import { useTranslation } from "react-i18next";

import introSymbol from "@/assets/intro-symbol.svg";
import logo from "@/assets/logo.svg";

interface IntroStepProps {
  onStart: () => void;
}

function IntroStep({ onStart }: IntroStepProps) {
  const { t } = useTranslation();

  return (
    <div className="from-gradient-from via-gradient-via to-gradient-to relative flex min-h-dvh flex-col overflow-hidden bg-linear-to-b via-35%">
      {/* 상단 안개 */}
      <div
        aria-hidden
        className="from-intro-haze to-intro-haze/0 pointer-events-none absolute inset-x-0 top-0 h-[44%] bg-linear-to-b"
      />

      {/* 브랜드 심볼 */}
      <img
        aria-hidden
        src={introSymbol}
        alt=""
        className="pointer-events-none absolute top-[92px] -right-[90px] size-[316px] rotate-[33.42deg]"
      />

      <img src={logo} alt="Kanage" className="relative mt-31 ml-5 size-7" />

      <div className="relative mt-auto flex flex-col gap-3 px-5">
        <h1 className="font-display from-neutral-white to-intro-title-end bg-linear-[95deg] bg-clip-text text-[2.5rem] leading-[1.4] font-medium tracking-tight whitespace-pre-line text-transparent">
          {t("intro.title")}
        </h1>
        <p className="text-[0.9375rem] leading-[1.6] font-medium tracking-tight whitespace-pre-line text-neutral-white/80">
          {t("intro.description")}
        </p>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="text-body relative mx-5 mt-11 mb-15.5 h-15.5 rounded-full border-4 border-neutral-white/34 bg-surface-soft font-semibold text-text-intro"
      >
        {t("intro.start")}
      </button>
    </div>
  );
}

export default IntroStep;
