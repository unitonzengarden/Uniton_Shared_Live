# LANE01-UZG-V3-P5-1-AUTH-IDENTITY-FOUNDATION-2026-05-01 — audit_log

| Time (UTC) | Event |
|---|---|
| 2026-05-01T14:53Z | Sprint 5.1 task issued by CLA Lane_01. P0 — gates entire Phase 5. Solo CLAC1, Opus 4.7. First REAL backend integration (replaces mock localStorage user with Supabase Auth). |
| 2026-05-01T14:53Z | Pre-dispatch: verified `.env.local` SUPABASE_URL + ANON_KEY + VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY all loaded. Discovered existing `src/lib/supabaseClient.js` (V2 client với pkce + persistSession + autoRefreshToken) — will reuse via TypeScript re-export instead of duplicating. Existing `src/pages/v3/V3LoginPage.jsx` (mock-based) — will replace with new LoginForm via V3App route. `@supabase/supabase-js@^2.99.1` already installed. |
| 2026-05-01T14:54Z | Branch `feat/lane01-p5-1-auth-identity-foundation` created. 4 namespace dirs created in both trees (`src/lib/auth-v3/`, `src/components/auth-v3/`, `src/hooks/`, `src/types/`). |
| 2026-05-01T14:54–14:56Z | **Phase 1 — Types + lib + hooks**: Authored `src/types/auth.ts` (AuthState/AuthContextValue/EntaProfile interfaces). `src/lib/auth-v3/supabaseClient.ts` (TS re-export of V2 client). `src/lib/auth-v3/userResolver.ts` (resolveCurrentUser prefers session, dev-mode mock fallback + readMockUserSync helper). `src/hooks/useAuth.ts` (47 lines: getSession initial + onAuthStateChange listener với cleanup + signIn/Up/Out). `src/hooks/useEntaProfile.ts` (41 lines: RLS-filtered enta_profiles read on session change with refetch). |
| 2026-05-01T14:56–14:58Z | **Phase 2.1 — AuthProvider**: React context wrapper exposing useAuthContext() hook. throws if used outside provider. |
| 2026-05-01T14:58–14:59Z | **Phase 2.2 — AuthGate**: 3 states (loading spinner / authed children / unauthed redirect). Dev-mode mock fallback via readMockUserSync. data-component="auth-gate-loading" attr for Playwright. CSS spinner với prefers-reduced-motion. |
| 2026-05-01T14:59–15:01Z | **Phase 2.3 — LoginForm**: Full Vietnamese UI. UZG+ brand hero (Syne 800 cosmic purple) + "Đăng nhập" + "Chào mừng trở lại Uniton Zen Garden" + EMAIL + MẬT KHẨU inputs với cosmic purple focus + cosmic purple gradient submit + "Quên mật khẩu?" + divider HOẶC + "Chưa có tài khoản? Đăng ký ngay" Link to /signup + cultural framing footer. data-component + data-cta="signin" + data-error attrs. |
| 2026-05-01T15:01–15:03Z | **Phase 2.4 — SignupForm**: Full Vietnamese UI. UZG+ brand + "Tạo tài khoản UZG+" + 4 fields (EMAIL / MẬT KHẨU với hint "tối thiểu 8 ký tự" / XÁC NHẬN / TÊN HIỂN THỊ optional) + Terms checkbox với inline links + validate() function + signUp() with metadata + success message support + "Đã có tài khoản? Đăng nhập" Link. data-component + data-cta="signup" + data-cta="agree-terms" + data-error/data-success attrs. |
| 2026-05-01T15:03–15:04Z | **Phase 2.5 — UserMenu**: Initial-based avatar cosmic purple gradient. Click outside close (mousedown listener). Dropdown với userInfo (name + email) + 2 menu items (Hồ sơ ENTA / Ví UZG+) + signout (cosmic red). data-component + data-cta="signout". |
| 2026-05-01T15:04Z | auth-v3/index.ts barrel (5 exports). |
| 2026-05-01T15:04–15:06Z | **Phase 3 — V3App.jsx wiring**: Imported LoginForm/SignupForm/AuthGate/UserMenu/useAuthContext. isLogin expanded to include /signup. /login route now uses LoginForm (replaces V3LoginPage). NEW /signup route → SignupForm. ALL 17 protected routes wrapped với `<AuthGate>` (home/chat+3sub/wallet+4sub/enta+outlet/onboarding/plus/app+5segments). /enta/:handle public profile NOT wrapped intentionally. |
| 2026-05-01T15:06Z | **Phase 4 — main.v3.jsx wiring**: Wrapped `<BrowserRouter>` với `<AuthProvider>` so context available throughout app. |
| 2026-05-01T15:06Z | **Phase 5+6 deferred**: ENTA profile fetch already implemented as useEntaProfile hook (ready for downstream Sprints 5.2-5.5). TopBar UserMenu integration deferred to Sprint 5.2 (UserMenu component standalone for now, downstream sprints will integrate into TopBar OR AvatarMenu). |
| 2026-05-01T15:07Z | **Phase 7 — Mirror discipline (KL-32+33)**: explicit file copy of 12 auth-v3 files (5 components × 2 + lib 2 + hooks 2 + types 1 + main + V3App) to apps/uzg-pwa/src/. Verified `git diff --stat apps/.../{aier,ziwei}/` empty + `diff -rq` empty. |
| 2026-05-01T15:08Z | `npm run build:v3` PASS (4.36s, 730KB JS / 217KB gzip — added Supabase client). Bundle warning về 500KB+ chunk size (acceptable, code-splitting future Phase 5 optimization). 0 TS/ESLint errors. |
| 2026-05-01T15:09Z | **Smoke test curl** against Supabase Auth API: |
| | - POST `/auth/v1/signup` với test email → returned access_token immediately (NO email confirmation required at this Supabase project — important Phase 5 finding) |
| | - POST `/auth/v1/token?grant_type=password` → returned access_token |
| | - JWT extraction in shell had truncation bug (head -c 100 cut JWT mid-token) but auth flow itself proven functional |
| 2026-05-01T15:10Z | Authored `tests/visual/p5-1-auth.spec.mjs` (7 tests): 4 viewport×routes (mobile/tablet × login/signup) + 3 functional (auth-gate-redirects / signin-invalid-creds / login-has-signup-link). |
| 2026-05-01T15:10Z | Started vite preview port 4178 (PID 166124). Local Playwright initial run: 6/7 PASS, 1 fail (login-has-signup-link — selector `a[href="/signup"]` failed because react-router renders Link với basename="/v3" prepended). |
| 2026-05-01T15:11Z | Fixed selector to `a[href*="signup"]` (substring match instead of exact). Re-ran: **7/7 PASS in 8.8s**. |
| 2026-05-01T15:12Z | Visual verification: read mobile-380-login.png + mobile-380-signup.png. Confirmed PREMIUM QUALITY: UZG+ brand cosmic purple + Vietnamese UI + EMAIL/MẬT KHẨU/etc fields + cosmic purple gradient CTA + cultural framing footer + Terms checkbox + "Đăng ký ngay"/"Đăng nhập" cross-page links. |
| 2026-05-01T15:13Z | Stopped preview server. git add explicit paths (39 files, 2430 insertions). Pre-commit `git diff --cached --stat apps/.../{aier,ziwei}/` re-verified EMPTY. |
| 2026-05-01T15:06:42Z | Commit `feat(p5-1): UZG+ Phase 5 Sprint 5.1 — Auth + Identity Foundation (real Supabase)`. Push via KL-031 GH_TOKEN. PR #79 created. Squash-merged --admin → merge commit `bfac5172dcd6eaa68c687c0191de61589e97646c`. Branch deleted. |
| 2026-05-01T15:08:23Z | Bundle hash flip detected: `main-D-nBKU8M.js` → `main-tnYdA1_Y.js` (Cloudflare auto-deploy ~90s from merge). |
| 2026-05-01T15:09Z | **KL-028 + Phase 4 regression sweep PASS — 22/22 routes 200 (100% CLEAN)**: 1 NEW (/v3/signup) + 9 V3 baseline (/login/home/wallet/enta/plus/chat/onboarding/u-reward/tao) + 11 Phase 4 TAO (bazi/{4 sub + luck-pillars}/ziwei/{2 reading}/phong-thuy/{4 sub}/lich-van-nien/aier-tao) + 2 V2 (/, /login). NO REGRESSION. |
| 2026-05-01T15:09Z | Bundle markers verified in `main-tnYdA1_Y.js`: `login-form`, `signup-form`, `auth-gate-loading` (3/3 expected). |
| 2026-05-01T15:10Z | **Production Playwright PASS — 7/7 in 9.3s** against `https://uzg.plus`. All form elements + AuthGate redirect + invalid creds error + signup link verified live. |
| 2026-05-01T15:11Z | Cross-publish: copied 4 production screenshots to `audits/ecosystem/uzg-plus/sprints/phase-5-sprint-1/screenshots/`. Created 3 DOT files in `audits/ecosystem/uzg-plus/`. |

## Canon guard verification

- **NAM TAO 南道 branding canon** Sprint 4.3.1 inheritance: LoginForm + SignupForm use cosmic purple `var(--nam-tao-primary)` brand mark + uppercase cosmic purple labels. Consistent với Phase 4 NAM TAO branding system.
- **Vietnamese verbatim labels**: Đăng nhập / Tạo tài khoản UZG+ / EMAIL / MẬT KHẨU / XÁC NHẬN MẬT KHẨU / TÊN HIỂN THỊ / Tôi đồng ý Điều khoản và Chính sách bảo mật / Đăng ký / Chưa có tài khoản / Đã có tài khoản / Quên mật khẩu / Chào mừng trở lại Uniton Zen Garden / Bắt đầu hành trình Uniton Zen Garden của bạn / Đang đăng nhập / Đang tạo tài khoản / Đang xác thực.
- **Cultural framing**: "UZG+ trình bày cấu trúc tham chiếu để bạn tự hiểu cấu trúc của mình" footer on both login + signup.
- **NO 理數越南 / lyso.vn / Lý Số Hội Quán** in any auth UI.
- **R-CANON-02**: no Tier 1 canon mutations.
- **KL-32 + KL-33 ENFORCED via auth-v3 namespace**: Lane_02 territory verified untouched twice.
- **LAW-NTS-CREDS-PERMANENT-V1**: VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY auto-loaded from .env.local, used by Supabase JS client constructor, no creds in committed files.

## KL applied + reinforced

- **KL-05** (dual-tree byte-identical): applied to all 12 new files. `diff -rq` verified per directory.
- **KL-028** (production probe gate): PASS — 22/22 routes 200 (Phase 4 regression CLEAN) + 3 bundle markers verified.
- **KL-030** (canon compliance gate): PASS — `#root max-width=480px` on tablet+desktop verified for login + signup pages.
- **KL-031** (GH_TOKEN credential helper): preventatively used; push SUCCESS first try.
- **KL-32** (dual-tree caveat for relative imports): applied — auth-v3 components use depth-correct imports (`../../hooks/useAuth`, `../../types/auth`) for both trees.
- **KL-33** (mirror scope discipline + namespace separation): **STRICTLY ENFORCED**. auth-v3/ NEW namespace eliminates clash with V2 auth components (existing `src/lib/supabaseClient.js` reused via TypeScript re-export, no overwrite).

## Lessons / observations

1. **TypeScript re-export of existing JS client is the cleanest reuse pattern**: `src/lib/auth-v3/supabaseClient.ts` is just 9 lines re-exporting V2's `src/lib/supabaseClient.js` (which already had pkce + persistSession + autoRefreshToken). Avoids duplicating client config + ensures single Supabase client instance throughout app.
2. **Supabase project has NO email confirmation requirement**: signup returns access_token immediately. Important Phase 5 finding for Sprint 5.2+ (no need to handle email-pending state). NTS may want to enable email confirmation later for production hardening.
3. **AuthGate dev-mode fallback works**: existing Phase 4 dev workflow (localStorage uzg-mock-user) preserved so testers can continue without real signup. Production (DEV=false) blocks fallback.
4. **Pattern reusable for Sprints 5.2-5.7**: AuthProvider/AuthGate/useAuth pattern + RLS-aware data hook (useEntaProfile) is the template. Each subsequent sprint adds module-specific data hook (useWallet / useFeed / useChat / etc.) following same pattern.
5. **React Router basename="/v3" affects Link href rendering**: Link to="/signup" renders as `href="/v3/signup"`. Test selectors must use substring match (`a[href*="signup"]`) instead of exact match.
6. **Bundle size grew 547KB → 730KB JS** (added Supabase client + auth components). Phase 5 will likely cross 1MB before code-splitting needed. Phase 5.8 closure includes optimization sprint if needed.
7. **Phase 4 regression CLEAN (22/22 PASS)**: AuthGate wrapper integration didn't break any Phase 4 surface. Mock fallback in DEV preserves existing test flows.

## Phase 5.1 closure

Phase 5.1 establishes:
- ✅ Real Supabase Auth functional in production
- ✅ AuthProvider/AuthGate pattern proven
- ✅ useAuth + useEntaProfile hooks ready for Sprints 5.2-5.5
- ✅ Mock graceful fallback (DEV) preserved
- ✅ Vietnamese UI established with NAM TAO branding canon
- ✅ KL-32+33 namespace pattern proven for backend integration

**Next:** Sprint 5.2 HOME feed (Hybrid V2 Express proxy + Supabase Realtime) per UZG_PLUS_V3_PHASE5_ARCHITECTURE_v1.md §1.2.

End of audit_log.
