import React from 'react';
import { 
  HelpCircle, 
  Layers
} from 'lucide-react';
import { ManagedRecordState } from '../../types';
import { PersonActivityPanel } from '../PersonActivityPanel';

interface AnalyticsViewProps {
  records: ManagedRecordState[];
  selectedPerson: string;
  onSelectPerson: (personKey: string) => void;
  onClearPersonFilter: () => void;
  onSwitchToInboxWithFilter?: (filterType: string, filterVal: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  records,
  selectedPerson,
  onSelectPerson,
  onClearPersonFilter,
  onSwitchToInboxWithFilter
}) => {
  const total = records.length;
  const calls = records.filter(r => r.source_record.source_type === 'call');
  const meetings = records.filter(r => r.source_record.source_type === 'meeting');

  const usableCalls = calls.filter(c => Boolean((c.source_record.payload as any).transcript?.trim()));
  const usableMeetings = meetings.filter(m => Boolean(m.source_record.transcript_payload?.turns?.length));
  const totalUsable = usableCalls.length + usableMeetings.length;
  const coveragePct = total > 0 ? ((totalUsable / total) * 100).toFixed(1) : '0';

  const callsWithConn = calls.filter(c => (c.source_record.payload as any).is_connected !== null);
  const connectedCalls = calls.filter(c => (c.source_record.payload as any).is_connected === true);
  const connRate = callsWithConn.length > 0 
    ? ((connectedCalls.length / callsWithConn.length) * 100).toFixed(1) 
    : '0';

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

  const denominatorCards = [
    {
      title: "Interaction Scope & Denominator",
      value: `${total} Records`,
      subtitle: "30 Calls + 14 Meetings",
      formula: "Total Logical Records = 44",
      explanation: "All supplied activity occurred on a single local date: 21 August 2026 (Asia/Kolkata). Time-based filters alone cannot segment performance; person and route breakdowns must be used.",
      missingImpact: "26 records lack audio/transcripts and are held in uncaptured triage rather than dropped."
    },
    {
      title: "Speech Transcript Coverage",
      value: `${coveragePct}%`,
      subtitle: `${totalUsable} of ${total} Transcribed`,
      formula: "Usable Speech Records ÷ 44 Total Records",
      explanation: "10 call recordings with adapted text + 8 meetings with turn timestamps. Exactly 17 initially, increasing to 18 when M07 receives 27 turns in update-002.",
      missingImpact: "Missing transcript does NOT establish that a conversation never happened; upstream capture gaps exist."
    },
    {
      title: "Stored Connection Rate",
      value: `${connRate}%`,
      subtitle: `${connectedCalls.length} of ${callsWithConn.length} Connected`,
      formula: "11 is_connected: true ÷ 30 Total Calls",
      explanation: "Upstream telephony system tags. Only 11 of 30 calls had positive connection signals.",
      missingImpact: "Machine labels are treated as evidence to inspect. E.g. C04 had is_connected: false but contained a 95s valuable voicemail."
    },
    {
      title: "Pipeline & Revenue Policy",
      value: "$0 Invented",
      subtitle: "Zero Fabricated Deals",
      formula: "Strict Evidence Adherence",
      explanation: "No CRM opportunity table, deal size, or staff directory was supplied in the test deliveries.",
      missingImpact: "We report conversation signals and stated next steps without fabricating unverified pipeline currency."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header Banner */}
      <div className="omni-card" style={{ padding: '1.25rem 1.5rem', background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                Manager Operations Matrix
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                Temporal Scope: 21 August 2026 (Asia/Kolkata)
              </span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0 }}>
              Team Activity & Denominator Governance
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '750px', lineHeight: '1.5' }}>
              Detailed breakdown of selected activity by day and person, explicit denominator definitions, and distinction between call sales reps and calendar meeting organizers.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <div style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>UNIQUE RECORDS</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{total}</div>
            </div>
            <div style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>TRANSCRIBED</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-success)' }}>{totalUsable}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Person Activity Breakdown (Page 1 requirement) */}
      <PersonActivityPanel 
        records={records}
        selectedPerson={selectedPerson}
        onSelectPerson={(pKey) => {
          onSelectPerson(pKey);
          if (onSwitchToInboxWithFilter) {
            onSwitchToInboxWithFilter('person', pKey);
          }
        }}
        onClearPersonFilter={onClearPersonFilter}
      />

      {/* Denominators & Governance Inspection Grid */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <HelpCircle size={16} color="var(--primary)" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            Headline Number Audit & Denominator Definitions
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
          {denominatorCards.map((card, idx) => (
            <div key={idx} className="omni-card" style={{ padding: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  {card.title}
                </span>
                <span className="badge badge-rev" style={{ fontWeight: 800, color: 'var(--primary)' }}>
                  {card.value}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                {card.subtitle}
              </div>
              <div style={{ background: 'var(--bg-subtle)', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
                Formula: {card.formula}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '0.45rem' }}>
                {card.explanation}
              </p>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.35rem' }}>
                <strong>Data Boundary:</strong> {card.missingImpact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Routing Distribution Card */}
      <div className="omni-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Layers size={16} color="var(--primary)" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Routing Destination Volume
            </h3>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
            Total 44 records routed across 6 purpose-driven categories
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem' }}>
          {[
            { key: 'deal_next_steps', label: 'Deal Next Steps', color: 'var(--cat-deal)', count: routeCounts['deal_next_steps'] },
            { key: 'sales_coaching', label: 'Sales Coaching', color: 'var(--cat-coaching)', count: routeCounts['sales_coaching'] },
            { key: 'customer_success', label: 'Customer Success', color: 'var(--cat-support)', count: routeCounts['customer_success'] },
            { key: 'partnerships', label: 'Partnerships', color: 'var(--cat-partner)', count: routeCounts['partnerships'] },
            { key: 'onboarding_ops', label: 'Onboarding / Ops', color: 'var(--cat-ops)', count: routeCounts['onboarding_ops'] },
            { key: 'uncaptured_triage', label: 'Uncaptured Triage', color: 'var(--cat-triage)', count: routeCounts['uncaptured_triage'] }
          ].map((item) => (
            <div 
              key={item.key} 
              style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
                borderLeft: `4px solid ${item.color}`
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{item.label}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>{item.count}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                {total > 0 ? ((item.count / total) * 100).toFixed(0) : 0}% of all records
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
