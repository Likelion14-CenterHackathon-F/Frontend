import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AftercarePage from "@/pages/aftercare";
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
        path: "/aftercare",
        element: <AftercarePage />,
      },
    ],
  },
]);

export default router;
