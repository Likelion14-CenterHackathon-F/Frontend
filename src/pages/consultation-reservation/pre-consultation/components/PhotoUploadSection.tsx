import { useRef, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import preCameraIcon from "@/assets/icons/consultation/pre-camera.svg";
import type { ConsultationAttachment } from "@/types/consultationReservation.type";

import PhotoPreview from "./PhotoPreview";

interface PhotoUploadSectionProps {
  files: ConsultationAttachment[];
  onChange: (files: ConsultationAttachment[]) => void;
}

const MAX_FILE_COUNT = 5;
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "video/mp4"];

export default function PhotoUploadSection({
  files,
  onChange,
}: PhotoUploadSectionProps) {
  const { t } = useTranslation("consultationReservation");
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    const invalidFile = selectedFiles.find(
      (file) =>
        !ACCEPTED_FILE_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE,
    );

    if (invalidFile) {
      setErrorMessage(t("preConsultation.photos.invalidFile"));
    } else {
      setErrorMessage("");
      const newAttachments = selectedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      const combinedFiles = [...files, ...newAttachments];
      const nextFiles = combinedFiles.slice(0, MAX_FILE_COUNT);

      combinedFiles.slice(MAX_FILE_COUNT).forEach(({ previewUrl }) => {
        URL.revokeObjectURL(previewUrl);
      });

      onChange(nextFiles);
    }

    event.target.value = "";
  };

  const handleRemove = (id: string) => {
    const target = files.find((attachment) => attachment.id === id);

    if (target) URL.revokeObjectURL(target.previewUrl);

    onChange(files.filter((attachment) => attachment.id !== id));
    setErrorMessage("");
  };

  return (
    <section className="mt-11">
      <header>
        <h2 className="text-text-01 text-xl font-semibold leading-[1.4] tracking-tight">
          {t("preConsultation.photos.title")}
        </h2>
        <p className="mt-1 text-[15px] leading-[1.4] tracking-tight text-text-secondary">
          {t("preConsultation.photos.description")}
        </p>
      </header>

      <div className="mt-5 flex w-full gap-2 overflow-x-auto pb-1">
        {files.length < MAX_FILE_COUNT && (
          <button
            type="button"
            aria-label={t("preConsultation.photos.add")}
            onClick={() => inputRef.current?.click()}
            className="flex size-[110px] shrink-0 flex-col items-center justify-center rounded-[14px] border border-calendar-control-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary/30"
          >
            <img src={preCameraIcon} alt="" className="mt-3 p-1" />
            <span className="mt-2 text-xs text-action-disabled-text">
              {files.length}/{MAX_FILE_COUNT}
            </span>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          accept="image/jpeg,image/png,video/mp4"
          onChange={handleChange}
        />

        {files.map((attachment) => (
          <PhotoPreview
            key={attachment.id}
            attachment={attachment}
            onRemove={() => handleRemove(attachment.id)}
          />
        ))}
      </div>

      <p className="mt-2 text-xs leading-[1.4] tracking-tight text-action-disabled-text">
        {t("preConsultation.photos.helper")}
      </p>
      {errorMessage && (
        <p role="alert" className="mt-1 text-xs text-action-danger-text">
          {errorMessage}
        </p>
      )}
    </section>
  );
}
