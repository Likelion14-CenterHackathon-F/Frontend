import { useEffect, useMemo } from "react";

import { usePreconsultSubmissionFile } from "../hooks/usePreconsultSubmission";

interface SubmissionMediaProps {
  fileUrl: string;
  label: string;
}

export default function SubmissionMedia({ fileUrl, label }: SubmissionMediaProps) {
  const { data: file, isPending, isError } =
    usePreconsultSubmissionFile(fileUrl);
  const objectUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );

  useEffect(
    () => () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    },
    [objectUrl],
  );

  if (isPending) {
    return <div className="size-[99px] animate-pulse rounded-xl bg-[#F3F2F5]" />;
  }

  if (isError || !file || !objectUrl) return null;

  const isVideo = file.type === "video/mp4" || /\.mp4(?:$|\?)/i.test(fileUrl);

  return isVideo ? (
    <video
      src={objectUrl}
      aria-label={label}
      controls
      playsInline
      preload="metadata"
      className="h-[99px] w-[160px] rounded-xl bg-black object-cover"
    />
  ) : (
    <img
      src={objectUrl}
      alt={label}
      className="size-[99px] rounded-xl object-cover"
    />
  );
}
