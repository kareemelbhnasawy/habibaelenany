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
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Home Page", href: "/admin/home", icon: Settings }, // Reusing Settings or dedicated Home icon
  { label: "Photography", href: "/admin/photography", icon: Image },
  { label: "Filmmaking", href: "/admin/filmmaking", icon: Video },
  { label: "Short Form", href: "/admin/short-form", icon: Smartphone },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Migration", href: "/admin/migration", icon: Database },
];

export function DashboardLayout() {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col fixed inset-y-0 left-0 bg-black z-50">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-widest text-white">
            PORTFOLIO
          </h1>
          <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
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

        <div className="p-4 border-t border-white/10">
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
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
