import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "motion/react";
import { bakuPackage } from "../data/bakuPackage";
import { sampleBlogPosts } from "../data/sampleData";
import { useGetPublishedBlogPosts } from "../hooks/useQueries";

function getCoverUrl(image: unknown): string {
  if (typeof image === "string") return image;
  try {
    return (image as { getDirectURL: () => string }).getDirectURL();
  } catch {
    return bakuPackage.heroImage;
  }
}

export default function Blog() {
  const { data: posts, isLoading } = useGetPublishedBlogPosts();
  const displayPosts =
    posts && posts.length > 0
      ? posts
      : ((sampleBlogPosts as unknown as typeof posts) ?? []);

  return (
    <main className="pt-16">
      {/* Hero */}
      <div
        className="relative h-52 flex items-center justify-center"
        style={{
          backgroundImage: `url('${bakuPackage.heroImage}')`,
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
            Travel Stories & Guides
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-base max-w-xl mx-auto"
          >
            Expert tips, travel inspiration, and destination guides
          </motion.p>
        </div>
      </div>

      {/* Posts grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(["b1", "b2", "b3"] as const).map((sk) => (
                <div
                  key={sk}
                  className="bg-card rounded-2xl overflow-hidden"
                  data-ocid="blog.loading_state"
                >
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(displayPosts ?? []).map((post, i) => {
                const coverUrl = getCoverUrl(post.coverImage);
                const date = new Date(Number(post.date)).toLocaleDateString(
                  "en-IN",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                );

                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={coverUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="teal-gradient text-white border-0 text-xs">
                          {post.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                      </div>

                      <h2 className="font-display font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {post.content.replace(/\*\*/g, "").slice(0, 150)}...
                      </p>

                      <Link
                        to="/blog/$postId"
                        params={{ postId: post.id }}
                        className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:text-gold transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
