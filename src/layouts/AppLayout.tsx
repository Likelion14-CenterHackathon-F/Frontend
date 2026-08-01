import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-dvh bg-gray-100">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
