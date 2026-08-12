import { create } from "zustand";

import type {
  ConsultationReservationSlot,
  LocalDateString,
} from "@/types/consultationReservation.type";

interface ConsultationReservationState {
  selectedDate: LocalDateString | null;
  selectedSlot: ConsultationReservationSlot | null;

  symptomDescription: string;
  imageFiles: File[];

  setSelectedDate: (date: LocalDateString | null) => void;

  setSelectedSlot: (slot: ConsultationReservationSlot | null) => void;

  setSymptomDescription: (value: string) => void;
  setImageFiles: (files: File[]) => void;

  resetSchedule: () => void;
  reset: () => void;
}

const initialState = {
  selectedDate: null,
  selectedSlot: null,
  symptomDescription: "",
  imageFiles: [] as File[],
};

export const useConsultationReservationStore =
  create<ConsultationReservationState>((set) => ({
    ...initialState,

    setSelectedDate: (selectedDate) => {
      set({
        selectedDate,

        // 날짜 변경 시 이전 날짜의 슬롯 선택 제거
        selectedSlot: null,
      });
    },

    setSelectedSlot: (selectedSlot) => {
      set({ selectedSlot });
    },

    setSymptomDescription: (symptomDescription) => {
      set({ symptomDescription });
    },

    setImageFiles: (imageFiles) => {
      set({ imageFiles });
    },

    resetSchedule: () => {
      set({
        selectedDate: null,
        selectedSlot: null,
      });
    },

    reset: () => {
      set(initialState);
    },
  }));
