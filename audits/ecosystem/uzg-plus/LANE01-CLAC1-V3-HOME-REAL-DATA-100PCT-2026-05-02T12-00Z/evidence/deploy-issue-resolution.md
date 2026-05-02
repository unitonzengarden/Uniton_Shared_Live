# Cloudflare Deploy Issue + Resolution

## Issue

PR #96 (the actual fix) merged to main at `00942a96` on `2026-05-02T13:11:36Z`.

Cloudflare Pages deploy run `25252679812` ran for 1m6s and FAILED.

Failure log excerpt:
```
✘ A request to the Cloudflare API (/accounts/***/pages/projects/***/deployments) failed.

  Invalid commit message, it must be a valid UTF-8 string. [code: 8000111]
```

## Root cause

The PR #96 commit message was complex per task spec template:
- Multi-line (>40 lines)
- Vietnamese characters
- Em-dashes (—)
- Code blocks with backticks
- File paths

Cloudflare Pages deploy API has stricter validation than git itself — exact threshold unknown but likely combination of length + special characters.

## Resolution

Created PR #97 `chore: redeploy trigger`:
- Branch: `chore/lane01/redeploy-trigger`
- Single trivial file: `tests/lane01/audit/.deploy-marker` (empty marker)
- Commit message: `chore: redeploy trigger` (simple ASCII)
- Self-merged at `bc2953f6` on `2026-05-02T13:16:31Z`

Cloudflare Pages deploy run `25252770330` ran for 1m27s and SUCCEEDED.

Deployed bundle hash: `main-D8KCrac_.js` (different from previous `main-IJYbCyVS.js`).

Verified deployed bundle has the Phase 6 fix:
```
$ curl -s https://uzg.plus/v3/assets/main-D8KCrac_.js | grep -oE "page_size=|data\.items"
page_size
data.items
```

The fix code (PR #96) is now live on production.

## KL-064 NEW

**Cloudflare Pages deploy API rejects certain commit messages.**

Workaround: When a complex commit fails to deploy, push a follow-up trivial commit
with simple ASCII message (e.g., `chore: redeploy trigger`) to retrigger deploy on
the same code. No need to amend or rewrite history.

Future Lane_01 commits should keep messages shorter / simpler to avoid this overhead.
