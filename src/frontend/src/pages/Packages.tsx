import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BedDouble,
  Calendar,
  Car,
  CheckCircle,
  Droplets,
  FileText,
  Hotel,
  Map as MapIcon,
  Plane,
  Star,
  Ticket,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";
import { bakuPackage } from "../data/bakuPackage";
import { baliPackage } from "../data/baliPackage";
import { dubaiPackage } from "../data/dubaiPackage";
import { kashmirPackage } from "../data/kashmirPackage";
import { sikkimPackage } from "../data/sikkimPackage";

const inclusionIconMap: Record<string, React.ReactNode> = {
  BedDouble: <BedDouble className="w-4 h-4" />,
  UtensilsCrossed: <UtensilsCrossed className="w-4 h-4" />,
  Car: <Car className="w-4 h-4" />,
  Ticket: <Ticket className="w-4 h-4" />,
  Droplets: <Droplets className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  Map: <MapIcon className="w-4 h-4" />,
  Plane: <Plane className="w-4 h-4" />,
  Hotel: <Hotel className="w-4 h-4" />,
};

export default function Packages() {
  const nextDeparture = (() => {
    for (const group of bakuPackage.departureDates) {
      for (const d of group.dates) {
        const dateStr = `${group.month} ${d}, 2025`;
        const date = new Date(dateStr);
        if (date >= new Date()) return `${group.month} ${d}`;
      }
    }
    return "March 25";
  })();

  return (
    <main className="pt-16">
      {/* Hero banner */}
      <div
        className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('${baliPackage.heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl md:text-5xl mb-3"
          >
            Tour Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-xl mx-auto"
          >
            Handcrafted Indian-friendly journeys to the world's most stunning
            destinations
          </motion.p>
        </div>
      </div>

      {/* Package listing */}
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-5xl space-y-10">
          {/* ── BAKU PACKAGE ────────────────────────────────────────── */}
          <motion.article
            data-ocid="packages.package_card.1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl overflow-hidden shadow-card-hover group"
          >
            {/* Hero image */}
            <div className="relative h-72 md:h-[420px] overflow-hidden">
              <img
                src={bakuPackage.heroImage}
                alt={`${bakuPackage.name} - ${bakuPackage.destination}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Top badges */}
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                <Badge className="bg-sky-500 text-white border-0 font-semibold hover:bg-sky-600">
                  International
                </Badge>
                <Badge className="bg-gold text-black border-0 font-semibold hover:bg-gold">
                  New Launch
                </Badge>
                <Badge className="bg-emerald-600 text-white border-0 font-semibold">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  {bakuPackage.rating} Rated
                </Badge>
              </div>

              {/* Next departure */}
              <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span className="text-white text-xs font-semibold">
                  Next: {nextDeparture}
                </span>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-gold text-sm font-semibold mb-1 uppercase tracking-wider">
                  Baku, Azerbaijan
                </p>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
                  {bakuPackage.name} — {bakuPackage.duration}
                </h2>
                <p className="text-white/80 text-sm md:text-base max-w-xl">
                  {bakuPackage.tagline}
                </p>
              </div>
            </div>

            {/* Card content */}
            <div className="p-6 md:p-8">
              {/* Inclusions at a glance */}
              <div className="mb-6 p-4 bg-secondary/50 rounded-2xl border border-border">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Package Includes — At a Glance
                </p>
                <div className="flex flex-wrap gap-2">
                  {bakuPackage.inclusions.map((inc) => (
                    <div
                      key={inc.icon}
                      className="flex items-center gap-2 bg-card text-foreground text-xs font-medium px-3 py-2 rounded-full border border-border shadow-xs hover:border-primary hover:text-primary transition-colors"
                      title={inc.desc}
                    >
                      <span className="text-primary">
                        {inclusionIconMap[inc.icon]}
                      </span>
                      <span>{inc.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Departure dates */}
              <div className="mb-6">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Group Departure Dates 2025
                </p>
                <div className="flex flex-wrap gap-2">
                  {bakuPackage.departureDates.map((group) =>
                    group.dates.map((d) => (
                      <span
                        key={`${group.month}-${d}`}
                        className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-3 py-1.5 rounded-full"
                      >
                        {group.month} {d}
                      </span>
                    )),
                  )}
                </div>
              </div>

              {/* Price + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Starting from (excluding taxes)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-4xl text-foreground">
                      ₹{bakuPackage.startingPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-muted-foreground text-base">
                      /person
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Single: ₹59,999 &nbsp;|&nbsp; Double/Triple: ₹45,999
                    &nbsp;|&nbsp; Child: ₹22,500
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Link
                    to="/packages/$packageId"
                    params={{ packageId: bakuPackage.slug }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      data-ocid="packages.view_details_button.1"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                    >
                      View Full Itinerary
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link
                    to="/packages/$packageId"
                    params={{ packageId: bakuPackage.slug }}
                  >
                    <Button
                      size="lg"
                      className="gold-gradient text-foreground font-bold border-0 hover:opacity-90 shadow-glow"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>

          {/* ── BALI PACKAGE ────────────────────────────────────────── */}
          <motion.article
            data-ocid="packages.package_card.2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl overflow-hidden shadow-card-hover group"
          >
            {/* Hero image */}
            <div className="relative h-72 md:h-[420px] overflow-hidden">
              <img
                src={baliPackage.heroImage}
                alt={`${baliPackage.name} - ${baliPackage.destination}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Top badges */}
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                <Badge className="bg-sky-500 text-white border-0 font-semibold hover:bg-sky-600">
                  International
                </Badge>
                <Badge className="bg-violet-600 text-white border-0 font-semibold hover:bg-violet-700">
                  Luxury
                </Badge>
                <Badge className="bg-emerald-600 text-white border-0 font-semibold">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  {baliPackage.rating} Rated
                </Badge>
              </div>

              {/* Flexible dates badge */}
              <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span className="text-white text-xs font-semibold">
                  On Request
                </span>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-gold text-sm font-semibold mb-1 uppercase tracking-wider">
                  Bali, Indonesia
                </p>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
                  {baliPackage.name} — {baliPackage.duration}
                </h2>
                <p className="text-white/80 text-sm md:text-base max-w-xl">
                  {baliPackage.tagline}
                </p>
              </div>
            </div>

            {/* Card content */}
            <div className="p-6 md:p-8">
              {/* Inclusions at a glance */}
              <div className="mb-5 p-4 bg-secondary/50 rounded-2xl border border-border">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Package Includes — At a Glance
                </p>
                <div className="flex flex-wrap gap-2">
                  {baliPackage.inclusions.map((inc) => (
                    <div
                      key={inc.icon}
                      className="flex items-center gap-2 bg-card text-foreground text-xs font-medium px-3 py-2 rounded-full border border-border shadow-xs hover:border-primary hover:text-primary transition-colors"
                      title={inc.desc}
                    >
                      <span className="text-primary">
                        {inclusionIconMap[inc.icon]}
                      </span>
                      <span>{inc.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hotel highlights */}
              <div className="mb-5 p-4 bg-violet-50 rounded-2xl border border-violet-100">
                <p className="text-xs font-bold text-violet-700 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5 text-violet-500" />
                  Premium Hotel Line-Up
                </p>
                <div className="flex flex-col gap-2">
                  {baliPackage.hotelHighlights.map((hotel) => (
                    <div
                      key={hotel}
                      className="flex items-start gap-2 text-xs text-violet-800"
                    >
                      <Hotel className="w-3.5 h-3.5 mt-0.5 shrink-0 text-violet-500" />
                      <span>{hotel}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flexible dates notice */}
              <div className="mb-6">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Departure Dates
                </p>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl w-fit">
                  <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-semibold text-amber-800">
                    On Request — Flexible Dates
                  </span>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Starting from (excluding taxes)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-4xl text-foreground">
                      ₹{baliPackage.startingPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-muted-foreground text-base">
                      /person
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Single: ₹1,10,000 &nbsp;|&nbsp; Double/Triple: ₹85,000
                    &nbsp;|&nbsp; Child: ₹69,500
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Link
                    to="/packages/$packageId"
                    params={{ packageId: baliPackage.slug }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      data-ocid="packages.view_details_button.2"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                    >
                      View Full Itinerary
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link
                    to="/packages/$packageId"
                    params={{ packageId: baliPackage.slug }}
                  >
                    <Button
                      size="lg"
                      className="gold-gradient text-foreground font-bold border-0 hover:opacity-90 shadow-glow"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>

          {/* ── DUBAI PACKAGE ────────────────────────────────────────── */}
          <motion.article
            data-ocid="packages.package_card.3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl overflow-hidden shadow-card-hover group"
          >
            <div className="relative h-72 md:h-[420px] overflow-hidden">
              <img
                src={dubaiPackage.heroImage}
                alt={`${dubaiPackage.name} - ${dubaiPackage.destination}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                <Badge className="bg-sky-500 text-white border-0 font-semibold hover:bg-sky-600">
                  International
                </Badge>
                <Badge className="bg-amber-500 text-white border-0 font-semibold hover:bg-amber-600">
                  City of Gold
                </Badge>
                <Badge className="bg-emerald-600 text-white border-0 font-semibold">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  {dubaiPackage.rating} Rated
                </Badge>
              </div>

              <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span className="text-white text-xs font-semibold">
                  On Request
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-gold text-sm font-semibold mb-1 uppercase tracking-wider">
                  Dubai, UAE
                </p>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
                  {dubaiPackage.name} — {dubaiPackage.duration}
                </h2>
                <p className="text-white/80 text-sm md:text-base max-w-xl">
                  {dubaiPackage.tagline}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-6 p-4 bg-secondary/50 rounded-2xl border border-border">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Package Includes — At a Glance
                </p>
                <div className="flex flex-wrap gap-2">
                  {dubaiPackage.inclusions.map((inc) => (
                    <div
                      key={inc.icon + inc.label}
                      className="flex items-center gap-2 bg-card text-foreground text-xs font-medium px-3 py-2 rounded-full border border-border shadow-xs hover:border-primary hover:text-primary transition-colors"
                      title={inc.desc}
                    >
                      <span className="text-primary">
                        {inclusionIconMap[inc.icon]}
                      </span>
                      <span>{inc.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Departure Dates
                </p>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl w-fit">
                  <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-semibold text-amber-800">
                    On Request — Flexible Dates
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Starting from (excluding taxes)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-4xl text-foreground">
                      ₹{dubaiPackage.startingPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-muted-foreground text-base">
                      /person
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Link
                    to="/packages/$packageId"
                    params={{ packageId: dubaiPackage.slug }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      data-ocid="packages.view_details_button.3"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                    >
                      View Full Itinerary
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link
                    to="/packages/$packageId"
                    params={{ packageId: dubaiPackage.slug }}
                  >
                    <Button
                      size="lg"
                      className="gold-gradient text-foreground font-bold border-0 hover:opacity-90 shadow-glow"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>

          {/* ── KASHMIR PACKAGE ────────────────────────────────────────── */}
          <motion.article
            data-ocid="packages.package_card.4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl overflow-hidden shadow-card-hover group"
          >
            <div className="relative h-72 md:h-[420px] overflow-hidden">
              <img
                src={kashmirPackage.heroImage}
                alt={`${kashmirPackage.name} - ${kashmirPackage.destination}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                <Badge className="bg-emerald-700 text-white border-0 font-semibold hover:bg-emerald-800">
                  Domestic
                </Badge>
                <Badge className="bg-blue-600 text-white border-0 font-semibold hover:bg-blue-700">
                  Paradise on Earth
                </Badge>
                <Badge className="bg-emerald-600 text-white border-0 font-semibold">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  {kashmirPackage.rating} Rated
                </Badge>
              </div>

              <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span className="text-white text-xs font-semibold">
                  On Request
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-gold text-sm font-semibold mb-1 uppercase tracking-wider">
                  Kashmir, India
                </p>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
                  {kashmirPackage.name} — {kashmirPackage.duration}
                </h2>
                <p className="text-white/80 text-sm md:text-base max-w-xl">
                  {kashmirPackage.tagline}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-6 p-4 bg-secondary/50 rounded-2xl border border-border">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Package Includes — At a Glance
                </p>
                <div className="flex flex-wrap gap-2">
                  {kashmirPackage.inclusions.map((inc) => (
                    <div
                      key={inc.icon + inc.label}
                      className="flex items-center gap-2 bg-card text-foreground text-xs font-medium px-3 py-2 rounded-full border border-border shadow-xs hover:border-primary hover:text-primary transition-colors"
                      title={inc.desc}
                    >
                      <span className="text-primary">
                        {inclusionIconMap[inc.icon]}
                      </span>
                      <span>{inc.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Departure Dates
                </p>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl w-fit">
                  <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-semibold text-amber-800">
                    On Request — Flexible Dates
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Starting from (excluding taxes)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-4xl text-foreground">
                      ₹{kashmirPackage.startingPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-muted-foreground text-base">
                      /person
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Link
                    to="/packages/$packageId"
                    params={{ packageId: kashmirPackage.slug }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      data-ocid="packages.view_details_button.4"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                    >
                      View Full Itinerary
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link
                    to="/packages/$packageId"
                    params={{ packageId: kashmirPackage.slug }}
                  >
                    <Button
                      size="lg"
                      className="gold-gradient text-foreground font-bold border-0 hover:opacity-90 shadow-glow"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>

          {/* ── SIKKIM-DARJEELING PACKAGE ────────────────────────────────────────── */}
          <motion.article
            data-ocid="packages.package_card.5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl overflow-hidden shadow-card-hover group"
          >
            <div className="relative h-72 md:h-[420px] overflow-hidden">
              <img
                src={sikkimPackage.heroImage}
                alt={`${sikkimPackage.name} - ${sikkimPackage.destination}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                <Badge className="bg-emerald-700 text-white border-0 font-semibold hover:bg-emerald-800">
                  Domestic
                </Badge>
                <Badge className="bg-teal-600 text-white border-0 font-semibold hover:bg-teal-700">
                  Himalayan Kingdom
                </Badge>
                <Badge className="bg-emerald-600 text-white border-0 font-semibold">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  {sikkimPackage.rating} Rated
                </Badge>
              </div>

              <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span className="text-white text-xs font-semibold">
                  On Request
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-gold text-sm font-semibold mb-1 uppercase tracking-wider">
                  Sikkim and Darjeeling, India
                </p>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
                  {sikkimPackage.name} — {sikkimPackage.duration}
                </h2>
                <p className="text-white/80 text-sm md:text-base max-w-xl">
                  {sikkimPackage.tagline}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-6 p-4 bg-secondary/50 rounded-2xl border border-border">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Package Includes — At a Glance
                </p>
                <div className="flex flex-wrap gap-2">
                  {sikkimPackage.inclusions.map((inc) => (
                    <div
                      key={inc.icon + inc.label}
                      className="flex items-center gap-2 bg-card text-foreground text-xs font-medium px-3 py-2 rounded-full border border-border shadow-xs hover:border-primary hover:text-primary transition-colors"
                      title={inc.desc}
                    >
                      <span className="text-primary">
                        {inclusionIconMap[inc.icon]}
                      </span>
                      <span>{inc.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Departure Dates
                </p>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl w-fit">
                  <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-semibold text-amber-800">
                    On Request — Flexible Dates
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Starting from (excluding taxes)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-4xl text-foreground">
                      ₹{sikkimPackage.startingPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-muted-foreground text-base">
                      /person
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Per person on double sharing basis
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Link
                    to="/packages/$packageId"
                    params={{ packageId: sikkimPackage.slug }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      data-ocid="packages.view_details_button.5"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                    >
                      View Full Itinerary
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link
                    to="/packages/$packageId"
                    params={{ packageId: sikkimPackage.slug }}
                  >
                    <Button
                      size="lg"
                      className="gold-gradient text-foreground font-bold border-0 hover:opacity-90 shadow-glow"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>
    </main>
  );
}
