import axiosInstance from "../axiosInstance";
import type {
  ApiResponse,
  ConsultationHistoryItem,
  PreconsultSubmissionResponse,
} from "@/types/consultation.type";
import type { ActiveConsultationAppointment } from "@/types/consultationReservation.type";
import type { AvailableConsultationDate } from "@/types/consultationReservation.type";
import type {
  CancelConsultationAppointmentRequest,
  ConsultationAppointmentDetail,
  ConsultationDailySlots,
  CreateConsultationAppointmentRequest,
  CreateConsultationAppointmentResponse,
  LocalDateString,
} from "@/types/consultationReservation.type";

export async function cancelConsultationAppointment({
  appointmentId,
}: CancelConsultationAppointmentRequest) {
  const { data } = await axiosInstance.delete<ApiResponse<null>>(
    `/api/appointments/${appointmentId}`,
    {
      data: {
        cancelReason: "OTHER",
      },
    },
  );

  return data;
}

export const getConsultationHistory = async () => {
  const { data } = await axiosInstance.get<
    ApiResponse<ConsultationHistoryItem[]>
  >("/api/consultations/history");

  return data.data;
};

export const getPreconsultSubmission = async (appointmentId: number) => {
  const { data } = await axiosInstance.get<
    ApiResponse<PreconsultSubmissionResponse>
  >("/api/preconsult-submissions", {
    params: { appointmentId },
  });
  console.log(data);

  return data.data;
};

export const getPreconsultSubmissionFile = async (fileUrl: string) => {
  if (!fileUrl.startsWith("/api/preconsult-submissions/files/")) {
    throw new Error("Invalid preconsult submission file URL");
  }

  const { data } = await axiosInstance.get<Blob>(fileUrl, {
    responseType: "blob",
  });

  return data;
};

export async function getActiveConsultationAppointment(caseId: number) {
  const { data } = await axiosInstance.get<
    ApiResponse<ActiveConsultationAppointment[]>
  >("/api/appointments", {
    params: { caseId },
  });

  return data.data;
}

export async function getConsultationAppointmentDetail(appointmentId: number) {
  const { data } = await axiosInstance.get<
    ApiResponse<ConsultationAppointmentDetail>
  >(`/api/appointments/${appointmentId}`);

  return data.data;
}

export async function getAvailableConsultationDates(
  year: number,
  month: number,
) {
  const { data } = await axiosInstance.get<
    ApiResponse<AvailableConsultationDate[]>
  >("/api/appointments/available-dates", {
    params: { year, month },
  });

  return data.data;
}

export async function getAvailableConsultationSlots(date: LocalDateString) {
  const { data } = await axiosInstance.get<ApiResponse<ConsultationDailySlots>>(
    "/api/appointments/available-slots",
    { params: { date } },
  );

  return data.data;
}

export async function createConsultationAppointment({
  caseId,
  slotId,
  symptomCategory,
  symptomCategories = [],
  symptomNote,
  files = [],
}: CreateConsultationAppointmentRequest) {
  const formData = new FormData();
  formData.append("caseId", String(caseId));
  formData.append("slotId", String(slotId));

  if (symptomCategory) formData.append("symptomCategory", symptomCategory);
  symptomCategories.forEach((category) =>
    formData.append("symptomCategories", category),
  );
  if (symptomNote?.trim()) formData.append("symptomNote", symptomNote.trim());
  files.forEach((file) => formData.append("files", file));

  const { data } = await axiosInstance.post<
    ApiResponse<CreateConsultationAppointmentResponse>
  >("/api/appointments", formData);

  return data.data;
}
