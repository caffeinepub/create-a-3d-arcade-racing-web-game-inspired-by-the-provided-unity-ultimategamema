# Specification

## Summary
**Goal:** Build a playable 3D game arcade racing experience in the browser with a garage selection flow, AI rival, day/night + weather, nitro, pickups/scoring, basic game-state UI, and per-user high score persistence via Internet Identity.

**Planned changes:**
- Create a 3D game race scene (Three.js / React Three Fiber) with a player car that continuously moves forward, supports keyboard steering/brake, optional toggleable mobile tilt steering, and a drift handling mode at high steering input.
- Add a Garage UI to cycle/select among at least 6 car variants, show the selected car name, and persist selection across reloads.
- Add an AI rival car with simple deterministic track-following behavior and a position label that flips between “POS: 1st” / “POS: 2nd” based on forward progress.
- Implement a day/night cycle with configurable duration, animated sun lighting, and automatic car headlight toggling at night.
- Implement weather with rain toggling (random and/or debug toggle), rain visual effect, player wiper animation during rain, and a wet-road handling modifier that increases sliding/drift tendency.
- Add nitro/boost: depletion while boosting, regeneration when not boosting, increased speed, nitro UI bar, boost trail VFX, and stronger camera shake while boosting.
- Add HUD and scoring: SCORE, HIGH SCORE, POS, TIME (mm:ss), SPEED (km/h), and NITRO; add collectible coins (+score), nitro refill pickups (refill to max), and a finish condition that triggers brief slow-motion then restarts the run.
- Add backend persistence in a single Motoko actor: per-user high score (and optionally selected car index), with Internet Identity login to read/write high score; fall back to local persistence when not logged in.
- Apply a coherent, distinctive visual theme across Garage and Race views (avoid a generic blue/purple default palette).
- Add basic game-state controls: Start/Resume, Pause overlay, and Restart; ensure all user-facing strings are in English.

**User-visible outcome:** Users can select a car in a garage, start a 3D arcade race with steering/drift/brake and boost, race against an AI rival with position tracking, experience day/night and rain effects, collect coins and nitro refills, finish to trigger slow-motion and restart, and see their high score persist (per-user when logged in via Internet Identity).
