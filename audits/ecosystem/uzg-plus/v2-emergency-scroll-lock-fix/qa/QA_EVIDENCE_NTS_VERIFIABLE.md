# QA evidence — NTS verifiable anchor doc

**Sprint:** LANE01-CLAC1-V2-EMERGENCY-SCROLL-LOCK-AND-ENTA-BLANK-FIX-2026-05-03T07-00Z
**Status:** P0 emergency fix LIVE production
**Code merge SHA:** `001bba1f` (uzgplus-app PR #120)
**Cloudflare deploy run:** 25265628575 SUCCESS
**Production URL:** https://uzg.plus/

---

## §1 Honesty disclosure (KL-077 NEW honest partial)

**What CLAC1 verified in this session:**
- Production CSS bundle marker grep (proves new CSS shipped)
- Production HTTP status 200 across 12 V2 routes (proves SPA shell reachable)
- Production CSS does NOT contain `body{...overflow:hidden}` global rule (proves the fix removes the leak at compile time)
- Build passes locally (`vite build` SUCCESS, 7.59s)
- KL-05 dual-tree byte-identical mirror sync via `diff -q`
- Cloudflare deploy run completed `success`
- Source code review confirms the React rules-of-hooks bug pattern in the original `MediaLightboxOverlay` and the corrected gating in the patch

**What CLAC1 could NOT verify in this session (and you, NTS, must verify):**
- Real-browser scroll behavior on `/dashboard`, `/enta`, `/chat`, `/wallet` (no authenticated browser harness available)
- `/enta` Wheel hero pixel rendering (no headed browser)
- Wizard onboarding click-flow (no fixture seed user)
- JS console errors on `/enta` for the un-onboarded user (no DevTools)

This honest partial is documented per KL-077 NEW codified in this sprint.

## §2 Anchor links — NTS click-verify these

### Production URLs (open in browser, scroll, observe)

| URL | Expected (after fix) | Was (before fix) |
|---|---|---|
| https://uzg.plus/dashboard | scrolls down feed; multiple post cards visible | scroll locked; only top viewport visible |
| https://uzg.plus/enta | renders Wheel hero (or ErrorBoundary fallback); scrolls down to counter row + identity panels | rendered blank |
| https://uzg.plus/chat | scrolls inbox list | scroll locked |
| https://uzg.plus/wallet | scrolls wallet sections | scroll locked |
| https://uzg.plus/settings | scrolls settings panels | scroll locked |
| https://uzg.plus/enta/onboarding | wizard renders Step 1 form; submit advances to Step 2 → 3 → 4 → 5 → /dashboard | (not blocked by scroll lock — wizard is a full-page overlay) |

### Code repo links

- Code PR: https://github.com/unitonzengarden/uzgplus-app/pull/120
- Merge commit: https://github.com/unitonzengarden/uzgplus-app/commit/001bba1fe4061d311648a590f3da116f7a2d1e4c
- Cloudflare deploy run: https://github.com/unitonzengarden/uzgplus-app/actions/runs/25265628575

### Audit deliverables (this sprint)

- Forensic audit Sprint 3A/3B integrity: `audits/ecosystem/uzg-plus/v2-emergency-scroll-lock-fix/forensic-audit-sprint-3a-3b.md`
- Forensic bug analysis (root cause): `audits/ecosystem/uzg-plus/v2-emergency-scroll-lock-fix/forensic-audit-bug-analysis.md`
- This file: `audits/ecosystem/uzg-plus/v2-emergency-scroll-lock-fix/qa/QA_EVIDENCE_NTS_VERIFIABLE.md`

## §3 Production CSS marker verification (machine-checkable)

### Run these commands to confirm fix shipped to production:

```bash
$ CSS=$(curl -s "https://uzg.plus/" | grep -oE 'index-[A-Za-z0-9_-]+\.css' | head -1)
$ echo "$CSS"
index-BiG9q8R8.css

# 1. ErrorBoundary fallback CSS shipped
$ curl -s "https://uzg.plus/assets/$CSS" | grep -oE 'error-boundary-fallback' | head -3
error-boundary-fallback
error-boundary-fallback
error-boundary-fallback

# 2. NO global body overflow:hidden rule (the leak is gone)
$ curl -s "https://uzg.plus/assets/$CSS" | grep -oE 'body\{[^}]*overflow:hidden[^}]*' | head -3
# (empty output — correct)

# 3. MediaLightbox overlay CSS still present (component still works when opened)
$ curl -s "https://uzg.plus/assets/$CSS" | grep -oE 'media-lightbox-overlay' | head -2
media-lightbox-overlay

# 4. ENTA Wheel hero markers from Sprint 3B unchanged
$ curl -s "https://uzg.plus/assets/$CSS" | grep -oE 'enta-wheel-hero' | head -3
enta-wheel-hero
enta-wheel-hero
enta-wheel-hero
```

## §4 KL-028 LIVE probe (machine-checkable)

```bash
$ for r in / /login /dashboard /enta /enta/onboarding /enta/me /chat /wallet /settings /connections /compose /profile/me /u-reward; do
    code=$(curl -s -o /dev/null -w "%{http_code}" "https://uzg.plus${r}")
    echo "$code https://uzg.plus${r}"
  done
200 https://uzg.plus/
200 https://uzg.plus/login
200 https://uzg.plus/dashboard
200 https://uzg.plus/enta
200 https://uzg.plus/enta/onboarding
200 https://uzg.plus/enta/me
200 https://uzg.plus/chat
200 https://uzg.plus/wallet
200 https://uzg.plus/settings
200 https://uzg.plus/connections
200 https://uzg.plus/compose
200 https://uzg.plus/profile/me
200 https://uzg.plus/u-reward
```

13/13 routes return 200 SPA shell. Customer impact during deploy: zero (CSS+JS bundle swap, no API change).

## §5 Pass/fail summary

| Verification check | Method | Result |
|---|---|---|
| Build passes | `vite build` local | PASS 7.59s |
| KL-05 dual-tree byte-identical | `diff -q` 8 files | PASS |
| Production CSS bundle changed (new hash) | `curl + grep` | PASS index-BiG9q8R8.css |
| ErrorBoundary CSS marker LIVE | `curl + grep` | PASS 3 hits |
| No global body{overflow:hidden} | `curl + grep negative` | PASS empty |
| KL-028 routes 200 | `curl + status` | PASS 13/13 |
| Cloudflare deploy success | `gh run view` | PASS run 25265628575 |
| Real-browser scroll behavior | NTS manual verify | HANDED OFF |
| /enta Wheel hero pixel render | NTS manual verify | HANDED OFF |
| Wizard click-flow | NTS manual verify | HANDED OFF |

## §6 What changes if NTS verify finds the fix did NOT solve the symptom?

If NTS reports `/dashboard` is STILL scroll-locked after this deploy:
- Hypothesis A is wrong → rollback PR #120 + dig deeper
- Likely next suspect: another `useEffect` with `document.body.style.overflow` somewhere else (search all `*.jsx` for `body.style.overflow` patterns)
- Backup: revert to pre-Sprint-Fix-3 keystone state (PR #114 revert) — temporarily removes lightbox feature but restores scroll baseline

If NTS reports `/enta` is STILL blank after this deploy:
- Bug B was H7 (component crash), not H6 (scroll lock consequence) → ErrorBoundary should now render the fallback message instead of pure blank → confirms the boundary is working, then investigate the throw cause
- Bug B was a different cause not yet hypothesized → escalate Opus for deeper analysis

CLAC1 standing by for NTS verification feedback. Emergency rollback procedure documented in audit log.
