import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import HomePage from "@/pages/home";
import ConsultationWaitingPage from "@/pages/consultation-waiting";
import ConsultationRoomPage from "@/pages/consultation-room";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/consultations/:appointmentId/waiting",
        element: <ConsultationWaitingPage />,
      },
      {
        path: "/consultations/:appointmentId/room",
        element: <ConsultationRoomPage />,
      },
    ],
  },
]);

export default router;
