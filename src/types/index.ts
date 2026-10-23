export type SourceType = 'call' | 'meeting';

export type RouteCategory = 
  | 'deal_next_steps'
  | 'sales_coaching'
  | 'customer_success'
  | 'partnerships'
  | 'onboarding_ops'
  | 'uncaptured_triage';

export interface CallPayload {
  id: string;
  external_call_id: string;
  workspace_slug: string;
  rep_email: string | null;
  rep_name: string | null;
  rep_user_id: string | null;
  direction: string;
  direction_raw: string;
  from_number: string | null;
  to_number: string | null;
  started_at: string;
  duration_seconds: number;
  talk_time_seconds: number | null;
  speaker_count: number | null;
  segment_count: number | null;
  is_connected: boolean | null;
  is_conversation: boolean | null;
  observed_outcome: string | null;
  classification_reason: string | null;
  classification_status: string | null;
  is_campaign_call: boolean | null;
  first_dial_ever: boolean | null;
  first_connect_ever: boolean | null;
  prior_dials_ever: number | null;
  prior_connects_ever: number | null;
  summary: string | null;
  summary_status: string | null;
  transcript: string | null;
}

export interface MeetingPayload {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  duration_seconds: number;
  provider: string;
  join_url: string;
  organizer_email: string | null;
  attendee_count: number | null;
  recording_status: string;
  recording_detail: string | null;
  recording_id: string | null;
  has_transcript: boolean;
  has_video: boolean;
  summary: string | null;
  summary_status: string | null;
  redacted: boolean;
}

export interface MeetingTranscriptTurn {
  speaker: string;
  starts_at_seconds: number;
  timecode: string;
  text: string;
}

export interface MeetingTranscriptPayload {
  meeting_id: string;
  turns: MeetingTranscriptTurn[];
  unavailable_reason: string | null;
}

export interface SourceRecord {
  record_ref: string;
  source_type: SourceType;
  source_id: string;
  payload: CallPayload | MeetingPayload;
  transcript_payload: MeetingTranscriptPayload | null;
}

export interface DeliveryEnvelope {
  batch_id: string;
  revision: number;
  exported_at: string;
  records: SourceRecord[];
}

export interface Citation {
  passage: string;
  location: string;
  turn_number?: number;
}

export interface NextStep {
  action: string;
  owner: string;
  deadline?: string;
}

export interface AnalysisDossier {
  record_id: string;
  record_ref: string;
  suggested_route: RouteCategory;
  secondary_routes?: RouteCategory[];
  routing_rationale: string;
  what_happened: string;
  why_it_matters: string;
  citations: Citation[];
  honest_uncertainty: string[];
  next_steps: NextStep[];
  coaching_note?: string;
  customer_sentiment?: 'positive' | 'neutral' | 'frustrated' | 'evaluating' | 'uninterested';
  needs_review: boolean;
  is_stale: boolean;
}

export interface ManagedRecordState {
  source_record: SourceRecord;
  applied_revision: number;
  analysis: AnalysisDossier;
  manual_route: RouteCategory | null;
  manual_route_reason: string | null;
  manual_override_timestamp: string | null;
  is_manually_overridden: boolean;
  review_status: 'automated' | 'manually_overridden' | 'needs_review' | 'uncaptured';
}

export interface ExportManifestEntry {
  source_type: SourceType;
  source_id: string;
  record_ref: string;
  applied_source_revision: number;
  routes: RouteCategory[];
  output_paths: string[];
  processing_review_state: string;
  manual_override_flag: boolean;
  analysis_freshness: 'current' | 'stale_pending_review' | 'uncaptured';
}
