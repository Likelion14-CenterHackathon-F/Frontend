export type SupportedLanguageLabel = "한국어" | "영어" | "일본어" | "중국어";

export interface VerifyAccessLinkRequest {
  token: string;
  birthDate: string;
  language?: SupportedLanguageLabel;
  timezoneId?: string;
}

export interface VerifyAccessLinkResponse {
  patientId: number;
  accessToken: string;
}

export interface UpdatePatientSettingsRequest {
  language?: SupportedLanguageLabel;
  nationality?: string;
  timezoneId?: string;
}

export interface UpdatePatientSettingsResponse {
  patientId: number;
  language: SupportedLanguageLabel;
  accessToken: string;
}
