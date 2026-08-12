import { Outlet, useLocation, useNavigate } from "react-router-dom";

import ConsultationHeader from "@/components/Header/ConsultationHeader";

function ConsultationReservationLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isSchedulePage = location.pathname.endsWith("/schedule");

  const handleBack = () => {
    if (isSchedulePage) {
      navigate("/consultations");
      return;
    }

    navigate("/consultations/reservation/schedule");
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <ConsultationHeader title="" onBack={handleBack} />

      <Outlet />
    </div>
  );
}
export default ConsultationReservationLayout;
