import { useState } from "react";
import { useTranslation } from "react-i18next";

import ConsultationHeader from "@/components/header/ConsultationHeader";
import ConsultationTabs from "./components/ConsultationTabs";
import Button from "@/components/Button/Button";
import ConsultationGuide from "./components/ConsultationGuide";
import ConsultationHistoryList from "./components/ConsultationHistoryList";
import ConsultationReservationList from "./components/ConsultationReservationList";
import { ongoingConsultations } from "@/constants/consultationMockData";

type ConsultationTab = "history" | "ongoing";

function ConsultationHubPage() {
  const { t } = useTranslation("consultationHub");
  const [activeTab, setActiveTab] = useState<ConsultationTab>("history");

  return (
    <div className="flex min-h-dvh flex-col">
      <ConsultationHeader
        title={t("header.title")}
        onBack={() => console.log("메인 홈페이지로 이동 버튼")}
      />

      <main className="flex flex-1 flex-col pb-[calc(90px+env(safe-area-inset-bottom))]">
        <section>
          <ConsultationTabs activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === "history" ? (
            <ConsultationHistoryList consultations={[]} />
          ) : (
            <ConsultationReservationList consultations={ongoingConsultations} />
          )}
        </section>
        <section className="bg-[#F3F3F3] px-5 py-[26px]">
          <ConsultationGuide />
        </section>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[430px] bg-[#FCFCFC] px-5 pb-[calc(14px+env(safe-area-inset-bottom))] pt-[14px]">
        <Button
          disabled
          fullWidth
          className="h-[62px] rounded-[37px] bg-[#EDECF2] text-base font-medium tracking-[-0.4px] text-[#9795A0] disabled:cursor-not-allowed"
        >
          {t("footer.enter")}
        </Button>
      </footer>
    </div>
  );
}

export default ConsultationHubPage;
