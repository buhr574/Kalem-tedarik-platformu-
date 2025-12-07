import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen relative z-10">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
