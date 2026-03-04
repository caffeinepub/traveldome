import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const destinations = [
  {
    slug: "baku-unveiled",
    name: "Baku, Azerbaijan",
    label: "Explore Baku",
    image: "/assets/generated/baku-hero.dim_1400x700.jpg",
  },
  {
    slug: "bali-bliss",
    name: "Bali, Indonesia",
    label: "Explore Bali",
    image: "/assets/generated/bali-hero.dim_1400x700.jpg",
  },
  {
    slug: "dubai-premium",
    name: "Dubai, UAE",
    label: "Explore Dubai",
    image: "/assets/generated/dubai-hero.dim_1400x700.jpg",
  },
  {
    slug: "kashmir-winter-wonders",
    name: "Kashmir, India",
    label: "Explore Kashmir",
    image: "/assets/generated/kashmir-hero.dim_1400x700.jpg",
  },
  {
    slug: "sikkim-darjeeling-escape",
    name: "Sikkim and Darjeeling",
    label: "Explore Sikkim",
    image: "/assets/generated/sikkim-hero.dim_1400x700.jpg",
  },
];

export default function DestinationCarousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % destinations.length),
    [],
  );
  const prev = () =>
    setCurrent((c) => (c - 1 + destinations.length) % destinations.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const dest = destinations[current];

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          key={`badge-${current}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white/70 text-sm font-medium tracking-widest uppercase mb-3"
        >
          {dest.name}
        </motion.div>

        <motion.h2
          key={`label-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 cursor-pointer hover:text-gold transition-colors"
          onClick={() =>
            navigate({
              to: "/packages/$packageId",
              params: { packageId: dest.slug },
            })
          }
        >
          {dest.label}
        </motion.h2>

        <motion.button
          key={`btn-${current}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() =>
            navigate({
              to: "/packages/$packageId",
              params: { packageId: dest.slug },
            })
          }
          data-ocid="hero.primary_button"
          className="bg-gold text-black font-bold text-base px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          View Package
        </motion.button>

        {/* Dots */}
        <div className="absolute bottom-8 flex gap-2">
          {destinations.map((dest, i) => (
            <button
              type="button"
              key={dest.slug}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-gold w-6" : "bg-white/50 w-2"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Prev/Next arrows */}
      <button
        type="button"
        onClick={prev}
        data-ocid="hero.secondary_button"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors flex items-center justify-center"
        aria-label="Previous destination"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors flex items-center justify-center"
        aria-label="Next destination"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
