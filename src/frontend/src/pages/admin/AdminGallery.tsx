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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Play, Plus, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  useAddGalleryPhoto,
  useAddGalleryVideo,
  useDeleteGalleryPhoto,
  useDeleteGalleryVideo,
  useGetAllGalleryPhotos,
  useGetAllGalleryVideos,
} from "../../hooks/useQueries";

function getYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

export default function AdminGallery() {
  const { t } = useLanguage();
  const { data: photos, isLoading: photosLoading } = useGetAllGalleryPhotos();
  const { data: videos, isLoading: videosLoading } = useGetAllGalleryVideos();
  const addPhoto = useAddGalleryPhoto();
  const deletePhoto = useDeleteGalleryPhoto();
  const addVideo = useAddGalleryVideo();
  const deleteVideo = useDeleteGalleryVideo();

  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [deletePhotoId, setDeletePhotoId] = useState<string | null>(null);
  const [deleteVideoId, setDeleteVideoId] = useState<string | null>(null);
  const [videoUrlError, setVideoUrlError] = useState("");

  const [photoForm, setPhotoForm] = useState({
    title: "",
    description: "",
    imageFile: null as File | null,
  });

  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
  });

  const handleAddPhoto = async () => {
    if (!photoForm.title || !photoForm.imageFile) {
      toast.error("Title and image are required.");
      return;
    }
    try {
      await addPhoto.mutateAsync({
        title: photoForm.title,
        description: photoForm.description,
        imageFile: photoForm.imageFile,
      });
      toast.success("Photo added.");
      setIsPhotoOpen(false);
      setPhotoForm({ title: "", description: "", imageFile: null });
    } catch {
      toast.error("Upload failed.");
    }
  };

  const handleAddVideo = async () => {
    if (!videoForm.title) {
      toast.error("Title is required.");
      return;
    }
    if (!videoForm.youtubeUrl) {
      toast.error("YouTube URL is required.");
      return;
    }
    const videoId = getYoutubeId(videoForm.youtubeUrl);
    if (!videoId) {
      setVideoUrlError(
        "Please enter a valid YouTube URL (e.g. https://www.youtube.com/watch?v=...)",
      );
      return;
    }
    setVideoUrlError("");
    try {
      await addVideo.mutateAsync({
        title: videoForm.title,
        description: videoForm.description,
        youtubeUrl: videoForm.youtubeUrl,
      });
      toast.success("Video added.");
      setIsVideoOpen(false);
      setVideoForm({ title: "", description: "", youtubeUrl: "" });
    } catch {
      toast.error("Failed to add video.");
    }
  };

  const handleDeletePhoto = async () => {
    if (!deletePhotoId) return;
    try {
      await deletePhoto.mutateAsync(deletePhotoId);
      toast.success("Photo deleted.");
      setDeletePhotoId(null);
    } catch {
      toast.error("Delete failed.");
    }
  };

  const handleDeleteVideo = async () => {
    if (!deleteVideoId) return;
    try {
      await deleteVideo.mutateAsync(deleteVideoId);
      toast.success("Video deleted.");
      setDeleteVideoId(null);
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
      <h1 className="font-display font-bold text-2xl mb-6">
        {t("admin_gallery")}
      </h1>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="mb-6" data-ocid="admin.gallery.tab">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        {/* ── Photos Tab ── */}
        <TabsContent value="photos">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {photos ? `${photos.length} photos` : ""}
            </p>
            <Button
              data-ocid="admin.gallery.upload_button"
              onClick={() => setIsPhotoOpen(true)}
              className="gold-gradient text-foreground font-semibold border-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("admin_add_photo")}
            </Button>
          </div>

          {photosLoading ? (
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
                        onClick={() => setDeletePhotoId(photo.id)}
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
        </TabsContent>

        {/* ── Videos Tab ── */}
        <TabsContent value="videos">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {videos ? `${videos.length} videos` : ""}
            </p>
            <Button
              data-ocid="admin.gallery.videos.open_modal_button"
              onClick={() => setIsVideoOpen(true)}
              className="gold-gradient text-foreground font-semibold border-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </div>

          {videosLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(["v1", "v2", "v3"] as const).map((sk) => (
                <div key={sk}>
                  <Skeleton className="aspect-video w-full rounded-xl" />
                  <Skeleton className="w-2/3 h-4 mt-2 rounded" />
                </div>
              ))}
            </div>
          ) : !videos || videos.length === 0 ? (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="admin.gallery.videos.empty_state"
            >
              <p>No videos yet. Add your first YouTube video above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video, i) => {
                const videoId = getYoutubeId(video.youtubeUrl);
                const thumbUrl = videoId
                  ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  : null;
                return (
                  <div
                    key={video.id}
                    data-ocid={`admin.gallery.videos.item.${i + 1}`}
                    className="group rounded-xl overflow-hidden border border-border bg-card"
                  >
                    <div className="relative aspect-video bg-muted">
                      {thumbUrl ? (
                        <img
                          src={thumbUrl}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setDeleteVideoId(video.id)}
                          data-ocid={`admin.gallery.videos.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-sm truncate">
                        {video.title}
                      </p>
                      {video.description && (
                        <p className="text-muted-foreground text-xs mt-0.5 line-clamp-2">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Photo Dialog */}
      <Dialog open={isPhotoOpen} onOpenChange={setIsPhotoOpen}>
        <DialogContent data-ocid="admin.gallery.dialog">
          <DialogHeader>
            <DialogTitle>{t("admin_add_photo")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm mb-1 block">{t("admin_title")} *</Label>
              <Input
                value={photoForm.title}
                onChange={(e) =>
                  setPhotoForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Photo title"
                data-ocid="admin.gallery.input"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Description</Label>
              <Input
                value={photoForm.description}
                onChange={(e) =>
                  setPhotoForm((p) => ({ ...p, description: e.target.value }))
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
                {photoForm.imageFile ? (
                  <>
                    <img
                      src={URL.createObjectURL(photoForm.imageFile)}
                      alt="preview"
                      className="w-full max-h-40 object-cover rounded-lg"
                    />
                    <span className="text-sm text-muted-foreground">
                      {photoForm.imageFile.name}
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
                    setPhotoForm((p) => ({
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
              onClick={() => setIsPhotoOpen(false)}
              data-ocid="admin.gallery.cancel_button"
            >
              {t("admin_cancel")}
            </Button>
            <Button
              onClick={handleAddPhoto}
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

      {/* Add Video Dialog */}
      <Dialog
        open={isVideoOpen}
        onOpenChange={(open) => {
          setIsVideoOpen(open);
          if (!open) setVideoUrlError("");
        }}
      >
        <DialogContent data-ocid="admin.gallery.videos.dialog">
          <DialogHeader>
            <DialogTitle>Add YouTube Video</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm mb-1 block">Title *</Label>
              <Input
                value={videoForm.title}
                onChange={(e) =>
                  setVideoForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="e.g. Baku City Highlights"
                data-ocid="admin.gallery.videos.input"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Description</Label>
              <Textarea
                value={videoForm.description}
                onChange={(e) =>
                  setVideoForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Brief description of the video"
                rows={2}
                className="resize-none"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">YouTube URL *</Label>
              <Input
                value={videoForm.youtubeUrl}
                onChange={(e) => {
                  setVideoForm((p) => ({ ...p, youtubeUrl: e.target.value }));
                  setVideoUrlError("");
                }}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              {videoUrlError && (
                <p
                  className="text-destructive text-xs mt-1"
                  data-ocid="admin.gallery.videos.error_state"
                >
                  {videoUrlError}
                </p>
              )}
              <p className="text-muted-foreground text-xs mt-1">
                Supports youtube.com/watch, youtu.be, and embed links.
              </p>
            </div>
            {videoForm.youtubeUrl && getYoutubeId(videoForm.youtubeUrl) && (
              <div className="rounded-lg overflow-hidden border border-border">
                <img
                  src={`https://img.youtube.com/vi/${getYoutubeId(videoForm.youtubeUrl)}/hqdefault.jpg`}
                  alt="Video preview"
                  className="w-full aspect-video object-cover"
                />
                <p className="text-xs text-muted-foreground px-3 py-2">
                  Video preview
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsVideoOpen(false);
                setVideoUrlError("");
              }}
              data-ocid="admin.gallery.videos.cancel_button"
            >
              {t("admin_cancel")}
            </Button>
            <Button
              onClick={handleAddVideo}
              disabled={addVideo.isPending}
              className="gold-gradient text-foreground border-0"
              data-ocid="admin.gallery.videos.save_button"
            >
              {addVideo.isPending && (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              )}
              Save Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Photo Confirm */}
      <AlertDialog
        open={!!deletePhotoId}
        onOpenChange={() => setDeletePhotoId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Photo?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.gallery.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePhoto}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.gallery.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Video Confirm */}
      <AlertDialog
        open={!!deleteVideoId}
        onOpenChange={() => setDeleteVideoId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Video?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.gallery.videos.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteVideo}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.gallery.videos.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
