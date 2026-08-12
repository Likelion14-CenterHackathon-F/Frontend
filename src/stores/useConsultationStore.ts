import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { JoinConsultationResponse } from "@/types/consultation.type";

interface ConsultationState {
  roomInfo: JoinConsultationResponse | null;

  setRoomInfo: (roomInfo: JoinConsultationResponse) => void;
  clearRoomInfo: () => void;
}

export const useConsultationStore = create<ConsultationState>()(
  persist(
    (set) => ({
      roomInfo: null,

      setRoomInfo: (roomInfo) => {
        set({ roomInfo });
      },

      clearRoomInfo: () => {
        set({ roomInfo: null });
      },
    }),
    {
      name: "consultation-info",
    },
  ),
);
