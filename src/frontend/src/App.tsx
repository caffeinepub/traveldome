import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { LanguageProvider } from "./contexts/LanguageContext";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import PackageDetail from "./pages/PackageDetail";
import Packages from "./pages/Packages";
import Reviews from "./pages/Reviews";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminPackages from "./pages/admin/AdminPackages";
import AdminReviews from "./pages/admin/AdminReviews";

// ─── Root Layout ───────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <LanguageProvider>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster richColors position="top-right" />
    </LanguageProvider>
  ),
});

// ─── Public Routes ─────────────────────────────────────────────────────────
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const packagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/packages",
  component: Packages,
});

const packageDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/packages/$packageId",
  component: PackageDetail,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: Gallery,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: Blog,
});

const blogDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$postId",
  component: BlogDetail,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const reviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reviews",
  component: Reviews,
});

// ─── Admin Routes (layout-wrapped) ────────────────────────────────────────
const adminRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLayout,
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/",
  component: AdminDashboard,
});

const adminLeadsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/leads",
  component: AdminLeads,
});

const adminPackagesRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/packages",
  component: AdminPackages,
});

const adminBookingsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/bookings",
  component: AdminBookings,
});

const adminGalleryRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/gallery",
  component: AdminGallery,
});

const adminReviewsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/reviews",
  component: AdminReviews,
});

const adminBlogRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/blog",
  component: AdminBlog,
});

// ─── Router ────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  packagesRoute,
  packageDetailRoute,
  galleryRoute,
  blogRoute,
  blogDetailRoute,
  contactRoute,
  reviewsRoute,
  adminRootRoute.addChildren([
    adminIndexRoute,
    adminLeadsRoute,
    adminPackagesRoute,
    adminBookingsRoute,
    adminGalleryRoute,
    adminReviewsRoute,
    adminBlogRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
