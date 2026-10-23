import { DeliveryEnvelope, ManagedRecordState, RouteCategory, ExportManifestEntry } from '../types';
import { getAnalysisForRecord } from '../data/analysisLibrary';

export const STORAGE_KEY = 'spendnest_revenue_inbox_state_v1';

export function makeRecordKey(sourceType: string, sourceId: string): string {
  return `${sourceType}:${sourceId}`;
}

export function initializeStateFromBatch(batch: DeliveryEnvelope): Record<string, ManagedRecordState> {
  const state: Record<string, ManagedRecordState> = {};

  for (const record of batch.records) {
    const key = makeRecordKey(record.source_type, record.source_id);
    const analysis = getAnalysisForRecord(record, batch.revision);
    const hasUsableTranscript = 
      (record.source_type === 'call' && Boolean((record.payload as any).transcript?.trim())) ||
      (record.source_type === 'meeting' && Boolean(record.transcript_payload?.turns?.length));

    state[key] = {
      source_record: record,
      applied_revision: batch.revision,
      analysis,
      manual_route: null,
      manual_route_reason: null,
      manual_override_timestamp: null,
      is_manually_overridden: false,
      review_status: hasUsableTranscript ? 'automated' : 'uncaptured'
    };
  }

  return state;
}

export function applyBatch(
  currentState: Record<string, ManagedRecordState>,
  incomingBatch: DeliveryEnvelope
): { newState: Record<string, ManagedRecordState>; updatedCount: number; ignoredCount: number; addedCount: number } {
  const newState: Record<string, ManagedRecordState> = { ...currentState };
  let updatedCount = 0;
  let ignoredCount = 0;
  let addedCount = 0;

  for (const record of incomingBatch.records) {
    const key = makeRecordKey(record.source_type, record.source_id);
    const existing = newState[key];

    if (!existing) {
      // New record
      const analysis = getAnalysisForRecord(record, incomingBatch.revision);
      const hasUsableTranscript = 
        (record.source_type === 'call' && Boolean((record.payload as any).transcript?.trim())) ||
        (record.source_type === 'meeting' && Boolean(record.transcript_payload?.turns?.length));

      newState[key] = {
        source_record: record,
        applied_revision: incomingBatch.revision,
        analysis,
        manual_route: null,
        manual_route_reason: null,
        manual_override_timestamp: null,
        is_manually_overridden: false,
        review_status: hasUsableTranscript ? 'automated' : 'uncaptured'
      };
      addedCount++;
    } else if (incomingBatch.revision > existing.applied_revision) {
      // Newer revision replaces entire source record
      const newAnalysis = getAnalysisForRecord(record, incomingBatch.revision);
      const hasUsableTranscript = 
        (record.source_type === 'call' && Boolean((record.payload as any).transcript?.trim())) ||
        (record.source_type === 'meeting' && Boolean(record.transcript_payload?.turns?.length));

      const isManual = existing.is_manually_overridden;

      newState[key] = {
        source_record: record,
        applied_revision: incomingBatch.revision,
        analysis: {
          ...newAnalysis,
          // If manual override was active, signal that new source text arrived
          needs_review: isManual,
          is_stale: isManual
        },
        manual_route: existing.manual_route,
        manual_route_reason: existing.manual_route_reason,
        manual_override_timestamp: existing.manual_override_timestamp,
        is_manually_overridden: isManual,
        review_status: isManual ? 'needs_review' : (hasUsableTranscript ? 'automated' : 'uncaptured')
      };
      updatedCount++;
    } else {
      // Older or equal revision: strictly ignore to maintain idempotency
      ignoredCount++;
    }
  }

  return { newState, updatedCount, ignoredCount, addedCount };
}

export function updateRecordRoute(
  currentState: Record<string, ManagedRecordState>,
  key: string,
  newRoute: RouteCategory,
  reason: string
): Record<string, ManagedRecordState> {
  const existing = currentState[key];
  if (!existing) return currentState;

  return {
    ...currentState,
    [key]: {
      ...existing,
      manual_route: newRoute,
      manual_route_reason: reason,
      manual_override_timestamp: new Date().toISOString(),
      is_manually_overridden: true,
      review_status: 'manually_overridden',
      analysis: {
        ...existing.analysis,
        needs_review: false,
        is_stale: false
      }
    }
  };
}

export function resetRecordRoute(
  currentState: Record<string, ManagedRecordState>,
  key: string
): Record<string, ManagedRecordState> {
  const existing = currentState[key];
  if (!existing) return currentState;

  const hasUsableTranscript = 
    (existing.source_record.source_type === 'call' && Boolean((existing.source_record.payload as any).transcript?.trim())) ||
    (existing.source_record.source_type === 'meeting' && Boolean(existing.source_record.transcript_payload?.turns?.length));

  return {
    ...currentState,
    [key]: {
      ...existing,
      manual_route: null,
      manual_route_reason: null,
      manual_override_timestamp: null,
      is_manually_overridden: false,
      review_status: hasUsableTranscript ? 'automated' : 'uncaptured',
      analysis: {
        ...existing.analysis,
        needs_review: false,
        is_stale: false
      }
    }
  };
}

export function generateExportManifest(
  state: Record<string, ManagedRecordState>
): ExportManifestEntry[] {
  const records = Object.values(state).sort((a, b) => a.source_record.record_ref.localeCompare(b.source_record.record_ref));

  return records.map((item) => {
    const rec = item.source_record;
    const activeRoute = item.is_manually_overridden && item.manual_route ? item.manual_route : item.analysis.suggested_route;
    const routes: RouteCategory[] = [activeRoute];
    if (item.analysis.secondary_routes) {
      for (const sr of item.analysis.secondary_routes) {
        if (!routes.includes(sr)) routes.push(sr);
      }
    }

    const outputPaths = routes.map((r) => `outputs/${r}/${rec.record_ref}_${rec.source_id.slice(0, 8)}.md`);

    let freshness: 'current' | 'stale_pending_review' | 'uncaptured' = 'current';
    if (item.review_status === 'uncaptured') {
      freshness = 'uncaptured';
    } else if (item.review_status === 'needs_review' || item.analysis.is_stale) {
      freshness = 'stale_pending_review';
    }

    return {
      source_type: rec.source_type,
      source_id: rec.source_id,
      record_ref: rec.record_ref,
      applied_source_revision: item.applied_revision,
      routes,
      output_paths: outputPaths,
      processing_review_state: item.review_status,
      manual_override_flag: item.is_manually_overridden,
      analysis_freshness: freshness
    };
  });
}

export function saveStateToStorage(state: Record<string, ManagedRecordState>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
}

export function loadStateFromStorage(): Record<string, ManagedRecordState> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return null;
  }
}

export function clearStorageState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear localStorage:', err);
  }
}
