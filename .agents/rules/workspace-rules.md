# Workspace Rules

## Mandatory Pre-Push Checkpoint Rule — MANDATORY
- **Strict Command Gate**: Never run `git push` or execute any remote push actions under any circumstances unless explicitly commanded by the user.
- **Mandatory Pre-Push Checkpoint Verification**: Prior to executing any `git push` to GitHub or remote repositories, the system and developers MUST execute and pass all local checkpoints first via `pnpm run checkpoint`:
  1. **Checkpoint 1 (Unit & Regression Tests)**: Run `pnpm test` — all Vitest tests must pass 100% with zero failures.
  2. **Checkpoint 2 (Production Build)**: Run `pnpm run build` — Next.js and OpenNext production build must compile cleanly without errors.
  3. **Checkpoint 3 (Heavy Media Exclusion)**: Verify `.gitignore` excludes heavy media files (`.mov`, `.mp4`, `.zip`, `.wav`, `.db`).
  4. **Checkpoint 4 (Zero Emojis Standard)**: Verify zero emojis exist in commits, codebase, or UI messages.
  5. **Checkpoint 5 (Push Buffer Setup)**: Ensure `git config http.postBuffer 524288000` is configured.
- **Strict Abort on Failure**: If any checkpoint fails, the push MUST be aborted immediately and the failure fixed before attempting to push again.

## Never Write README Rule — MANDATORY
- Strictly NEVER create, write, generate, or restore `README.md` or any README documentation files in this repository.
- Keep the repository clean of README files under all circumstances.

## Brand & Security Rule — MANDATORY
- Application brand is strictly **SHILIAIWEI**.
- Prohibit hardcoded private tokens, credentials, or `.env` secrets in tracked files.
- Enable GitHub Secret Scanning, Push Protection, and Branch Protection on `main`.
