# V2 ENTA Module — Screen list (route discovery)

**Captured:** 2026-05-02T18:00Z
**Source:** `apps/uzg-pwa/src/App.jsx` `<Route path="…">` enumeration + grep for `enta` / `identity-hub` / `IdentityHub` / `EntaWheel` / `EntaOnboard`
**Scope filter:** ENTA module + ENTA-adjacent routes (Profile, Identity Hub, Connections, Onboarding gate).

## All ENTA-related routes

| # | Route | Component (App.jsx ref) | Audit method | Screenshot |
|---|---|---|---|---|
| 1 | `/enta` | `<EntaPage>` → `<ENTAShell>` | Visual + code | `enta_completed_mobile_LIVE_uzg.plus.png` |
| 2 | `/enta/view` | `<Navigate to="/enta">` | Alias | (same as `/enta`) |
| 3 | `/enta/network` | `<Navigate to="/connect">` | Alias | (covered by `/connections`) |
| 4 | `/enta/me` | `<ProfilePage>` (own) | Visual via /profile/me | `profile-me_completed_*_LIVE_uzg.plus.png` |
| 5 | `/enta/:handle` | `<ProfilePage>` (other) | Code only | — |
| 6 | `/enta/:handle/connections` | `<ProfileRelationsPage>` | Code only | — |
| 7 | `/identity-hub` | de-facto V2 landing | Visual | `identity-hub_completed_*_LIVE_uzg.plus.png` |
| 8 | `/onboarding` | `<RouteGuard>` fallback | Code only — flow state machine analysis | `enta-onboarding_completed_mobile_LIVE_uzg.plus.png` |

## Adjacent routes (cross-reference for ENTA flow)

| # | Route | Component | Notes |
|---|---|---|---|
| A1 | `/profile/me` | alias for `/enta/me` ProfilePage | Visual reuse |
| A2 | `/profile/:userId` | `<PublicProfileRouteBoundary>` | Code only |
| A3 | `/profile/edit` | `<ProfileSettingsPage mode="edit">` | Code only |
| A4 | `/profile/enta-edit` | `<Navigate to="/enta">` | Alias |
| A5 | `/connect` | `<ConnectionsPage>` | Visual reuse |
| A6 | `/dashboard` | post-onboarding redirect target | (already covered HOME audit) |

## Coverage summary

- **ENTA module unique destinations:** 8 (5 actual components after collapsing aliases)
- **Audited this sprint (visual + code):** 6 unique screens
- **Code-only audit:** 2 (handle profile, handle connections)
- **Screenshots collected:** 8 (4 from Phase 6.1B authenticated + 6 from HOME audit reuse, deduped to 8 unique)

## Screenshot file inventory

```
v2-enta-audit-discovery/screenshots/
├── enta_completed_mobile_LIVE_uzg.plus.png             [from Phase 6.1B authenticated harness]
├── enta-onboarding_completed_mobile_LIVE_uzg.plus.png  [from Phase 6.1B authenticated harness]
├── profile-me_completed_mobile_LIVE_uzg.plus.png       [from Phase 6.1B authenticated harness]
├── profile-me_completed_desktop_LIVE_uzg.plus.png      [from HOME audit post-PR-106]
├── connections_completed_mobile_LIVE_uzg.plus.png      [from Phase 6.1B authenticated harness]
├── connections_completed_desktop_LIVE_uzg.plus.png     [from HOME audit post-PR-106]
├── identity-hub_completed_mobile_LIVE_uzg.plus.png     [from HOME audit post-PR-106]
└── identity-hub_completed_desktop_LIVE_uzg.plus.png    [from HOME audit post-PR-106]
```

## Filename convention

`<screen>_<state>_<viewport>_LIVE_uzg.plus.png`

- `<screen>` — slugified route (e.g., `profile-me` for `/profile/me`)
- `<state>` — `completed` (this sprint) | `empty` | `partial` (deferred to authenticated session)
- `<viewport>` — `mobile` (375×812) | `desktop` (1440×900)
- `LIVE_uzg.plus` — origin proof

## Deferred captures (per KL-068 honest partial)

| State | Screens needing capture | Why deferred |
|---|---|---|
| `empty` (no ENTA Root) | All 6 ENTA routes × 2 viewports = 12 screenshots | Requires Playwright authenticated harness with fresh-user fixture seed; out of scope for unauthenticated discovery sprint |
| `partial` (50% onboarding done) | All 6 ENTA routes × 2 viewports = 12 screenshots | Requires fixture seed with partial ENTA row; same as above |
| `/enta/:handle` (other user) public view | mobile + desktop | Need real handle to navigate to (e.g., `/enta/Duy` exists but auth required for full render) |

**Recommended follow-up:** Sprint `LANE01-CLAC1-V2-ENTA-AUTHENTICATED-CAPTURES-…` running Playwright harness with 3 fixtures (empty / partial / completed) × 6 screens × 2 viewports = ~36 screenshots, ~60-90 min.

## Why these 6 screens audited?

These 6 give horizontal coverage across the V2 ENTA module surface area:
1. `/enta` — primary ENTA dashboard (the module's "home")
2. `/enta` onboarding form state — the gate canon §2 mandates a wizard for
3. `/enta/me` — ENTA Identity surface (canon §7.4 wheel embed target)
4. `/enta/:handle` — public profile view (canon §6 visibility rules)
5. `/identity-hub` — de-facto V2 landing for ENTA-completed users
6. `/connections` — Connect 4 trust levels surface (canon §5.2)

Sprint `Audit-Extension` (handoff-recommended) would extend coverage to `/enta/:handle/connections` + `/profile/edit` + `/profile/enta-edit` + `/onboarding` (if a dedicated route ever materializes vs current fallback).
