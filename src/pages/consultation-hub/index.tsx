import { useState } from "react";
import { useTranslation } from "react-i18next";

import ConsultationHeader from "@/components/Header/ConsultationHeader";
import ConsultationTabs from "./components/ConsultationTabs";
import ConsultationGuide from "./components/ConsultationGuide";
import ConsultationHistoryList from "./components/ConsultationHistoryList";
import ConsultationReservationList from "./components/ConsultationReservationList";
import { ongoingConsultations } from "@/mocks/consultationMockData";
import ConsultationFooter from "@/components/Footer/ConsultationFooter";

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

      <main className="bg-surface-soft flex flex-1 flex-col pb-[calc(90px+env(safe-area-inset-bottom))]">
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

      <ConsultationFooter disabled>{t("footer.enter")}</ConsultationFooter>
    </div>
  );
}

export default ConsultationHubPage;
