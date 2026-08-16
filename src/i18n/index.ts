import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import koAftercare from "./resources/ko-KR/aftercare.json";
import enAftercare from "./resources/en-US/aftercare.json";
import jaAftercare from "./resources/ja-JP/aftercare.json";
import zhCNAftercare from "./resources/zh-CN/aftercare.json";

import koOnboarding from "./resources/ko-KR/onboarding.json";
import koHome from "./resources/ko-KR/home.json";
import koAiChat from "./resources/ko-KR/aiChat.json";
import koSettings from "./resources/ko-KR/settings.json";
import koConsultationHub from "./resources/ko-KR/consultationHub.json";
import koConsultationWaiting from "./resources/ko-KR/consultationWaiting.json";
import koConsultationReservation from "./resources/ko-KR/consultationReservation.json";

import enOnboarding from "./resources/en-US/onboarding.json";
import enHome from "./resources/en-US/home.json";
import enAiChat from "./resources/en-US/aiChat.json";
import enSettings from "./resources/en-US/settings.json";
import enConsultationHub from "./resources/en-US/consultationHub.json";
import enConsultationWaiting from "./resources/en-US/consultationWaiting.json";
import enConsultationReservation from "./resources/en-US/consultationReservation.json";

import jaOnboarding from "./resources/ja-JP/onboarding.json";
import jaHome from "./resources/ja-JP/home.json";
import jaAiChat from "./resources/ja-JP/aiChat.json";
import jaSettings from "./resources/ja-JP/settings.json";
import jaConsultationHub from "./resources/ja-JP/consultationHub.json";
import jaConsultationWaiting from "./resources/ja-JP/consultationWaiting.json";
import jaConsultationReservation from "./resources/ja-JP/consultationReservation.json";

import zhCNOnboarding from "./resources/zh-CN/onboarding.json";
import zhCNHome from "./resources/zh-CN/home.json";
import zhCNAiChat from "./resources/zh-CN/aiChat.json";
import zhCNSettings from "./resources/zh-CN/settings.json";
import zhCNConsultationHub from "./resources/zh-CN/consultationHub.json";
import zhCNConsultationWaiting from "./resources/zh-CN/consultationWaiting.json";
import zhCNConsultationReservation from "./resources/zh-CN/consultationReservation.json";
import koConsultationSummary from "./resources/ko-KR/consultationSummary.json";
import enConsultationSummary from "./resources/en-US/consultationSummary.json";
import jaConsultationSummary from "./resources/ja-JP/consultationSummary.json";
import zhCNConsultationSummary from "./resources/zh-CN/consultationSummary.json";

import { getInitialLocale } from "./language";

/*
    저장 언어 확인하고 없으면 영어로 진행
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

    ns: [
      "onboarding",
      "home",
      "aiChat",
      "settings",
      "consultationHub",
      "consultationWaiting",
      "consultationReservation",
      "aftercare",
      "consultationSummary",
    ],

    resources: {
      "ko-KR": {
        onboarding: koOnboarding,
        aftercare: koAftercare,
        home: koHome,
        aiChat: koAiChat,
        settings: koSettings,
        consultationHub: koConsultationHub,
        consultationWaiting: koConsultationWaiting,
        consultationReservation: koConsultationReservation,
        consultationSummary: koConsultationSummary,
      },
      "en-US": {
        onboarding: enOnboarding,
        aftercare: enAftercare,
        home: enHome,
        aiChat: enAiChat,
        settings: enSettings,
        consultationHub: enConsultationHub,
        consultationWaiting: enConsultationWaiting,
        consultationReservation: enConsultationReservation,
        consultationSummary: enConsultationSummary,
      },
      "ja-JP": {
        onboarding: jaOnboarding,
        aftercare: jaAftercare,
        home: jaHome,
        aiChat: jaAiChat,
        settings: jaSettings,
        consultationHub: jaConsultationHub,
        consultationWaiting: jaConsultationWaiting,
        consultationReservation: jaConsultationReservation,
        consultationSummary: jaConsultationSummary,
      },
      "zh-CN": {
        onboarding: zhCNOnboarding,
        aftercare: zhCNAftercare,
        home: zhCNHome,
        aiChat: zhCNAiChat,
        settings: zhCNSettings,
        consultationHub: zhCNConsultationHub,
        consultationWaiting: zhCNConsultationWaiting,
        consultationReservation: zhCNConsultationReservation,
        consultationSummary: zhCNConsultationSummary,
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
