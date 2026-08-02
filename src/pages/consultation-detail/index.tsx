import Button from "@/components/button/Button";
import ReservationSection from "./components/ReservationSection";
import ReservationGuideSection from "./components/ReservationGuideSection";
import { useState } from "react";
import PreMaterialSection from "./components/PreMaterialSection";
import CautionSection from "./components/CautionSection";
import ConsultationHistorySection from "./components/ConsultationHistorySection";

function ConsultationDetailPage() {
  const [isReservation, setIsReservation] = useState<boolean>(false);

  return (
    <>
      <header className="p-5">
        <Button onClick={() => setIsReservation(!isReservation)}>
          홈으로가기
        </Button>
      </header>
      <main className="px-6 pb-5 space-y-4">
        <ReservationSection />
        {isReservation && <PreMaterialSection />}
        {isReservation && <CautionSection />}
        {isReservation && <ConsultationHistorySection />}
        <ReservationGuideSection />
      </main>
    </>
  );
}

export default ConsultationDetailPage;
