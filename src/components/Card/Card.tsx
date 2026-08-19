import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface CardProps {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Card({ title, children, className }: CardProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-3 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] p-3.25",
        className,
      )}
    >
      {title && (
        <h2 className="text-base font-semibold text-[#1F2937]">{title}</h2>
      )}
      {children}
    </section>
  );
}
