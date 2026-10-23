import React, { useState } from 'react';
import { 
  X, 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  Terminal 
} from 'lucide-react';
import { ManagedRecordState } from '../types';

interface ReplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: Record<string, ManagedRecordState>;
  onExecuteStep: (stepNumber: number) => { success: boolean; log: string };
  onRunFullSuite: () => void;
  onResetToInitial: () => void;
}

export const ReplayModal: React.FC<ReplayModalProps> = ({
  isOpen,
  onClose,
  currentState,
  onExecuteStep,
  onRunFullSuite,
  onResetToInitial
}) => {
  const [logs, setLogs] = useState<string[]>([
    'System ready. Follow the 5-step replay protocol or click "Run Complete Replay Suite".'
  ]);

  if (!isOpen) return null;

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '820px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <div style={{ padding: '0.35rem', borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Assessment Replay & Idempotency Protocol
              </h3>
              <p style={{ fontSize: '0.73rem', color: 'var(--text-dim)' }}>
                Verifies DATA_CONTRACT.md rules: duplicate deduplication, revision ordering, and manual route preservation.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-outline btn-sm" style={{ padding: '0.3rem', borderRadius: '50%' }}>
            <X size={15} />
          </button>
        </div>

        {/* Live State Banner */}
        <div style={{ background: '#fafaf9', padding: '0.85rem 1.4rem', borderBottom: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem', fontSize: '0.78rem' }}>
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.68rem', fontWeight: 600 }}>UNIQUE RECORDS</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: total === 44 ? 'var(--status-success)' : 'var(--status-danger)' }}>
              {total} / 44
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.68rem', fontWeight: 600 }}>USABLE TEXTS</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)' }}>
              {usableCount} / 44
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.68rem', fontWeight: 600 }}>M07 REVISION</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: m07Rev === 2 ? 'var(--status-success)' : 'var(--text-main)' }}>
              Rev {m07Rev} ({m07Turns} turns)
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.68rem', fontWeight: 600 }}>M07 ROUTE</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: m07Overridden ? 'var(--status-warning)' : 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {m07ActiveRoute || 'none'} {m07Overridden ? '(Override)' : ''}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          
          {/* Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.65rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Sequential Replay Steps
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={handleFullSuite} className="btn btn-primary btn-sm">
                <Play size={12} fill="currentColor" />
                Run Complete Replay Suite
              </button>
              <button onClick={onResetToInitial} className="btn btn-outline btn-sm">
                <RotateCcw size={12} />
                Reset to Clean Initial
              </button>
            </div>
          </div>

          {/* Stepper Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            
            {/* Step 1 */}
            <div className="glass-panel" style={{ padding: '0.8rem 1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.8125rem' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>1</span>
                  Import Initial Batch (01_initial.json)
                </div>
                <div style={{ fontSize: '0.73rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
                  Loads 44 distinct source records (30 calls, 14 meetings). Exactly 17 usable supplied transcripts.
                </div>
              </div>
              <button onClick={() => handleStep(1)} className="btn btn-secondary btn-sm">
                Execute Step 1
              </button>
            </div>

            {/* Step 2 */}
            <div className="glass-panel" style={{ padding: '0.8rem 1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.8125rem' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>2</span>
                  Repeat Import (Duplicate Ingestion Test)
                </div>
                <div style={{ fontSize: '0.73rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
                  Re-imports 01_initial.json. Verifies that identical revisions are ignored. Record count stays exactly 44.
                </div>
              </div>
              <button onClick={() => handleStep(2)} className="btn btn-secondary btn-sm">
                Execute Step 2
              </button>
            </div>

            {/* Step 3 */}
            <div className="glass-panel" style={{ padding: '0.8rem 1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.8125rem' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>3</span>
                  Manually Change Route on M07
                </div>
                <div style={{ fontSize: '0.73rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
                  Sets M07 manual route to <code>deal_next_steps</code>. Marks override flag as true with manager rationale.
                </div>
              </div>
              <button onClick={() => handleStep(3)} className="btn btn-secondary btn-sm">
                Execute Step 3
              </button>
            </div>

            {/* Step 4 */}
            <div className="glass-panel" style={{ padding: '0.8rem 1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.8125rem' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>4</span>
                  Import Update Batch (02_update.json)
                </div>
                <div style={{ fontSize: '0.73rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
                  Applies Revision 2 to M07. Replaces transcript payload with 27 turns. Total unique records remains 44, usable texts becomes 18, and manual route remains preserved!
                </div>
              </div>
              <button onClick={() => handleStep(4)} className="btn btn-secondary btn-sm">
                Execute Step 4
              </button>
            </div>

            {/* Step 5 */}
            <div className="glass-panel" style={{ padding: '0.8rem 1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.8125rem' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>5</span>
                  Re-import Initial Batch After Update
                </div>
                <div style={{ fontSize: '0.73rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
                  Re-imports 01_initial.json. Verifies that M07 is not downgraded back to Revision 1 (Rev 1 &lt; Rev 2 is rejected).
                </div>
              </div>
              <button onClick={() => handleStep(5)} className="btn btn-secondary btn-sm">
                Execute Step 5
              </button>
            </div>

          </div>

          {/* Audit Terminal Log */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.35rem' }}>
              <Terminal size={13} color="var(--primary)" />
              Replay Execution Audit Trail
            </div>
            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.7rem 0.9rem',
              height: '130px',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-main)',
              lineHeight: '1.55'
            }}>
              {logs.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Replay Runner
          </button>
        </div>

      </div>
    </div>
  );
};
