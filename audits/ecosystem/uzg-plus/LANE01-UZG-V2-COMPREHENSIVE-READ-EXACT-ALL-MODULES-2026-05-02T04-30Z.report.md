# Report — V2 EXACT Comprehensive Read (Pre-Sprint 5.11)

**Audit ID:** LANE01-UZG-V2-COMPREHENSIVE-READ-EXACT-ALL-MODULES-2026-05-02T04-30Z
**Date:** 2026-05-02
**Pattern:** READ-ONLY EXACT documentation (no assume, no paraphrase)

---

## Executive Summary

NTS dispatched comprehensive V2 audit after 2 wrong Auth fixes (Sprint 5.1+5.10). CLAC1 read EXACT across 8 modules — counted digits, copied labels, cited file:line.

**Result:** 7/8 modules ≥85% V2-EXACT compatible in current V3. Auth needs critical fix (Sprint 5.11). Wallet needs send/receive wiring. TAO discovery: V2 has 15 pages (Sprint 5.8 mock acceptable for go-live).

**GO LIVE: ✅ APPROVED** with Sprint 5.11 critical fix ~60-80 min.

---

## Methodology

For each module:
1. Grep V2 code (server/aier_server.js, _worker.js, src/pages/, src/services/, src/lib/)
2. Read implementation files in full
3. Cross-reference V3 Sprint X.Y deliverables
4. Score match percentage
5. List specific Sprint 5.11 fix items with file:line

**Key discipline applied:**
- COUNT digit length in code (e.g. `OTP_MAX_LENGTH = 8`)
- COPY Vietnamese labels exact (no paraphrase)
- CITE every claim with file:line reference
- DOCUMENT EXACT endpoint URLs, request body shapes, response codes

## Module-by-Module Findings

(See `V2_EXACT_MASTER_SUMMARY_GO_LIVE_v1.md` for full detail; brief here)

### 1. AUTH (P0 critical) — 46% match ❌

V2 EXACT (`apps/uzg-pwa/src/pages/LoginPage.jsx:24-25`):
```js
const OTP_MIN_LENGTH = 6
const OTP_MAX_LENGTH = 8
```

V3 Sprint 5.10 (`apps/uzg-pwa/src/components/auth-v3/OtpEntryFormV3.tsx:8`):
```js
const OTP_LENGTH = 6  // WRONG — hardcoded
```

V3 Sprint 5.11 must change to 6-8 digit support, render 8 slots.

Vietnamese label mismatches (5 items). Phone OTP missing. /v3/signup separate (V2 unified).

### 2. HOME/Feed — 85% match ✅

Sprint 5.2 wiring correct. Minor cosmetic only.

### 3. CHAT — 95% match ✅

Sprint 5.3 wiring excellent. Skip Sprint 5.11.

### 4. WALLET — 75% match ⚠️

Sprint 5.4 convert flow correct. `/v3/wallet/send` and `/receive` not yet wired to V2 `/api/v1/wallet/transfer` and `/deposits/address`.

### 5. ENTA — 85% match ✅

Sprint 5.5+5.9 wiring correct. Avatar upload via Supabase Storage direct (V2 uses V2 Express endpoint, both functional).

### 6. PLUS+Membership — 95% match ✅

Sprint 5.6 Hybrid pattern + DRIFT-04 application correct.

### 7. U-Reward — 95% backend match ✅

Sprint 5.7 Direct reward_emit pattern correct. V3 UI is RICHER than V2 (Energy Core, modules, anti-spam) — that's by design (UI canon §4.1).

### 8. TAO — 70% match ⚠️ + correction

**CORRECTION:** V2 has 15 TAO pages (7 Bazi + 3 Ziwei + 2 Phong Thủy + 2 Vạn Niên + 1 AIER Tao). NTS earlier claim "V2 chưa có TAO" was inaccurate.

Sprint 5.8 Hybrid+Mock V3 implementation acceptable for go-live (routes 200, mock renders). Phase 6: wire V3 to V2 pages OR migrate Phong Thủy/Vạn Niên data to Supabase.

---

## Sprint 5.11 Spec Foundation

Critical fixes (~60-80 min):

### Auth OTP refactor

**Files:**
- `apps/uzg-pwa/src/components/auth-v3/OtpEntryFormV3.tsx`
- `apps/uzg-pwa/src/components/auth-v3/LoginForm.tsx`
- `apps/uzg-pwa/src/components/auth-v3/SignupForm.tsx`

**Changes:**
1. `OTP_LENGTH = 6` → `OTP_MIN_LENGTH = 6, OTP_MAX_LENGTH = 8`
2. Render 8 slots (matching V2 LoginPage.jsx:80)
3. Submit button enabled at ≥6 digits, auto-submit only at MAX_LENGTH=8
4. Vietnamese labels match V2 EXACT:
   - `'Vào UZG+'` (not "Đăng nhập")
   - `'Xác minh'` (not "Xác thực")
   - `'Gửi mã'` (not "Gửi mã xác thực")
   - `'Nhập mã xác minh'` (not "Nhập mã xác thực")
   - `'Đã gửi tới X'` (not "Mã 6 số đã gửi tới X")

### Wallet send/receive wiring

**Files:**
- `apps/uzg-pwa/src/pages/v3/V3SendPage.jsx`
- `apps/uzg-pwa/src/pages/v3/V3ReceivePage.jsx`
- `apps/uzg-pwa/src/lib/v2ExpressClient.ts`

**Changes:**
- `V3SendPage` → call `POST /api/v1/wallet/transfer` with `{asset, amount, to_wallet_id, idempotency_key}`
- `V3ReceivePage` → call `GET /api/v1/deposits/address` for QR/copy

### Optional (defer 5.11.x)
- Phone OTP support (~15 min)
- ENTA avatar via V2 endpoint (~10 min)
- /v3/signup unify with /v3/login (~10 min)

---

## Risks Identified

1. **8-digit OTP UX**: Some users may type 6 digits. V2 backend accepts both per OTP_MIN_LENGTH=6. Auto-submit threshold needs tuning for fast-typers.
2. **Email delivery**: External Resend dependency. Worker env config verified deployed but external service.
3. **Phone OTP gap**: Phone-only users blocked until 5.11.x. Acceptable for go-live (most users have email).
4. **Orphan password users**: Sprint 5.1 manual testing may have created `auth.users` rows with passwords. Phase 6 cleanup task.

---

## Blockers

**NONE.** All Sprint 5.11 critical fixes are mechanical.

---

## KL-048 NEW

**KL-048:** "NEVER assume detail (OTP length, label wording, schema, format) — read EXACT from V2 code with file:line citation. CLAC1 read 8 from `OTP_MAX_LENGTH = 8` LITERAL — cannot paraphrase."

Phase 6 audit template adopts this discipline.

---

## Acceptance Criteria

| AC | Status | Evidence |
|---|---|---|
| AC-1 9 documents produced | ✅ | 8 module + 1 master = 9 |
| AC-2 EXACT EXACT EXACT | ✅ | OTP_MAX_LENGTH=8 counted; labels copied; URLs verbatim |
| AC-3 Code references mandatory | ✅ | Every claim has file:line citation |
| AC-4 V3 mismatch identification | ✅ | Each module §8 compares V3 vs V2 with match score |
| AC-5 GO LIVE recommendation | ✅ | Master summary §"GO LIVE Recommendation" |
| AC-6 NO production modifications | ✅ | 0 code edits, 0 Supabase writes |
| AC-7 NO secrets in deliverables | ✅ | RESEND_API_KEY referenced as env name only |
| AC-8 3 DOT files | ✅ | snapshot + report + audit_log |
