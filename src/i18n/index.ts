import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import koOnboarding from "./resources/ko-KR/onboarding.json";
import koAftercare from "./resources/ko-KR/aftercare.json";

import enOnboarding from "./resources/en-US/onboarding.json";
import enAftercare from "./resources/en-US/aftercare.json";

import jaOnboarding from "./resources/ja-JP/onboarding.json";
import jaAftercare from "./resources/ja-JP/aftercare.json";

import zhCNOnboarding from "./resources/zh-CN/onboarding.json";
import zhCNAftercare from "./resources/zh-CN/aftercare.json";

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

    ns: ["onboarding", "aftercare"],

    resources: {
      "ko-KR": {
        onboarding: koOnboarding,
        aftercare: koAftercare,
      },
      "en-US": {
        onboarding: enOnboarding,
        aftercare: enAftercare,
      },
      "ja-JP": {
        onboarding: jaOnboarding,
        aftercare: jaAftercare,
      },
      "zh-CN": {
        onboarding: zhCNOnboarding,
        aftercare: zhCNAftercare,
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
