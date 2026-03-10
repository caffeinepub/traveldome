import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Principal "mo:core/Principal";

import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";

actor {
  // Include prefabricated components
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profile Type
  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Data Structures
  type TourCategory = { #domestic; #international; #honeymoon };

  type TourPackage = {
    id : Text;
    title : Text;
    description : Text;
    price : Nat;
    duration : Text;
    highlights : [Text];
    category : TourCategory;
    image : Storage.ExternalBlob;
  };

  type Booking = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    travelDates : Text;
    travelers : Nat;
    message : Text;
    packageId : Text;
    timestamp : Int;
  };

  type GalleryPhoto = {
    id : Text;
    title : Text;
    description : Text;
    image : Storage.ExternalBlob;
  };

  public type GalleryVideo = {
    id : Text;
    title : Text;
    description : Text;
    youtubeUrl : Text;
  };

  type Review = {
    id : Text;
    name : Text;
    rating : Nat; // 1-5
    reviewText : Text;
    approved : Bool;
    timestamp : Int;
  };

  type BlogPost = {
    id : Text;
    title : Text;
    content : Text;
    author : Text;
    date : Int;
    category : Text;
    coverImage : Storage.ExternalBlob;
    published : Bool;
  };

  public type LeadCapture = {
    id : Text;
    name : Text;
    phone : Text;
    email : Text;
    packageId : Text;
    timestamp : Int;
  };

  let tourPackages = Map.empty<Text, TourPackage>();
  let bookings = Map.empty<Text, Booking>();
  let gallery = Map.empty<Text, GalleryPhoto>();
  let galleryVideos = Map.empty<Text, GalleryVideo>();
  let reviews = Map.empty<Text, Review>();
  let blogPosts = Map.empty<Text, BlogPost>();
  let leadCaptures = Map.empty<Text, LeadCapture>();

  // Tour Packages
  public shared ({ caller }) func addTourPackage(title : Text, description : Text, price : Nat, duration : Text, highlights : [Text], category : TourCategory, image : Storage.ExternalBlob) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add tour packages");
    };

    let id = title.concat(Time.now().toText());
    let package : TourPackage = {
      id;
      title;
      description;
      price;
      duration;
      highlights;
      category;
      image;
    };
    tourPackages.add(id, package);
    id;
  };

  public shared ({ caller }) func updateTourPackage(id : Text, title : Text, description : Text, price : Nat, duration : Text, highlights : [Text], category : TourCategory, image : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update tour packages");
    };

    switch (tourPackages.get(id)) {
      case (null) { Runtime.trap("Tour package not found") };
      case (?_) {
        let package : TourPackage = {
          id;
          title;
          description;
          price;
          duration;
          highlights;
          category;
          image;
        };
        tourPackages.add(id, package);
      };
    };
  };

  public shared ({ caller }) func deleteTourPackage(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete tour packages");
    };
    tourPackages.remove(id);
  };

  public query func getAllTourPackages() : async [TourPackage] {
    tourPackages.values().toArray();
  };

  // Bookings
  public shared func submitBooking(name : Text, email : Text, phone : Text, travelDates : Text, travelers : Nat, message : Text, packageId : Text) : async Text {
    let id = name.concat(Time.now().toText());
    let booking : Booking = {
      id;
      name;
      email;
      phone;
      travelDates;
      travelers;
      message;
      packageId;
      timestamp = Time.now();
    };
    bookings.add(id, booking);
    id;
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view bookings");
    };
    bookings.values().toArray();
  };

  public shared ({ caller }) func deleteBooking(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete bookings");
    };
    bookings.remove(id);
  };

  // Gallery Photos
  public shared ({ caller }) func addGalleryPhoto(title : Text, description : Text, image : Storage.ExternalBlob) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add gallery photos");
    };

    let id = title.concat(Time.now().toText());
    let photo : GalleryPhoto = {
      id;
      title;
      description;
      image;
    };
    gallery.add(id, photo);
    id;
  };

  public shared ({ caller }) func updateGalleryPhoto(id : Text, title : Text, description : Text, image : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update gallery photos");
    };

    switch (gallery.get(id)) {
      case (null) { Runtime.trap("Gallery photo not found") };
      case (?_) {
        let photo : GalleryPhoto = {
          id;
          title;
          description;
          image;
        };
        gallery.add(id, photo);
      };
    };
  };

  public shared ({ caller }) func deleteGalleryPhoto(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete gallery photos");
    };
    gallery.remove(id);
  };

  public query func getAllGalleryPhotos() : async [GalleryPhoto] {
    gallery.values().toArray();
  };

  // Gallery Videos (NEW)
  public shared ({ caller }) func addGalleryVideo(title : Text, description : Text, youtubeUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add gallery videos");
    };

    let id = title.concat(Time.now().toText());
    let video : GalleryVideo = {
      id;
      title;
      description;
      youtubeUrl;
    };
    galleryVideos.add(id, video);
    id;
  };

  public shared ({ caller }) func deleteGalleryVideo(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete gallery videos");
    };
    galleryVideos.remove(id);
  };

  public query func getAllGalleryVideos() : async [GalleryVideo] {
    galleryVideos.values().toArray();
  };

  // Reviews
  public shared func submitReview(name : Text, rating : Nat, reviewText : Text) : async Text {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    let id = name.concat(Time.now().toText());
    let review : Review = {
      id;
      name;
      rating;
      reviewText;
      approved = false;
      timestamp = Time.now();
    };
    reviews.add(id, review);
    id;
  };

  public shared ({ caller }) func approveReview(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve reviews");
    };

    switch (reviews.get(id)) {
      case (null) { Runtime.trap("Review not found") };
      case (?review) {
        let updatedReview = { review with approved = true };
        reviews.add(id, updatedReview);
      };
    };
  };

  public shared ({ caller }) func deleteReview(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete reviews");
    };
    reviews.remove(id);
  };

  public query func getApprovedReviews() : async [Review] {
    let approvedList = List.empty<Review>();
    for (review in reviews.values()) {
      if (review.approved) {
        approvedList.add(review);
      };
    };
    approvedList.toArray();
  };

  public query ({ caller }) func getAllReviews() : async [Review] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all reviews");
    };
    reviews.values().toArray();
  };

  // Blog Posts
  public shared ({ caller }) func addBlogPost(title : Text, content : Text, author : Text, category : Text, coverImage : Storage.ExternalBlob) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add blog posts");
    };

    let id = title.concat(Time.now().toText());
    let post : BlogPost = {
      id;
      title;
      content;
      author;
      date = Time.now();
      category;
      coverImage;
      published = false;
    };
    blogPosts.add(id, post);
    id;
  };

  public shared ({ caller }) func updateBlogPost(id : Text, title : Text, content : Text, author : Text, category : Text, coverImage : Storage.ExternalBlob, published : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update blog posts");
    };

    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?existingPost) {
        let post : BlogPost = {
          id;
          title;
          content;
          author;
          date = existingPost.date; // Keep original date
          category;
          coverImage;
          published;
        };
        blogPosts.add(id, post);
      };
    };
  };

  public shared ({ caller }) func publishBlogPost(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can publish blog posts");
    };

    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) {
        let updatedPost = { post with published = true };
        blogPosts.add(id, updatedPost);
      };
    };
  };

  public shared ({ caller }) func deleteBlogPost(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };
    blogPosts.remove(id);
  };

  public query func getPublishedBlogPosts() : async [BlogPost] {
    let publishedList = List.empty<BlogPost>();
    for (post in blogPosts.values()) {
      if (post.published) {
        publishedList.add(post);
      };
    };
    publishedList.toArray();
  };

  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all blog posts");
    };
    blogPosts.values().toArray();
  };

  // Lead Capture
  public shared ({ caller }) func submitLeadCapture(name : Text, phone : Text, email : Text, packageId : Text) : async Text {
    let id = name.concat(Time.now().toText());
    let lead : LeadCapture = {
      id;
      name;
      phone;
      email;
      packageId;
      timestamp = Time.now();
    };
    leadCaptures.add(id, lead);
    id;
  };

  public query ({ caller }) func getAllLeadCaptures() : async [LeadCapture] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view lead captures");
    };
    leadCaptures.values().toArray();
  };

  public shared ({ caller }) func deleteLeadCapture(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete lead captures");
    };
    leadCaptures.remove(id);
  };
};
