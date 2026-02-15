import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile type as required by the frontend
  public type UserProfile = {
    highScore : Nat;
    lastSelectedCarIndex : ?Nat;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Get the caller's own profile
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  // Get any user's profile (own profile or admin can view others)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Save the caller's own profile
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Legacy function for backward compatibility - save high score only
  public shared ({ caller }) func saveHighScore(score : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save scores");
    };
    
    // Get existing profile or create new one
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

  // Legacy function for backward compatibility - get high score only
  public query ({ caller }) func getHighScore() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can fetch scores");
    };
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("No high score found. Run the first race!") };
      case (?profile) { profile.highScore };
    };
  };
};
