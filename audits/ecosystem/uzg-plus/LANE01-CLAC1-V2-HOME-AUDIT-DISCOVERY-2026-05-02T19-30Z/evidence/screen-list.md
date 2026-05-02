# V2 HOME — Screen list (route discovery)

**Captured:** 2026-05-02T19:30Z
**Source:** `apps/uzg-pwa/src/App.jsx` `<Route path="…">` enumeration
**Scope filter:** Lane_01 territory (HOME / Identity / Connect / Profile / Settings).
Excluded Lane_02 namespaces: `/chat/*`, `/wallet/*`, `/tao/*`, `/plus*`, `/u-reward*`.

## All HOME-related routes discovered

| # | Route | Component (App.jsx ref) | Lane | Audited this sprint? | Screenshot file |
|---|---|---|---|---|---|
| 1 | `/` | Redirect → `/login` (unauth) or `/dashboard` (auth) | 01 | YES | `home_{mobile,desktop}_LIVE_uzg.plus.png` |
| 2 | `/dashboard` | Default landing target post-auth | 01 | INDIRECT (covered by `/` capture) | (same as `/`) |
| 3 | `/home` | `<Navigate to="/dashboard">` | 01 | NO (alias) | — |
| 4 | `/uniton` | `<Navigate to="/dashboard">` | 01 | NO (alias) | — |
| 5 | `/social` | `<Navigate to="/dashboard">` | 01 | NO (alias) | — |
| 6 | `/flow` | `<Navigate to={memberOwnedRoute}>` | 01 | NO (alias) | — |
| 7 | `/login` | `<LoginPage>` | 01 | YES | `login_{mobile,desktop}_LIVE_uzg.plus.png` |
| 8 | `/identity-hub` | ENTA hub (de-facto V2 HOME landing) | 01 | YES | `identity-hub_{mobile,desktop}_LIVE_uzg.plus.png` |
| 9 | `/post/:id` | `<PostDetailPage>` | 01 | NO (need post id) | — |
| 10 | `/qot/me` | `<QotUserTrailPage>` | 01 | NO (need QOT trail data) | — |
| 11 | `/qot/:qotId` | `<QotExplorerPage>` | 01 | NO (need QOT entry) | — |
| 12 | `/connect` | `<ConnectionsPage lane="all">` | 01 | INDIRECT (via /connections redirect) | (same as `/connections`) |
| 13 | `/connect/friends` | `<ConnectionsPage lane="friends">` | 01 | NO (deferred to Audit-A) | — |
| 14 | `/connect/requests` | `<ConnectionsPage lane="requests">` | 01 | NO (deferred to Audit-A) | — |
| 15 | `/connect/suggestions` | `<ConnectionsPage lane="suggestions">` | 01 | NO (deferred to Audit-A) | — |
| 16 | `/connections` | `<Navigate to="/connect">` | 01 | YES | `connections_{mobile,desktop}_LIVE_uzg.plus.png` |
| 17 | `/enta` | `<EntaPage>` | 01 | INDIRECT (covered by /identity-hub flow) | — |
| 18 | `/enta/me` | `<ProfilePage>` (own) | 01 | NO (deferred to Audit-B) | — |
| 19 | `/enta/:handle` | `<ProfilePage>` (other) | 01 | NO (deferred to Audit-B) | — |
| 20 | `/enta/:handle/connections` | `<ProfileRelationsPage>` | 01 | NO (deferred to Audit-B) | — |
| 21 | `/enta/view` | `<Navigate to="/enta">` | 01 | NO (alias) | — |
| 22 | `/notifications` | (component TBD) | 01 | NO (deferred to Audit-B) | — |
| 23 | `/search` | (component TBD) | 01 | NO (deferred to Audit-B) | — |
| 24 | `/profile/edit` | (component TBD) | 01 | NO (deferred to Audit-B) | — |
| 25 | `/profile/enta-edit` | (component TBD) | 01 | NO (deferred to Audit-B) | — |
| 26 | `/profile/me` | alias `<ProfilePage>` (own) | 01 | YES | `profile-me_{mobile,desktop}_LIVE_uzg.plus.png` |
| 27 | `/compose` | (component TBD) | 01 | NO (deferred to Audit-B) | — |
| 28 | `/settings` | `<SettingsPage>` | 01 | YES | `settings_{mobile,desktop}_LIVE_uzg.plus.png` |

## Coverage summary

- **HOME-related routes discovered:** 28 (filtered from 80+ V2 routes; aliases collapsed: 18 unique destinations)
- **Audited this sprint:** 6 unique screens × (mobile + desktop) = 12 screenshots
- **Deferred to Sprint Audit-A:** 3 (Connect lane variants)
- **Deferred to Sprint Audit-B:** 12+ (post detail, QOT, Enta sub-pages, notifications, search, compose, profile-edit)

## Why these 6 screens audited?

These 6 give horizontal coverage across the V2 HOME canonical surface area:
1. `/` — root entry / U-Reward floating shell context
2. `/login` — pre-auth gate
3. `/identity-hub` — V2's de-facto HOME analog (ENTA hub landing)
4. `/connections` — Connect surface (4 trust levels canon §7)
5. `/profile/me` — ENTA Identity surface (canon §7.4)
6. `/settings` — adjacent module (theme picker, account)

Sprint Audit-A and Audit-B (handoff-recommended) extend the coverage to all 28 routes.

## Screenshot file naming convention

`<screen>_<viewport>_LIVE_uzg.plus.png`

- `<screen>` — slugified route (e.g., `profile-me` for `/profile/me`)
- `<viewport>` — `mobile` (375×812) or `desktop` (1440×900)
- `LIVE_uzg.plus` — origin proof (production at `https://uzg.plus/`)

All 12 screenshots captured AFTER PR #106 (V2 UI Upgrade LIVE) and PR #111 (G001 U-Reward fix) had merged, so the audit reflects current LIVE production state.
