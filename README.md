# Medical Vlog AI Sandbox

Shared source of truth for Claude, ChatGPT, and Kimi. One Markdown file per topic. Nothing lives anywhere else.

## RULES — read before ANY work

1. Always read `MASTER_INDEX.md` first to see current state.
2. One file per topic in `/scripts`, named `AG-<n>.md`. Never create duplicates. Next available number comes from MASTER_INDEX.
3. Every script file starts with frontmatter: `id`, `topic`, `status`, `locked`, `language`, `evidence_grade`, `next_action`, `updated` (YYYY-MM-DD).
4. Status flow: `INBOX → ACTIVE → REVIEW → APPROVED → USED → ARCHIVED`. Move only on AG's instruction.
5. If `locked: true` — do NOT edit the script body. Suggestions go in the `## Feedback` section at the bottom only.
6. After ANY write, update `MASTER_INDEX.md` in the same commit.
7. Gulf Arabic script text goes in a normal section (`## Gulf Arabic Teleprompter`), never a code block. English teleprompter text goes in a fenced code block under `## English Teleprompter`.
8. Commit messages: `AG-<n>: <what changed>` — one line, always.
9. Copy `_TEMPLATE.md` when creating a new topic.
10. NEVER put patient-identifiable information in this repo. Ever.

## Structure

- `MASTER_INDEX.md` — the board: every topic, status, next action, last update
- `scripts/AG-<n>.md` — one file per topic (script + evidence + B-roll notes)
- `scripts/_TEMPLATE.md` — copy this for new topics
