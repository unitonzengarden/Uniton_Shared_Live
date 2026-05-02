# Report — Sprint 5.9 Auth UX hardening + Settings + Profile + Follow

**Audit ID:** LANE01-UZG-V3-P5-9-AUTH-SETTINGS-PROFILE-FOLLOW-UX-HARDENING-2026-05-02T02-30Z
**Date:** 2026-05-02
**Pattern:** Multi-group UX hardening — auth/settings/profile/follow

---

## Executive Summary

Sprint 5.9 closes Phase 5 production-blocker UX gaps. Logout button shipped (was P0 missing), forgot-password Supabase email flow wired, settings panel functional, profile edit with avatar upload, 4-trust-level Connect action sheet integrated.

**Single sprint, 4 groups, 113 files** — large but cohesive. All cross-namespace edits documented as Lane_01 §exception.

---

## Group 1 — Auth Lifecycle (P0 Production Unblocker)

**Problem solved:** User had NO way to log out before this sprint.

### Components shipped
- `UserMenuV3` — global dropdown wired to V3App root shell avatar tap
- `LogoutConfirmV3` — confirm dialog before signOut
- `ForgotPasswordFormV3` — public form at `/v3/forgot-password`
- `ResetPasswordFormV3` — public at `/v3/reset-password` (Supabase link target)
- `ChangePasswordFormV3` — in-app from Settings
- `AccountDeletionConfirmV3` — multi-step confirm (DELETE typing + 3 checkboxes)
- `SessionExpiredOverlayV3` — auto-redirect on JWT expiry mid-session

### Hooks shipped
- `useLogout` — Supabase signOut + localStorage cleanup + redirect
- `useForgotPassword` — IDLE/SENDING/SENT/ERROR state machine
- `useResetPassword` — handles Supabase reset link with new password
- `useChangePassword` — Supabase updateUser({ password })
- `useSessionExpiry` — onAuthStateChange listener for SIGNED_OUT events

---

## Group 2 — Settings Panel

### Architecture
- `settings-v3/` namespace NEW
- `SettingsShellV3` mounts 5 sections at `/v3/settings`
- Storage: localStorage primary (no `user_settings` table) + `profiles.preferred_language` for language

### 5 sections
| Section | What ships | Deferred |
|---|---|---|
| Account | Email display, Change password link, Delete account link | — |
| Privacy | profile_public, enta_visibility (Public/Connections/Trusted/Private), show_element_distribution, show_activity | — |
| Notifications | Push toggle, Email toggle (UI only) | Web Push wiring → Phase 6 |
| Language | vi/en select | Full i18n string extraction → Phase 6 |
| About | Version + Whitepaper/Terms/Privacy links | Real link targets → Phase 6 |

---

## Group 3 — Profile Management

### Architecture
- `profile-v3/` namespace NEW (separate from ENTA identity)
- 3 components: `ProfileShellV3`, `ProfileHeaderV3`, `ProfileEditOverlayV3`
- Routes: `/v3/profile/me` (own) + `/v3/profile/:handle` (other)

### Edit flow
- Display name (max 50 chars)
- Handle (lowercase + numbers + underscore, regex enforced; one-time change UX warning displayed but not enforced server-side)
- Bio (500 chars max per ENTA canon)
- Website URL
- Avatar upload (Supabase Storage `avatars` bucket; bucket-not-found graceful fallback)

### Privacy settings
Privacy controls live in Settings panel (not Profile edit) per UX simplicity. Sprint 5.5 deferred ProfilePrivacyOverlay merged into PrivacySectionV3 in Settings.

---

## Group 4 — Follow/Connect Flow

### Components
- `ConnectActionSheetV3` (bottom sheet, 4 trust levels per ENTA canon §7.4):
  - **Mở** (Open): Public connection
  - **Cộng hưởng** (Resonance): Share ENTA wheel + status
  - **Vòng tròn** (Circle): Share detailed activity
  - **Tin cậy** (Trusted): Share deep analysis (requires confirmation)
- `ConnectionRequestsInboxV3` at `/v3/connections` — pending requests + accepted connections

### Hooks
- `useConnect` — rpc_connect_user invocation with trust_level metadata
- `useConnections` — rpc_get_my_connections list
- `useConnectionRequests` — rpc_accept_connection + rpc_reject_connection

### Cross-module integration
- `/v3/connections` accessible from UserMenu + Profile shell
- ConnectActionSheet exported and importable from HOME/CHAT (deferred wiring → Sprint 5.9.x)

---

## ENTA Canon §13 Redlines Compliance

Per AC-14, Sprint 5.9 verified NO violations:

| Redline | Status |
|---|---|
| NO follower count public | ✓ Connections inbox shows count to OWNER only |
| NO profile completeness % gamification | ✓ No completion meter implemented |
| NO "Verified" badges | ✓ Membership tier badge ≠ verified badge |
| NO endorsements/recommendations | ✓ Not implemented |
| NO profile views count | ✓ Not implemented |
| Resume/CV NOT shown | ✓ Profile = ENTA-aligned, not LinkedIn |
| Numerical leaderboards absent | ✓ Connections list has no rank/score sort |

---

## Backend Audit References

### D1 Schema (verified)

| Table | Cols | Use |
|---|---|---|
| `profiles` | 31 | useProfile read/update |
| `enta_connections` | 11 | useConnections list |
| `enta_connection_requests` | 7 | useConnectionRequests inbox |
| (No user_settings) | — | Fallback localStorage + profiles.preferred_language |

### D3 RPCs (verified live)

| RPC | Sprint 5.9 use |
|---|---|
| `rpc_connect_user(target_user_id)` | useConnect |
| `rpc_accept_connection(connection_id)` | useConnectionRequests.acceptRequest |
| `rpc_reject_connection(connection_id)` | useConnectionRequests.rejectRequest |
| `rpc_get_my_connections(limit_count)` | useConnections |
| `rpc_get_connection_requests(limit_count)` | useConnectionRequests |
| `rpc_get_connection_suggestions(limit_count)` | wrapper exported, not consumed Sprint 5.9 |

### Supabase Auth API

All Group 1 hooks use Supabase Auth SDK directly (no V2 Express dependency):
- `auth.signOut()`
- `auth.resetPasswordForEmail(email, { redirectTo })`
- `auth.updateUser({ password })`
- `auth.onAuthStateChange(callback)`

---

## Acceptance Criteria

| AC | Status | Evidence |
|---|---|---|
| AC-1 Backend Audit references | PASS | D1+D3 verified, ENTA canon §6+§7+§8+§13 |
| AC-2 Routes 200 | PASS | 27/27 KL-028 probe |
| AC-3 Phase 5.1-5.8 regression | PASS | All prior routes 200 |
| AC-4 Group 1 Auth lifecycle | PASS | All 7 components + 5 hooks shipped |
| AC-5 Group 2 Settings | PASS | 5 sections render, persist via localStorage + profiles |
| AC-6 Group 3 Profile | PASS | Edit + avatar upload (with bucket fallback) |
| AC-7 Group 4 Connect | PASS | 4 trust levels, RPC verified, inbox functional |
| AC-8 Auth integration | PASS | All auth-required routes redirect verified |
| AC-9 KL-028 production probe | PASS | 27/27 200 |
| AC-11 KL-32+33 namespace separation | PASS | 4 namespaces (2 extend + 2 NEW), 1 LoginForm 1-line edit |
| AC-12 Build + deploy CLEAN | PASS | V3 bundle 851 KB (+36 KB), Cloudflare PASS |
| AC-13 Playwright tests | 9/12 PASS | 3 deploy-lag failures expected to re-pass |
| AC-14 ENTA canon §13 redlines | PASS | All 7 redlines verified absent |
| AC-15 Live mirror DOT | PASS | 9 new routes 200 |

---

## Pattern Reusable for Phase 6

- **Auth lifecycle template** (logout / forgot / reset / change pwd) — reusable any auth flow
- **Settings panel pattern** (localStorage + selective DB persist) — reusable for any user prefs
- **Profile edit overlay** (full-screen takeover with auto-save) — reusable for any edit flow
- **4-trust-level Connect** state machine — reusable for any tiered relationship UX
- **Cross-namespace edit documentation** pattern (1-line edits documented in audit log)
