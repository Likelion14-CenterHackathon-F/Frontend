import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import HomePage from "@/pages/home";
import ConsultationWaitingPage from "@/pages/consultation-waiting";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/consultations/:id/waiting",
        element: <ConsultationWaitingPage />,
      },
    ],
  },
]);

export default router;
