import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import BottomSheet from "@/components/BottomSheet/BottomSheet";
import Button from "@/components/Button/Button";
import type { ConsultationCancelReason } from "@/types/consultationReservation.type";
import { cn } from "@/utils/cn";

interface ConsultationCancelSheetProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: ConsultationCancelReason) => void;
}

const cancelReasons: ConsultationCancelReason[] = [
  "scheduleChange",
  "symptomsImproved",
  "changedMind",
  "bookingMistake",
  "other",
];

function ConsultationCancelSheet({
  open,
  onClose,
  onConfirm,
}: ConsultationCancelSheetProps) {
  const { t } = useTranslation("consultationReservation");
  const [selectedReason, setSelectedReason] =
    useState<ConsultationCancelReason | null>(null);

  const handleClose = useCallback(() => {
    setSelectedReason(null);
    onClose();
  }, [onClose]);

  const handleConfirm = () => {
    if (!selectedReason) return;
    onConfirm(selectedReason);
  };

  return (
    <BottomSheet
      open={open}
      title={t("confirmed.cancelSheet.title")}
      description={t("confirmed.cancelSheet.description")}
      onClose={handleClose}
      className="h-[650px]"
      headerClassName="pt-[52px]"
      contentClassName="pt-[30px]"
      footer={
        <div className="grid grid-cols-2 gap-1 bg-surface-footer px-5 pb-[calc(14px+env(safe-area-inset-bottom))] pt-[14px]">
          <Button
            variant="secondary"
            size="action"
            fullWidth
            onClick={handleClose}
          >
            {t("confirmed.cancelSheet.close")}
          </Button>
          <Button
            variant="danger"
            size="action"
            fullWidth
            disabled={!selectedReason}
            onClick={handleConfirm}
            className="bg-action-danger-text text-action-primary-text"
          >
            {t("confirmed.cancelSheet.confirm")}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-2.5 pb-8">
        {cancelReasons.map((reason) => {
          const isSelected = selectedReason === reason;

          return (
            <button
              key={reason}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedReason(reason)}
              className={cn(
                "h-[62px] shrink-0 rounded-[30px] border text-sm font-medium leading-[1.4] tracking-tight transition-colors",
                isSelected
                  ? "border-action-secondary-text bg-action-secondary-text text-action-primary-text"
                  : "border-calendar-control-border bg-transparent text-action-secondary-text",
              )}
            >
              {t(`confirmed.cancelSheet.reasons.${reason}`)}
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
}

export default ConsultationCancelSheet;
