import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center",
    "select-none whitespace-nowrap",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-action-primary/30",
    "focus-visible:ring-offset-2",

    // 모든 variant의 disabled 디자인을 동일하게 처리
    "disabled:cursor-not-allowed",
    "disabled:bg-action-disabled",
    "disabled:font-medium",
    "disabled:text-action-disabled-text",
    "disabled:opacity-100",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-action-primary", "text-action-primary-text"],

        secondary: ["bg-action-secondary", "text-action-secondary-text"],

        danger: ["bg-action-danger", "text-action-danger-text"],

        soft: [
          "border-4",
          "border-white/35",
          "bg-surface-soft",
          "text-text-intro",
        ],

        outline: [
          "border",
          "border-action-primary",
          "bg-transparent",
          "text-action-primary",
        ],
      },

      size: {
        sm: ["h-8", "rounded-lg", "px-3", "text-sm"],

        md: ["h-10", "rounded-lg", "px-4", "text-sm"],

        lg: ["h-12", "rounded-xl", "px-5", "text-base"],

        // Figma: 화상상담 예약하기
        compact: [
          "rounded-[37px]",
          "px-4",
          "py-3",
          "text-[15px]",
          "font-semibold",
          "leading-[1.25]",
          "tracking-tight",
        ],

        // Figma: Footer 버튼
        action: [
          "h-[62px]",
          "rounded-[37px]",
          "px-5",
          "text-base",
          "font-semibold",
          "leading-[1.25]",
          "tracking-tight",
        ],
      },

      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export default function Button({
  children,
  variant,
  size,
  fullWidth,
  className,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      type={type}
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
        }),
        className,
      )}
    >
      {children}
    </button>
  );
}
