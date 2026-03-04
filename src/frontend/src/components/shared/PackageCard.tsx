import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import { motion } from "motion/react";
import type { TourPackage } from "../../backend.d";
import { TourCategory } from "../../backend.d";
import { useLanguage } from "../../contexts/LanguageContext";

interface Props {
  pkg: {
    id: string;
    title: string;
    duration: string;
    description: string;
    price: bigint;
    category: TourCategory;
    image: string | { getDirectURL: () => string };
    highlights: string[];
  };
  index: number;
}

const categoryColors: Record<TourCategory, string> = {
  [TourCategory.domestic]: "bg-emerald-100 text-emerald-800",
  [TourCategory.international]: "bg-sky-100 text-sky-800",
  [TourCategory.honeymoon]: "bg-rose-100 text-rose-800",
};

const categoryLabels: Record<TourCategory, { en: string; hi: string }> = {
  [TourCategory.domestic]: { en: "Domestic", hi: "घरेलू" },
  [TourCategory.international]: { en: "International", hi: "अंतर्राष्ट्रीय" },
  [TourCategory.honeymoon]: { en: "Honeymoon", hi: "हनीमून" },
};

function getImageUrl(image: string | { getDirectURL: () => string }): string {
  if (typeof image === "string") return image;
  try {
    return image.getDirectURL();
  } catch {
    return "/assets/generated/hero-traveldome.dim_1600x700.jpg";
  }
}

export default function PackageCard({ pkg, index }: Props) {
  const { t, language } = useLanguage();
  const ocid = `packages.item.${index + 1}`;
  const imageUrl = getImageUrl(pkg.image);
  const price = typeof pkg.price === "bigint" ? Number(pkg.price) : pkg.price;

  return (
    <motion.article
      data-ocid={ocid}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={imageUrl}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[pkg.category]}`}
          >
            {categoryLabels[pkg.category][language]}
          </span>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3 glass-card px-3 py-1.5 rounded-full">
          <span className="text-white text-sm font-bold">
            ₹{price.toLocaleString("en-IN")}
          </span>
          <span className="text-white/70 text-xs"> /{t("per_person")}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {pkg.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-gold fill-gold" />
            4.9
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {pkg.description}
        </p>

        {/* Highlights preview */}
        {pkg.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {pkg.highlights.slice(0, 2).map((h) => (
              <span
                key={h}
                className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full flex items-center gap-1"
              >
                <MapPin className="w-2.5 h-2.5" />
                {h.length > 25 ? `${h.slice(0, 25)}…` : h}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Link
            to="/packages/$packageId"
            params={{ packageId: pkg.id }}
            className="flex-1"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              data-ocid={`packages.item.${index + 1}.button`}
            >
              {t("view_details")}
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
          <Link to="/packages/$packageId" params={{ packageId: pkg.id }}>
            <Button
              size="sm"
              className="gold-gradient text-foreground font-semibold hover:opacity-90"
            >
              {t("book_now")}
            </Button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export { getImageUrl, categoryLabels, categoryColors };
export type { TourPackage };
