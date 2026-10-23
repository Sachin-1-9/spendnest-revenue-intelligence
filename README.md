<<<<<<< HEAD
# SpendNest Revenue Intelligence Inbox

A sales manager workspace and intelligence engine for SpendNest, transforming raw calls, meetings, transcripts, and late-arriving delivery updates into an actionable, audit-ready operational workspace.

---

## 1. Quickstart & How to Run

### Requirements
- Node.js `>= 18.0.0` (developed and tested on Node v26)
- npm `>= 9.0.0`

### Installation & Launch
```bash
# 1. Install dependencies
npm install

# 2. Launch the interactive web application
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### Headless Replay Acceptance Test
To verify the complete replay contract from your terminal without opening a browser:
```bash
npm run test:replay
```
Expected output: All 5 replay tests pass with 100% compliance.

### Generate Disk Exports
To produce the local export folder and manifest on disk:
```bash
node scripts/generate-export.js
```
Writes all 44 dossiers, `manifest.json`, and `manifest.csv` to `outputs/`.

---

## 2. Replay & Idempotency Reproduction Steps

The application strictly enforces the data contract defined in `DATA_CONTRACT.md`. You can reproduce the full assessment test either in the web application or via CLI:

### Option A: In the Interactive Web Application
1. Click **"Replay Protocol"** in the top navigation bar.
2. **Step 1 (Initial Import):** Ingests `01_initial.json`. Confirms **44 unique records** (30 calls, 14 meetings) and **17 usable transcripts**.
3. **Step 2 (Repeat Import):** Re-imports `01_initial.json`. Verifies that **44 duplicates are ignored** and record count remains strictly **44**.
4. **Step 3 (Manual Correction):** Overrides `M07`'s assigned route to `deal_next_steps` with manager rationale.
5. **Step 4 (Update Batch Ingestion):** Imports `02_update.json` (`revision: 2`). `M07`'s payload and transcript are replaced with 27 turns. Usable transcript coverage increases to **18 / 44**. `M07`'s manual route `deal_next_steps` is **strictly preserved**, and the record is flagged as `Needs Review`.
6. **Step 5 (Re-import Initial After Update):** Re-imports `01_initial.json`. Verifies that `M07` is **not downgraded** back to revision 1 (`revision 1 < revision 2` is rejected).
7. **Step 6 (Persistence Check):** Refresh your browser (or restart dev server). All state, revisions, and overrides persist via `localStorage`.

### Option B: Via Terminal CLI
Run `npm run test:replay` to execute the exact 5-step test sequence with automated assertions.

---

## 3. Metric Definitions & Explicit Denominators

Every metric displayed in the workspace explicitly defines what was counted and its scope:

| Metric | Headline Value | Explicit Denominator & Scope |
| :--- | :--- | :--- |
| **Selected-Record Activity** | **44** records (30 calls, 14 meetings) | Denominator: 44 interaction records selected for **21 August 2026** in **Asia/Kolkata (`+05:30`)**. Selected sample, not a whole-team census. |
| **Transcript Coverage (Initial)** | **17 / 44 (38.64%)** | 10 calls with non-empty `payload.transcript` + 7 meetings with non-empty `transcript_payload.turns` out of 44 total records. |
| **Transcript Coverage (Post-Update)** | **18 / 44 (40.91%)** | Increases by +1 when `M07` receives its 27 transcript turns in delivery revision 2. |
| **Source Connection Rate** | **11 / 30 (36.67%)** | Denominator: 30 calls with non-null `is_connected` flag (11 `true`, 19 `false`). Stored legacy telephony tag, distinct from transcript reality. |
| **Active Pipeline Signals** | **6** records | Count of active evaluation discussions (`M01`, `M03`, `M04`, `M06`, `C03`, `C07`). |
| **Critical Escalations** | **2** records | `M07` (software bug) and `M09` (expired invite token). |

---

## 4. Deliverables & Output Directory Structure

### In-App Downloadable Archive
Clicking **"Export ZIP & Manifest"** downloads `spendnest_revenue_inbox_export_2026-08-21.zip` containing:
- `manifest.json`: Machine-readable array containing `source_type`, `source_id`, `record_ref`, `applied_source_revision`, `routes`, `output_paths`, `processing_review_state`, `manual_override_flag`, `analysis_freshness`.
- `manifest.csv`: Matching spreadsheet CSV format.
- `manager_brief_2026-08-21.md`: Full markdown text of the daily executive brief.
- `outputs/`: Structured subdirectories categorized by route:
  - `deal_next_steps/`
  - `sales_coaching/`
  - `customer_success/`
  - `partnerships/`
  - `onboarding_ops/`
  - `uncaptured_triage/`

### Presentation Slides & Narration Script
- Presentation Slides Markdown: [`presentation/SLIDES.md`](file:///Users/sachin/Desktop/revenue-intelligence-inbox/presentation/SLIDES.md)
- Standalone HTML Slide Deck (Print to PDF via Cmd+P): [`presentation/slides.html`](file:///Users/sachin/Desktop/revenue-intelligence-inbox/presentation/slides.html)
- 3-Minute Spoken Narration Script: [`presentation/SCREEN_RECORDING_SCRIPT.md`](file:///Users/sachin/Desktop/revenue-intelligence-inbox/presentation/SCREEN_RECORDING_SCRIPT.md)

---

## 5. Pre-Generated vs. Runtime Dynamic Architecture

- **Pre-Generated Analysis Dataset (`src/data/analysisLibrary.ts` & `src/data/managerBrief.ts`):** High-fidelity, verified analyses, exact transcript turn numbers, and the August 21, 2026 Manager Daily Brief were prepared beforehand and bundled client-side. This ensures zero risk of external API downtime, rate limits, or network latency during reviewer assessment.
- **Dynamic Runtime Operations:** The batch ingestion state machine, idempotent deduplication, revision ordering, manual override preservation, multi-dimensional filtering, and ZIP archive packaging execute dynamically in the browser runtime.

---

## 6. Three Most Important Findings

### 1. Hostile Cold Call Boundary Adherence vs. Script Persistence (`C01`)
- **Verbatim Passage:** Pranav: *"This number is for my work, not for people to sell things to me... Our processes are already very automated. We have a fairly advanced setup, so I don't think this is something we need."* (Adapted call text)
- **Product Impact:** Influenced the **Sales Coaching & Enablement Rule**. Rather than counting C01 as standard outbound dial activity, the system routes it to Coaching and flags a DNC suppression action item to safeguard company brand equity.

### 2. Customer Bug Masked as Sales Meeting (`M07` Update Batch)
- **Verbatim Passage:** Customer A: *"The first one is editing the description. I am changing this event-payment description to a short reference... It is still the old description."* Team member A: *"The field still shows the earlier wording."* (Turns 3–7)
- **Product Impact:** Influenced **Dynamic Re-Routing & Stale Review State**. Although the calendar title was *"Willowfield Trust / SpendNest discussion"*, the arriving transcript proved an active customer software defect. The app preserved the manager's route while triggering an urgent engineering bug ticket workflow.

### 3. Strict Boundary on Internal Referral Name-Dropping (`C09`)
- **Verbatim Passage:** Vedant: *"If you want to speak to somebody... find our business head, Mr Rishabh... Would it be all right if I mentioned your name...? No, please don't use my name."* (Adapted call text)
- **Product Impact:** Influenced **Lead Intelligence Hygiene Warnings**. The dossier warns reps to initiate blind cold outreach to Mr. Rishabh without mentioning Vedant, protecting the internal referral relationship.

---

## 7. One Deliberately Rejected Decision

- **Deliberately Rejected Decision:** Generating automated pipeline deal values, revenue forecasts, and cross-rep performance stack rankings.
- **Why We Rejected It:** The supplied dataset contains no CRM opportunity table, deal stage directory, historical account lifetime value, or validated conversion probabilities. Fabricating pipeline totals or rep rankings based solely on conversational mentions would create deceptive revenue signals.
- **Trade-off Accepted:** The dashboard displays strictly verifiable conversation signals and stated next steps rather than speculative pipeline currency figures.

---

## 8. Approximate Time Spent & Known Limitations

- **Time Spent:** ~7 hours (comprising inspection, state machine engineering, citation mapping, UI construction, replay verification, slide deck drafting, and documentation).
- **Known Limitations:**
  1. Single-day time window (21 August 2026): all interactions occurred on one local date; multi-day trendlines cannot be established.
  2. 26 background records lack audio/transcripts; these are surfaced in intake triage rather than having fabricated summaries.
=======
# spendnest-revenue-intelligence
>>>>>>> 2647dce564e969d25e6710891d0bef9c75ace104
