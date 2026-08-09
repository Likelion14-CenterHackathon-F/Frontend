export type ParticipantRole = "PATIENT" | "MEDICAL_STAFF";

export type ResponseParticipantRole = "환자" | "의료진";

export interface JoinConsultationRequest {
  role: ParticipantRole;
  agoraUid: number;
  userLanguage: string;
}

export interface JoinConsultationResponse {
  appointmentId: number;
  sessionId: number;
  agoraAppId: string;
  rtcChannelName: string;
  agoraUid: number;
  rtcToken: string;
  tokenExpiresAt: string;
  role: ResponseParticipantRole;
  userLanguage: string;
  peerLanguage: string | null;
  sttPublisherAgoraUid: number;
  recommendedDurationSeconds: number;
  forceEndAt: string | null;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  isSuccess: false;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: null;
}
