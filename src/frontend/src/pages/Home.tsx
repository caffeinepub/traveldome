import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Headphones,
  Shield,
  Star,
  Tag,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";
import DestinationCarousel from "../components/shared/DestinationCarousel";
import SectionHeader from "../components/shared/SectionHeader";
import StarRating from "../components/shared/StarRating";
import { useLanguage } from "../contexts/LanguageContext";
import { bakuPackage } from "../data/bakuPackage";
import { sampleReviews } from "../data/sampleData";
import { useGetApprovedReviews } from "../hooks/useQueries";
import { useGetPublishedBlogPosts } from "../hooks/useQueries";

const destinations = [
  {
    slug: "baku-unveiled",
    name: "Baku",
    label: "Azerbaijan",
    image: "/assets/generated/hero-baku.dim_1920x1080.jpg",
  },
  {
    slug: "bali-bliss",
    name: "Bali",
    label: "Indonesia",
    image: "/assets/generated/hero-bali.dim_1920x1080.jpg",
  },
  {
    slug: "dubai-premium",
    name: "Dubai",
    label: "UAE",
    image: "/assets/generated/hero-dubai.dim_1920x1080.jpg",
  },
  {
    slug: "kashmir-winter-wonders",
    name: "Kashmir",
    label: "India",
    image: "/assets/generated/hero-kashmir.dim_1920x1080.jpg",
  },
  {
    slug: "sikkim-darjeeling-escape",
    name: "Sikkim",
    label: "India",
    image: "/assets/generated/hero-sikkim.dim_1920x1080.jpg",
  },
];

export default function Home() {
  const { t } = useLanguage();
  const { data: reviews } = useGetApprovedReviews();
  const { data: blogs } = useGetPublishedBlogPosts();

  const displayReviews =
    reviews && reviews.length > 0
      ? reviews.slice(0, 3)
      : sampleReviews.slice(0, 3);
  const displayBlogs = blogs && blogs.length > 0 ? blogs.slice(0, 3) : [];

  const stats = [
    { value: "10,000+", label: "Happy Travelers" },
    { value: "50+", label: "Destinations" },
    { value: "8+", label: "Years Experience" },
    { value: "100+", label: "Tour Packages" },
  ];

  const whyChooseUs = [
    {
      icon: <UtensilsCrossed className="w-6 h-6" />,
      title: "Indian Meals Guaranteed",
      desc: "Enjoy authentic Indian food at every meal — no compromise on taste.",
    },
    {
      icon: <Tag className="w-6 h-6" />,
      title: "Best Price Guarantee",
      desc: "Transparent pricing with no hidden charges. Value for every rupee.",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      desc: "Our dedicated team is available round-the-clock on your journey.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Visa Assistance",
      desc: "We handle your visa processing — standard 5 working days.",
    },
  ];

  return (
    <main>
      {/* ── Hero Destination Carousel ────────────────────────────────────── */}
      <DestinationCarousel />

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="teal-gradient py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center text-white"
              >
                <div className="font-display font-bold text-3xl md:text-4xl text-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-white/75 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Destinations ─────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Destinations"
            subtitle="Explore handcrafted journeys to the world's most stunning destinations"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-10">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to="/packages/$packageId"
                  params={{ packageId: dest.slug }}
                  data-ocid={`packages.package_card.${i + 1}`}
                  className="group relative block rounded-2xl overflow-hidden aspect-[3/4] shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-0.5">
                      {dest.label}
                    </p>
                    <p className="font-display font-bold text-base leading-tight">
                      {dest.name}
                    </p>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-semibold text-white/80 flex items-center gap-1">
                        View Package <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/packages">
              <Button
                size="lg"
                data-ocid="packages.primary_button"
                className="gold-gradient text-foreground font-bold border-0 hover:opacity-90"
              >
                Browse All Packages
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t("why_choose_us")}
            subtitle="We make your dream vacation a reality with Indian-friendly service"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center mx-auto mb-4 text-foreground">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t("testimonials")}
            subtitle="Real experiences from real travelers"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {displayReviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card relative"
              >
                <div className="text-5xl font-display text-gold/20 absolute top-4 right-6 leading-none select-none">
                  "
                </div>
                <StarRating rating={Number(review.rating)} size="sm" />
                <p className="text-sm text-muted-foreground mt-3 mb-4 leading-relaxed">
                  "{review.reviewText}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full teal-gradient flex items-center justify-center text-white font-bold text-sm">
                    {review.name[0]}
                  </div>
                  <span className="font-semibold text-sm">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Preview ──────────────────────────────────────────────────── */}
      {displayBlogs.length > 0 && (
        <section className="section-padding bg-secondary/20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title={t("latest_blogs")}
              subtitle="Inspiration and guides for your next adventure"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {displayBlogs.map((post, i) => {
                const coverUrl =
                  typeof post.coverImage === "string"
                    ? post.coverImage
                    : (() => {
                        try {
                          return (
                            post.coverImage as { getDirectURL: () => string }
                          ).getDirectURL();
                        } catch {
                          return bakuPackage.heroImage;
                        }
                      })();

                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="h-44 overflow-hidden">
                      <img
                        src={coverUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <h3 className="font-display font-bold text-base mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <Link
                        to="/blog/$postId"
                        params={{ postId: post.id }}
                        className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:text-gold transition-colors"
                      >
                        {t("read_more")} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Link to="/blog">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {t("view_all")} {t("nav_blog")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ─────────────────────────────────────────────────────── */}
      <section className="teal-gradient py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Your Next Adventure Awaits
            </h2>
            <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
              From iconic cities to serene mountains — TravelDome curates
              unforgettable experiences for Indian travelers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/packages">
                <Button
                  size="lg"
                  data-ocid="cta.primary_button"
                  className="gold-gradient text-foreground font-bold border-0 hover:opacity-90"
                >
                  Browse All Packages
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a
                href="https://wa.me/917042636363"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  data-ocid="cta.secondary_button"
                  className="border-white/40 text-white hover:bg-white/10 font-semibold"
                >
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
