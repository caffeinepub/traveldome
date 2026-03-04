import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import SectionHeader from "../components/shared/SectionHeader";
import { useLanguage } from "../contexts/LanguageContext";
import { sampleGallery } from "../data/sampleData";
import { useGetAllGalleryPhotos } from "../hooks/useQueries";

function getPhotoUrl(image: string | { getDirectURL: () => string }): string {
  if (typeof image === "string") return image;
  try {
    return image.getDirectURL();
  } catch {
    return "/assets/generated/hero-traveldome.dim_1600x700.jpg";
  }
}

export default function Gallery() {
  const { t } = useLanguage();
  const { data: photos, isLoading } = useGetAllGalleryPhotos();

  const displayPhotos = photos && photos.length > 0 ? photos : sampleGallery;

  return (
    <main className="pt-16">
      {/* Hero banner */}
      <div
        className="relative h-52 flex items-center justify-center"
        style={{
          backgroundImage: `url('/assets/generated/package-india.dim_800x500.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl md:text-5xl mb-2"
          >
            {t("gallery_title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/80"
          >
            {t("gallery_subtitle")}
          </motion.p>
        </div>
      </div>

      {/* Gallery grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="masonry-grid">
              {(["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const).map(
                (sk, i) => (
                  <div
                    key={sk}
                    className="masonry-item"
                    data-ocid="gallery.loading_state"
                  >
                    <Skeleton
                      className="w-full rounded-xl"
                      style={{ height: `${200 + (i % 3) * 80}px` }}
                    />
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="masonry-grid">
              {displayPhotos.map((photo, i) => {
                const url = getPhotoUrl(
                  photo.image as string | { getDirectURL: () => string },
                );
                return (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="masonry-item group relative overflow-hidden rounded-xl cursor-pointer"
                  >
                    <img
                      src={url}
                      alt={photo.title}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                      <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-semibold text-sm">{photo.title}</h3>
                        {photo.description && (
                          <p className="text-white/70 text-xs mt-0.5">
                            {photo.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {!isLoading && displayPhotos.length === 0 && (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="gallery.empty_state"
            >
              <p>{t("no_results")}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
