import { startSttAgent } from "@/apis/consultation/consultation.api";
import { useMutation } from "@tanstack/react-query";

export function useStartSttAgent() {
  return useMutation({
    mutationFn: (appointmentId: number) => startSttAgent(appointmentId),
  });
}
