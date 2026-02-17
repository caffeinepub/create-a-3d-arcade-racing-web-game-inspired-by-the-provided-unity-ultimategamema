# Specification

## Summary
**Goal:** Fix the deployment/runtime error so the app loads reliably, and make user profile read/save work correctly across frontend and backend without authorization traps or persistence issues.

**Planned changes:**
- Reproduce and fix the post-deployment error (compile-time or runtime) so the app can reach GarageView/RaceView without uncaught exceptions; add a user-friendly English error message if failures still occur.
- Correct frontend ↔ backend Candid optional type handling for user profile fetch/save (unwrap opt returns to a consistent `profile | null` shape; encode optional arguments correctly when saving).
- Fix backend user profile storage to use the correct Motoko collection API and ensure writes persist in canister state; add a conditional migration only if stable layout changes.
- Adjust backend authorization so first-time authenticated users can read “no profile” state and create/save a profile without “Unauthorized” traps, while keeping protections for other users’ profiles.

**User-visible outcome:** After deployment, the app no longer shows a blank screen or exception overlay; users can navigate to Garage/Race, first-time users can complete Profile Setup successfully, and returning users see their saved profile without needing a hard refresh.
