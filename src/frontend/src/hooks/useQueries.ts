import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob } from "../backend";
import type {
  BlogPost,
  Booking,
  GalleryPhoto,
  Review,
  TourCategory,
  TourPackage,
} from "../backend.d";
import { useActor } from "./useActor";

// ─── Tour Packages ───────────────────────────────────────────────────────────
export function useGetAllTourPackages() {
  const { actor, isFetching } = useActor();
  return useQuery<TourPackage[]>({
    queryKey: ["tourPackages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTourPackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTourPackage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      price: bigint;
      duration: string;
      highlights: string[];
      category: TourCategory;
      imageFile: File | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      let imageBlob: ExternalBlob;
      if (data.imageFile) {
        const bytes = new Uint8Array(await data.imageFile.arrayBuffer());
        imageBlob = ExternalBlob.fromBytes(bytes);
      } else {
        imageBlob = ExternalBlob.fromURL("");
      }
      return actor.addTourPackage(
        data.title,
        data.description,
        data.price,
        data.duration,
        data.highlights,
        data.category,
        imageBlob,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tourPackages"] }),
  });
}

export function useUpdateTourPackage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      title: string;
      description: string;
      price: bigint;
      duration: string;
      highlights: string[];
      category: TourCategory;
      imageFile: File | null;
      existingImageUrl?: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      let imageBlob: ExternalBlob;
      if (data.imageFile) {
        const bytes = new Uint8Array(await data.imageFile.arrayBuffer());
        imageBlob = ExternalBlob.fromBytes(bytes);
      } else {
        imageBlob = ExternalBlob.fromURL(data.existingImageUrl ?? "");
      }
      return actor.updateTourPackage(
        data.id,
        data.title,
        data.description,
        data.price,
        data.duration,
        data.highlights,
        data.category,
        imageBlob,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tourPackages"] }),
  });
}

export function useDeleteTourPackage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteTourPackage(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tourPackages"] }),
  });
}

// ─── Blog Posts ──────────────────────────────────────────────────────────────
export function useGetPublishedBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts", "published"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBlogPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      author: string;
      category: string;
      imageFile: File | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      let imageBlob: ExternalBlob;
      if (data.imageFile) {
        const bytes = new Uint8Array(await data.imageFile.arrayBuffer());
        imageBlob = ExternalBlob.fromBytes(bytes);
      } else {
        imageBlob = ExternalBlob.fromURL("");
      }
      return actor.addBlogPost(
        data.title,
        data.content,
        data.author,
        data.category,
        imageBlob,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });
}

export function useUpdateBlogPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      title: string;
      content: string;
      author: string;
      category: string;
      imageFile: File | null;
      existingImageUrl?: string;
      published: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      let imageBlob: ExternalBlob;
      if (data.imageFile) {
        const bytes = new Uint8Array(await data.imageFile.arrayBuffer());
        imageBlob = ExternalBlob.fromBytes(bytes);
      } else {
        imageBlob = ExternalBlob.fromURL(data.existingImageUrl ?? "");
      }
      return actor.updateBlogPost(
        data.id,
        data.title,
        data.content,
        data.author,
        data.category,
        imageBlob,
        data.published,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function usePublishBlogPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.publishBlogPost(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useDeleteBlogPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteBlogPost(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
export function useGetAllGalleryPhotos() {
  const { actor, isFetching } = useActor();
  return useQuery<GalleryPhoto[]>({
    queryKey: ["gallery"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGalleryPhotos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGalleryPhoto() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      imageFile: File;
    }) => {
      if (!actor) throw new Error("Not connected");
      const bytes = new Uint8Array(await data.imageFile.arrayBuffer());
      const imageBlob = ExternalBlob.fromBytes(bytes);
      return actor.addGalleryPhoto(data.title, data.description, imageBlob);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });
}

export function useDeleteGalleryPhoto() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteGalleryPhoto(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
export function useGetApprovedReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews", "approved"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApprovedReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitReview() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      rating: bigint;
      reviewText: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitReview(data.name, data.rating, data.reviewText);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

export function useApproveReview() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveReview(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

export function useDeleteReview() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteReview(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

// ─── Bookings ─────────────────────────────────────────────────────────────────
export function useGetAllBookings() {
  const { actor, isFetching } = useActor();
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      travelDates: string;
      travelers: bigint;
      message: string;
      packageId: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitBooking(
        data.name,
        data.email,
        data.phone,
        data.travelDates,
        data.travelers,
        data.message,
        data.packageId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
}

export function useDeleteBooking() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteBooking(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
}

// ─── Lead Captures ───────────────────────────────────────────────────────────
export function useGetAllLeadCaptures() {
  const { actor, isFetching } = useActor();
  return useQuery<import("../backend.d").LeadCapture[]>({
    queryKey: ["leadCaptures"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLeadCaptures();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitLeadCapture() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      email: string;
      packageId: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitLeadCapture(
        data.name,
        data.phone,
        data.email,
        data.packageId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leadCaptures"] }),
  });
}

export function useDeleteLeadCapture() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteLeadCapture(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leadCaptures"] }),
  });
}

// ─── Admin Check ──────────────────────────────────────────────────────────────
export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
