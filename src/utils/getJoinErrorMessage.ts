import {
  JOIN_ERROR_CODE,
  type JoinErrorCode,
} from "@/constants/consultationError";
import i18n from "@/i18n";

export const getJoinErrorMessage = (code?: string): string => {
  switch (code as JoinErrorCode) {
    case JOIN_ERROR_CODE.NOT_JOINABLE_TIME:
      return i18n.t("joinError.notJoinableTime", {
        ns: "consultationWaiting",
      });

    case JOIN_ERROR_CODE.APPOINTMENT_NOT_FOUND:
      return i18n.t("joinError.appointmentNotFound", {
        ns: "consultationWaiting",
      });

    case JOIN_ERROR_CODE.SLOT_NOT_FOUND:
      return i18n.t("joinError.slotNotFound", {
        ns: "consultationWaiting",
      });

    case JOIN_ERROR_CODE.ALREADY_COMPLETED:
      return i18n.t("joinError.alreadyCompleted", {
        ns: "consultationWaiting",
      });

    case JOIN_ERROR_CODE.AGORA_CONFIG_MISSING:
      return i18n.t("joinError.configMissing", {
        ns: "consultationWaiting",
      });

    case JOIN_ERROR_CODE.RTC_TOKEN_ISSUE_FAILED:
      return i18n.t("joinError.tokenIssueFailed", {
        ns: "consultationWaiting",
      });

    case JOIN_ERROR_CODE.AUTH_REQUIRED:
      return i18n.t("joinError.authRequired", {
        ns: "consultationWaiting",
      });

    case JOIN_ERROR_CODE.ACCESS_TOKEN_EXPIRED:
      return i18n.t("joinError.accessTokenExpired", {
        ns: "consultationWaiting",
      });

    case JOIN_ERROR_CODE.INVALID_ACCESS_TOKEN:
      return i18n.t("joinError.invalidAccessToken", {
        ns: "consultationWaiting",
      });

    case JOIN_ERROR_CODE.INVALID_REQUEST:
      return i18n.t("joinError.invalidRequest", {
        ns: "consultationWaiting",
      });

    default:
      return i18n.t("joinError.unknown", {
        ns: "consultationWaiting",
      });
  }
};
