import React from 'react';
import { 
  X, 
  Calculator, 
  CheckCircle2
} from 'lucide-react';

interface MetricsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetricsGuideModal: React.FC<MetricsGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const metricDefinitions = [
    {
      name: "Selected-Record Activity",
      headlineValue: "44 Total Records",
      period: "21 August 2026 (Asia/Kolkata local day)",
      numerator: "All logical unique records ingested into the workspace across calls and meetings.",
      denominator: "Fixed delivery scope of 44 unique records (30 calls + 14 meetings).",
      missingDataImpact: "No interactions are discarded. Records without transcripts (26 total: 20 background calls and 6 unrecorded meetings) are tracked as uncaptured triage rather than deleted.",
      deliberateBoundary: "All supplied records fall on a single local day. A date filter alone is insufficient to segment performance; person and route breakdowns must be used."
    },
    {
      name: "Usable Transcript Coverage",
      headlineValue: "38.6% (Initial) → 40.9% (Post-Update)",
      period: "21 August 2026 (Asia/Kolkata)",
      numerator: "Count of records with non-empty, usable speech transcripts (17 initially: 10 calls + 7 meetings; increases to 18 post-update when M07 receives 27 turns).",
      denominator: "All 44 logical source records (100% of workspace activity).",
      missingDataImpact: "The remaining 26 records (59.1%) have null transcript text or uncaptured audio. Missing transcripts do NOT mean the conversation never happened—they represent telephony capture gaps or silent calendar placeholders.",
      deliberateBoundary: "Denominator is strictly the total 44 records, not just meetings or connected calls, ensuring an honest, uninflated coverage ratio."
    },
    {
      name: "Source Connection Rate",
      headlineValue: "36.7% (11 of 30 Calls Connected)",
      period: "21 August 2026 (Asia/Kolkata)",
      numerator: "11 calls where upstream telephony metadata logged is_connected === true.",
      denominator: "30 calls where is_connected is non-null (11 true + 19 false).",
      missingDataImpact: "19 calls are logged as is_connected === false (unanswered dials, quick hangups, or voicemail drops).",
      deliberateBoundary: "CAUTION: Upstream machine tags are treated as evidence to inspect, not definitive ground truth. For example, C04 is labeled is_connected: false, but the rep left a substantive 95-second voicemail resolving a bounced proposal, requiring follow-up."
    },
    {
      name: "Route Governance & Manual Overrides",
      headlineValue: "Explicit Overrides & Preserved State",
      period: "Persistent across batch re-runs and browser reloads",
      numerator: "Count of records where a manager explicitly reassigned the destination route with a documented rationale.",
      denominator: "Active records in the workspace (44).",
      missingDataImpact: "When update-002 arrives with newer transcript text for an overridden record (e.g., M07), the application flags it as 'needs_review' while strictly preserving the manager's manual route.",
      deliberateBoundary: "Deterministic separation between automated suggestions and human judgment. Automated heuristics never silently overwrite manual decisions."
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '860px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <div style={{ padding: '0.35rem', borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Calculator size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Metric Definitions, Denominators & Governance
              </h3>
              <p style={{ fontSize: '0.73rem', color: 'var(--text-dim)', margin: 0 }}>
                Full audit transparency as required by the Revenue Intelligence specification.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-outline btn-sm" style={{ padding: '0.3rem', borderRadius: '50%' }}>
            <X size={15} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          
          {/* Key Principle Alert */}
          <div style={{
            background: 'var(--primary-light)',
            border: '1px solid var(--primary)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.85rem 1rem',
            fontSize: '0.78rem',
            color: 'var(--text-main)',
            lineHeight: '1.5'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={15} />
              Core Analytical Contract: No Invented Pipeline Currency
            </div>
            <div>
              Traditional sales dashboards fabricate pipeline value, deal probability, and rep stack-rankings from loose keywords. SpendNest strictly adheres to the data contract: <strong>no CRM opportunity table, deal value, or account lifetime value is supplied in the source data</strong>. We report verifiable conversation evidence, stated next steps, and honest uncertainty without guessing.
            </div>
          </div>

          {/* Metric Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {metricDefinitions.map((m, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '1rem 1.15rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.35rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    {m.name}
                  </span>
                  <span className="badge badge-rev" style={{ fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-light)' }}>
                    Value: {m.headlineValue}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.55rem', fontSize: '0.75rem', marginBottom: '0.55rem' }}>
                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.5rem 0.7rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ color: 'var(--text-dim)', fontWeight: 600, fontSize: '0.68rem', textTransform: 'uppercase' }}>Numerator (What Was Counted)</div>
                    <div style={{ color: 'var(--text-main)', marginTop: '0.15rem' }}>{m.numerator}</div>
                  </div>
                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.5rem 0.7rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ color: 'var(--text-dim)', fontWeight: 600, fontSize: '0.68rem', textTransform: 'uppercase' }}>Denominator (Base Population)</div>
                    <div style={{ color: 'var(--text-main)', marginTop: '0.15rem' }}>{m.denominator}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', lineHeight: '1.45', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>Temporal Scope:</strong> {m.period}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>Impact of Missing Data:</strong> {m.missingDataImpact}
                  </div>
                  <div style={{ color: 'var(--primary)', fontWeight: 600 }}>
                    <strong>Governance Note:</strong> {m.deliberateBoundary}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
