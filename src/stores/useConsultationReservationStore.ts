import { create } from "zustand";

import type {
  ConsultationAttachment,
  ConsultationReservationSlot,
  LocalDateString,
  SymptomType,
} from "@/types/consultationReservation.type";

interface ConsultationReservationState {
  selectedDate: LocalDateString | null;
  selectedSlot: ConsultationReservationSlot | null;

  selectedSymptoms: SymptomType[];
  symptomDescription: string;
  imageFiles: ConsultationAttachment[];

  setSelectedDate: (date: LocalDateString | null) => void;

  setSelectedSlot: (slot: ConsultationReservationSlot | null) => void;

  toggleSymptom: (symptom: SymptomType) => void;
  setSymptomDescription: (value: string) => void;
  setImageFiles: (files: ConsultationAttachment[]) => void;

  resetSchedule: () => void;
  reset: () => void;
}

const initialState = {
  selectedDate: null,
  selectedSlot: null,
  selectedSymptoms: [] as SymptomType[],
  symptomDescription: "",
  imageFiles: [] as ConsultationAttachment[],
};

export const useConsultationReservationStore =
  create<ConsultationReservationState>((set, get) => ({
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

    toggleSymptom: (symptom) => {
      set((state) => ({
        selectedSymptoms: state.selectedSymptoms.includes(symptom)
          ? state.selectedSymptoms.filter((item) => item !== symptom)
          : [...state.selectedSymptoms, symptom],
      }));
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
      get().imageFiles.forEach(({ previewUrl }) => {
        URL.revokeObjectURL(previewUrl);
      });
      set(initialState);
    },
  }));
