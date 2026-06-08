# Sources of truth

Provenance registry. Every fact in the content rail (`build.metrics`, `build.agenticFlow`, `build.guardrails`) carries a `source` whose `kind` is one of below. No source → rejected at build (golden rule: never invent).

| `kind` | Meaning | Example `ref` |
|---|---|---|
| `mathieu` | Stated directly by Mathieu | `"Mathieu, 2026-06"` |
| `linkedin` | LinkedIn profile (canonical) | `"https://www.linkedin.com/in/mathieucadu/"` |
| `url` | Public web page | a live link |
| `repo` | A repository | repo URL / path |
| `commit` | A specific commit | git sha |
| `dashboard` | A metrics dashboard | dashboard name + date |

## Canonical sources

- **LinkedIn** — https://www.linkedin.com/in/mathieucadu/ — authoritative for parcours, expériences, dates, titres. Not scraped automatically; facts pulled from it are recorded with `kind: "linkedin"`.

> When in doubt about a fact, ask Mathieu or cite LinkedIn. Never fill a metric/flow/guardrail from inference.
