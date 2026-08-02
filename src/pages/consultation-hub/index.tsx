import { useState } from "react";

import Button from "@/components/button/Button";

import ReservationSection from "./components/ReservationSection";
import ReservationGuideSection from "./components/ReservationGuideSection";
import PreMaterialSection from "./components/PreMaterialSection";
import CautionSection from "./components/CautionSection";
import ConsultationHistorySection from "./components/ConsultationHistorySection";

import ReservationBottomSheet from "./components/reservation-sheet/ReservationBottomSheet";

function ConsultationHubPage() {
  const [hasReservation, setHasReservation] = useState<boolean>(false);
  const [isReservationSheetOpen, setIsReservationSheetOpen] =
    useState<boolean>(false);

  return (
    <>
      <header className="p-5">
        <Button onClick={() => setHasReservation(!hasReservation)}>
          홈으로가기
        </Button>
      </header>

      <main className="px-6 pb-5 space-y-4">
        <ReservationSection
          hasReservation={hasReservation}
          onReserve={() => setIsReservationSheetOpen(true)}
        />
        {hasReservation && <PreMaterialSection />}
        {hasReservation && <CautionSection />}
        {hasReservation && <ConsultationHistorySection />}
        <ReservationGuideSection />
      </main>

      <ReservationBottomSheet
        open={isReservationSheetOpen}
        onClose={() => setIsReservationSheetOpen(false)}
      />
    </>
  );
}

export default ConsultationHubPage;
