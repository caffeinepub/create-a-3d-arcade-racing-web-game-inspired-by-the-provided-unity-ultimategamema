import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  public type UserProfile = {
    highScore : Nat;
    lastSelectedCarIndex : ?Nat;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    // No data transformation needed, just keep existing profiles
    old;
  };
};
