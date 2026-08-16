import type { RoomConnectionState } from "../hooks/useAgoraRTC";

interface ConnectionStatusProps {
  connectionState: RoomConnectionState;
  tokenWillExpire: boolean;
}

function ConnectionStatus({
  connectionState,
  tokenWillExpire,
}: ConnectionStatusProps) {
  const message = tokenWillExpire
    ? "상담 연결 갱신이 필요합니다."
    : connectionState === "RECONNECTING"
      ? "네트워크 연결을 복구하고 있습니다..."
      : null;

  if (!message) return null;

  return (
    <div
      role="status"
      className="absolute left-1/2 top-16 -translate-x-1/2 rounded-full bg-black/65 px-4 py-2 text-center text-xs text-white"
    >
      {message}
    </div>
  );
}

export default ConnectionStatus;
