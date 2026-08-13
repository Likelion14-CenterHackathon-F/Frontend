interface PatientMessageProps {
  text?: string;
  imageUrl?: string;
  imageAlt: string;
}

function PatientMessage({ text, imageUrl, imageAlt }: PatientMessageProps) {
  return (
    <div className="flex flex-col items-end gap-4">
      {text && (
        <p className="bg-chat-bubble text-chat-fg max-w-72 rounded-3xl p-4 text-[0.9375rem] leading-[1.4] font-medium tracking-tight">
          {text}
        </p>
      )}

      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-35 w-27.5 rounded-2xl object-cover"
        />
      )}
    </div>
  );
}

export default PatientMessage;
