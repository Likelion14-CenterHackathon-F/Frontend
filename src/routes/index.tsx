import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import HomePage from "@/pages/home";
import ConsultationWaitingPage from "@/pages/consultation-waiting";
import ConsultationHubPage from "@/pages/consultation-hub";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/consultations",
        element: <ConsultationHubPage />,
      },
      {
        path: "/consultations/:appointmentId/waiting",
        element: <ConsultationWaitingPage />,
      },
    ],
  },
]);

export default router;
