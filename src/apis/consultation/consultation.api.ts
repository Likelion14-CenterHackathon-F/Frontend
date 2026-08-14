import type {
  ApiResponse,
  JoinConsultationResponse,
  JoinConsultationRequest,
  StartSttAgentResponse,
  SttAgentStatusResponse,
  RenewRtcTokenRequest,
  RenewRtcTokenResponse,
  SaveCaptionBatchRequest,
  SaveCaptionBatchResponse,
  EndConsultationResponse,
  CreateConsultationSummaryRequest,
  ConsultationSummaryResponse,
} from "@/types/consultation.type";
import axiosInstance from "../axiosInstance";

export const joinConsultation = async (
  appointmentId: number,
  body: JoinConsultationRequest,
) => {
  const { data } = await axiosInstance.post<
    ApiResponse<JoinConsultationResponse>
  >(`/api/consultations/${appointmentId}/join`, body);

  return data.data;
};

export const startSttAgent = async (appointmentId: number) => {
  const { data } = await axiosInstance.post<ApiResponse<StartSttAgentResponse>>(
    `/api/consultations/${appointmentId}/stt/start`,
  );
  return data.data;
};

export const getSttAgentStatus = async (appointmentId: number) => {
  const { data } = await axiosInstance.get<ApiResponse<SttAgentStatusResponse>>(
    `/api/consultations/${appointmentId}/stt/status`,
  );
  return data.data;
};

export const renewConsultationRtcToken = async (
  appointmentId: number,
  body: RenewRtcTokenRequest,
) => {
  const { data } = await axiosInstance.post<
    ApiResponse<RenewRtcTokenResponse>
  >(`/api/consultations/${appointmentId}/token/renew`, body);
  return data.data;
};

export const saveConsultationCaptionBatch = async (
  appointmentId: number,
  body: SaveCaptionBatchRequest,
) => {
  const { data } = await axiosInstance.post<
    ApiResponse<SaveCaptionBatchResponse>
  >(`/api/consultations/${appointmentId}/captions/batch`, body);
  return data.data;
};

export const endConsultation = async (appointmentId: number) => {
  const { data } = await axiosInstance.post<
    ApiResponse<EndConsultationResponse>
  >(`/api/consultations/${appointmentId}/end`);
  return data.data;
};

export const createConsultationSummary = async (
  appointmentId: number,
  body: CreateConsultationSummaryRequest,
) => {
  const { data } = await axiosInstance.post<
    ApiResponse<ConsultationSummaryResponse>
  >(`/api/consultations/${appointmentId}/summary`, body);
  return data.data;
};
