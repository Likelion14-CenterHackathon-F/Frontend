import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useJoinConsultation } from "./useMutation/useJoinConsultation";
import { useConsultationStore } from "@/stores/useConsultationStore";
import { getJoinErrorMessage } from "@/utils/getJoinErrorMessage";
import type { ApiErrorResponse } from "@/types/consultation.type";

interface UseEnterConsultationParams {
  appointmentId?: string;
}

export function useEnterConsultation({
  appointmentId,
}: UseEnterConsultationParams) {
  const navigate = useNavigate();
  const setRoomInfo = useConsultationStore((state) => state.setRoomInfo);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync: joinConsultation, isPending } = useJoinConsultation();

  const enterRoom = async () => {
    const parsedAppointmentId = Number(appointmentId);

    if (!appointmentId || !Number.isInteger(parsedAppointmentId)) {
      setErrorMessage("올바르지 않은 상담 예약 정보입니다.");
      return;
    }

    setErrorMessage(null);

    try {
      const roomInfo = await joinConsultation({
        appointmentId: parsedAppointmentId,
        role: "PATIENT",
        agoraUid: 10001,
        userLanguage: "ko-KR",
      });

      setRoomInfo(roomInfo);
      navigate(`/consultations/${parsedAppointmentId}/room`);
    } catch (error) {
      const message = axios.isAxiosError<ApiErrorResponse>(error)
        ? getJoinErrorMessage(error.response?.data.code)
        : "상담방 입장 중 문제가 발생했습니다.";

      setErrorMessage(message);
    }
  };

  return {
    enterRoom,
    isEntering: isPending,
    enterErrorMessage: errorMessage,
  };
}
