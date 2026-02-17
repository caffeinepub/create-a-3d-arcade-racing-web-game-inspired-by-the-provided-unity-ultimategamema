import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Migration setup: Use 'with' clause to specify migration function
(with migration = Migration.run)
actor {
  type UserProfile = {
    highScore : Nat;
    lastSelectedCarIndex : ?Nat;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    // Allow any authenticated user to read their own profile
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    // Users can view their own profile, admins can view any profile
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot access profiles");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    // Allow any authenticated user to save their own profile
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func saveHighScore(score : Nat) : async () {
    // Allow any authenticated user to save their score
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot save scores");
    };

    // Create new profile if none exists
    let existingProfile = userProfiles.get(caller);
    let newProfile = switch (existingProfile) {
      case (null) {
        { highScore = score; lastSelectedCarIndex = null };
      };
      case (?profile) {
        { highScore = score; lastSelectedCarIndex = profile.lastSelectedCarIndex };
      };
    };

    userProfiles.add(caller, newProfile);
  };

  public query ({ caller }) func getHighScore() : async Nat {
    // Allow any authenticated user to fetch their score
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot fetch scores");
    };
    switch (userProfiles.get(caller)) {
      case (null) { 0 }; // Return 0 for new users instead of trapping
      case (?profile) { profile.highScore };
    };
  };
};
