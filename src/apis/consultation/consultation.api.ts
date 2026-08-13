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
  >(`/consultation/${appointmentId}/join`, body);

  return data.data;
};

export const startSttAgent = async (appointmentId: number) => {
  const { data } = await axiosInstance.post<
    ApiResponse<StartSttAgentResponse>
  >(`/consultation/${appointmentId}/stt/start`);
  return data.data;
};
