import { Link } from "@tanstack/react-router";
import { Clock, Heart, Mail, MapPin, Phone } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "traveldome.in",
  );

  return (
    <footer className="teal-gradient text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/assets/uploads/TravelDome-logo-3--1.png"
                alt="TravelDome"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-2 font-medium">
              From Tickets to Memories — We Handle All
            </p>
            <p className="text-white/50 text-xs mb-6">
              Flight &nbsp;|&nbsp; Visa &nbsp;|&nbsp; Hotels &nbsp;|&nbsp;
              Insurance &nbsp;|&nbsp; Packages
            </p>
            {/* Social */}
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/traveldome._/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918879809915"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold transition-colors flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold transition-colors flex items-center justify-center"
                aria-label="X (Twitter)"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold transition-colors flex items-center justify-center"
                aria-label="YouTube"
              >
                <SiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-gold">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/"
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/packages/$packageId"
                  params={{ packageId: "baku-unveiled" }}
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  Baku Package
                </Link>
              </li>
              <li>
                <Link
                  to="/packages/$packageId"
                  params={{ packageId: "bali-bliss" }}
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  Bali Package
                </Link>
              </li>
              <li>
                <Link
                  to="/packages/$packageId"
                  params={{ packageId: "dubai-premium" }}
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  Dubai Package
                </Link>
              </li>
              <li>
                <Link
                  to="/packages/$packageId"
                  params={{ packageId: "kashmir-winter-wonders" }}
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  Kashmir Package
                </Link>
              </li>
              <li>
                <Link
                  to="/packages/$packageId"
                  params={{ packageId: "sikkim-darjeeling-escape" }}
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  Sikkim-Darjeeling Package
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-gold">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p>Saropi Saraswati, CHS LTD</p>
                  <p>002, Ghazala Road, Pleasant Park</p>
                  <p>Mira Road East, Mira Bhayandar</p>
                  <p>Maharashtra 401107</p>
                </div>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a
                    href="https://wa.me/918879809915"
                    className="hover:text-gold transition-colors"
                  >
                    +91 88798 09915
                  </a>
                  <a
                    href="https://wa.me/919922917255"
                    className="hover:text-gold transition-colors"
                  >
                    +91 99229 17255
                  </a>
                </div>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>info@traveldome.in</span>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>Mon – Sat: 10:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Popular destinations */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-gold">
              Popular Destinations
            </h3>
            <div className="space-y-3">
              {[
                { name: "Baku, Azerbaijan", slug: "baku-unveiled", flag: "AZ" },
                { name: "Bali, Indonesia", slug: "bali-bliss", flag: "ID" },
                { name: "Dubai, UAE", slug: "dubai-premium", flag: "AE" },
                {
                  name: "Kashmir, India",
                  slug: "kashmir-winter-wonders",
                  flag: "IN",
                },
                {
                  name: "Sikkim-Darjeeling",
                  slug: "sikkim-darjeeling-escape",
                  flag: "IN",
                },
              ].map((dest) => (
                <Link
                  key={dest.slug}
                  to="/packages/$packageId"
                  params={{ packageId: dest.slug }}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-gold transition-colors group"
                >
                  <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-gold/20 flex items-center justify-center text-xs font-bold transition-colors shrink-0">
                    {dest.flag}
                  </span>
                  <span>{dest.name}</span>
                </Link>
              ))}
            </div>
            <a
              href="https://www.instagram.com/traveldome._/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs text-white/50 hover:text-gold transition-colors"
            >
              <SiInstagram className="w-3.5 h-3.5" />
              @traveldome._
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/50">
          <span>© {year} TravelDome. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with{" "}
            <Heart className="w-3.5 h-3.5 text-red-400 fill-current" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
