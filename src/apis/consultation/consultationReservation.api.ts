import axiosInstance from "../axiosInstance";
import type { ApiResponse } from "@/types/consultation.type";
import type { ActiveConsultationAppointmentResponse } from "@/types/consultationReservation.type";

export async function getActiveConsultationAppointment(caseId: number) {
  const { data } = await axiosInstance.get<
    ApiResponse<ActiveConsultationAppointmentResponse>
  >("/api/appointments", {
    params: { caseId },
  });

  return data.data;
}
