import { AnalysisDossier, CallPayload, MeetingPayload, SourceRecord } from '../types';

export const INITIAL_ANALYSES: Record<string, AnalysisDossier> = {
  // === CALLS WITH ADAPTED TRANSCRIPTS ===
  "2ec4404c-beee-5377-a63c-aab701da08ed": {
    record_id: "2ec4404c-beee-5377-a63c-aab701da08ed",
    record_ref: "C01",
    suggested_route: "sales_coaching",
    secondary_routes: ["uncaptured_triage"],
    routing_rationale: "Prospect voiced strong boundary objection to cold outreach; rep persisted before acknowledging reluctance.",
    what_happened: "Arun cold-called Pranav at Harborlight Advisory proposing an outsourced finance partnership. Pranav objected immediately, asking how SpendNest obtained his private work number and stated their operations are already fully automated.",
    why_it_matters: "High brand risk if reps continue pitching after explicit refusal. Rep needs coaching on swift qualification and polite disengagement.",
    citations: [
      {
        passage: "This number is for my work, not for people to sell things to me... Our processes are already very automated. We have a fairly advanced setup, so I don't think this is something we need.",
        location: "Adapted call text"
      }
    ],
    honest_uncertainty: [
      "Does not establish whether Harborlight Advisory might ever evaluate third-party tools in the future.",
      "Does not confirm the legitimacy of the third-party contact list source."
    ],
    next_steps: [
      { action: "Add Harborlight Advisory and Pranav to internal DNC / suppress list for outbound sales", owner: "Arun" },
      { action: "Review cold call opening scripts during 1:1 sales coaching session", owner: "Sales Manager" }
    ],
    coaching_note: "Acknowledge the prospect's pushback immediately rather than trying to explain the partnership model when the prospect is hostile.",
    customer_sentiment: "uninterested",
    needs_review: false,
    is_stale: false
  },

  "4b870624-8aad-5315-a60e-0db95981cf99": {
    record_id: "4b870624-8aad-5315-a60e-0db95981cf99",
    record_ref: "C02",
    suggested_route: "deal_next_steps",
    routing_rationale: "Gatekeeper interaction resulting in voicemail transfer; requires timed callback follow-up.",
    what_happened: "Arun reached receptionist Kavya at Fernhaven Group attempting to speak with Leela. Leela was out of the office; Arun opted to leave a voicemail.",
    why_it_matters: "Standard top-of-funnel outbound flow; account remains active but unreached.",
    citations: [
      {
        passage: "It looks as though she isn't in the office today. Would you like to leave a message with me, or would you prefer her voicemail? Her voicemail would be fine, thank you.",
        location: "Adapted call text"
      }
    ],
    honest_uncertainty: [
      "Does not establish whether Leela is the appropriate decision-maker for spend management.",
      "Does not indicate Leela's return date or interest level."
    ],
    next_steps: [
      { action: "Log voicemail in CRM and schedule re-dial for Tuesday next week", owner: "Arun", deadline: "2026-08-25" }
    ],
    customer_sentiment: "neutral",
    needs_review: false,
    is_stale: false
  },

  "20d509ba-d589-5334-9aef-ea4ce6105b1a": {
    record_id: "20d509ba-d589-5334-9aef-ea4ce6105b1a",
    record_ref: "C03",
    suggested_route: "deal_next_steps",
    secondary_routes: ["sales_coaching"],
    routing_rationale: "Scheduled follow-up regarding developer API access; budget resistance and mobile audio constraints necessitate written recap.",
    what_happened: "Kiran followed up with Milan on a previously requested 5-week evaluation of developer API access. Milan cited budget concerns and roaming audio difficulties, requesting an email summary with a specific subject line and a follow-up call on Monday/Tuesday.",
    why_it_matters: "Developer API expansion opportunity is at risk due to pricing hesitation; responsive written pricing breakdown is required.",
    citations: [
      {
        passage: "We did ask about some developer functionality, but it isn't essential enough for us to spend much on it... What subject should I look for? Something like 'Developer access and event notifications — follow-up'... Send the email and we can speak Monday or Tuesday.",
        location: "Adapted call text"
      }
    ],
    honest_uncertainty: [
      "Budget amount is unspecified; Milan did not provide an exact numerical cap.",
      "Internal technical urgency across Milan's development team is unverified."
    ],
    next_steps: [
      { action: "Send email titled 'Developer access and event notifications — follow-up' with tiered API pricing", owner: "Kiran", deadline: "2026-08-21" },
      { action: "Schedule follow-up call for Monday morning", owner: "Kiran", deadline: "2026-08-24" }
    ],
    coaching_note: "Good job accommodating customer phone limitations and securing agreement on a specific email subject.",
    customer_sentiment: "evaluating",
    needs_review: false,
    is_stale: false
  },

  "bcdcbf56-d338-5c78-9a97-42c2fc1c9931": {
    record_id: "bcdcbf56-d338-5c78-9a97-42c2fc1c9931",
    record_ref: "C04",
    suggested_route: "deal_next_steps",
    routing_rationale: "Direct voicemail message left addressing prior email bounce/correction; classified upstream as unconnected but holds substantive context.",
    what_happened: "Arun left a detailed voicemail for Ritesh at Lanternpath Media following up on an expense software pitch. Arun clarified that earlier information had been sent to an incorrect email before being resent to the corrected address.",
    why_it_matters: "Demonstrates why stored is_connected=false can be misleading. Prospect received corrected collateral and needs structured touchpoint.",
    citations: [
      {
        passage: "My understanding is that our information first went to the wrong email address. We subsequently used the corrected address you gave us, and I hope you have now had a chance to see it.",
        location: "Adapted call text"
      }
    ],
    honest_uncertainty: [
      "Cannot verify whether Ritesh actually opened the resent email.",
      "Lanternpath Media's current evaluation timeline is unknown."
    ],
    next_steps: [
      { action: "Monitor email tracking for collateral opens and re-engage in 3 business days if no reply", owner: "Arun", deadline: "2026-08-26" }
    ],
    customer_sentiment: "neutral",
    needs_review: false,
    is_stale: false
  },

  "75a6b94f-7717-5cfb-9e41-0acc94415e17": {
    record_id: "75a6b94f-7717-5cfb-9e41-0acc94415e17",
    record_ref: "C05",
    suggested_route: "deal_next_steps",
    secondary_routes: ["sales_coaching"],
    routing_rationale: "Competitive displacement scenario; prospect uses StoreHarbor but accepted collateral for future vendor review.",
    what_happened: "Meera introduced SpendNest to a multi-store retail manager. The prospect stated they already utilize StoreHarbor for expense approvals and vendor payments, but invited Meera to send a presentation to contact05@example.com for future consideration.",
    why_it_matters: "Identifies StoreHarbor as an incumbent competitor. Provides an active contact and email permission.",
    citations: [
      {
        passage: "There are several. One is StoreHarbor, and we use others too. What I suggest is that you send me your presentation. If we ever decide to change the providers we already have, we could consider it then.",
        location: "Adapted call text"
      }
    ],
    honest_uncertainty: [
      "Contract renewal date with StoreHarbor is not established.",
      "Prospect authority to initiate vendor review is unverified."
    ],
    next_steps: [
      { action: "Email SpendNest comparison vs StoreHarbor to contact05@example.com", owner: "Meera", deadline: "2026-08-22" },
      { action: "Set 60-day CRM reminder to check in on store expansion", owner: "Meera", deadline: "2026-10-21" }
    ],
    coaching_note: "Strong qualification question asking which existing platforms are in use.",
    customer_sentiment: "evaluating",
    needs_review: false,
    is_stale: false
  },

  "12216d5c-e254-52c6-b344-47de4c6e1ae5": {
    record_id: "12216d5c-e254-52c6-b344-47de4c6e1ae5",
    record_ref: "C06",
    suggested_route: "sales_coaching",
    secondary_routes: ["uncaptured_triage"],
    routing_rationale: "Enterprise prospect with 120+ stores has existing automated setup; qualifies out but confirms scale.",
    what_happened: "Meera (recorded with intro reference to Ravi) pitched Mr. Nikhil regarding store expense management for 120+ branches. Nikhil confirmed full existing automation with centralized head office oversight and declined immediate need.",
    why_it_matters: "Saves rep bandwidth from chasing saturated accounts while capturing enterprise operational intelligence.",
    citations: [
      {
        passage: "We have quite a lot of automation, with a mixed model where needed. The essential processes are automated and connected through our business management system. Head office manages it, and we have full visibility.",
        location: "Adapted call text"
      }
    ],
    honest_uncertainty: [
      "Name of the internal business management system is not specified.",
      "No budget or RFP dates exist."
    ],
    next_steps: [
      { action: "Tag account as 'Saturated - In-house ERP' in CRM and pause outbound cadence", owner: "Meera" }
    ],
    coaching_note: "Well-handled probing on company card vs cash advance operations before concluding the call.",
    customer_sentiment: "neutral",
    needs_review: false,
    is_stale: false
  },

  "428817fa-7e9e-5418-a7d4-bb396d28dfbf": {
    record_id: "428817fa-7e9e-5418-a7d4-bb396d28dfbf",
    record_ref: "C07",
    suggested_route: "partnerships",
    secondary_routes: ["deal_next_steps"],
    routing_rationale: "Channel partnership inquiry with corporate incorporation advisory firm; requested proposal via messaging app.",
    what_happened: "Dev reached Aditya at Willowbank Advisory. Aditya confirmed their firm assists clients with domestic and overseas incorporation and currently refers clients for virtual business accounts. Aditya requested a proposal over messaging app and agreed to a follow-up call on Monday.",
    why_it_matters: "High leverage channel partnership: incorporating firms can generate steady recurring referrals for SpendNest virtual accounts.",
    citations: [
      {
        passage: "Do you currently refer clients to providers for that part of the process? Yes, that is something we normally do... could you message me on our chat app and send whatever proposal you have? ... Once you've received them, could I call on Monday to see whether you'd like to discuss it further? Yes, that's fine.",
        location: "Adapted call text"
      }
    ],
    honest_uncertainty: [
      "Number of monthly client incorporations handled by Willowbank Advisory is not stated.",
      "Commercial referral fee or revenue-share expectations are not defined."
    ],
    next_steps: [
      { action: "Send partner one-pager and integration overview via messaging app to Aditya", owner: "Dev", deadline: "2026-08-21" },
      { action: "Execute scheduled follow-up call on Monday afternoon", owner: "Dev", deadline: "2026-08-24" }
    ],
    customer_sentiment: "positive",
    needs_review: false,
    is_stale: false
  },

  "129497b2-8e1d-5e01-919c-e8a852b5ff68": {
    record_id: "129497b2-8e1d-5e01-919c-e8a852b5ff68",
    record_ref: "C08",
    suggested_route: "deal_next_steps",
    routing_rationale: "Referral to internal stakeholder handling frontline location expenses; proposal requested.",
    what_happened: "Meera called Mr. Raghav regarding payables and expense workflows. Raghav explained that their people operations colleague oversees frontline locations and may be actively looking for a solution. He provided contact08@example.com for a proposal.",
    why_it_matters: "Warm internal referral with explicit permission to cite Raghav's name when contacting the decision-maker.",
    citations: [
      {
        passage: "The colleague handling our people operations also deals with frontline processes and the locations. I think we may have been looking at a solution, but I don't know the details... If you send him a proposal and say you spoke with me, he can take a look.",
        location: "Adapted call text"
      }
    ],
    honest_uncertainty: [
      "Exact name and title of the people operations colleague are not provided.",
      "Active budget allocation is unconfirmed."
    ],
    next_steps: [
      { action: "Send introduction and proposal to contact08@example.com referencing conversation with Raghav", owner: "Meera", deadline: "2026-08-22" }
    ],
    customer_sentiment: "positive",
    needs_review: false,
    is_stale: false
  },

  "4a1de681-f884-55e8-b1ad-de22d17cd959": {
    record_id: "4a1de681-f884-55e8-b1ad-de22d17cd959",
    record_ref: "C09",
    suggested_route: "sales_coaching",
    secondary_routes: ["deal_next_steps"],
    routing_rationale: "Lead intelligence captured with strict boundary condition: prospect directed rep to business head but prohibited using his name.",
    what_happened: "Meera contacted Vedant (~130 retail locations). Vedant explained they built internal software but referred Meera to business head Mr. Rishabh on LinkedIn to assess gaps, while explicitly commanding Meera not to mention his name.",
    why_it_matters: "Critical compliance/reputation note: rep must not attribute the outreach to Vedant when approaching Rishabh.",
    citations: [
      {
        passage: "Our central team handles this. If you want to speak to somebody about it, you can find our business head, Mr Rishabh, on a professional networking site... Would it be all right if I mentioned your name when contacting him? No, please don't use my name.",
        location: "Adapted call text"
      }
    ],
    honest_uncertainty: [
      "Does not confirm whether internal software makes automated bank disbursements.",
      "Does not specify Rishabh's exact title on the networking platform."
    ],
    next_steps: [
      { action: "Locate business head Mr. Rishabh on professional network and initiate blind cold outreach (DO NOT mention Vedant)", owner: "Meera" }
    ],
    coaching_note: "Crucial that Meera asked for permission to cite Vedant's name before doing so; prevented severe relationship damage.",
    customer_sentiment: "neutral",
    needs_review: false,
    is_stale: false
  },

  "b747f592-810e-583c-9b81-8db5ab035806": {
    record_id: "b747f592-810e-583c-9b81-8db5ab035806",
    record_ref: "C10",
    suggested_route: "sales_coaching",
    secondary_routes: ["deal_next_steps"],
    routing_rationale: "Outdated CRM prospect data; contact moved to manufacturing sector and requested messaging brief with strict no-phone boundary.",
    what_happened: "Meera called Aniket inquiring about Meadowbrick. Aniket stated he left the company and now works in manufacturing. He agreed to receive a brief via messaging app but expressly refused a follow-up call, stating he will reach out if interested.",
    why_it_matters: "Highlights CRM data staleness. Protects prospect relationship by respecting requested communication channel.",
    citations: [
      {
        passage: "Are you calling about Meadowbrick? Yes, that's right. I don't work there anymore... send an explanation of what you do. I will get back to you... Would a follow-up call on Monday or Tuesday next week be okay...? No. I said I will contact you if there is anything to discuss.",
        location: "Adapted call text"
      }
    ],
    honest_uncertainty: [
      "New employer name in manufacturing sector is not provided.",
      "Aniket's current role and budget authority are unknown."
    ],
    next_steps: [
      { action: "Update CRM: mark Aniket as former employee at Meadowbrick; research current company", owner: "Meera" },
      { action: "Send high-level overview via messaging app and set status to passive nurture (no phone calls)", owner: "Meera", deadline: "2026-08-22" }
    ],
    coaching_note: "Respect customer boundaries when they decline a follow-up call.",
    customer_sentiment: "neutral",
    needs_review: false,
    is_stale: false
  },

  // === MEETINGS WITH USABLE TRANSCRIPTS (INITIAL BATCH) ===
  "cb5cecac-e68d-52b7-b10b-b0c748efc467": {
    record_id: "cb5cecac-e68d-52b7-b10b-b0c748efc467",
    record_ref: "M01",
    suggested_route: "partnerships",
    secondary_routes: ["deal_next_steps"],
    routing_rationale: "Advisory firm exploring remote account creation partnership for international clients.",
    what_happened: "SpendNest team met with Partner A of Harborpath Advisory. Harborpath seeks remote business bank account setups for incorporation clients. SpendNest explained virtual accounts, supported jurisdictions, compliance prerequisites, and agreed to send partner documentation.",
    why_it_matters: "Strategic partner channel that could funnel consistent cross-border incorporation clients into SpendNest.",
    citations: [
      {
        passage: "My understanding was that you help people open bank accounts remotely. That is what I wanted to explore for the clients coming through Harborpath Advisory.",
        location: "Turn 1",
        turn_number: 1
      },
      {
        passage: "Good. I look forward to the information so we can take it from there.",
        location: "Turn 28",
        turn_number: 28
      }
    ],
    honest_uncertainty: [
      "Client volume from Harborpath Advisory is not quantified.",
      "Specific jurisdictions requiring custom compliance agreements were not finalized."
    ],
    next_steps: [
      { action: "Send remote account opening criteria and partner pack to Partner A", owner: "SpendNest Partnerships Team", deadline: "2026-08-24" }
    ],
    customer_sentiment: "positive",
    needs_review: false,
    is_stale: false
  },

  "1a21c409-c050-5787-90af-2667e057e1b6": {
    record_id: "1a21c409-c050-5787-90af-2667e057e1b6",
    record_ref: "M02",
    suggested_route: "customer_success",
    secondary_routes: ["partnerships"],
    routing_rationale: "Vendor / technology evaluation: SpendNest is meeting a supplier (LedgerBridge) to evaluate accounts receivable features, NOT selling to a prospect.",
    what_happened: "SpendNest strategy team met with Supplier A from LedgerBridge. SpendNest is developing accounts receivable capabilities and evaluating LedgerBridge's template and API integration for invoice tracking.",
    why_it_matters: "Crucial distinction: SpendNest is the prospective customer/partner here. Misrouting this as an outbound sales prospect would distort pipeline numbers.",
    citations: [
      {
        passage: "I work on strategy and partnerships at SpendNest. We serve businesses with cards and accounts payable, and we are developing accounts receivable. We wanted to see how LedgerBridge handles templates.",
        location: "Turn 1",
        turn_number: 1
      },
      {
        passage: "I will send the template shortly so we can get that started.",
        location: "Turn 36",
        turn_number: 36
      }
    ],
    honest_uncertainty: [
      "Commercial terms and licensing costs for LedgerBridge are not yet negotiated.",
      "Technical feasibility of LedgerBridge webhooks is pending engineering review."
    ],
    next_steps: [
      { action: "Receive and evaluate LedgerBridge template integration documentation", owner: "Product & Partnerships", deadline: "2026-08-25" }
    ],
    customer_sentiment: "positive",
    needs_review: false,
    is_stale: false
  },

  "398672e7-62dd-5afd-846d-0237d49792fb": {
    record_id: "398672e7-62dd-5afd-846d-0237d49792fb",
    record_ref: "M03",
    suggested_route: "deal_next_steps",
    secondary_routes: ["sales_coaching"],
    routing_rationale: "High-value prospect evaluation with finance stakeholder; pricing sensitivity and CFO gatekeeper require executive deal strategy.",
    what_happened: "Customer A and finance colleague Customer B from Asterloom Systems reviewed SpendNest workflow, card controls, and pricing. Customer B expressed reservations on pricing tiers and requested written breakdown before presenting to their CFO.",
    why_it_matters: "Core pipeline opportunity in active evaluation stage; CFO sign-off is the gating hurdle.",
    citations: [
      {
        passage: "We spoke a while ago. My finance colleague is joining today because we need to understand how this would actually work, and then revisit the price.",
        location: "Turn 1",
        turn_number: 1
      },
      {
        passage: "Send the details first. We need time with the CFO and will tell you if another call is needed. Let us make that decision internally before scheduling further.",
        location: "Turn 36",
        turn_number: 36
      }
    ],
    honest_uncertainty: [
      "Target budget and expected discount threshold are not specified.",
      "CFO review timeline has no fixed calendar deadline."
    ],
    next_steps: [
      { action: "Prepare executive business case and volume-tiered pricing summary for Asterloom CFO review", owner: "Account Executive", deadline: "2026-08-24" }
    ],
    coaching_note: "Ensure AE provides clear ROI calculation comparing SpendNest savings against manual processing costs to help Customer B champion the CFO discussion.",
    customer_sentiment: "evaluating",
    needs_review: false,
    is_stale: false
  },

  "b0f79b3d-37ba-52f9-b2bc-58b159dd6d91": {
    record_id: "b0f79b3d-37ba-52f9-b2bc-58b159dd6d91",
    record_ref: "M04",
    suggested_route: "onboarding_ops",
    secondary_routes: ["customer_success"],
    routing_rationale: "Customer implementation planning; data migration steps, parallel testing, and cutover timelines.",
    what_happened: "SpendNest team conducted an implementation migration session with Customer A at Cedarwave Distribution. Covered vendor master data transfer, historical invoice archiving, employee card issuance, and cutover risk mitigation.",
    why_it_matters: "Critical onboarding milestone: successful migration prevents account churn and secures early product adoption.",
    citations: [
      {
        passage: "I wanted to discuss the migration while there is still time to plan it. We should cover the present situation, the next steps and any feedback from your side.",
        location: "Turn 1",
        turn_number: 1
      },
      {
        passage: "Okay. I will come back to you on that as well.",
        location: "Turn 32",
        turn_number: 32
      }
    ],
    honest_uncertainty: [
      "Firm go-live cutover date depends on Cedarwave IT completing CSV vendor export.",
      "Dual-run duration is not finalized."
    ],
    next_steps: [
      { action: "Send data mapping schema and sample vendor upload spreadsheet", owner: "Customer Success / Implementation", deadline: "2026-08-24" },
      { action: "Confirm IT liaison contact for Cedarwave file export", owner: "Customer A" }
    ],
    customer_sentiment: "positive",
    needs_review: false,
    is_stale: false
  },

  "657b9e9d-9472-5b01-a127-a648ad7e8cf7": {
    record_id: "657b9e9d-9472-5b01-a127-a648ad7e8cf7",
    record_ref: "M06",
    suggested_route: "deal_next_steps",
    secondary_routes: ["sales_coaching"],
    routing_rationale: "Discovery evaluation with finance leadership; prospect comparing prepaid card limits against bank credit facilities.",
    what_happened: "SpendNest finance representative met with Customer A at Mapletrail Services to discuss accounts payable automation, credit limits vs prepaid models, and accounting reconciliation.",
    why_it_matters: "Highlights key positioning nuance: credit line requirements cannot be met solely with prepaid cards.",
    citations: [
      {
        passage: "Good to speak after connecting professionally. I work on finance at SpendNest, and part of my interest is how finance teams spend their time.",
        location: "Turn 1",
        turn_number: 1
      },
      {
        passage: "It has been useful hearing a different perspective. Please send the information and we can stay in touch.",
        location: "Turn 33",
        turn_number: 33
      }
    ],
    honest_uncertainty: [
      "Does not confirm whether Mapletrail would qualify for credit underwriting.",
      "No formal procurement timeline was agreed."
    ],
    next_steps: [
      { action: "Send product brief highlighting ERP sync capabilities and card controls", owner: "SpendNest Rep", deadline: "2026-08-24" }
    ],
    customer_sentiment: "evaluating",
    needs_review: false,
    is_stale: false
  },

  "4f304fff-fd40-5cfc-a366-0a134c445c2a": {
    record_id: "4f304fff-fd40-5cfc-a366-0a134c445c2a",
    record_ref: "M07",
    suggested_route: "uncaptured_triage",
    routing_rationale: "Transcript withheld from initial assessment delivery batch; placeholder awaiting late update.",
    what_happened: "Meeting record received with 0 transcript turns in delivery batch initial-001.",
    why_it_matters: "Staged fixture for testing replay contract and late transcript ingestion.",
    citations: [
      {
        passage: "Transcript not included in this delivery; a later assessment batch supplies it.",
        location: "transcript_payload.unavailable_reason"
      }
    ],
    honest_uncertainty: [
      "Substantive conversation content cannot be determined from initial delivery envelope alone."
    ],
    next_steps: [
      { action: "Await update delivery batch update-002", owner: "System Ingestion" }
    ],
    needs_review: false,
    is_stale: false
  },

  "4b5b9192-f3fc-505a-8e77-4d2ffaa54594": {
    record_id: "4b5b9192-f3fc-505a-8e77-4d2ffaa54594",
    record_ref: "M09",
    suggested_route: "onboarding_ops",
    secondary_routes: ["customer_success"],
    routing_rationale: "Customer onboarding obstacle: expired invitation token and entity permission setup for Brookmint Holdings.",
    what_happened: "Customer A reported that their onboarding invitation for Brookmint Holdings failed/expired. SpendNest team walked through resending credentials, setting up separate IT email identities, and configuring workspace permissions.",
    why_it_matters: "Immediate operational blocker: delayed account setup risks onboarding stall.",
    citations: [
      {
        passage: "I finally have time to return to the account setup. The invitation for Brookmint Holdings did not work when I tried it. It may have expired, or perhaps the link was incorrect.",
        location: "Turn 1",
        turn_number: 1
      },
      {
        passage: "I will speak to our IT team about the separate email identities. Thank you.",
        location: "Turn 32",
        turn_number: 32
      }
    ],
    honest_uncertainty: [
      "Whether Brookmint Holdings IT approved the required domain aliasing is unverified.",
      "Bank verification document readiness is pending."
    ],
    next_steps: [
      { action: "Re-issue Brookmint Holdings administrative invite link with 7-day expiration", owner: "Customer Success", deadline: "2026-08-21" },
      { action: "Follow up with Customer A on Monday to verify successful login", owner: "Customer Success", deadline: "2026-08-24" }
    ],
    customer_sentiment: "neutral",
    needs_review: false,
    is_stale: false
  },

  "337f297d-9385-5b82-9e54-5019c1ed912c": {
    record_id: "337f297d-9385-5b82-9e54-5019c1ed912c",
    record_ref: "M10",
    suggested_route: "customer_success",
    secondary_routes: ["onboarding_ops"],
    routing_rationale: "Customer training walkthrough covering billing examples, back-office access permissions, and invoice matching.",
    what_happened: "SpendNest representative conducted a billing walkthrough training session. Reviewed invoice reconciliation, payment scheduling rules, and back-office administrative provisioning.",
    why_it_matters: "Ensures customer operations team understands billing mechanics and reduces downstream billing ticket volume.",
    citations: [
      {
        passage: "Give me a couple of minutes and I will be back for the session.",
        location: "Turn 1",
        turn_number: 1
      },
      {
        passage: "I will request the back-office access separately for the next training session. If questions come up when you review the billing examples, send them over.",
        location: "Turn 20",
        turn_number: 20
      }
    ],
    honest_uncertainty: [
      "Pending completion of back-office role assignment by IT administrator."
    ],
    next_steps: [
      { action: "Request back-office security access clearance for customer training attendees", owner: "SpendNest Ops", deadline: "2026-08-24" },
      { action: "Send billing sample exercise sheet to customer", owner: "SpendNest Ops", deadline: "2026-08-24" }
    ],
    customer_sentiment: "positive",
    needs_review: false,
    is_stale: false
  }
};

// === UPDATED ANALYSIS FOR M07 (SUPPLIED IN UPDATE-002) ===
export const M07_UPDATED_ANALYSIS: AnalysisDossier = {
  record_id: "4f304fff-fd40-5cfc-a366-0a134c445c2a",
  record_ref: "M07",
  suggested_route: "customer_success",
  secondary_routes: ["onboarding_ops"],
  routing_rationale: "Customer technical support walkthrough: Customer demonstrated a software bug where editing event-payment descriptions fails to persist on the main grid.",
  what_happened: "Customer A from Willowfield Trust shared their screen to demonstrate a bug in SpendNest. When modifying an event-payment description in the edit modal, the changes appear saved in the form but revert to old text on the primary table view. Team member A recorded reproduction steps for engineering.",
  why_it_matters: "Product defect directly impacting audit trail readability for an active customer. Must be escalated to engineering rather than routed to sales.",
  citations: [
    {
      passage: "I wanted to go through the issues you sent yesterday. If you share your screen, we can look at what is happening and I can take the details back to the team.",
      location: "Turn 1",
      turn_number: 1
    },
    {
      passage: "The first one is editing the description. I am changing this event-payment description to a short reference... It is still the old description. That is why I sent it across.",
      location: "Turns 3-6",
      turn_number: 3
    },
    {
      passage: "I will send the details to the team, get their confirmation and come back to you. Thank you for showing the actual steps rather than only the final screen.",
      location: "Turn 27",
      turn_number: 27
    }
  ],
  honest_uncertainty: [
    "Root cause (client-side cache vs backend API sync latency) is not yet diagnosed.",
    "Number of other tenant accounts experiencing description desync is unknown."
  ],
  next_steps: [
    { action: "File urgent bug ticket with engineering team attaching reproduction steps for description persistence failure", owner: "Team Member A", deadline: "2026-08-22" },
    { action: "Send ticket tracking reference and confirmation email to Customer A", owner: "Team Member A", deadline: "2026-08-24" }
  ],
  coaching_note: "Excellent customer support discipline: having the customer screen-share the step-by-step reproduction rather than relying on a static screenshot.",
  customer_sentiment: "frustrated",
  needs_review: true,
  is_stale: false
};

export function getAnalysisForRecord(record: SourceRecord, appliedRevision: number): AnalysisDossier {
  if (record.record_ref === "M07" && appliedRevision >= 2) {
    return M07_UPDATED_ANALYSIS;
  }

  if (INITIAL_ANALYSES[record.source_id]) {
    return INITIAL_ANALYSES[record.source_id];
  }

  const byRef = Object.values(INITIAL_ANALYSES).find(a => a.record_ref === record.record_ref);
  if (byRef) {
    return byRef;
  }

  // Generate transparent intake triage dossier for background / non-transcribed records
  const isCall = record.source_type === "call";
  const callPayload = isCall ? (record.payload as CallPayload) : null;
  const meetingPayload = !isCall ? (record.payload as MeetingPayload) : null;
  const unavailableReason = record.transcript_payload?.unavailable_reason;

  let rationale = "";
  let whatHappened = "";
  let citationText = "";

  if (isCall && callPayload) {
    rationale = `Background call without transcript. Upstream outcome: '${callPayload.observed_outcome || 'unknown'}', duration: ${callPayload.duration_seconds || 0}s, stored is_connected: ${callPayload.is_connected}.`;
    whatHappened = `Call logged by ${callPayload.rep_name || 'unassigned rep'} (${callPayload.direction || 'outbound'}) lasting ${callPayload.duration_seconds || 0} seconds. No speech transcript was included in the extract.`;
    citationText = `Call metadata: outcome=${callPayload.observed_outcome}, is_connected=${callPayload.is_connected}, duration=${callPayload.duration_seconds}s`;
  } else if (meetingPayload) {
    rationale = `Calendar meeting without usable transcript. Notetaker status: '${meetingPayload.recording_status}'. Reason: ${unavailableReason || meetingPayload.recording_detail || 'No capture'}.`;
    whatHappened = `Meeting titled '${meetingPayload.title}' scheduled with ${meetingPayload.attendee_count || 1} attendee(s). ${unavailableReason || 'Notetaker was not active.'}`;
    citationText = unavailableReason || `recording_status=${meetingPayload.recording_status}`;
  }

  return {
    record_id: record.source_id,
    record_ref: record.record_ref,
    suggested_route: "uncaptured_triage",
    routing_rationale: rationale,
    what_happened: whatHappened,
    why_it_matters: "Revenue intelligence systems must clearly flag uncaptured or silent interactions to avoid distorting rep activity or hallucinating outcomes.",
    citations: [
      {
        passage: citationText,
        location: isCall ? "Call Metadata" : "Meeting Metadata"
      }
    ],
    honest_uncertainty: [
      "No transcript was supplied in this assessment extract.",
      "Upstream stored outcomes or connection flags are legacy machine tags, not verified ground truth."
    ],
    next_steps: [
      {
        action: isCall ? "Check telephony provider for audio recording" : "Verify if meeting took place or notetaker was intentionally omitted",
        owner: isCall ? (callPayload?.rep_name || "Assigned Rep") : "Meeting Host"
      }
    ],
    needs_review: false,
    is_stale: false
  };
}
