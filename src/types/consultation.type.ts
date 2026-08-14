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

export type SttAgentStatus =
  | "NOT_STARTED"
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "FAILED";

export interface StartSttAgentResponse {
  sessionId: number;
  agentId: string;
  status: SttAgentStatus;
}

export interface SttAgentStatusResponse {
  sessionId: number;
  agentId: string | null;
  status: SttAgentStatus;
}

export interface RenewRtcTokenRequest {
  role: ParticipantRole;
}

export interface RenewRtcTokenResponse {
  rtcToken: string;
  tokenExpiresAt: string;
}

export interface ConsultationCaption {
  sentenceId: number;
  sequenceNumber: number;
  speakerAgoraUid: number;
  sourceLanguage: string;
  sourceText: string;
  targetLanguage?: string;
  translatedText?: string;
  textTimestamp?: number;
  durationMs?: number;
  isFinal: true;
}

export interface SaveCaptionBatchRequest {
  sessionId: number;
  captions: ConsultationCaption[];
}

export interface SaveCaptionBatchResponse {
  receivedCount: number;
  insertedCount: number;
  updatedCount: number;
}

export interface EndConsultationResponse {
  sessionId: number;
  status: "COMPLETED";
  startedAt: string;
  endedAt: string;
  actualDurationSeconds: number;
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
