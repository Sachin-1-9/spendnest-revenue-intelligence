import React from 'react';
import { 
  BarChart3, 
  FileCheck2, 
  PhoneCall, 
  AlertCircle, 
  HelpCircle,
  Layers
} from 'lucide-react';
import { ManagedRecordState } from '../types';

interface KpiCardsProps {
  records: ManagedRecordState[];
  selectedRoute?: string;
  onSelectRoute?: (route: string) => void;
  onSelectReviewState?: (state: string) => void;
  onOpenMetricsGuide?: () => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  records,
  selectedRoute = 'all',
  onSelectRoute,
  onSelectReviewState,
  onOpenMetricsGuide
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
  const routeCounts: Record<string, number> = {
    deal_next_steps: 0,
    sales_coaching: 0,
    customer_success: 0,
    partnerships: 0,
    onboarding_ops: 0,
    uncaptured_triage: 0
  };

  for (const r of records) {
    const activeRoute = r.is_manually_overridden && r.manual_route ? r.manual_route : r.analysis.suggested_route;
    routeCounts[activeRoute] = (routeCounts[activeRoute] || 0) + 1;
  }

  // Overridden & Needs Review
  const overriddenCount = records.filter(r => r.is_manually_overridden).length;
  const needsReviewCount = records.filter(r => r.analysis.needs_review || r.review_status === 'needs_review').length;

  const routesList = [
    { key: 'deal_next_steps', label: 'Deal Next Steps', color: 'var(--cat-deal)', count: routeCounts['deal_next_steps'] || 0 },
    { key: 'sales_coaching', label: 'Sales Coaching', color: 'var(--cat-coaching)', count: routeCounts['sales_coaching'] || 0 },
    { key: 'customer_success', label: 'Customer Success', color: 'var(--cat-support)', count: routeCounts['customer_success'] || 0 },
    { key: 'partnerships', label: 'Partnerships', color: 'var(--cat-partner)', count: routeCounts['partnerships'] || 0 },
    { key: 'onboarding_ops', label: 'Onboarding / Ops', color: 'var(--cat-ops)', count: routeCounts['onboarding_ops'] || 0 },
    { key: 'uncaptured_triage', label: 'Uncaptured Triage', color: 'var(--cat-triage)', count: routeCounts['uncaptured_triage'] || 0 }
  ];

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      
      {/* 4 Core KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.85rem', marginBottom: '0.85rem' }}>
        
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
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span><strong>Scope:</strong> 21 Aug 2026 (Asia/Kolkata)</span>
            {onOpenMetricsGuide && (
              <button 
                onClick={onOpenMetricsGuide}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem', padding: 0 }}
              >
                <HelpCircle size={11} /> Guide
              </button>
            )}
          </div>
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
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem' }}>
            <strong>Denominator:</strong> Records with nonblank text ÷ {total} total records.
          </div>
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
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem' }}>
            <strong>Denominator:</strong> 30 calls with non-null is_connected flag.
          </div>
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
              title="Click to view records needing review"
            >
              Needs Review: <strong>{needsReviewCount}</strong>
            </span>
            <span>•</span>
            <span 
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectReviewState && onSelectReviewState('uncaptured')}
              title="Click to view uncaptured triage"
            >
              Uncaptured: <strong>{routeCounts['uncaptured_triage'] || 0}</strong>
            </span>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem' }}>
            <strong>Policy:</strong> Explicit manual routes persist across duplicate & update batches.
          </div>
        </div>

      </div>

      {/* Route Distribution & 1-Click Filter Bar */}
      <div className="glass-panel" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
          <Layers size={14} color="var(--primary)" />
          <span>Assigned Routing Distribution:</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
          {routesList.map((r) => {
            const isActive = selectedRoute === r.key;
            return (
              <button
                key={r.key}
                onClick={() => onSelectRoute && onSelectRoute(isActive ? 'all' : r.key)}
                className="btn btn-sm"
                style={{
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.72rem',
                  borderRadius: 'var(--radius-sm)',
                  border: isActive ? `1.5px solid ${r.color}` : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--bg-tertiary)' : '#ffffff',
                  color: 'var(--text-main)',
                  boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  cursor: 'pointer'
                }}
                title={`Filter by route: ${r.label}`}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: r.color, display: 'inline-block', marginRight: '4px' }}></span>
                {r.label}: <strong>{r.count}</strong>
              </button>
            );
          })}

          {selectedRoute !== 'all' && (
            <button
              onClick={() => onSelectRoute && onSelectRoute('all')}
              className="btn btn-outline btn-sm"
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', color: 'var(--status-danger)' }}
            >
              Reset Route Filter
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
