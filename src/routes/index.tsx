import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import HomePage from "@/pages/home";
import OnboardingPage from "@/pages/onboarding";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/onboarding",
        element: <OnboardingPage />,
      },
    ],
  },
]);

export default router;
