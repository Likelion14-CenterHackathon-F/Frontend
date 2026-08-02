export interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

export const timeSlots: TimeSlot[] = [
  { id: 1, time: "10:00", available: true },
  { id: 2, time: "10:30", available: true },
  { id: 3, time: "11:00", available: false },
  { id: 4, time: "14:00", available: true },
];
