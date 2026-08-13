import type {
  ApiResponse,
  JoinConsultationResponse,
  JoinConsultationRequest,
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
