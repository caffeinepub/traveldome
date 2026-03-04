import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { BlogPost } from "../../backend.d";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  useAddBlogPost,
  useDeleteBlogPost,
  useGetAllBlogPosts,
  usePublishBlogPost,
  useUpdateBlogPost,
} from "../../hooks/useQueries";

type BlogForm = {
  title: string;
  content: string;
  author: string;
  category: string;
  imageFile: File | null;
  published: boolean;
};

const emptyForm: BlogForm = {
  title: "",
  content: "",
  author: "",
  category: "Travel Tips",
  imageFile: null,
  published: false,
};

export default function AdminBlog() {
  const { t } = useLanguage();
  const { data: posts, isLoading } = useGetAllBlogPosts();
  const addPost = useAddBlogPost();
  const updatePost = useUpdateBlogPost();
  const publishPost = usePublishBlogPost();
  const deletePost = useDeleteBlogPost();

  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogForm>(emptyForm);

  const openAdd = () => {
    setEditingPost(null);
    setForm(emptyForm);
    setIsOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      content: post.content,
      author: post.author,
      category: post.category,
      imageFile: null,
      published: post.published,
    });
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.content || !form.author) {
      toast.error("Title, content and author are required.");
      return;
    }
    try {
      if (editingPost) {
        await updatePost.mutateAsync({
          id: editingPost.id,
          title: form.title,
          content: form.content,
          author: form.author,
          category: form.category,
          imageFile: form.imageFile,
          existingImageUrl:
            typeof editingPost.coverImage === "string"
              ? editingPost.coverImage
              : editingPost.coverImage.getDirectURL(),
          published: form.published,
        });
        toast.success("Post updated.");
      } else {
        await addPost.mutateAsync({
          title: form.title,
          content: form.content,
          author: form.author,
          category: form.category,
          imageFile: form.imageFile,
        });
        toast.success("Post added.");
      }
      setIsOpen(false);
    } catch {
      toast.error("Operation failed.");
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishPost.mutateAsync(id);
      toast.success("Post published.");
    } catch {
      toast.error("Failed to publish.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePost.mutateAsync(deleteId);
      toast.success("Post deleted.");
      setDeleteId(null);
    } catch {
      toast.error("Delete failed.");
    }
  };

  const isSaving = addPost.isPending || updatePost.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl">{t("admin_blog")}</h1>
        <Button
          data-ocid="admin.blog.add_button"
          onClick={openAdd}
          className="gold-gradient text-foreground font-semibold border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("admin_add_blog")}
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {(["bl1", "bl2", "bl3", "bl4"] as const).map((sk) => (
            <Skeleton key={sk} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : !posts || posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>{t("no_results")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post, i) => (
            <div
              key={post.id}
              data-ocid={`admin.blog.item.${i + 1}`}
              className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{post.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge
                    variant={post.published ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {post.category} · {post.author}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                {!post.published && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                    onClick={() => handlePublish(post.id)}
                    data-ocid={`admin.blog.publish_button.${i + 1}`}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    {t("admin_publish")}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEdit(post)}
                  data-ocid={`admin.blog.edit_button.${i + 1}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setDeleteId(post.id)}
                  data-ocid={`admin.blog.delete_button.${i + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.blog.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editingPost ? t("admin_edit") : t("admin_add_blog")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm mb-1 block">
                  {t("admin_title")} *
                </Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Blog post title"
                />
              </div>
              <div>
                <Label className="text-sm mb-1 block">
                  {t("admin_author")} *
                </Label>
                <Input
                  value={form.author}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, author: e.target.value }))
                  }
                  placeholder="Author name"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Category</Label>
              <Input
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
                placeholder="Travel Tips, Destination Guide, etc."
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">
                {t("admin_content")} *
              </Label>
              <Textarea
                value={form.content}
                onChange={(e) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
                rows={10}
                placeholder="Write your blog post content here..."
                data-ocid="admin.blog.editor"
                className="font-mono text-sm"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Cover Image</Label>
              <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-border rounded-xl p-4 hover:border-primary transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {form.imageFile
                    ? form.imageFile.name
                    : "Click to upload cover image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      imageFile: e.target.files?.[0] ?? null,
                    }))
                  }
                  data-ocid="admin.blog.upload_button"
                />
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              data-ocid="admin.blog.cancel_button"
            >
              {t("admin_cancel")}
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="gold-gradient text-foreground border-0"
              data-ocid="admin.blog.save_button"
            >
              {isSaving && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
              {t("admin_save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
