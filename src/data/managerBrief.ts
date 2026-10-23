export interface BriefSection {
  title: string;
  badge?: string;
  summary: string;
  items: {
    record_ref: string;
    source_type: 'call' | 'meeting';
    headline: string;
    evidence: string;
    action_owner: string;
    priority: 'urgent' | 'high' | 'medium' | 'info';
  }[];
}

export interface ManagerDailyBrief {
  date: string;
  timezone: string;
  title: string;
  executive_summary: string;
  kpis: {
    label: string;
    value: string;
    denominator_note: string;
  }[];
  sections: BriefSection[];
}

export const MANAGER_BRIEF_2026_08_21: ManagerDailyBrief = {
  date: '2026-08-21',
  timezone: 'Asia/Kolkata (+05:30)',
  title: 'Sales & Revenue Operations Daily Brief',
  executive_summary: 'On 21 August 2026, 44 customer touchpoints were recorded across 5 phone reps and 10 calendar organizers. 18 conversations contain adapted transcripts, while 26 represent background or uncaptured interactions. Activity highlights include critical channel partnership traction with corporate incorporation firms, enterprise CFO evaluation gating Asterloom Systems, an urgent customer software defect reported during a Willowfield Trust screen-share, and key coaching observations regarding cold outbound boundary adherence.',
  kpis: [
    { label: 'Total Selected Records', value: '44', denominator_note: '30 calls + 14 meetings for 21 Aug 2026' },
    { label: 'Usable Transcripts', value: '18 / 44 (40.9%)', denominator_note: '10 calls + 8 meetings (post-update M07)' },
    { label: 'Stored Connection Rate', value: '11 / 30 (36.7%)', denominator_note: '30 calls with non-null is_connected flag' },
    { label: 'Active Pipeline Opps', value: '6', denominator_note: 'M01, M03, M04, M06, C03, C07' },
    { label: 'Critical Escalations', value: '2', denominator_note: 'M07 (software defect) and M09 (invite failure)' }
  ],
  sections: [
    {
      title: 'High-Impact Deal & Pipeline Signals',
      badge: 'Revenue Opportunities',
      summary: 'High-priority commercial developments requiring timely executive support or sales collateral.',
      items: [
        {
          record_ref: 'M03',
          source_type: 'meeting',
          headline: 'Asterloom Systems: Pricing & Workflow Evaluation for CFO Review',
          evidence: 'Customer B: "Send the details first. We need time with the CFO and will tell you if another call is needed. Let us make that decision internally before scheduling further." (Turn 36)',
          action_owner: 'Account Executive: deliver comprehensive ROI model and volume-tiered discount matrix prior to Monday CFO review.',
          priority: 'urgent'
        },
        {
          record_ref: 'M04',
          source_type: 'meeting',
          headline: 'Cedarwave Distribution: Implementation & Dual-Run Migration',
          evidence: 'Team member A: "I wanted to discuss the migration while there is still time to plan it... cover the present situation, next steps and feedback." (Turn 1)',
          action_owner: 'Implementation Team: dispatch CSV data mapping template and confirm IT liaison for vendor master file export.',
          priority: 'high'
        },
        {
          record_ref: 'C07',
          source_type: 'call',
          headline: 'Willowbank Advisory: Channel Partnership for Remote Incorporation Accounts',
          evidence: 'Aditya: "Do you currently refer clients to providers for that part of the process? Yes, that is something we normally do... message me on our chat app... call on Monday." (Adapted call text)',
          action_owner: 'Dev: transmit partner one-pager via chat app today and execute scheduled Monday callback.',
          priority: 'high'
        },
        {
          record_ref: 'M01',
          source_type: 'meeting',
          headline: 'Harborpath Advisory: Remote Bank Account Opening Channel',
          evidence: 'Partner A: "My understanding was that you help people open bank accounts remotely. That is what I wanted to explore for the clients coming through Harborpath Advisory." (Turn 1)',
          action_owner: 'Partnerships Lead: send compliance criteria and supported jurisdiction matrix to Partner A.',
          priority: 'medium'
        },
        {
          record_ref: 'C03',
          source_type: 'call',
          headline: 'Milan (Developer API Access): Budget Resistance & Roaming Audio',
          evidence: 'Milan: "We did ask about some developer functionality, but it isn\'t essential enough for us to spend much on it... send the email and we can speak Monday or Tuesday." (Adapted call text)',
          action_owner: 'Kiran: email API pricing tiers with subject line "Developer access and event notifications — follow-up" ahead of Monday call.',
          priority: 'medium'
        }
      ]
    },
    {
      title: 'Customer Success & Support Escalations',
      badge: 'Account Health',
      summary: 'Operational and software impediments discovered during client walkthroughs.',
      items: [
        {
          record_ref: 'M07',
          source_type: 'meeting',
          headline: 'Willowfield Trust: Software Bug in Event-Payment Description Persistence',
          evidence: 'Customer A: "The first one is editing the description. I am changing this event-payment description to a short reference... It is still the old description." Team member A: "The field still shows the earlier wording." (Turns 3-7)',
          action_owner: 'Team Member A / Engineering: lodge high-priority engineering bug ticket with screen-share reproduction logs.',
          priority: 'urgent'
        },
        {
          record_ref: 'M09',
          source_type: 'meeting',
          headline: 'Brookmint Holdings: Expired Onboarding Link & Multi-Entity Permissions',
          evidence: 'Customer A: "The invitation for Brookmint Holdings did not work when I tried it. It may have expired, or perhaps the link was incorrect." (Turn 1)',
          action_owner: 'Customer Success: re-issue administrative login token with extended validity and assist IT domain aliasing.',
          priority: 'high'
        },
        {
          record_ref: 'M02',
          source_type: 'meeting',
          headline: 'LedgerBridge Technology Assessment: Accounts Receivable Capabilities',
          evidence: 'Supplier A: "I will send the template shortly so we can get that started." (Turn 36). SpendNest is assessing LedgerBridge as a technology provider.',
          action_owner: 'Product Team: review incoming LedgerBridge template schema for SpendNest AR feature roadmap.',
          priority: 'medium'
        }
      ]
    },
    {
      title: 'Sales Coaching & Operational Hygiene',
      badge: 'Team Enablement',
      summary: 'Practical guidance derived from verbatim outbound call recordings.',
      items: [
        {
          record_ref: 'C01',
          source_type: 'call',
          headline: 'Arun / Harborlight Advisory: Boundary Adherence on Hostile Cold Calls',
          evidence: 'Pranav: "This number is for my work, not for people to sell things to me... Our processes are already very automated." (Adapted call text)',
          action_owner: 'Sales Manager: coach rep to disengage gracefully when prospect explicitly challenges phone source, avoiding unnecessary friction.',
          priority: 'high'
        },
        {
          record_ref: 'C09',
          source_type: 'call',
          headline: 'Meera / Vedant: Strict Boundary on Internal Referral Name Dropping',
          evidence: 'Vedant: "If you want to speak to somebody... find our business head, Mr Rishabh... Would it be all right if I mentioned your name...? No, please don\'t use my name." (Adapted call text)',
          action_owner: 'Meera: approach Mr. Rishabh via cold outbound without referencing Vedant. Commend rep for asking permission beforehand.',
          priority: 'high'
        },
        {
          record_ref: 'C10',
          source_type: 'call',
          headline: 'Meera / Aniket: Stale CRM Employer Data & Channel Discipline',
          evidence: 'Aniket: "Are you calling about Meadowbrick? ... I don\'t work there anymore... send an explanation of what you do. I will get back to you [No phone calls]." (Adapted call text)',
          action_owner: 'RevOps: update contact record to reflect manufacturing transition; observe requested messaging-only communication rule.',
          priority: 'medium'
        },
        {
          record_ref: 'C04',
          source_type: 'call',
          headline: 'Arun / Lanternpath Media: Unconnected Anomaly with Substantive Voicemail',
          evidence: 'Arun left 95s message regarding corrected email address for expense software proposal. Stored upstream as is_connected=false.',
          action_owner: 'Sales Manager: verify that reps check voicemail audio before discarding "unconnected" outbound call records.',
          priority: 'info'
        }
      ]
    },
    {
      title: 'Triage & Uncaptured Interaction Audit',
      badge: 'Data Integrity',
      summary: 'Intake audit of the 26 interactions without usable transcripts.',
      items: [
        {
          record_ref: 'M05, M08, M11',
          source_type: 'meeting',
          headline: 'Silent Recorded Meetings (Nobody Spoke)',
          evidence: 'Notetaker joined but zero audio turns detected (e.g. Pinehaven Studio, Amberleaf Health, Internal design discussion).',
          action_owner: 'Meeting Organizers: check if attendees joined late or migrated to alternative video bridge.',
          priority: 'medium'
        },
        {
          record_ref: 'M12, M14',
          source_type: 'meeting',
          headline: 'Notetaker Cancelled Prior to Meeting Start',
          evidence: 'Sample account setup and CRM demo notetakers were manually cancelled prior to scheduled start.',
          action_owner: 'Sales Operations: confirm whether customer meetings took place without recording bot.',
          priority: 'info'
        },
        {
          record_ref: 'B01-B20',
          source_type: 'call',
          headline: '20 Background Telephony Dials (Null Transcripts)',
          evidence: '19 calls not connected (short duration 3s-31s); 2 connected (B11, B14) with null speech payloads.',
          action_owner: 'Telephony Admin: verify carrier disposition synchronization.',
          priority: 'info'
        }
      ]
    }
  ]
};
