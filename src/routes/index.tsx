import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import EmergencyReportPage from "@/pages/aftercare/emergency-report";
import HomePage from "@/pages/home";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/aftercare/emergency-report",
        element: <EmergencyReportPage />,
      },
    ],
  },
]);

export default router;
