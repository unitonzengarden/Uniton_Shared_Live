# V2 ENTA Flow — EXACT Documentation

**Audit:** LANE01-UZG-V2-COMPREHENSIVE-READ-EXACT-ALL-MODULES
**Module:** 5 of 8

---

## §1 Module status V2

**LIVE.** V2 has ENTA module: profile + wheel + resonance + connections + onboarding.

---

## §2 Frontend components V2

| File | Role |
|---|---|
| `apps/uzg-pwa/src/pages/EntaPage.jsx` | Primary ENTA shell (own profile + wheel + tabs) |
| `apps/uzg-pwa/src/pages/EntaNetworkPage.jsx` | Network/connections page |
| `apps/uzg-pwa/src/pages/PublicEntaProfilePage.jsx` | Other-user public profile (`/enta/:handle`) |
| `apps/uzg-pwa/src/pages/OnboardingPage.jsx` | ENTA onboarding wizard |
| `apps/uzg-pwa/src/pages/ConnectionsPage.jsx` | Connections inbox |

---

## §3 Backend endpoints V2

### V2 Express endpoints

| Endpoint | Method | Auth | Notes |
|---|---|---|---|
| `/api/v1/profile/me` | GET | requireUserAuth | Own profile (with ENTA context) |
| `/api/v1/profile/bootstrap` | GET | requireUserAuth | Bootstrap profile (ENTA + role context) |
| `/api/v1/connect/suggestions` | GET | requireUserAuth | Connection suggestions |
| `/api/v1/resonance/connections` | GET | requireUserAuth | List user's resonance connections |
| `/api/v1/resonance/connect` | POST | requireUserAuth | Connect to user (resonance) |
| `/api/v1/resonance/connections/actions` | POST | requireUserAuth | Accept/reject/block connection |
| `/api/v1/media/enta/upload` | POST | requireUserAuth | ENTA media upload (avatar, banner) |
| `/api/v1/media/enta/object` | GET | requireUserAuth | Read ENTA media object |

### Direct Supabase RPCs (Sprint 5.5 verified)

| RPC | Purpose |
|---|---|
| `rpc_create_enta_profile` | Onboarding submit (birth data) |
| `rpc_compute_enta` | Trigger ENTA state computation |
| `rpc_compute_enta_state` | Alt computation entry |
| `rpc_recompute_enta_state` | Recompute by user_id |
| `calc_enta_profile` | Direct Bazi calc (parameterized) |
| `rpc_calculate_resonance` | Pair resonance compute |
| `fn_enta_suggest_resonance` | Suggested resonance list |
| `rpc_get_enta_profile` | Profile getter |
| `rpc_get_enta_state` | State getter |
| `rpc_get_enta_snapshots` | Historical snapshots |
| `rpc_can_update_enta_profile` | Permission check |
| `rpc_get_my_circles` | Circles list |
| `rpc_join_circle` | Join circle |
| `rpc_connect_user` | Connect via Direct RPC |
| `rpc_accept_connection` | Accept connection request |
| `rpc_reject_connection` | Reject connection request |
| `rpc_get_my_connections` | List connections |
| `rpc_get_connection_requests` | Pending requests |
| `rpc_get_connection_suggestions` | Suggestions |

### Direct Supabase tables (Sprint 5.5 verified — 27 enta_* tables)

Key tables:
- `enta_profiles` (52 cols)
- `enta_current_fields` (19 cols)
- `enta_resonance_scores` (10 cols)
- `enta_circles`, `enta_circle_members`
- `enta_flow_events`
- `enta_connections`, `enta_connection_requests`, `enta_connection_events`

---

## §4 Onboarding 5-step (per UX SPEC §2)

V2 onboarding:
1. **Birth data:** date + time (optional) + gender + location + privacy note
2. **Calculating:** 2-3s overlay (no skip)
3. **Result reveal:** identity + wheel + Continue
4. **First resonance:** 3 suggested users (optional skip)
5. **Welcome home:** "You're all set!" + Enter UZG+

V2 calls `rpc_create_enta_profile` on step 1 submit, then `rpc_compute_enta` for state computation.

---

## §5 Realtime channels

V2 ENTA may subscribe to:
- `public:enta_current_fields` filter `user_id=eq.<uid>` UPDATE — live wheel update
- `public:enta_resonance_scores` filter `user_id=eq.<uid>` INSERT — new resonance

(Sprint 5.5 documented this pattern.)

---

## §6 Edge cases V2 handles

| Edge case | Behavior |
|---|---|
| User without ENTA profile | Redirect to /onboarding |
| Birth time unknown | Mark `is_birth_hour_confirmed=false`, partial wheel |
| Onboarding abandon | Save progress, resume on next visit |
| Privacy gate (other-user view) | RLS + `enta_profiles.privacy_level` check |

---

## §7 ENTA invariant

`element_sum = 12 + sum_rule_ok = true` (Backend Audit D5 verified).

V2 + Sprint 5.5 V3 both validate this client-side with fallback warning if violated.

---

## §8 V3 Sprint 5.5 wiring assessment

**Sprint 5.5 implementation:** Direct RPC + RLS pattern (DEC-08 §1.5).

| Item | V2 EXACT | Sprint 5.5 V3 | Match |
|---|---|---|---|
| Profile read | `enta_profiles` direct OR `/api/v1/profile/me` | Sprint 5.5: `enta_profiles` direct | ✅ (Direct OK) |
| ENTA wheel data | `enta_current_fields` | Same | ✅ |
| Onboarding submit | `rpc_create_enta_profile` | Same | ✅ |
| Onboarding compute | `rpc_compute_enta` | Same | ✅ |
| Connect action | V2: `/api/v1/resonance/connect` POST OR Direct `rpc_connect_user` | Sprint 5.5/5.9 V3: `rpc_connect_user` | ⚠️ V3 uses RPC; V2 has both paths |
| Resonance list | V2 Express OR `enta_resonance_scores` direct | Sprint 5.5 V3: Direct | ✅ |
| Avatar upload | V2: `/api/v1/media/enta/upload` | Sprint 5.9 V3: Supabase Storage `avatars` bucket direct | ⚠️ DIFFERENT |

**Match score: ~85%** — core flows correct. Avatar upload deviation: V2 uses Express endpoint with canonical proxy, V3 uses Supabase Storage direct. Both valid; functional.

---

## §9 V3 Sprint 5.11 fix recommendations

**Priority 3 (after Auth + Wallet send/receive):**
- (Optional) Switch avatar upload from Supabase Storage direct → V2 `/api/v1/media/enta/upload` for consistency with V2 ENTA media handling
- (Optional) Verify `rpc_connect_user` works after OTP login session

**Status: LOW PRIORITY** — Sprint 5.5+5.9 ENTA V3 wiring largely correct.

**ETA:** Skip Sprint 5.11 OR ~10-15 min for media endpoint switch.

---

## §10 Code references

- `aier_server.js:18620-18650` — connect/resonance endpoints
- `aier_server.js:19667-19705` — profile/me
- `aier_server.js:19929-` — profile/bootstrap
- `aier_server.js:20114-20150` — media/enta endpoints
- Backend Audit D1+D3 — 27 enta_* tables + 47 ENTA-related RPCs
- Sprint 5.5 audit — Direct RPC pattern documentation
- Sprint 5.9 audit — Connect 4 trust levels + Profile edit
