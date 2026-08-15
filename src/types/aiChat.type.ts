export interface ChatRoomSummary {
  roomId: number;
  roomTitle: string;
  lastMessageAt: string;
}

export type ChatMessageRole = "USER" | "ASSISTANT";

export interface ChatMessageItem {
  messageId: number;
  role: ChatMessageRole;
  content: string;
  imageUrl: string | null;
  sentAt: string;
}

export interface ChatRoomDetailResponse {
  roomId: number;
  roomTitle: string;
  messages: ChatMessageItem[];
}

export interface PostSymptomMessageRequest {
  /** 기존 채팅방에 이어서 보낼 때만 전달. 생략하면 새 채팅방이 생성된다. */
  roomId?: number;
  question: string;
  /** 최대 1장 */
  image?: File;
}
