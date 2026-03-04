import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Review {
    id: string;
    name: string;
    reviewText: string;
    approved: boolean;
    timestamp: bigint;
    rating: bigint;
}
export interface GalleryPhoto {
    id: string;
    title: string;
    description: string;
    image: ExternalBlob;
}
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    date: bigint;
    published: boolean;
    author: string;
    coverImage: ExternalBlob;
    category: string;
}
export interface LeadCapture {
    id: string;
    name: string;
    email: string;
    timestamp: bigint;
    phone: string;
    packageId: string;
}
export interface TourPackage {
    id: string;
    title: string;
    duration: string;
    description: string;
    highlights: Array<string>;
    category: TourCategory;
    image: ExternalBlob;
    price: bigint;
}
export interface Booking {
    id: string;
    name: string;
    travelDates: string;
    travelers: bigint;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
    packageId: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export enum TourCategory {
    domestic = "domestic",
    international = "international",
    honeymoon = "honeymoon"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBlogPost(title: string, content: string, author: string, category: string, coverImage: ExternalBlob): Promise<string>;
    addGalleryPhoto(title: string, description: string, image: ExternalBlob): Promise<string>;
    addTourPackage(title: string, description: string, price: bigint, duration: string, highlights: Array<string>, category: TourCategory, image: ExternalBlob): Promise<string>;
    approveReview(id: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteBlogPost(id: string): Promise<void>;
    deleteBooking(id: string): Promise<void>;
    deleteGalleryPhoto(id: string): Promise<void>;
    deleteLeadCapture(id: string): Promise<void>;
    deleteReview(id: string): Promise<void>;
    deleteTourPackage(id: string): Promise<void>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllGalleryPhotos(): Promise<Array<GalleryPhoto>>;
    getAllLeadCaptures(): Promise<Array<LeadCapture>>;
    getAllReviews(): Promise<Array<Review>>;
    getAllTourPackages(): Promise<Array<TourPackage>>;
    getApprovedReviews(): Promise<Array<Review>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPublishedBlogPosts(): Promise<Array<BlogPost>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    publishBlogPost(id: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBooking(name: string, email: string, phone: string, travelDates: string, travelers: bigint, message: string, packageId: string): Promise<string>;
    submitLeadCapture(name: string, phone: string, email: string, packageId: string): Promise<string>;
    submitReview(name: string, rating: bigint, reviewText: string): Promise<string>;
    updateBlogPost(id: string, title: string, content: string, author: string, category: string, coverImage: ExternalBlob, published: boolean): Promise<void>;
    updateGalleryPhoto(id: string, title: string, description: string, image: ExternalBlob): Promise<void>;
    updateTourPackage(id: string, title: string, description: string, price: bigint, duration: string, highlights: Array<string>, category: TourCategory, image: ExternalBlob): Promise<void>;
}
