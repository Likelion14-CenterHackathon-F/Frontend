import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import ConsultationHeader from "@/components/Header/ConsultationHeader";
import { cn } from "@/utils/cn";

function ConsultationReservationLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("consultationReservation");

  const isSchedulePage = location.pathname.endsWith("/schedule");
  const isPreConsultationPage = location.pathname.endsWith("/pre-consultation");
  const usesReservationBackground = isSchedulePage || isPreConsultationPage;

  const handleBack = () => {
    if (isSchedulePage) {
      navigate("/consultation");
      return;
    }

    navigate("/consultation/reservation/schedule");
  };

  return (
    <div
      className={cn(
        "flex min-h-dvh flex-col",
        usesReservationBackground && [
          "relative overflow-hidden bg-[#FAFAFA]",
          "before:pointer-events-none before:absolute before:inset-0",
          "before:bg-[radial-gradient(circle_at_50%_18%,rgba(222,219,248,0.78),transparent_48%),radial-gradient(circle_at_18%_72%,rgba(233,230,250,0.68),transparent_42%),radial-gradient(circle_at_88%_78%,rgba(225,222,246,0.52),transparent_38%)]",
        ],
      )}
    >
      <ConsultationHeader
        title={usesReservationBackground ? t("schedule.headerTitle") : ""}
        onBack={handleBack}
        className={usesReservationBackground ? "z-10 bg-transparent" : undefined}
      />

      <Outlet />
    </div>
  );
}
export default ConsultationReservationLayout;
