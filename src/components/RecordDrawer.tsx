import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Video, 
  CheckCircle, 
  AlertTriangle, 
  Quote, 
  ListChecks, 
  HelpCircle, 
  GraduationCap, 
  Layers, 
  Code, 
  Save, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { ManagedRecordState, RouteCategory } from '../types';

interface RecordDrawerProps {
  recordState: ManagedRecordState;
  onClose: () => void;
  onUpdateRoute: (key: string, newRoute: RouteCategory, reason: string) => void;
  onResetRoute: (key: string) => void;
}

export const RecordDrawer: React.FC<RecordDrawerProps> = ({
  recordState,
  onClose,
  onUpdateRoute,
  onResetRoute
}) => {
  const rec = recordState.source_record;
  const isCall = rec.source_type === 'call';
  const callPayload = isCall ? (rec.payload as any) : null;
  const meetingPayload = !isCall ? (rec.payload as any) : null;
  const key = `${rec.source_type}:${rec.source_id}`;

  const [activeTab, setActiveTab] = useState<'analysis' | 'transcript' | 'raw'>('analysis');
  const [selectedRoute, setSelectedRoute] = useState<RouteCategory>(
    (recordState.is_manually_overridden && recordState.manual_route)
      ? recordState.manual_route
      : recordState.analysis.suggested_route
  );
  const [overrideReason, setOverrideReason] = useState<string>(
    recordState.manual_route_reason || ''
  );
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const turns = rec.transcript_payload?.turns || [];
  const hasTranscript = isCall 
    ? Boolean(callPayload?.transcript?.trim())
    : turns.length > 0;

  const handleSaveRoute = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateRoute(key, selectedRoute, overrideReason || 'Manager manual adjustment');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleReset = () => {
    onResetRoute(key);
    setSelectedRoute(recordState.analysis.suggested_route);
    setOverrideReason('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100%',
      maxWidth: '680px',
      height: '100vh',
      backgroundColor: '#ffffff',
      borderLeft: '1px solid var(--border-subtle)',
      boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.08)',
      zIndex: 1100,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInRight 0.2s ease-out'
    }}>
      
      {/* Header */}
      <div style={{ padding: '1rem 1.4rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fafaf9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-call" style={{ fontWeight: 700 }}>
            {isCall ? <Phone size={11} color="var(--text-muted)" /> : <Video size={11} color="var(--text-muted)" />}
            {rec.record_ref}
          </span>
          <span className="badge-rev" title={`Applied revision: ${recordState.applied_revision}`}>
            Revision {recordState.applied_revision}
          </span>
          {recordState.is_manually_overridden && (
            <span className="badge badge-override">
              Manual Override Active
            </span>
          )}
        </div>
        <button 
          onClick={onClose}
          className="btn btn-outline btn-sm"
          style={{ padding: '0.3rem', borderRadius: '50%' }}
        >
          <X size={15} />
        </button>
      </div>

      {/* Subheader / Info Bar */}
      <div style={{ padding: '0.9rem 1.4rem', borderBottom: '1px solid var(--border-subtle)', backgroundColor: '#ffffff', fontSize: '0.78rem' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          {isCall ? (callPayload?.transcript ? `Call with ${callPayload?.rep_name}` : `Background Call (${callPayload?.direction})`) : meetingPayload?.title}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.4rem', color: 'var(--text-muted)' }}>
          <div>
            <strong>Source ID:</strong> <code style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>{rec.source_id.slice(0, 16)}...</code>
          </div>
          <div>
            <strong>Time (IST):</strong> {isCall ? callPayload?.started_at : meetingPayload?.starts_at}
          </div>
          <div>
            <strong>{isCall ? 'Sales Rep' : 'Organizer'}:</strong> {isCall ? `${callPayload?.rep_name} (${callPayload?.rep_email || 'none'})` : meetingPayload?.organizer_email}
          </div>
          <div>
            <strong>Duration:</strong> {isCall ? `${callPayload?.duration_seconds}s (Talk: ${callPayload?.talk_time_seconds || 0}s)` : `${meetingPayload?.duration_seconds}s`}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', background: '#fafaf9', padding: '0 1.4rem' }}>
        <button 
          onClick={() => setActiveTab('analysis')}
          style={{
            padding: '0.75rem 1.1rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'analysis' ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeTab === 'analysis' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Sparkles size={14} color={activeTab === 'analysis' ? 'var(--primary)' : 'inherit'} />
          Manager Analysis
        </button>
        <button 
          onClick={() => setActiveTab('transcript')}
          style={{
            padding: '0.75rem 1.1rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'transcript' ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeTab === 'transcript' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Quote size={14} color={activeTab === 'transcript' ? 'var(--primary)' : 'inherit'} />
          Evidence Transcript ({hasTranscript ? (isCall ? 'Text' : `${turns.length} turns`) : 'Uncaptured'})
        </button>
        <button 
          onClick={() => setActiveTab('raw')}
          style={{
            padding: '0.75rem 1.1rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'raw' ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeTab === 'raw' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Code size={14} />
          Raw JSON Payload
        </button>
      </div>

      {/* Drawer Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.4rem' }}>
        
        {/* TAB 1: ANALYSIS & ROUTE CORRECTION */}
        {activeTab === 'analysis' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            
            {/* Stale / Needs Review Alert */}
            {(recordState.analysis.needs_review || recordState.review_status === 'needs_review') && (
              <div style={{
                background: 'var(--status-warning-bg)',
                border: '1px solid var(--status-warning-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.8rem 0.95rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem'
              }}>
                <AlertTriangle size={16} color="var(--status-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--status-warning)', fontSize: '0.8125rem' }}>
                    Late Source Transcript Arrived (Needs Review)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    This record previously had no usable transcript. The update delivery batch supplied a new transcript. Your manual route remains active, but please verify the new evidence below.
                  </div>
                </div>
              </div>
            )}

            {/* ROUTE CORRECTION PANEL */}
            <div className="glass-panel" style={{ padding: '1.1rem', background: '#fafaf9' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Layers size={15} color="var(--primary)" />
                  Routing Governance & Correction
                </span>
                <span style={{ fontSize: '0.73rem', color: 'var(--text-dim)' }}>
                  Automated Suggestion: <strong>{recordState.analysis.suggested_route}</strong>
                </span>
              </div>

              <form onSubmit={handleSaveRoute} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
                      Assigned Destination Route
                    </label>
                    <select 
                      className="select"
                      style={{ width: '100%' }}
                      value={selectedRoute}
                      onChange={(e) => setSelectedRoute(e.target.value as RouteCategory)}
                    >
                      <option value="deal_next_steps">Deal Next Steps</option>
                      <option value="sales_coaching">Sales Coaching</option>
                      <option value="customer_success">Customer Success / Support</option>
                      <option value="partnerships">Partnerships & Advisory</option>
                      <option value="onboarding_ops">Onboarding & Operations</option>
                      <option value="uncaptured_triage">Uncaptured Triage</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
                      Override Rationale
                    </label>
                    <input 
                      type="text"
                      className="input"
                      style={{ width: '100%' }}
                      placeholder="Why should this be rerouted?"
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                  <div style={{ fontSize: '0.75rem' }}>
                    {saveSuccess && <span style={{ color: 'var(--status-success)', fontWeight: 600 }}>Route correction saved successfully!</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '0.45rem' }}>
                    {recordState.is_manually_overridden && (
                      <button 
                        type="button" 
                        onClick={handleReset}
                        className="btn btn-outline btn-sm"
                        title="Restore suggested route"
                      >
                        <RotateCcw size={12} />
                        Reset Auto
                      </button>
                    )}
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-sm"
                    >
                      <Save size={12} />
                      Save Route Correction
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* WHAT HAPPENED & WHY IT MATTERS */}
            <div className="glass-panel" style={{ padding: '1.1rem' }}>
              <div style={{ marginBottom: '0.9rem' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>
                  What Happened
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.55' }}>
                  {recordState.analysis.what_happened}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>
                  Why It Matters
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.55' }}>
                  {recordState.analysis.why_it_matters}
                </p>
              </div>
            </div>

            {/* CITATIONS & EVIDENCE */}
            <div className="glass-panel" style={{ padding: '1.1rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.55rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Quote size={13} color="var(--primary)" />
                Transcript Evidence Citations
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {recordState.analysis.citations.map((c, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: 'var(--bg-tertiary)',
                      borderLeft: '3px solid var(--primary)',
                      padding: '0.7rem 0.85rem',
                      borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                      fontSize: '0.8125rem'
                    }}
                  >
                    <div style={{ fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      "{c.passage}"
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                      Location: {c.location} {c.turn_number ? `(Turn ${c.turn_number})` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONABLE NEXT STEPS */}
            <div className="glass-panel" style={{ padding: '1.1rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.55rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ListChecks size={13} color="var(--primary)" />
                Actionable Next Steps & Stated Owners
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {recordState.analysis.next_steps.map((ns, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      padding: '0.55rem 0.75rem',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8125rem'
                    }}
                  >
                    <CheckCircle size={14} color="var(--status-success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 700, color: 'var(--primary)' }}>[{ns.owner}]</span> {ns.action}
                      {ns.deadline && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginLeft: '0.4rem' }}>
                          (Due: {ns.deadline})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HONEST UNCERTAINTY */}
            <div className="glass-panel" style={{ padding: '1.1rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.55rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <HelpCircle size={13} color="var(--text-muted)" />
                Honest Uncertainty (What Data Does NOT Establish)
              </h4>
              <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {recordState.analysis.honest_uncertainty.map((u, idx) => (
                  <li key={idx}>{u}</li>
                ))}
              </ul>
            </div>

            {/* SALES COACHING NOTE */}
            {recordState.analysis.coaching_note && (
              <div className="glass-panel" style={{ padding: '1.1rem', borderLeft: '3px solid var(--cat-coaching-border)' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--cat-coaching)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <GraduationCap size={14} />
                  Practical Sales Coaching Observation
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                  {recordState.analysis.coaching_note}
                </p>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: TRANSCRIPT EVIDENCE */}
        {activeTab === 'transcript' && (
          <div>
            {isCall ? (
              callPayload?.transcript ? (
                <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: '1.65', whiteSpace: 'pre-wrap' }}>
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                    Verbatim Adapted Call Transcript ({callPayload.rep_name})
                  </h3>
                  {callPayload.transcript}
                </div>
              ) : (
                <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <HelpCircle size={28} color="var(--text-dim)" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>No Speech Transcript Supplied</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                    This background call has null transcript text. Outcome: <code>{callPayload?.observed_outcome}</code>, Duration: <code>{callPayload?.duration_seconds}s</code>.
                  </p>
                </div>
              )
            ) : (
              turns.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.2rem' }}>
                    Displaying <strong>{turns.length}</strong> sequential conversation turns:
                  </div>
                  {turns.map((t, idx) => (
                    <div 
                      key={idx}
                      className="glass-panel"
                      style={{
                        padding: '0.8rem 1rem',
                        background: t.speaker.toLowerCase().includes('spendnest') || t.speaker.toLowerCase().includes('team')
                          ? '#f0fdf4'
                          : '#ffffff'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.72rem' }}>
                        <span style={{ fontWeight: 700, color: t.speaker.toLowerCase().includes('spendnest') || t.speaker.toLowerCase().includes('team') ? 'var(--primary)' : 'var(--text-main)' }}>
                          Turn {idx + 1}: {t.speaker}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                          {t.timecode} ({t.starts_at_seconds.toFixed(1)}s)
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-main)', lineHeight: '1.55' }}>
                        {t.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <HelpCircle size={28} color="var(--text-dim)" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Transcript Unavailable</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                    {rec.transcript_payload?.unavailable_reason || meetingPayload?.recording_detail || 'No speech turns captured.'}
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* TAB 3: RAW JSON */}
        {activeTab === 'raw' && (
          <div className="glass-panel" style={{ padding: '0.9rem', background: '#f8fafc', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', overflowX: 'auto', border: '1px solid var(--border-subtle)' }}>
            <pre style={{ margin: 0, color: 'var(--text-main)' }}>
              {JSON.stringify(rec, null, 2)}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
};
