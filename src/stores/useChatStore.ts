import { create } from "zustand";

interface ChatState {
  /** 지금 열려 있는 채팅방. 새 채팅이면 null이고, 첫 문의를 보낼 때 서버가 만들어 준다. */
  roomId: number | null;
  /** 홈 화면에서 입력한 첫 문장을 채팅 화면으로 넘기는 임시 보관함 */
  pendingQuestion: string | null;

  openRoom: (roomId: number) => void;
  startNewChat: () => void;
  setPendingQuestion: (question: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  roomId: null,
  pendingQuestion: null,

  openRoom: (roomId) => set({ roomId }),
  startNewChat: () => set({ roomId: null, pendingQuestion: null }),
  setPendingQuestion: (pendingQuestion) => set({ pendingQuestion }),
}));
