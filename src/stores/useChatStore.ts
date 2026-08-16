import { create } from "zustand";

interface ChatState {
  /** 지금 열려 있는 채팅방. 새 채팅이면 null이고, 첫 문의를 보낼 때 서버가 만들어 준다. */
  roomId: number | null;

  openRoom: (roomId: number) => void;
  startNewChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  roomId: null,

  openRoom: (roomId) => set({ roomId }),
  startNewChat: () => set({ roomId: null }),
}));
