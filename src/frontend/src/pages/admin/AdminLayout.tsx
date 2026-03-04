import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Image,
  LayoutDashboard,
  Package,
  Star,
  Users,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import { useIsAdmin } from "../../hooks/useQueries";
import AdminLogin from "./AdminLogin";

export default function AdminLayout() {
  const { t } = useLanguage();
  const { data: isAdmin, isLoading } = useIsAdmin();
  const { loginStatus, identity } = useInternetIdentity();
  const location = useLocation();

  const isLoggedIn = loginStatus === "success" && !!identity;

  if (!isLoggedIn || (!isAdmin && !isLoading)) {
    return <AdminLogin />;
  }

  const navItems = [
    {
      to: "/admin",
      label: t("admin_dashboard"),
      icon: <LayoutDashboard className="w-4 h-4" />,
      ocid: "admin.leads_tab",
    },
    {
      to: "/admin/leads",
      label: "Lead Captures",
      icon: <Users className="w-4 h-4" />,
      ocid: "admin.leads_tab",
    },
    {
      to: "/admin/bookings",
      label: t("admin_bookings"),
      icon: <BookOpen className="w-4 h-4" />,
      ocid: "admin.bookings_tab",
    },
    {
      to: "/admin/reviews",
      label: t("admin_reviews"),
      icon: <Star className="w-4 h-4" />,
      ocid: "admin.reviews_tab",
    },
    {
      to: "/admin/blog",
      label: t("admin_blog"),
      icon: <FileText className="w-4 h-4" />,
      ocid: "admin.blog_tab",
    },
    {
      to: "/admin/gallery",
      label: t("admin_gallery"),
      icon: <Image className="w-4 h-4" />,
      ocid: "admin.gallery_tab",
    },
    {
      to: "/admin/packages",
      label: t("admin_packages"),
      icon: <Package className="w-4 h-4" />,
      ocid: "admin.leads_tab",
    },
  ];

  return (
    <div className="pt-16 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 teal-gradient sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-4 border-b border-white/10">
          <p className="text-white/60 text-xs uppercase tracking-wider mb-0.5">
            Admin Panel
          </p>
          <p className="text-white font-semibold text-sm">TravelDome</p>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.to === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                data-ocid={item.ocid}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 mt-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/50 hover:text-white/80 text-xs transition-colors px-3 py-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 bg-background p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
