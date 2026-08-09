import {
  JOIN_ERROR_CODE,
  type JoinErrorCode,
} from "@/constants/consultationError";

export const getJoinErrorMessage = (code?: string): string => {
  switch (code as JoinErrorCode) {
    case JOIN_ERROR_CODE.NOT_JOINABLE_TIME:
      return "현재는 상담 대기실에 입장할 수 있는 시간이 아닙니다.";

    case JOIN_ERROR_CODE.APPOINTMENT_NOT_FOUND:
      return "화상상담 예약을 찾을 수 없습니다.";

    case JOIN_ERROR_CODE.SLOT_NOT_FOUND:
      return "예약 시간 정보를 찾을 수 없습니다.";

    case JOIN_ERROR_CODE.ALREADY_COMPLETED:
      return "이미 종료된 화상상담입니다.";

    case JOIN_ERROR_CODE.AGORA_CONFIG_MISSING:
      return "화상상담 서버 설정에 문제가 발생했습니다.";

    case JOIN_ERROR_CODE.RTC_TOKEN_ISSUE_FAILED:
      return "화상상담 연결에 실패했습니다. 다시 시도해 주세요.";

    case JOIN_ERROR_CODE.AUTH_REQUIRED:
      return "로그인이 필요합니다.";

    case JOIN_ERROR_CODE.ACCESS_TOKEN_EXPIRED:
      return "로그인 정보가 만료되었습니다. 다시 로그인해 주세요.";

    case JOIN_ERROR_CODE.INVALID_ACCESS_TOKEN:
      return "유효하지 않은 로그인 정보입니다.";

    case JOIN_ERROR_CODE.INVALID_REQUEST:
      return "상담방 입장 요청 정보가 올바르지 않습니다.";

    default:
      return "상담방 입장 중 문제가 발생했습니다.";
  }
};
