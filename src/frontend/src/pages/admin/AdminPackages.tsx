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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TourCategory } from "../../backend.d";
import type { TourPackage } from "../../backend.d";
import { getImageUrl } from "../../components/shared/PackageCard";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  useAddTourPackage,
  useDeleteTourPackage,
  useGetAllTourPackages,
  useUpdateTourPackage,
} from "../../hooks/useQueries";

type PackageForm = {
  title: string;
  description: string;
  price: string;
  duration: string;
  highlights: string;
  category: TourCategory;
  imageFile: File | null;
};

const emptyForm: PackageForm = {
  title: "",
  description: "",
  price: "",
  duration: "",
  highlights: "",
  category: TourCategory.domestic,
  imageFile: null,
};

export default function AdminPackages() {
  const { t } = useLanguage();
  const { data: packages, isLoading } = useGetAllTourPackages();
  const addPkg = useAddTourPackage();
  const updatePkg = useUpdateTourPackage();
  const deletePkg = useDeleteTourPackage();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<TourPackage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<PackageForm>(emptyForm);

  const openAdd = () => {
    setEditingPkg(null);
    setForm(emptyForm);
    setIsDialogOpen(true);
  };

  const openEdit = (pkg: TourPackage) => {
    setEditingPkg(pkg);
    setForm({
      title: pkg.title,
      description: pkg.description,
      price: String(pkg.price),
      duration: pkg.duration,
      highlights: pkg.highlights.join("\n"),
      category: pkg.category,
      imageFile: null,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.price) {
      toast.error("Please fill all required fields.");
      return;
    }
    const highlights = form.highlights
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);
    try {
      if (editingPkg) {
        await updatePkg.mutateAsync({
          id: editingPkg.id,
          title: form.title,
          description: form.description,
          price: BigInt(Math.round(Number(form.price))),
          duration: form.duration,
          highlights,
          category: form.category,
          imageFile: form.imageFile,
          existingImageUrl:
            typeof editingPkg.image === "string"
              ? editingPkg.image
              : editingPkg.image.getDirectURL(),
        });
        toast.success("Package updated.");
      } else {
        await addPkg.mutateAsync({
          title: form.title,
          description: form.description,
          price: BigInt(Math.round(Number(form.price))),
          duration: form.duration,
          highlights,
          category: form.category,
          imageFile: form.imageFile,
        });
        toast.success("Package added.");
      }
      setIsDialogOpen(false);
    } catch {
      toast.error("Operation failed.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePkg.mutateAsync(deleteId);
      toast.success("Package deleted.");
      setDeleteId(null);
    } catch {
      toast.error("Delete failed.");
    }
  };

  const isSaving = addPkg.isPending || updatePkg.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl">
          {t("admin_packages")}
        </h1>
        <Button
          data-ocid="admin.packages.add_button"
          onClick={openAdd}
          className="gold-gradient text-foreground font-semibold border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("admin_add_package")}
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {(["pk1", "pk2", "pk3", "pk4"] as const).map((sk) => (
            <Skeleton key={sk} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : !packages || packages.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>{t("no_results")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {packages.map((pkg, i) => {
            const imgUrl = getImageUrl(
              pkg.image as string | { getDirectURL: () => string },
            );
            return (
              <div
                key={pkg.id}
                data-ocid={`admin.packages.item.${i + 1}`}
                className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card"
              >
                <img
                  src={imgUrl}
                  alt={pkg.title}
                  className="w-16 h-12 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{pkg.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="secondary" className="text-xs">
                      {pkg.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {pkg.duration} · ₹
                      {Number(pkg.price).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(pkg)}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteId(pkg.id)}
                    data-ocid={`admin.packages.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="admin.packages.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editingPkg ? t("admin_edit") : t("admin_add_package")}{" "}
              {t("admin_packages")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm mb-1 block">{t("admin_title")} *</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Package title"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">
                {t("admin_description")} *
              </Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm mb-1 block">
                  {t("admin_price")} *
                </Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, price: e.target.value }))
                  }
                  placeholder="45000"
                />
              </div>
              <div>
                <Label className="text-sm mb-1 block">
                  {t("admin_duration_label")}
                </Label>
                <Input
                  value={form.duration}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, duration: e.target.value }))
                  }
                  placeholder="7 Days / 6 Nights"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm mb-1 block">
                {t("admin_category")}
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, category: v as TourCategory }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TourCategory.domestic}>
                    {t("filter_domestic")}
                  </SelectItem>
                  <SelectItem value={TourCategory.international}>
                    {t("filter_international")}
                  </SelectItem>
                  <SelectItem value={TourCategory.honeymoon}>
                    {t("filter_honeymoon")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1 block">
                {t("admin_highlights")}
              </Label>
              <Textarea
                value={form.highlights}
                onChange={(e) =>
                  setForm((p) => ({ ...p, highlights: e.target.value }))
                }
                rows={4}
                placeholder={
                  "Taj Mahal sunrise visit\nRed Fort tour\nJaipur heritage walk"
                }
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">{t("admin_image")}</Label>
              <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-border rounded-xl p-4 hover:border-primary transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {form.imageFile
                    ? form.imageFile.name
                    : "Click to upload image"}
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
                  data-ocid="admin.packages.upload_button"
                />
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              data-ocid="admin.packages.cancel_button"
            >
              {t("admin_cancel")}
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="gold-gradient text-foreground font-semibold border-0"
              data-ocid="admin.packages.save_button"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : null}
              {t("admin_save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent data-ocid="admin.packages.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Package?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.packages.cancel_button">
              {t("admin_cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.packages.confirm_button"
            >
              {t("admin_delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
