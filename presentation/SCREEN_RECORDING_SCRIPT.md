# 3-Minute Spoken Narration Script for Screen Recording

**Time Target:** 3 minutes (180 seconds continuous recording)  
**Tone:** Confident, structured, executive sales leadership tone  
**Preparation:** Open `http://localhost:5173/` in your browser before starting the recording.

---

### Segment 1: Introduction & Manager Dashboard Overview (0:00 – 0:45)
**Screen Action:** Start on the main dashboard. Hover over the KPI cards and show the filters.

**Spoken Narration:**
> *"Hello! Today I'm walking you through the SpendNest Revenue Intelligence Inbox—a dedicated workspace designed for sales managers to turn fragmented calls, meetings, and late-arriving transcripts into actionable intelligence.*
>
> *Looking at our executive dashboard, all 44 interactions took place on a single local date: August 21st, 2026, in the Asia/Kolkata timezone. Because all activity falls on one day, a date filter alone isn't sufficient. We've built multi-dimensional filtering by sales rep, calendar organizer, and routing state.*
>
> *Notice our KPI cards: every headline metric explicitly declares its denominator. For example, our Transcript Coverage is currently 17 out of 44, or 38.6%, because initially 10 calls and 7 meetings have usable text, while 26 interactions are uncaptured dials or silent meetings. Similarly, our Source Connection Rate is 36.7%—11 connected calls out of 30 calls with non-null connection flags. We clearly distinguish this legacy machine tag from our conversational analysis."*

---

### Segment 2: One Useful Manager Workflow & Evidence Inspection (0:45 – 1:25)
**Screen Action:** Click on **`M03` (Asterloom Systems)** in the table. The drawer slides open. Show the Analysis tab, highlight the citations, and toggle to the Transcript tab to show the turns.

**Spoken Narration:**
> *"Now let's look at a core manager workflow. I'll open Asterloom Systems, record `M03`. In our dossier drawer, the manager immediately sees what happened, why it matters, honest uncertainty, and actionable next steps.*
>
> *Notice our quotation engine: every conclusion is backed by identifiable evidence. For `M03`, Customer B stated in Turn 36: 'Send the details first. We need time with the CFO and will tell you if another call is needed.' Our system extracts the stated owner—the Account Executive—and sets a next step to deliver volume pricing before Monday's CFO review, while explicitly noting that the CFO review timeline has no fixed date under Honest Uncertainty.*
>
> *Switching to the Transcript tab, we can inspect all 36 sequential speaker turns with timestamps, proving that every recommendation is traceable to source evidence."*

---

### Segment 3: One Difficult Routing Decision (1:25 – 1:55)
**Screen Action:** Close the drawer, filter by `C04` in the search bar, and open **`C04` (Lanternpath Media)**.

**Spoken Narration:**
> *"Next, let's examine a difficult routing case: call record `C04`. In the upstream telephony metadata, `C04` is labeled as 'not connected' and 'not a conversation'. A naive system would have discarded this as a failed dial.*
>
> *However, our workspace inspects the adapted transcript and discovers that Arun left a substantive 95-second voicemail resolving an earlier bounced proposal: 'My understanding is that our information first went to the wrong email address. We subsequently used the corrected address you gave us.'*
>
> *Instead of discarding it, our engine routes `C04` to Deal Next Steps and schedules a 3-day collateral tracking follow-up, demonstrating why source machine labels must never override human or conversational evidence."*

---

### Segment 4: The Assessment Replay & Idempotency Test (1:55 – 2:40)
**Screen Action:** Click **"Replay Protocol"** in the top navigation bar to open the modal. Show the live counters (44 records, 17 usable texts). Click **Step 2** (Repeat), then click **Step 3** (Override M07), then click **Step 4** (Import Update), then click **Step 5** (Re-import Initial).

**Spoken Narration:**
> *"Now, let's demonstrate the core assessment data contract through our interactive Replay Protocol.*
>
> *We start with our initial batch of 44 records and 17 usable texts. First, I repeat the import of batch 1. Notice the audit log: exactly 44 duplicate records are safely ignored, and our record count stays strictly at 44 without any count inflation.*
>
> *Next, in Step 3, as a sales manager, I manually change `M07`'s route to 'Deal Next Steps'. The system records my manual override flag.*
>
> *Now, in Step 4, we import the update delivery batch `02_update.json`. Notice what happens: `M07` is upgraded to Revision 2, its late-arriving transcript of 27 turns becomes active, and our usable transcript count rises to 18. Crucially, my manual route override 'Deal Next Steps' was strictly preserved, and the record is flagged as 'Needs Review' so the manager can inspect the new text.*
>
> *Finally, in Step 5, we re-import the initial batch again. Older Revision 1 is rejected, keeping Revision 2 and my manual override intact."*

---

### Segment 5: Manager Daily Brief, Exports & Wrap-up (2:40 – 3:00)
**Screen Action:** Close the replay modal. Click **"Manager Brief"** to display the modal for 5 seconds. Then click **"Export ZIP & Manifest"** to trigger the download.

**Spoken Narration:**
> *"To support daily executive reviews, our Manager Daily Brief synthesizes cross-rep activity, coaching priorities, and customer escalations for August 21st, 2026.*
>
> *Finally, clicking 'Export ZIP & Manifest' downloads a complete archive containing our machine-readable `manifest.json`, CSV manifest, and organized markdown dossiers categorized by route.*
>
> *Every requirement of the data contract is fully met, tested, and verifiable. Thank you!"*
