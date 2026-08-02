import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import HomePage from "@/pages/home";
import ConsultationDetailPage from "@/pages/consultation-detail";

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
        element: <ConsultationDetailPage />,
      },
    ],
  },
]);

export default router;
