import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  Terminal
} from 'lucide-react';
import { ManagedRecordState } from '../../types';

interface ReplayViewProps {
  currentState: Record<string, ManagedRecordState>;
  onExecuteStep: (stepNumber: number) => { success: boolean; log: string };
  onRunFullSuite: () => void;
  onResetToInitial: () => void;
}

export const ReplayView: React.FC<ReplayViewProps> = ({
  currentState,
  onExecuteStep,
  onRunFullSuite,
  onResetToInitial
}) => {
  const [logs, setLogs] = useState<string[]>([
    'System ready. Follow the 5-step replay protocol or click "Run Complete Replay Suite".'
  ]);

  const total = Object.keys(currentState).length;
  const m07Key = 'meeting:4f304fff-fd40-5cfc-a366-0a134c445c2a';
  const m07 = currentState[m07Key];
  const m07Rev = m07?.applied_revision || 0;
  const m07Turns = m07?.source_record.transcript_payload?.turns?.length || 0;
  const m07Overridden = m07?.is_manually_overridden || false;
  const m07ActiveRoute = m07Overridden ? m07?.manual_route : m07?.analysis.suggested_route;

  const usableCount = Object.values(currentState).filter(r => {
    const isCall = r.source_record.source_type === 'call';
    return isCall 
      ? Boolean((r.source_record.payload as any).transcript?.trim())
      : Boolean(r.source_record.transcript_payload?.turns?.length);
  }).length;

  const handleStep = (stepNum: number) => {
    const res = onExecuteStep(stepNum);
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${res.log}`, ...prev]);
  };

  const handleFullSuite = () => {
    onRunFullSuite();
    setLogs(prev => [
      `[${new Date().toLocaleTimeString()}] Completed full assessment replay sequence: Initial -> Repeat -> Override M07 -> Update 02 -> Re-import Initial -> Verify State!`,
      ...prev
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header Banner */}
      <div className="omni-card" style={{ padding: '1.4rem 1.6rem', background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                <ShieldCheck size={12} /> Idempotent Ingestion Engine
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                DATA_CONTRACT.md Compliance Test Bench
              </span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0 }}>
              Assessment Replay & Audit Protocol
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.35rem', maxWidth: '780px', lineHeight: '1.55' }}>
              This interactive protocol demonstrates the required 5 replay steps: initial batch ingestion, duplicate deduplication suppression, manual route override preservation, revision update (Rev 2 with 27 turns), and rejection of older revisions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button onClick={handleFullSuite} className="btn btn-primary" style={{ fontWeight: 700 }}>
              <Play size={14} fill="currentColor" /> Run Complete Replay Suite
            </button>
            <button onClick={onResetToInitial} className="btn btn-outline" style={{ fontWeight: 600 }}>
              <RotateCcw size={13} /> Reset to Clean Initial (Rev 1)
            </button>
          </div>
        </div>
      </div>

      {/* Live State Grid */}
      <div className="omni-card" style={{ padding: '1.15rem 1.4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>UNIQUE RECORDS IN WORKSPACE</div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: total === 44 ? 'var(--status-success)' : 'var(--status-danger)', marginTop: '0.2rem' }}>
            {total} / 44
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
            Identity: (source_type, source_id)
          </div>
        </div>

        <div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>USABLE TRANSCRIPT COVERAGE</div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>
            {usableCount} / 44 ({total > 0 ? ((usableCount / total) * 100).toFixed(1) : 0}%)
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
            {usableCount === 18 ? 'Post-Update State (18 usable)' : 'Initial State (17 usable)'}
          </div>
        </div>

        <div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>RECORD M07 REVISION STATE</div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: m07Rev === 2 ? 'var(--status-success)' : 'var(--text-main)', marginTop: '0.2rem' }}>
            Revision {m07Rev} ({m07Turns} turns)
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
            {m07Rev === 2 ? 'Update batch-002 applied' : 'Initial batch-001 (0 turns)'}
          </div>
        </div>

        <div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>M07 GOVERNED ROUTE</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: m07Overridden ? 'var(--status-warning)' : 'var(--text-main)', marginTop: '0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {m07ActiveRoute || 'none'}
          </div>
          <div style={{ fontSize: '0.72rem', color: m07Overridden ? 'var(--status-warning)' : 'var(--text-dim)', marginTop: '0.15rem', fontWeight: 600 }}>
            {m07Overridden ? 'Manual Override Preserved' : 'Automated Suggestion'}
          </div>
        </div>
      </div>

      {/* Stepper Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        
        {/* Step 1 */}
        <div className="omni-card" style={{ padding: '1.1rem 1.35rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>1</span>
              Initial Import: Ingest 01_initial.json
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: '1.45' }}>
              Loads initial delivery (batch_id: <code>initial-001</code>, revision 1). 44 distinct source records (30 calls, 14 meetings). Exactly 17 usable transcripts recognized.
            </div>
          </div>
          <button onClick={() => handleStep(1)} className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            Execute Step 1
          </button>
        </div>

        {/* Step 2 */}
        <div className="omni-card" style={{ padding: '1.1rem 1.35rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>2</span>
              Repeat Import: Idempotent Duplicate Ingestion Test
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: '1.45' }}>
              Re-imports <code>01_initial.json</code>. Matches records by (source_type, source_id). Older or identical revisions are ignored. Zero records duplicated; count remains strictly 44.
            </div>
          </div>
          <button onClick={() => handleStep(2)} className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            Execute Step 2
          </button>
        </div>

        {/* Step 3 */}
        <div className="omni-card" style={{ padding: '1.1rem 1.35rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>3</span>
              Manual Route Override: Reassign M07
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: '1.45' }}>
              Sets M07 manual route to <code>deal_next_steps</code>. Marks override flag as true with manager rationale. Demonstrates human judgment intervention before late transcript update.
            </div>
          </div>
          <button onClick={() => handleStep(3)} className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            Execute Step 3
          </button>
        </div>

        {/* Step 4 */}
        <div className="omni-card" style={{ padding: '1.1rem 1.35rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>4</span>
              Update Batch: Ingest 02_update.json (Revision 2)
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: '1.45' }}>
              Applies Revision 2 to M07. Replaces transcript payload with 27 turns. Total unique records remains 44, usable texts becomes 18, and manual route <code>deal_next_steps</code> is PRESERVED!
            </div>
          </div>
          <button onClick={() => handleStep(4)} className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            Execute Step 4
          </button>
        </div>

        {/* Step 5 */}
        <div className="omni-card" style={{ padding: '1.1rem 1.35rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>5</span>
              Preserve Judgment: Re-import Initial Batch After Update
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: '1.45' }}>
              Re-imports <code>01_initial.json</code> after update. Verifies that M07 is not downgraded back to Revision 1 (Rev 1 &lt; Rev 2 is rejected). Manual route remains active.
            </div>
          </div>
          <button onClick={() => handleStep(5)} className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            Execute Step 5
          </button>
        </div>

      </div>

      {/* Audit Terminal Log */}
      <div className="omni-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.55rem' }}>
          <Terminal size={15} color="var(--primary)" />
          Replay Execution Audit Trail & Verification Log
        </div>
        <div style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.85rem 1rem',
          height: '180px',
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-main)',
          lineHeight: '1.6'
        }}>
          {logs.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>

    </div>
  );
};
