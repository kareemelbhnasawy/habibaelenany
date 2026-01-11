import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Image,
  Settings,
  LogOut,
  Video,
  Smartphone,
  Database,
  Menu,
  X,
  Globe,
  MessageSquareQuote,
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Home Page", href: "/admin/home", icon: Settings }, // Reusing Settings or dedicated Home icon
  { label: "Photography", href: "/admin/photography", icon: Image },
  { label: "Filmmaking", href: "/admin/filmmaking", icon: Video },
  { label: "Short Form", href: "/admin/short-form", icon: Smartphone },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  { label: "Settings", href: "/admin/general-settings", icon: Settings },
  { label: "Migration", href: "/admin/migration", icon: Database },
];

export function DashboardLayout() {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold tracking-widest text-white">
            PORTFOLIO
          </h1>
          <span className="text-[10px] text-gray-500 bg-white/10 px-1.5 py-0.5 rounded">
            ADMIN
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 flex flex-col bg-black transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 hidden lg:block">
          <h1 className="text-xl font-bold tracking-widest text-white">
            PORTFOLIO
          </h1>
          <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-white text-black font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Globe size={18} />
            Back to Website
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm text-gray-400 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-x-hidden w-full">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
