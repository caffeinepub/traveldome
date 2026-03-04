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
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  useAddGalleryPhoto,
  useDeleteGalleryPhoto,
  useGetAllGalleryPhotos,
} from "../../hooks/useQueries";

export default function AdminGallery() {
  const { t } = useLanguage();
  const { data: photos, isLoading } = useGetAllGalleryPhotos();
  const addPhoto = useAddGalleryPhoto();
  const deletePhoto = useDeleteGalleryPhoto();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageFile: null as File | null,
  });

  const handleAdd = async () => {
    if (!form.title || !form.imageFile) {
      toast.error("Title and image are required.");
      return;
    }
    try {
      await addPhoto.mutateAsync({
        title: form.title,
        description: form.description,
        imageFile: form.imageFile,
      });
      toast.success("Photo added.");
      setIsOpen(false);
      setForm({ title: "", description: "", imageFile: null });
    } catch {
      toast.error("Upload failed.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePhoto.mutateAsync(deleteId);
      toast.success("Photo deleted.");
      setDeleteId(null);
    } catch {
      toast.error("Delete failed.");
    }
  };

  const getUrl = (image: unknown) => {
    if (typeof image === "string") return image;
    try {
      return (image as { getDirectURL: () => string }).getDirectURL();
    } catch {
      return "";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl">
          {t("admin_gallery")}
        </h1>
        <Button
          data-ocid="admin.gallery.upload_button"
          onClick={() => setIsOpen(true)}
          className="gold-gradient text-foreground font-semibold border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("admin_add_photo")}
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {(["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"] as const).map(
            (sk) => (
              <Skeleton key={sk} className="aspect-square rounded-xl" />
            ),
          )}
        </div>
      ) : !photos || photos.length === 0 ? (
        <div
          className="text-center py-20 text-muted-foreground"
          data-ocid="admin.gallery.empty_state"
        >
          <p>{t("no_results")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, i) => {
            const url = getUrl(photo.image);
            return (
              <div
                key={photo.id}
                data-ocid={`admin.gallery.item.${i + 1}`}
                className="relative group aspect-square rounded-xl overflow-hidden bg-secondary"
              >
                {url && (
                  <img
                    src={url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setDeleteId(photo.id)}
                    data-ocid={`admin.gallery.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium truncate">
                    {photo.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent data-ocid="admin.gallery.dialog">
          <DialogHeader>
            <DialogTitle>{t("admin_add_photo")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm mb-1 block">{t("admin_title")} *</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Photo title"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Description</Label>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Brief description"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">{t("admin_image")} *</Label>
              <label
                className="flex flex-col items-center gap-2 cursor-pointer border-2 border-dashed border-border rounded-xl p-8 hover:border-primary transition-colors"
                data-ocid="admin.gallery.dropzone"
              >
                {form.imageFile ? (
                  <>
                    <img
                      src={URL.createObjectURL(form.imageFile)}
                      alt="preview"
                      className="w-full max-h-40 object-cover rounded-lg"
                    />
                    <span className="text-sm text-muted-foreground">
                      {form.imageFile.name}
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload photo
                    </span>
                  </>
                )}
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
                />
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              data-ocid="admin.gallery.cancel_button"
            >
              {t("admin_cancel")}
            </Button>
            <Button
              onClick={handleAdd}
              disabled={addPhoto.isPending}
              className="gold-gradient text-foreground border-0"
              data-ocid="admin.gallery.save_button"
            >
              {addPhoto.isPending && (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              )}
              {t("admin_save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Photo?</AlertDialogTitle>
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
