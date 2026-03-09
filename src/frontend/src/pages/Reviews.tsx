import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
  MessageSquarePlus,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import StarRating from "../components/shared/StarRating";
import { useLanguage } from "../contexts/LanguageContext";
import { sampleReviews } from "../data/sampleData";
import { useGetApprovedReviews, useSubmitReview } from "../hooks/useQueries";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=0c0ded2c55dfde36&sxsrf=ANbL-n5xUJoijGsFzVkGBo0SbrE24tTypQ:1772620756431&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOftcrd0ErO-65z8B2-ma2ZN9DqHACIYhQBI8tu3KeVlfzGXefwWGvi7BsDDJNcDXISEsAhWQ_d9lO6qHckNJS6GQdoLC&q=TravelDome+Reviews&sa=X&ved=2ahUKEwjgtYj0hoaTAxVHUWwGHVRQK40Q0bkNegQILRAH&biw=1745&bih=859&dpr=1.1";

function getAvatarColor(name: string): string {
  const colors = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#9333ea",
    "#ea580c",
    "#0891b2",
    "#be185d",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

interface ReviewCardProps {
  review: (typeof sampleReviews)[0];
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      className="bg-card rounded-2xl p-5 shadow-card relative overflow-hidden h-full flex flex-col"
      style={{ borderTop: `3px solid ${getAvatarColor(review.name)}` }}
    >
      {/* Google indicator */}
      <div className="absolute top-3.5 right-4 flex items-center gap-1 bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-full px-2 py-0.5">
        <GoogleIcon />
        <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
          Google
        </span>
      </div>

      <StarRating rating={Number(review.rating)} size="sm" />
      <p className="text-sm text-muted-foreground mt-3 mb-4 leading-relaxed flex-1">
        {review.reviewText}
      </p>
      <div className="flex items-center gap-2.5">
        <div
          style={{ backgroundColor: getAvatarColor(review.name) }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 select-none"
        >
          {review.name[0].toUpperCase()}
        </div>
        <div>
          <span className="font-semibold text-sm block">{review.name}</span>
          <span className="text-xs text-muted-foreground">Google Review</span>
        </div>
      </div>
    </div>
  );
}

interface ReviewsCarouselProps {
  reviews: typeof sampleReviews;
}

function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Determine slides per view based on container width
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (containerRef.current) {
        setSlidesPerView(containerRef.current.offsetWidth >= 640 ? 2 : 1);
      }
    };
    updateSlidesPerView();
    const ro = new ResizeObserver(updateSlidesPerView);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const maxIndex = Math.max(0, reviews.length - slidesPerView);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex],
  );

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-advance
  useEffect(() => {
    if (isHovered) return;
    autoPlayRef.current = setInterval(goNext, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, goNext]);

  // Clamp index if slidesPerView changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const translateX = -(currentIndex * (100 / slidesPerView));

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* Carousel track wrapper */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex"
          style={{
            transform: `translateX(${translateX}%)`,
            transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {reviews.map((review, i) => (
            <div
              key={review.id}
              data-ocid={`reviews.item.${i + 1}`}
              style={{ minWidth: `${100 / slidesPerView}%` }}
              className="px-2"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow buttons */}
      <button
        onClick={goPrev}
        data-ocid="reviews.pagination_prev"
        type="button"
        aria-label="Previous review"
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors z-10"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={goNext}
        data-ocid="reviews.pagination_next"
        type="button"
        aria-label="Next review"
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors z-10"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-5">
        {Array.from({ length: maxIndex + 1 }, (_, i) => i).map((i) => (
          <button
            type="button"
            key={`dot-${i}`}
            onClick={() => goTo(i)}
            aria-label={`Go to review ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-6 h-2 bg-gold"
                : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  const { t } = useLanguage();
  const { data: reviews, isLoading } = useGetApprovedReviews();
  const submitReview = useSubmitReview();

  const [form, setForm] = useState({ name: "", reviewText: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const displayReviews =
    reviews && reviews.length > 0 ? reviews : sampleReviews;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitReview.mutateAsync({
        name: form.name,
        rating: BigInt(form.rating),
        reviewText: form.reviewText,
      });
      toast.success(t("review_success"));
      setSubmitted(true);
      setForm({ name: "", reviewText: "", rating: 5 });
    } catch {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <main className="pt-16">
      {/* Hero */}
      <div className="teal-gradient py-20 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-4xl md:text-5xl mb-3"
        >
          {t("reviews_title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white/75 text-lg max-w-xl mx-auto px-4 mb-6"
        >
          {t("reviews_subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="reviews.primary_button"
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold py-2.5 px-6 rounded-full text-sm transition-colors border border-white/20"
          >
            <Star className="w-4 h-4 fill-gold text-gold" />
            See Our Google Reviews
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Reviews carousel */}
            <div className="lg:col-span-2">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(["r1", "r2", "r3", "r4"] as const).map((sk) => (
                    <div
                      key={sk}
                      className="bg-card rounded-2xl p-5 space-y-3"
                      data-ocid="reviews.loading_state"
                    >
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              ) : displayReviews.length > 0 ? (
                <div className="px-4">
                  <ReviewsCarousel reviews={displayReviews} />
                </div>
              ) : (
                <div
                  className="text-center py-10 text-muted-foreground"
                  data-ocid="reviews.empty_state"
                >
                  <p>{t("no_results")}</p>
                </div>
              )}
            </div>

            {/* Submit review */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-card-hover sticky top-24">
                {/* Google Reviews Banner */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-5 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                      <GoogleIcon />
                    </div>
                    <div>
                      <p className="font-bold text-blue-900 text-sm">
                        TravelDome on Google
                      </p>
                      <p className="text-xs text-blue-700">
                        See what our travelers say
                      </p>
                    </div>
                  </div>
                  <a
                    href={GOOGLE_REVIEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="reviews.secondary_button"
                    className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    See Our Google Reviews
                  </a>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <MessageSquarePlus className="w-5 h-5 text-gold" />
                  <h2 className="font-display font-bold text-xl">
                    Share Your Experience
                  </h2>
                </div>

                {submitted ? (
                  <div
                    className="text-center py-6"
                    data-ocid="reviews.success_state"
                  >
                    <div className="w-14 h-14 gold-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageSquarePlus className="w-6 h-6" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {t("review_success")}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => setSubmitted(false)}
                    >
                      Write Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">
                        {t("review_name")} *
                      </Label>
                      <Input
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        required
                        placeholder="Your name"
                        data-ocid="review.name_input"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">
                        {t("review_rating")} *
                      </Label>
                      <div className="flex gap-1 mt-1">
                        <StarRating
                          rating={form.rating}
                          interactive
                          onChange={(r) =>
                            setForm((p) => ({ ...p, rating: r }))
                          }
                          size="lg"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">
                        {t("review_text")} *
                      </Label>
                      <Textarea
                        value={form.reviewText}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, reviewText: e.target.value }))
                        }
                        required
                        rows={4}
                        placeholder="Share your travel experience with TravelDome..."
                        data-ocid="review.textarea"
                      />
                    </div>

                    <Button
                      type="submit"
                      data-ocid="review.submit_button"
                      disabled={submitReview.isPending}
                      className="w-full gold-gradient text-foreground font-bold border-0 hover:opacity-90"
                    >
                      {submitReview.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t("loading")}
                        </>
                      ) : (
                        t("review_submit")
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
