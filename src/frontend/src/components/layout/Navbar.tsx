import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Globe, LogIn, LogOut, Menu, Shield, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import { useIsAdmin } from "../../hooks/useQueries";

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: isAdmin } = useIsAdmin();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const location = useLocation();

  const isLoggedIn = loginStatus === "success" && !!identity;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional - close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: t("nav_home"), ocid: "nav.home_link" },
    { to: "/packages", label: t("nav_packages"), ocid: "nav.packages_link" },
    { to: "/blog", label: t("nav_blog"), ocid: "nav.blog_link" },
    { to: "/contact", label: t("nav_contact"), ocid: "nav.contact_link" },
  ];

  // Always dark navbar since logo has black bg
  const navBg = scrolled
    ? "bg-black/95 backdrop-blur-md shadow-lg border-b border-white/10"
    : "bg-black";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          data-ocid="nav.home_link"
          className="flex items-center gap-1 group flex-shrink-0"
        >
          <img
            src="/assets/uploads/TravelDome-logo-3-1-1.png"
            alt="TravelDome"
            className="h-16 w-auto object-contain"
            style={{ maxHeight: "80px" }}
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                data-ocid={link.ocid}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-white/80 hover:text-gold [&.active]:text-gold"
                activeProps={{ className: "text-gold font-semibold" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {isAdmin && (
            <li>
              <Link
                to="/admin"
                data-ocid="nav.admin_button"
                className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 text-white/80 hover:text-gold transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                {t("nav_admin")}
              </Link>
            </li>
          )}
        </ul>

        {/* Right controls */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Language toggle */}
          <button
            type="button"
            data-ocid="nav.language.toggle"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === "en" ? "EN" : "HI"}</span>
          </button>

          {isLoggedIn ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => clear()}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-1" />
              {t("nav_logout")}
            </Button>
          ) : (
            <Button
              size="sm"
              data-ocid="nav.admin_button"
              onClick={() => login()}
              disabled={loginStatus === "logging-in"}
              className="gold-gradient text-foreground font-semibold hover:opacity-90 transition-opacity border-0"
            >
              <LogIn className="w-4 h-4 mr-1" />
              {t("nav_login")}
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            data-ocid="nav.language.toggle"
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-medium border border-white/20 text-white/70"
          >
            <Globe className="w-3 h-3" />
            {language === "en" ? "EN" : "HI"}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={link.ocid}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-gold transition-colors [&.active]:bg-white/10 [&.active]:text-gold"
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  data-ocid="nav.admin_button"
                  className="px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  {t("nav_admin")}
                </Link>
              )}
              <div className="mt-2 pt-2 border-t border-white/10">
                {isLoggedIn ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clear()}
                    className="w-full justify-start text-white/70"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("nav_logout")}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => login()}
                    className="w-full gold-gradient text-foreground font-semibold"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    {t("nav_login")}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
