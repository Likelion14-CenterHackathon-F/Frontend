import type {
  ApiResponse,
  JoinConsultationResponse,
  JoinConsultationRequest,
  StartSttAgentResponse,
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
