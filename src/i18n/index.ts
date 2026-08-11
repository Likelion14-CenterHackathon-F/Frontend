import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import koOnboarding from "./resources/ko-KR/onboarding.json";
import koConsultationHub from "./resources/ko-KR/consultationHub.json";

import enOnboarding from "./resources/en-US/onboarding.json";
import enConsultationHub from "./resources/en-US/consultationHub.json";

import jaOnboarding from "./resources/ja-JP/onboarding.json";
import jaConsultationHub from "./resources/ja-JP/consultationHub.json";

import zhCNOnboarding from "./resources/zh-CN/onboarding.json";
import zhCNConsultationHub from "./resources/zh-CN/consultationHub.json";

import { getInitialLocale } from "./language";

/*
    저장된 언어 확인
    → 초기 언어 결정 (브라우저 시스템 언어 or 지원 언어가 없으면 en-US)
*/
const initialLocale = getInitialLocale();

/*
    i18n 초기화 함수
    파일 최상단에서 초기화 결과를 기다리지 않고 실행하기 위해 void를 붙힘
*/
void i18n
  .use(initReactI18next)
  .init({
    lng: initialLocale,
    fallbackLng: "en-US",

    supportedLngs: ["ko-KR", "en-US", "ja-JP", "zh-CN"],

    defaultNS: "onboarding",

    ns: ["onboarding", "consultationHub"],

    resources: {
      "ko-KR": {
        onboarding: koOnboarding,
        consultationHub: koConsultationHub,
      },
      "en-US": {
        onboarding: enOnboarding,
        consultationHub: enConsultationHub,
      },
      "ja-JP": {
        onboarding: jaOnboarding,
        consultationHub: jaConsultationHub,
      },
      "zh-CN": {
        onboarding: zhCNOnboarding,
        consultationHub: zhCNConsultationHub,
      },
    },

    interpolation: {
      // React가 기본적으로 escaping을 처리함
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  })
  .catch((error) => {
    console.error("i18n 초기화에 실패했습니다.", error);
  });

export default i18n;
