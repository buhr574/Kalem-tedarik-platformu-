import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const PublicLayout = () => {
  useEffect(() => {
    // Mark as public page
    document.documentElement.setAttribute("data-public-page", "true");
    
    // Force dark mode
    document.documentElement.setAttribute("data-theme", "dark");
    
    // Cleanup when component unmounts
    return () => {
      document.documentElement.removeAttribute("data-public-page");
    };
  }, []);

  return (
    <div className="min-h-screen relative z-10">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
