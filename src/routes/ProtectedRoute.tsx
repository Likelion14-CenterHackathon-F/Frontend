import { Navigate, Outlet } from "react-router-dom";

import { ACCESS_TOKEN_STORAGE_KEY } from "@/constants/storageKey";

// accessToken이 없으면 온보딩으로 되돌린다
function ProtectedRoute() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
