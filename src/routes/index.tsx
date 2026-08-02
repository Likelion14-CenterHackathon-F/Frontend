import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import HomePage from "@/pages/home";
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
    ],
  },
]);

export default router;
