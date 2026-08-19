/* 환자 케이스 데이터*/

import type {
  AftercareDashboardResponse,
  AftercareHomeResponse,
  EmergencyMedicalReportResponse,
} from "@/types/aftercare.type";
import type { ApiResponse } from "@/types/consultation.type";
import type {
  UpdatePatientSettingsRequest,
  UpdatePatientSettingsResponse,
  VerifyAccessLinkRequest,
  VerifyAccessLinkResponse,
} from "@/types/patient.type";

import axiosInstance from "./axiosInstance";

/*
  매직링크로 접근한 환자가 생년월일을 입력해 2차 인증하는 API.
  성공하면 이후 보호된 API 호출에 쓸 accessToken을 받는다.
*/
export async function verifyAccessLink(body: VerifyAccessLinkRequest) {
  const { data } = await axiosInstance.post<
    ApiResponse<VerifyAccessLinkResponse>
  >("/api/patients/access-links/verify", body);

  return data.data;
}

/*
  언어/국적/시간대 설정을 저장하는 API.
  language claim이 JWT에 들어가 있어 성공 시 accessToken이 새로 발급되므로,
  호출한 쪽에서 반드시 기존 토큰을 이 응답의 accessToken으로 교체해야 한다.
*/
export async function updatePatientSettings(
  body: UpdatePatientSettingsRequest,
) {
  const { data } = await axiosInstance.patch<
    ApiResponse<UpdatePatientSettingsResponse>
  >("/api/patients/me/settings", body);

  return data.data;
}

/* 홈 화면 대시보드 요약. consultationAppointment는 예약이 없으면 null이다. */
export async function getAftercareHome() {
  const { data } = await axiosInstance.get<ApiResponse<AftercareHomeResponse>>(
    "/api/aftercare/home",
  );

  return data.data;
}

/* 사후관리 상세 화면. 각 회복 단계의 status(PAST/CURRENT/UPCOMING)는 서버가 판단해 내려준다. */
export async function getAftercareDashboard() {
  const { data } = await axiosInstance.get<
    ApiResponse<AftercareDashboardResponse>
  >("/api/aftercare/dashboard");

  return data.data;
}

/*
  글로벌 응급 의료 리포트. materials와 medicationAndAllergies.medications는
  줄바꿈으로 구분된 문자열로 내려온다.
*/
export async function getEmergencyMedicalReport() {
  const { data } = await axiosInstance.get<
    ApiResponse<EmergencyMedicalReportResponse>
  >("/api/aftercare/emergency-medical-report");

  return data.data;
}
