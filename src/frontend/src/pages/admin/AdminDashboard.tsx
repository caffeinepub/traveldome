import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  FileText,
  Image,
  Package,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  useGetAllBlogPosts,
  useGetAllBookings,
  useGetAllGalleryPhotos,
  useGetAllReviews,
  useGetAllTourPackages,
} from "../../hooks/useQueries";

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { data: packages, isLoading: pkgLoading } = useGetAllTourPackages();
  const { data: bookings, isLoading: bkgLoading } = useGetAllBookings();
  const { data: reviews, isLoading: revLoading } = useGetAllReviews();
  const { data: photos, isLoading: photoLoading } = useGetAllGalleryPhotos();
  const { data: blogs, isLoading: blogLoading } = useGetAllBlogPosts();

  const pendingReviews = reviews?.filter((r) => !r.approved).length ?? 0;

  const stats = [
    {
      label: t("admin_total_packages"),
      value: packages?.length ?? 0,
      icon: <Package className="w-5 h-5" />,
      color: "teal-gradient",
      loading: pkgLoading,
    },
    {
      label: t("admin_total_bookings"),
      value: bookings?.length ?? 0,
      icon: <BookOpen className="w-5 h-5" />,
      color: "gold-gradient",
      loading: bkgLoading,
    },
    {
      label: t("admin_total_reviews"),
      value: reviews?.length ?? 0,
      icon: <Star className="w-5 h-5" />,
      color: "teal-gradient",
      loading: revLoading,
    },
    {
      label: t("admin_total_photos"),
      value: photos?.length ?? 0,
      icon: <Image className="w-5 h-5" />,
      color: "gold-gradient",
      loading: photoLoading,
    },
    {
      label: t("admin_pending_reviews"),
      value: pendingReviews,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "teal-gradient",
      loading: revLoading,
    },
    {
      label: t("admin_blog"),
      value: blogs?.length ?? 0,
      icon: <FileText className="w-5 h-5" />,
      color: "gold-gradient",
      loading: blogLoading,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl">
          {t("admin_dashboard")}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome to TravelDome Admin Panel
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="shadow-card hover:shadow-card-hover transition-shadow">
              <CardContent className="p-5 flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white shrink-0`}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">
                    {stat.label}
                  </p>
                  {stat.loading ? (
                    <Skeleton className="h-7 w-10" />
                  ) : (
                    <p className="font-display font-bold text-2xl">
                      {stat.value}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent bookings preview */}
      <div className="mt-8">
        <h2 className="font-display font-semibold text-lg mb-4">
          Recent Bookings
        </h2>
        <Card>
          <CardContent className="p-0">
            {bkgLoading ? (
              <div className="p-4 space-y-3">
                {(["d1", "d2", "d3"] as const).map((sk) => (
                  <Skeleton key={sk} className="h-10 w-full" />
                ))}
              </div>
            ) : !bookings || bookings.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No bookings yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                        Name
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                        Email
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                        Dates
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                        Travelers
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((b) => (
                      <tr
                        key={b.id}
                        className="border-b border-border last:border-0 hover:bg-secondary/30"
                      >
                        <td className="px-4 py-3">{b.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {b.email}
                        </td>
                        <td className="px-4 py-3">{b.travelDates}</td>
                        <td className="px-4 py-3">{String(b.travelers)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
