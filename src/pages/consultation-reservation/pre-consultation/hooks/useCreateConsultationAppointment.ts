import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createConsultationAppointment } from "@/apis/consultation/consultationReservation.api";
import { activeConsultationAppointmentQueryKey } from "@/pages/consultation-hub/hooks/useActiveConsultationAppointment";
import type { CreateConsultationAppointmentRequest } from "@/types/consultationReservation.type";

export function useCreateConsultationAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateConsultationAppointmentRequest) =>
      createConsultationAppointment(request),
    onSuccess: (appointment, request) => {
      queryClient.setQueryData(
        activeConsultationAppointmentQueryKey(request.caseId),
        {
          hasAppointment: true,
          appointment,
        },
      );
      void queryClient.invalidateQueries({
        queryKey: ["consultation-available-dates"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["consultation-available-slots"],
      });
    },
  });
}
