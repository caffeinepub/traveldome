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
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import StarRating from "../../components/shared/StarRating";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  useApproveReview,
  useDeleteReview,
  useGetAllReviews,
} from "../../hooks/useQueries";

export default function AdminReviews() {
  const { t } = useLanguage();
  const { data: reviews, isLoading } = useGetAllReviews();
  const approveReview = useApproveReview();
  const deleteReview = useDeleteReview();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    try {
      await approveReview.mutateAsync(id);
      toast.success("Review approved.");
    } catch {
      toast.error("Failed to approve.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteReview.mutateAsync(deleteId);
      toast.success("Review deleted.");
      setDeleteId(null);
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl">
          {t("admin_reviews")}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {reviews?.filter((r) => !r.approved).length ?? 0} pending approval
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {(["ar1", "ar2", "ar3", "ar4"] as const).map((sk) => (
            <Skeleton key={sk} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : !reviews || reviews.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>{t("no_results")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              data-ocid={`admin.reviews.item.${i + 1}`}
              className={`bg-card rounded-xl p-4 shadow-card border-l-4 ${
                review.approved ? "border-l-emerald-500" : "border-l-amber-400"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{review.name}</span>
                    <StarRating rating={Number(review.rating)} size="sm" />
                    <Badge
                      variant={review.approved ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {review.approved ? "Approved" : "Pending"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {review.reviewText}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!review.approved && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                      onClick={() => handleApprove(review.id)}
                      disabled={approveReview.isPending}
                      data-ocid={`admin.reviews.approve_button.${i + 1}`}
                    >
                      {approveReview.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5" />
                      )}
                      <span className="ml-1 hidden sm:inline">
                        {t("admin_approve")}
                      </span>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteId(review.id)}
                    data-ocid={`admin.reviews.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review?</AlertDialogTitle>
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
