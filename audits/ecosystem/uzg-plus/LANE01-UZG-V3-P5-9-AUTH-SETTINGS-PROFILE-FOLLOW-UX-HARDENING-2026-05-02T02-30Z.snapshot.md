# Snapshot — Sprint 5.9 Auth UX hardening + Settings + Profile + Follow

**Audit ID:** LANE01-UZG-V3-P5-9-AUTH-SETTINGS-PROFILE-FOLLOW-UX-HARDENING-2026-05-02T02-30Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane 01) solo
**Pattern:** Multi-namespace UX hardening — Auth + Settings + Profile + Follow
**Significance:** Production-blocker P0 (logout missing) closed; V3 PWA OS user-account complete

---

## Deliverables

| Repo | PR | Commit | Status |
|---|---|---|---|
| unitonzengarden/uzgplus-app | [#88](https://github.com/unitonzengarden/uzgplus-app/pull/88) | `feb0fec` | MERGED |
| unitonzengarden/Uniton_Shared | (this branch) | TBD | OPEN |

## 4 Groups Shipped

### Group 1 — Auth lifecycle (P0 unblocker)
- `UserMenuV3` dropdown with Profile/Connections/Settings/U-Reward/Logout
- `LogoutConfirmV3` (Supabase signOut + state cleanup + redirect)
- `ForgotPasswordFormV3` + `useForgotPassword` (Supabase resetPasswordForEmail)
- `ResetPasswordFormV3` + `useResetPassword` (handles Supabase reset link)
- `ChangePasswordFormV3` + `useChangePassword` (in-app from Settings)
- `AccountDeletionConfirmV3` (UX path; destructive Phase 6)
- `SessionExpiredOverlayV3` + `useSessionExpiry` (auth state listener)

### Group 2 — Settings panel (`settings-v3/` NEW)
- `SettingsShellV3` + 5 sections (Account / Privacy / Notifications / Language / About)
- `useUserSettings` (localStorage + profiles columns persistence)

### Group 3 — Profile management (`profile-v3/` NEW)
- `ProfileShellV3` (/v3/profile/me + /v3/profile/:handle)
- `ProfileHeaderV3` (avatar + display_name + handle + bio)
- `ProfileEditOverlayV3` (full-screen edit per ENTA canon §7.2)
- Avatar upload inline (Supabase Storage)
- `useProfile` + `useAvatarUpload`

### Group 4 — Follow/Connect (extend `enta-v3/`)
- `ConnectActionSheetV3` (4 trust levels: Open/Resonance/Circle/Trusted per ENTA canon §7.4)
- `ConnectionRequestsInboxV3` (/v3/connections — pending + accepted)
- `useConnect` (rpc_connect_user)
- `useConnections` (rpc_get_my_connections)
- `useConnectionRequests` (rpc_accept_connection + rpc_reject_connection)

## Files (113 total)

| Type | Count |
|---|---|
| Auth components (extend) | 7 |
| Settings components (NEW) | 6 |
| Profile components (NEW) | 3 |
| Connect components (extend) | 2 |
| Hooks | 11 |
| Pages | 7 |
| Types | 3 (connectV3, profileV3, settingsV3) |
| Lib extension | 1 (supabaseRpc.ts +6 RPCs) |
| Tests | 1 (12 tests) |
| Cross-namespace edit | LoginForm.tsx (Forgot password link href) |

## Routes Wired (9 new)

| Route | Public | Purpose |
|---|---|---|
| `/v3/forgot-password` | ✓ | Forgot password form |
| `/v3/reset-password` | ✓ | Supabase reset link target |
| `/v3/account/change-password` | auth | In-app change password |
| `/v3/account/delete` | auth | Soft delete UX path |
| `/v3/settings` | auth | Settings shell (5 sections) |
| `/v3/profile/me` | auth | Own profile |
| `/v3/profile/:handle` | auth | Other user profile |
| `/v3/connections` | auth | Connection requests inbox |
| `/v3/profile` | auth | Redirects to /profile/me |

## Backend Audit References

- D1 `profiles` (31 cols): display_name, handle, bio, avatar_url, preferred_language, locale, timezone — all confirmed live
- D1 `enta_connections` (11 cols), `enta_connection_requests` (7 cols)
- D3 connect RPCs verified: `rpc_connect_user`, `rpc_accept_connection`, `rpc_reject_connection`, `rpc_get_my_connections`, `rpc_get_connection_requests`
- No `user_settings` table → settings stored in localStorage + `profiles.preferred_language` for language persistence
- Supabase Auth API: `signOut`, `resetPasswordForEmail`, `updateUser`, `onAuthStateChange`
- Supabase Storage `avatars` bucket: graceful fallback if bucket-not-found

## Verification

| Gate | Status | Evidence |
|---|---|---|
| Build | PASS | V3 bundle 851 KB JS (+36 KB delta from Sprint 5.8) |
| KL-028 production probe | PASS | 27/27 routes 200 (9 new + 18 prior) |
| Playwright p5-9 | 9/12 PASS | 3 deploy-lag re-test pending |
| Lane boundaries | PASS | auth-v3/ + enta-v3/ EXTENDED; settings-v3/ + profile-v3/ NEW; LoginForm 1-line edit |
| Sprint 5.1-5.8 regression | PASS | All prior routes still 200 |
| ENTA canon §13 redlines | PASS | NO follower count, NO completeness %, NO badges, NO endorsements, NO views, NO leaderboards |

## Cross-Namespace Edits (documented)

| File | Change | Rationale |
|---|---|---|
| `auth-v3/LoginForm.tsx` | "Quên mật khẩu?" `href="#forgot"` → `href="/v3/forgot-password"` | Sprint 5.1 link wiring |
| `auth-v3/index.ts` | Barrel exports +7 new components | Sprint 5.9 additions |
| `V3App.jsx` | UserMenu + Logout + SessionExpired mounted globally | Sprint 5.9 root shell integration |
| `enta-v3/` | +ConnectActionSheetV3 + ConnectionRequestsInboxV3 | Sprint 5.5 deferred 5.5.x merged |

All edits scoped within Lane_01 namespace per LAW-NTS-LANE-1-09 §exception.
