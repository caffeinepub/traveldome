import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, Loader2, MessageSquarePlus, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import SectionHeader from "../components/shared/SectionHeader";
import StarRating from "../components/shared/StarRating";
import { useLanguage } from "../contexts/LanguageContext";
import { sampleReviews } from "../data/sampleData";
import { useGetApprovedReviews, useSubmitReview } from "../hooks/useQueries";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=0c0ded2c55dfde36&sxsrf=ANbL-n5xUJoijGsFzVkGBo0SbrE24tTypQ:1772620756431&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOftcrd0ErO-65z8B2-ma2ZN9DqHACIYhQBI8tu3KeVlfzGXefwWGvi7BsDDJNcDXISEsAhWQ_d9lO6qHckNJS6GQdoLC&q=TravelDome+Reviews&sa=X&ved=2ahUKEwjgtYj0hoaTAxVHUWwGHVRQK40Q0bkNegQILRAH&biw=1745&bih=859&dpr=1.1";

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
            {/* Reviews list */}
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
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayReviews.map((review, i) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-card rounded-2xl p-5 shadow-card relative"
                    >
                      <div className="absolute top-4 right-5 text-4xl font-display text-gold/15 leading-none select-none">
                        "
                      </div>
                      <StarRating rating={Number(review.rating)} size="sm" />
                      <p className="text-sm text-muted-foreground mt-3 mb-4 leading-relaxed">
                        "{review.reviewText}"
                      </p>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full teal-gradient flex items-center justify-center text-white font-bold text-sm">
                          {review.name[0]}
                        </div>
                        <div>
                          <span className="font-semibold text-sm block">
                            {review.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Verified Traveler
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {!isLoading && displayReviews.length === 0 && (
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
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 text-white fill-white" />
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
