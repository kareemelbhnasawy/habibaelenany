import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Image,
  Video,
  Smartphone,
  Star,
  ArrowUpRight,
  Users,
  Eye,
  Activity,
  Calendar,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Stats {
  totalPhotos: number;
  totalVideos: number;
  totalShortForm: number;
  totalHighlights: number;
}

export function DashboardOverview() {
  const [stats, setStats] = useState<Stats>({
    totalPhotos: 0,
    totalVideos: 0,
    totalShortForm: 0,
    totalHighlights: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch all counts in parallel for performance
        const [
          { count: photosCount },
          { count: videosCount },
          { count: shortFormCount },
          { count: highlightsCount },
        ] = await Promise.all([
          supabase
            .from("media_items")
            .select("*", { count: "exact", head: true })
            .eq("category", "Photography"),
          supabase
            .from("media_items")
            .select("*", { count: "exact", head: true })
            .eq("category", "Filmmaking"),
          supabase
            .from("media_items")
            .select("*", { count: "exact", head: true })
            .eq("category", "Short Form"),
          supabase
            .from("media_items")
            .select("*", { count: "exact", head: true })
            .eq("is_highlight", true),
        ]);

        setStats({
          totalPhotos: photosCount || 0,
          totalVideos: videosCount || 0,
          totalShortForm: shortFormCount || 0,
          totalHighlights: highlightsCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Photography",
      value: stats.totalPhotos,
      icon: Image,
      color: "from-pink-500/20 to-purple-500/20",
      textColor: "text-pink-400",
      borderColor: "border-pink-500/20",
      link: "/admin/photography",
      desc: "Photos in Gallery",
    },
    {
      title: "Filmmaking",
      value: stats.totalVideos,
      icon: Video,
      color: "from-blue-500/20 to-cyan-500/20",
      textColor: "text-cyan-400",
      borderColor: "border-cyan-500/20",
      link: "/admin/filmmaking",
      desc: "Projects & Frames",
    },
    {
      title: "Short Form",
      value: stats.totalShortForm,
      icon: Smartphone,
      color: "from-emerald-500/20 to-green-500/20",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/20",
      link: "/admin/short-form",
      desc: "Vertical Videos",
    },
    {
      title: "Highlights",
      value: stats.totalHighlights,
      icon: Star,
      color: "from-amber-500/20 to-orange-500/20",
      textColor: "text-amber-400",
      borderColor: "border-amber-500/20",
      link: "/admin/home",
      desc: "Featured on Home",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-semibold text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-400">
            Welcome back! Here's what's happening in your portfolio.
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm text-gray-400">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className={`relative group p-6 rounded-2xl border ${stat.borderColor} bg-zinc-900/50 hover:bg-zinc-900 transition-all duration-300 overflow-hidden`}
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-xl bg-black/40 ${stat.textColor} ring-1 ring-white/10`}
                >
                  <stat.icon size={24} />
                </div>
                <div className="bg-white/5 p-1.5 rounded-lg text-gray-400 group-hover:text-white transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white mb-1">
                  {loading ? "-" : stat.value}
                </h3>
                <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                  {stat.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity / Quick Actions Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="md:col-span-2 bg-zinc-900/30 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="text-blue-400" size={20} />
            <h2 className="text-xl font-semibold text-white">System Status</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-4">
              <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                  Admin Access
                </p>
                <p className="text-white font-medium">Active (You)</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-4">
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                <Eye size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                  Site Status
                </p>
                <p className="text-white font-medium">Live</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-4">
              <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                  Last Updated
                </p>
                <p className="text-white font-medium">Just Now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tip / Visual Element */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
            <Star size={100} />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Pro Tip</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Don't forget to mark your best work as "Highlights" to keep your
              home page fresh and engaging!
            </p>
            <Link
              to="/admin/home"
              className="inline-block bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:bg-indigo-50"
            >
              Manage Highlights
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
