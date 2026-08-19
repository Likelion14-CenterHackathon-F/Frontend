import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import Button from "@/components/Button/Button";
import { cn } from "@/utils/cn";

const consultationFooterVariants = cva(
  [
    "z-10 mx-auto w-full max-w-[430px]",
    "bg-surface-footer",
    "px-5 pt-[14px]",
    "pb-[calc(14px+env(safe-area-inset-bottom))]",
  ],
  {
    variants: {
      position: {
        fixed: "fixed inset-x-0 bottom-0",
        static: "mt-auto",
      },
    },
    defaultVariants: {
      position: "fixed",
    },
  },
);

interface ConsultationFooterProps
  extends
    Omit<ComponentProps<typeof Button>, "size" | "fullWidth">,
    VariantProps<typeof consultationFooterVariants> {
  buttonClassName?: string;
}

export default function ConsultationFooter({
  children,
  position,
  className,
  buttonClassName,
  variant = "primary",
  ...buttonProps
}: ConsultationFooterProps) {
  return (
    <footer className={cn(consultationFooterVariants({ position }), className)}>
      <Button
        {...buttonProps}
        variant={variant}
        size="action"
        fullWidth
        className={buttonClassName}
      >
        {children}
      </Button>
    </footer>
  );
}
