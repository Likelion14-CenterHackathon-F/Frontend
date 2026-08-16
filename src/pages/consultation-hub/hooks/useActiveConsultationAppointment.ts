import { useQuery } from "@tanstack/react-query";

import { getActiveConsultationAppointment } from "@/apis/consultation/consultationReservation.api";

export const activeConsultationAppointmentQueryKey = (caseId: number) =>
  ["active-consultation-appointment", caseId] as const;

export function useActiveConsultationAppointment(caseId: number) {
  return useQuery({
    queryKey: activeConsultationAppointmentQueryKey(caseId),
    queryFn: () => getActiveConsultationAppointment(caseId),
    enabled: Number.isInteger(caseId) && caseId > 0,
    staleTime: 30_000,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  });
}
