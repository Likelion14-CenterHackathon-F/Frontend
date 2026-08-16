import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AftercarePage from "@/pages/aftercare";
import EmergencyReportPage from "@/pages/aftercare/emergency-report";
import HomePage from "@/pages/home";
import ConsultationWaitingPage from "@/pages/consultation-waiting";
import ConsultationHubPage from "@/pages/consultation-hub";
import OnboardingPage from "@/pages/onboarding";
import LanguageSettingsPage from "@/pages/settings/language";
import ConsultationReservationLayout from "@/pages/consultation-reservation/layout";
import ConsultationSchedulePage from "@/pages/consultation-reservation/schedule";
import PreConsultationPage from "@/pages/consultation-reservation/pre-consultation";
import ConsultationConfirmedPage from "@/pages/consultation-confirmed";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <OnboardingPage />,
      },
      {
        // 백엔드가 만드는 매직링크 경로
        path: "/patient/access",
        element: <OnboardingPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/home",
            element: <HomePage />,
          },
          {
            path: "/consultation",
            children: [
              {
                index: true,
                element: <ConsultationHubPage />,
              },

              {
                path: "reservation",
                element: <ConsultationReservationLayout />,
                children: [
                  {
                    index: true,
                    element: <Navigate to="schedule" replace />,
                  },
                  {
                    path: "schedule",
                    element: <ConsultationSchedulePage />,
                  },
                  {
                    path: "pre-consultation",
                    element: <PreConsultationPage />,
                  },
                ],
              },

              {
                path: ":appointmentId/confirmed",
                element: <ConsultationConfirmedPage />,
              },
              {
                path: ":appointmentId/waiting",
                element: <ConsultationWaitingPage />,
              },
            ],
          },
          {
            path: "/aftercare",
            element: <AftercarePage />,
          },
          {
            path: "/aftercare/emergency-report",
            element: <EmergencyReportPage />,
          },
          {
            path: "/settings/language",
            element: <LanguageSettingsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
