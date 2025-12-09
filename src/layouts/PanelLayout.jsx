import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import ThemeToggle from "../components/ui/ThemeToggle";

const PanelLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Remove public page attribute when entering panel
    document.documentElement.removeAttribute("data-public-page");
  }, []);

  const menuItems = [
    {
      path: "/panel/teklifler",
      label: "Teklif Listesi",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      path: "/panel/teklifler/yeni",
      label: "+ Yeni Teklif",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
    },
    {
      path: "/panel/kalemler",
      label: "Alım Kalemleri",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
  ];

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex relative z-10">
      {/* Star Field Effect with Network Lines - Only for panel pages in dark mode */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 panel-stars">
        {/* Network nodes positions */}
        {(() => {
          const nodes = [
            { x: 10, y: 20, delay: 0 },
            { x: 25, y: 15, delay: 0.5 },
            { x: 40, y: 25, delay: 1 },
            { x: 55, y: 18, delay: 1.5 },
            { x: 70, y: 22, delay: 2 },
            { x: 85, y: 16, delay: 2.5 },
            { x: 15, y: 40, delay: 0.3 },
            { x: 30, y: 45, delay: 0.8 },
            { x: 50, y: 42, delay: 1.3 },
            { x: 65, y: 48, delay: 1.8 },
            { x: 80, y: 44, delay: 2.3 },
            { x: 20, y: 60, delay: 0.6 },
            { x: 35, y: 65, delay: 1.1 },
            { x: 55, y: 62, delay: 1.6 },
            { x: 75, y: 68, delay: 2.1 },
            { x: 5, y: 50, delay: 0.2 },
            { x: 90, y: 55, delay: 2.4 },
            { x: 45, y: 8, delay: 0.4 },
            { x: 12, y: 75, delay: 0.7 },
            { x: 88, y: 75, delay: 2.6 },
            { x: 8, y: 35, delay: 0.1 },
            { x: 92, y: 38, delay: 2.7 },
            { x: 38, y: 5, delay: 0.9 },
            { x: 62, y: 3, delay: 1.4 },
            { x: 22, y: 85, delay: 0.5 },
            { x: 78, y: 88, delay: 2.2 },
          ];

          return (
            <>
              {/* SVG Network Lines */}
              <svg className="absolute inset-0 w-full h-full panel-network-lines opacity-40">
                {nodes.map((node, i) => {
                  // Connect each node to nearby nodes
                  const connections = nodes
                    .slice(i + 1, i + 6)
                    .filter((_, idx) => idx < 4);
                  return connections.map((target, j) => {
                    const distance = Math.sqrt(
                      Math.pow(node.x - target.x, 2) +
                        Math.pow(node.y - target.y, 2)
                    );
                    if (distance < 40) {
                      return (
                        <line
                          key={`${i}-${j}`}
                          x1={`${node.x}%`}
                          y1={`${node.y}%`}
                          x2={`${target.x}%`}
                          y2={`${target.y}%`}
                          stroke="rgba(99, 102, 241, 0.3)"
                          strokeWidth="0.5"
                          className="animate-pulse"
                          style={{
                            animationDelay: `${node.delay}s`,
                            animationDuration: "5s",
                          }}
                        />
                      );
                    }
                    return null;
                  });
                })}
              </svg>

              {/* Glowing Nodes/Stars */}
              {nodes.map((node, i) => (
                <div
                  key={i}
                  className="absolute rounded-full panel-star-node"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    width: "6px",
                    height: "6px",
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${node.delay}s`,
                    animationDuration: "5s",
                    background: "rgba(99, 102, 241, 0.8)",
                    boxShadow:
                      "0 0 8px rgba(99, 102, 241, 0.8), " +
                      "0 0 16px rgba(99, 102, 241, 0.6), " +
                      "0 0 24px rgba(139, 92, 246, 0.4)",
                  }}
                />
              ))}

              {/* Additional smaller twinkling stars */}
              {[...Array(25)].map((_, i) => {
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const delay = Math.random() * 5;
                const duration = 3 + Math.random() * 4;
                const size = 1 + Math.random() * 1.5;
                return (
                  <div
                    key={`small-${i}`}
                    className="absolute rounded-full panel-star"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      background: "rgba(255, 255, 255, 0.7)",
                      boxShadow:
                        "0 0 3px rgba(255, 255, 255, 0.8), 0 0 6px rgba(255, 255, 255, 0.4)",
                      animation: `twinkle ${duration}s ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                );
              })}
            </>
          );
        })()}
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 glass-nav transform transition-transform duration-500 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white dark:text-white text-gray-900 dark:text-white">
              Tedarik Platformu
            </h1>
          </div>

          <nav className="flex-1 space-y-2">
            <Link
              to="/panel"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === "/panel"
                  ? "bg-white/20 dark:bg-white/20 bg-blue-500/20 dark:bg-white/20 text-white dark:text-white text-gray-900 dark:text-white font-semibold"
                  : "text-gray-300 dark:text-gray-200 text-gray-700 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-blue-500/15 dark:hover:bg-white/10 hover:text-white dark:hover:text-white hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="font-medium">Panel</span>
            </Link>

            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-white/20 dark:bg-white/20 bg-blue-500/20 dark:bg-white/20 text-white dark:text-white text-gray-900 dark:text-white font-semibold"
                    : "text-gray-300 dark:text-gray-200 text-gray-700 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-blue-500/15 dark:hover:bg-white/10 hover:text-white dark:hover:text-white hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/20 dark:border-white/20 border-gray-300/30 dark:border-white/20 pt-4 mt-4">
            <div className="flex items-center gap-3 mb-4 px-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-600 flex items-center justify-center text-white font-semibold border border-blue-500/30 dark:border-blue-500/30">
                {user?.fullName?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white dark:text-white text-gray-900 dark:text-white font-medium truncate">
                  {user?.fullName || "Kullanıcı"}
                </p>
                <p className="text-gray-400 dark:text-gray-300 text-gray-600 dark:text-gray-300 text-sm truncate">
                  {user?.email || ""}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 dark:text-gray-200 text-gray-700 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-blue-500/15 dark:hover:bg-white/10 hover:text-white dark:hover:text-white hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            >
              <span>→</span>
              <span className="font-medium">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Navbar */}
        <header className="glass-nav border-b border-white/20 dark:border-white/20 border-gray-300/30 dark:border-white/20 p-4 relative z-20">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-white dark:text-white text-gray-900 p-2 hover:bg-white/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex-1" />
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PanelLayout;
