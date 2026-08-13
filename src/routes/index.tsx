import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AftercarePage from "@/pages/aftercare";
import AiChatPage from "@/pages/ai-chat";
import HomePage from "@/pages/home";
import ConsultationWaitingPage from "@/pages/consultation-waiting";
import ConsultationHubPage from "@/pages/consultation-hub";
import OnboardingPage from "@/pages/onboarding";
import LanguageSettingsPage from "@/pages/settings/language";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/aftercare",
        element: <AftercarePage />,
      },
        path: "/consultations",
        element: <ConsultationHubPage />,
      },
      {
        path: "/consultations/:appointmentId/waiting",
        element: <ConsultationWaitingPage />,
      },
      {
        path: "/",
        element: <OnboardingPage />,
      },
      {
        path: "/ai-chat",
        element: <AiChatPage />,
      },
      {
        path: "/settings/language",
        element: <LanguageSettingsPage />,
      },
    ],
  },
]);

export default router;
