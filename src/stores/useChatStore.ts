import { create } from "zustand";

export interface ChatMessage {
  id: string;
  role: "patient" | "ai";
  /** guidance는 AI의 구조화된 분석 응답(분석 결과 · 징후 · 생활 관리 · 위험 신호)을 뜻한다. */
  kind: "text" | "guidance";
  text?: string;
  imageUrl?: string;
}

interface ChatState {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));
