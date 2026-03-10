import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import SectionHeader from "../components/shared/SectionHeader";
import { useLanguage } from "../contexts/LanguageContext";
import { sampleGallery } from "../data/sampleData";
import {
  useGetAllGalleryPhotos,
  useGetAllGalleryVideos,
} from "../hooks/useQueries";

function getPhotoUrl(image: string | { getDirectURL: () => string }): string {
  if (typeof image === "string") return image;
  try {
    return image.getDirectURL();
  } catch {
    return "/assets/generated/hero-traveldome.dim_1600x700.jpg";
  }
}

function getYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

export default function Gallery() {
  const { t } = useLanguage();
  const { data: photos, isLoading: photosLoading } = useGetAllGalleryPhotos();
  const { data: videos, isLoading: videosLoading } = useGetAllGalleryVideos();

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

      {/* Photo gallery grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          {photosLoading ? (
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

          {!photosLoading && displayPhotos.length === 0 && (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="gallery.empty_state"
            >
              <p>{t("no_results")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Videos section */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Tour Videos"
            subtitle="Watch our destination highlights and travel experiences"
          />

          {videosLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {(["v1", "v2", "v3"] as const).map((sk) => (
                <div key={sk} data-ocid="gallery.videos.loading_state">
                  <Skeleton className="w-full aspect-video rounded-xl" />
                  <Skeleton className="w-2/3 h-4 mt-3 rounded" />
                  <Skeleton className="w-full h-3 mt-2 rounded" />
                </div>
              ))}
            </div>
          ) : videos && videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {videos.map((video, i) => {
                const videoId = getYoutubeId(video.youtubeUrl);
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group"
                    data-ocid={`gallery.videos.item.${i + 1}`}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-muted shadow-md">
                      {videoId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm">
                          Invalid video URL
                        </div>
                      )}
                    </div>
                    <div className="mt-3 px-1">
                      <h3 className="font-semibold text-foreground text-sm leading-snug">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="gallery.videos.empty_state"
            >
              <p className="text-sm">No videos added yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
