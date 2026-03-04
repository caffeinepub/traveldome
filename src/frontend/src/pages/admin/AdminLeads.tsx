import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { WHATSAPP_NUMBER } from "../../data/bakuPackage";
import {
  useDeleteLeadCapture,
  useGetAllLeadCaptures,
} from "../../hooks/useQueries";

export default function AdminLeads() {
  const { data: leads, isLoading } = useGetAllLeadCaptures();
  const deleteLead = useDeleteLeadCapture();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await deleteLead.mutateAsync(id);
      toast.success("Lead deleted.");
    } catch {
      toast.error("Failed to delete lead.");
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl">Lead Captures</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Visitors who downloaded the Baku itinerary
          </p>
        </div>
        {leads && leads.length > 0 && (
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            {leads.length} Lead{leads.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3" data-ocid="admin.leads_tab">
              {(["l1", "l2", "l3"] as const).map((sk) => (
                <Skeleton key={sk} className="h-12 w-full" />
              ))}
            </div>
          ) : !leads || leads.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-muted-foreground"
              data-ocid="admin.leads_tab"
            >
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No leads yet</p>
              <p className="text-xs mt-1">
                Leads appear here when visitors download the itinerary
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin.leads_tab">
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead, i) => (
                    <TableRow key={lead.id}>
                      <TableCell className="text-muted-foreground text-xs">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}! This is TravelDome. You downloaded our Baku itinerary. Would you like to know more?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {lead.phone}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1.5 text-primary hover:text-primary/80 text-sm"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          {lead.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {lead.packageId}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {new Date(
                          Number(lead.timestamp) / 1_000_000,
                        ).toLocaleDateString("en-IN")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}! This is TravelDome. You downloaded our Baku itinerary. Would you like to know more about the package?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-emerald-400 text-emerald-600 hover:bg-emerald-50 h-8 px-2"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </Button>
                          </a>
                          <Button
                            size="sm"
                            variant="outline"
                            data-ocid="admin.leads_tab"
                            onClick={() => handleDelete(lead.id)}
                            disabled={deleteLead.isPending}
                            className="border-destructive text-destructive hover:bg-destructive/10 h-8 px-2"
                          >
                            {deleteLead.isPending ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {leads && leads.length > 0 && (
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
          <p className="font-semibold mb-1">
            💡 Tip: Follow up with leads on WhatsApp
          </p>
          <p>
            Click the WhatsApp icon next to any lead to start a conversation
            directly. All leads have expressed interest in the Baku package.
          </p>
        </div>
      )}
    </div>
  );
}
