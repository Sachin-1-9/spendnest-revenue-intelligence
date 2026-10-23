import React from 'react';
import { 
  BarChart3, 
  FileCheck2, 
  PhoneCall, 
  AlertCircle 
} from 'lucide-react';
import { ManagedRecordState } from '../types';

interface KpiCardsProps {
  records: ManagedRecordState[];
  onSelectReviewState?: (state: string) => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  records,
  onSelectReviewState
}) => {
  const total = records.length;
  const calls = records.filter(r => r.source_record.source_type === 'call');
  const meetings = records.filter(r => r.source_record.source_type === 'meeting');

  // Usable transcripts
  const usableCalls = calls.filter(c => Boolean((c.source_record.payload as any).transcript?.trim()));
  const usableMeetings = meetings.filter(m => Boolean(m.source_record.transcript_payload?.turns?.length));
  const totalUsable = usableCalls.length + usableMeetings.length;
  const coveragePct = total > 0 ? ((totalUsable / total) * 100).toFixed(1) : '0';

  // Stored connection rate
  const callsWithConn = calls.filter(c => (c.source_record.payload as any).is_connected !== null);
  const connectedCalls = calls.filter(c => (c.source_record.payload as any).is_connected === true);
  const connRate = callsWithConn.length > 0 
    ? ((connectedCalls.length / callsWithConn.length) * 100).toFixed(1) 
    : '0';

  // Route breakdown
  const routeCounts: Record<string, number> = {};
  for (const r of records) {
    const activeRoute = r.is_manually_overridden && r.manual_route ? r.manual_route : r.analysis.suggested_route;
    routeCounts[activeRoute] = (routeCounts[activeRoute] || 0) + 1;
  }

  // Overridden & Needs Review
  const overriddenCount = records.filter(r => r.is_manually_overridden).length;
  const needsReviewCount = records.filter(r => r.analysis.needs_review || r.review_status === 'needs_review').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
      
      {/* Card 1: Selected Activity */}
      <div className="glass-panel" style={{ padding: '1.1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Selected Activity
          </span>
          <BarChart3 size={16} color="var(--text-dim)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {total}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Total Interactions
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          <span>Calls: <strong>{calls.length}</strong></span>
          <span>•</span>
          <span>Meetings: <strong>{meetings.length}</strong></span>
          <span>•</span>
          <span>Single local day</span>
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem' }}>
          <strong>Scope:</strong> 44 interaction records for 21 Aug 2026 (Asia/Kolkata).
        </p>
      </div>

      {/* Card 2: Transcript Coverage */}
      <div className="glass-panel" style={{ padding: '1.1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Transcript Coverage
          </span>
          <FileCheck2 size={16} color="var(--status-success)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--status-success)', letterSpacing: '-0.02em' }}>
            {coveragePct}%
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            {totalUsable} of {total} Transcribed
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          <span>Calls: <strong>{usableCalls.length}/{calls.length}</strong></span>
          <span>•</span>
          <span>Meetings: <strong>{usableMeetings.length}/{meetings.length}</strong></span>
          <span>•</span>
          <span>Uncaptured: <strong>{total - totalUsable}</strong></span>
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem' }}>
          <strong>Denominator:</strong> Records with nonblank text divided by {total} total records.
        </p>
      </div>

      {/* Card 3: Stored Connection Rate */}
      <div className="glass-panel" style={{ padding: '1.1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Source Connection Rate
          </span>
          <PhoneCall size={16} color="var(--text-dim)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {connRate}%
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            {connectedCalls.length} of {callsWithConn.length} Connected
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          <span>Connected: <strong>{connectedCalls.length}</strong></span>
          <span>•</span>
          <span>Not Connected: <strong>{calls.length - connectedCalls.length}</strong></span>
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem' }}>
          <strong>Denominator:</strong> 30 calls with non-null is_connected flag.
        </p>
      </div>

      {/* Card 4: Route Governance & Backlog */}
      <div className="glass-panel" style={{ padding: '1.1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Route Governance
          </span>
          <AlertCircle size={16} color={overriddenCount > 0 ? 'var(--status-warning)' : 'var(--text-dim)'} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: overriddenCount > 0 ? 'var(--status-warning)' : 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {overriddenCount}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Manual Route Overrides
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          <span 
            style={{ cursor: 'pointer', color: needsReviewCount > 0 ? 'var(--status-warning)' : 'inherit', textDecoration: needsReviewCount > 0 ? 'underline' : 'none' }}
            onClick={() => onSelectReviewState && onSelectReviewState('needs_review')}
          >
            Needs Review: <strong>{needsReviewCount}</strong>
          </span>
          <span>•</span>
          <span 
            style={{ cursor: 'pointer' }}
            onClick={() => onSelectReviewState && onSelectReviewState('uncaptured')}
          >
            Uncaptured: <strong>{routeCounts['uncaptured_triage'] || 0}</strong>
          </span>
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem' }}>
          <strong>Policy:</strong> Explicit manual routes persist across duplicate & update batches.
        </p>
      </div>

    </div>
  );
};
