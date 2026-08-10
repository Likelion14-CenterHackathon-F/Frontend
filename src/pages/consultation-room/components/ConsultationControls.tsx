import cameraIcon from "@/assets/icons/consultation-room/camera.svg";
import endCallIcon from "@/assets/icons/consultation-room/end-call.svg";
import microphoneIcon from "@/assets/icons/consultation-room/microphone.svg";
import switchCameraIcon from "@/assets/icons/consultation-room/switch-camera.svg";

interface ControlButtonProps {
  label: string;
  icon: string;
  active?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onClick: () => void | Promise<void>;
}

function ControlButton({
  label,
  icon,
  active = true,
  danger = false,
  disabled = false,
  onClick,
}: ControlButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={danger ? undefined : active}
      disabled={disabled}
      onClick={() => void onClick()}
      className={[
        "grid size-12 shrink-0 place-items-center rounded-full transition-colors sm:size-[54px]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        "disabled:cursor-not-allowed disabled:opacity-40",
        danger
          ? "bg-[#DB4036] hover:bg-[#c9382f]"
          : active
            ? "bg-white/10 hover:bg-white/20"
            : "bg-white text-[#1A1A1A] hover:bg-white/90",
      ].join(" ")}
    >
      <img
        src={icon}
        alt=""
        className={[
          "size-6 object-contain",
          !danger && !active ? "brightness-0" : "",
        ].join(" ")}
      />
    </button>
  );
}

interface ConsultationControlsProps {
  microphoneOn: boolean;
  cameraOn: boolean;
  disabled: boolean;
  onToggleMicrophone: () => Promise<void>;
  onToggleCamera: () => Promise<void>;
  onSwitchCamera: () => Promise<void>;
  onEnd: () => Promise<void>;
}

function ConsultationControls({
  microphoneOn,
  cameraOn,
  disabled,
  onToggleMicrophone,
  onToggleCamera,
  onSwitchCamera,
  onEnd,
}: ConsultationControlsProps) {
  return (
    <nav
      aria-label="화상 상담 제어"
      className="flex items-center justify-center gap-2 rounded-[25px] bg-[#1A1A1A] p-3 sm:gap-2.5 sm:p-[18px]"
    >
      <ControlButton
        label={cameraOn ? "카메라 끄기" : "카메라 켜기"}
        icon={cameraIcon}
        active={cameraOn}
        disabled={disabled}
        onClick={onToggleCamera}
      />
      <ControlButton
        label={microphoneOn ? "마이크 끄기" : "마이크 켜기"}
        icon={microphoneIcon}
        active={microphoneOn}
        disabled={disabled}
        onClick={onToggleMicrophone}
      />
      <ControlButton
        label="카메라 전환"
        icon={switchCameraIcon}
        disabled={disabled || !cameraOn}
        onClick={onSwitchCamera}
      />
      <ControlButton
        label="상담 종료"
        icon={endCallIcon}
        danger
        onClick={onEnd}
      />
    </nav>
  );
}

export default ConsultationControls;
