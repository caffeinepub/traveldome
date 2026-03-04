import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { sampleBlogPosts } from "../data/sampleData";
import { useGetPublishedBlogPosts } from "../hooks/useQueries";

export default function BlogDetail() {
  const { t } = useLanguage();
  const { postId } = useParams({ from: "/blog/$postId" });
  const { data: posts } = useGetPublishedBlogPosts();

  const allPosts = posts && posts.length > 0 ? posts : sampleBlogPosts;
  const post = allPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl mb-4">{t("blog_not_found")}</h2>
          <Link to="/blog">
            <Button>{t("back_to_blog")}</Button>
          </Link>
        </div>
      </main>
    );
  }

  const coverUrl =
    typeof post.coverImage === "string"
      ? post.coverImage
      : (() => {
          try {
            return (
              post.coverImage as { getDirectURL: () => string }
            ).getDirectURL();
          } catch {
            return "/assets/generated/hero-traveldome.dim_1600x700.jpg";
          }
        })();

  const date = new Date(Number(post.date)).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Simple markdown-ish rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const lineKey = `line-${i}`;
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3
            key={lineKey}
            className="font-display font-bold text-xl mt-6 mb-3"
          >
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={lineKey} className="ml-4 text-muted-foreground">
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === "") return <br key={lineKey} />;
      return (
        <p key={lineKey} className="text-muted-foreground leading-relaxed">
          {line.replace(/\*\*([^*]+)\*\*/g, "$1")}
        </p>
      );
    });
  };

  return (
    <main className="pt-16">
      {/* Cover image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={coverUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute bottom-6 left-0 right-0 container mx-auto px-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("back_to_blog")}
          </Link>
          <Badge className="teal-gradient text-white border-0 mb-3 block w-fit">
            {post.category}
          </Badge>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white max-w-3xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article content */}
      <article className="container mx-auto px-4 py-10 max-w-3xl">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-primary" />
            {t("by_author")} <strong>{post.author}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-primary" />
            {post.category}
          </span>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-gray max-w-none space-y-2"
        >
          {renderContent(post.content)}
        </motion.div>

        {/* Back button */}
        <div className="mt-10 pt-6 border-t border-border">
          <Link to="/blog">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("back_to_blog")}
            </Button>
          </Link>
        </div>
      </article>
    </main>
  );
}
