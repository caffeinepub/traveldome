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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../../contexts/LanguageContext";
import { useDeleteBooking, useGetAllBookings } from "../../hooks/useQueries";

export default function AdminBookings() {
  const { t } = useLanguage();
  const { data: bookings, isLoading } = useGetAllBookings();
  const deleteBooking = useDeleteBooking();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteBooking.mutateAsync(deleteId);
      toast.success("Booking deleted.");
      setDeleteId(null);
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl">
          {t("admin_bookings")}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {bookings?.length ?? 0} total bookings
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {(["a1", "a2", "a3", "a4", "a5"] as const).map((sk) => (
            <Skeleton key={sk} className="h-12 w-full" />
          ))}
        </div>
      ) : !bookings || bookings.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>{t("no_results")}</p>
        </div>
      ) : (
        <div
          className="bg-card rounded-xl shadow-card overflow-hidden"
          data-ocid="admin.bookings.table"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Travelers</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-16" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((b, i) => (
                  <TableRow
                    key={b.id}
                    data-ocid={`admin.bookings.row.${i + 1}`}
                  >
                    <TableCell className="font-medium">{b.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {b.email}
                    </TableCell>
                    <TableCell>{b.phone}</TableCell>
                    <TableCell>{b.travelDates}</TableCell>
                    <TableCell>{String(b.travelers)}</TableCell>
                    <TableCell className="max-w-32 truncate text-xs text-muted-foreground">
                      {b.packageId || "—"}
                    </TableCell>
                    <TableCell className="max-w-40 truncate text-xs text-muted-foreground">
                      {b.message || "—"}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(b.id)}
                        data-ocid={`admin.bookings.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.bookings.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.bookings.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
