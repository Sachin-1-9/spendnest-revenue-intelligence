import React, { useState, useEffect } from 'react';
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
  Sparkles,
  ArrowRight,
  Smile,
  Meh,
  Frown,
  TrendingUp
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
  const [highlightedTurn, setHighlightedTurn] = useState<number | null>(null);

  // Sync state if recordState changes
  useEffect(() => {
    setSelectedRoute(
      (recordState.is_manually_overridden && recordState.manual_route)
        ? recordState.manual_route
        : recordState.analysis.suggested_route
    );
    setOverrideReason(recordState.manual_route_reason || '');
    setHighlightedTurn(null);
  }, [recordState]);

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

  const handleJumpToTurn = (turnNum?: number) => {
    if (turnNum) {
      setHighlightedTurn(turnNum);
      setActiveTab('transcript');
    }
  };

  const getSentimentBadge = (sentiment?: string) => {
    switch (sentiment) {
      case 'frustrated':
        return <span className="badge" style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}><Frown size={11} /> Customer Frustrated</span>;
      case 'uninterested':
        return <span className="badge" style={{ background: '#fff7ed', color: '#9a3412', border: '1px solid #fed7aa' }}><Meh size={11} /> Uninterested / Hostile</span>;
      case 'evaluating':
        return <span className="badge" style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' }}><TrendingUp size={11} /> Evaluating Commercials</span>;
      case 'positive':
        return <span className="badge" style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }}><Smile size={11} /> Highly Receptive</span>;
      default:
        return <span className="badge" style={{ background: '#f5f5f4', color: '#57534e', border: '1px solid #e7e5e4' }}><Meh size={11} /> Neutral</span>;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100%',
      maxWidth: '720px',
      height: '100vh',
      backgroundColor: '#ffffff',
      borderLeft: '1px solid var(--border-subtle)',
      boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.12)',
      zIndex: 1100,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInRight 0.2s ease-out'
    }}>
      
      {/* Header */}
      <div style={{ padding: '0.9rem 1.4rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fafaf9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge badge-call" style={{ fontWeight: 800 }}>
            {isCall ? <Phone size={11} color="var(--text-muted)" /> : <Video size={11} color="var(--text-muted)" />}
            {rec.record_ref}
          </span>
          <span className="badge-rev" title={`Applied revision: ${recordState.applied_revision}`}>
            Revision {recordState.applied_revision}
          </span>
          {getSentimentBadge(recordState.analysis.customer_sentiment)}
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
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
          {isCall ? (callPayload?.transcript ? `Call with ${callPayload?.rep_name}` : `Background Call (${callPayload?.direction || 'telephony'})`) : meetingPayload?.title}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.45rem', color: 'var(--text-muted)' }}>
          <div>
            <strong>Identity Key:</strong> <code style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>({rec.source_type}, {rec.source_id.slice(0, 10)}...)</code>
          </div>
          <div>
            <strong>Time (IST):</strong> {isCall ? callPayload?.started_at : meetingPayload?.starts_at}
          </div>
          <div>
            <strong>{isCall ? 'Sales Rep' : 'Organizer'}:</strong> {isCall ? `${callPayload?.rep_name || 'Unassigned'} (${callPayload?.rep_email || 'none'})` : `${meetingPayload?.organizer_email} (Host)`}
          </div>
          <div>
            <strong>Duration:</strong> {isCall ? `${callPayload?.duration_seconds}s (Talk: ${callPayload?.talk_time_seconds || 0}s)` : `${meetingPayload?.duration_seconds}s (${meetingPayload?.provider})`}
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
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Sparkles size={14} color={activeTab === 'analysis' ? 'var(--primary)' : 'inherit'} />
          Evidence Analysis & Route
        </button>
        <button 
          onClick={() => setActiveTab('transcript')}
          style={{
            padding: '0.75rem 1.1rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'transcript' ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeTab === 'transcript' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Quote size={14} color={activeTab === 'transcript' ? 'var(--primary)' : 'inherit'} />
          Verbatim Speech ({hasTranscript ? (isCall ? 'Text' : `${turns.length} turns`) : 'Uncaptured'})
        </button>
        <button 
          onClick={() => setActiveTab('raw')}
          style={{
            padding: '0.75rem 1.1rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'raw' ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeTab === 'raw' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Code size={14} />
          Raw JSON Envelope
        </button>
      </div>

      {/* Drawer Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.4rem' }}>
        
        {/* TAB 1: ANALYSIS & ROUTE CORRECTION */}
        {activeTab === 'analysis' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            
            {/* Stale / Needs Review Alert */}
            {(recordState.analysis.needs_review || recordState.review_status === 'needs_review') && (
              <div style={{
                background: 'var(--status-warning-bg)',
                border: '1px solid var(--status-warning-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <AlertTriangle size={17} color="var(--status-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--status-warning)', fontSize: '0.825rem' }}>
                    Late Transcript Ingested (Revision 2) • Preserved Manual Override
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: '1.45' }}>
                    This record previously had no usable speech text. The update batch supplied a full 27-turn transcript. In accordance with the assignment rules, your manual route remains in effect until explicitly reset. Review the new evidence below.
                  </div>
                </div>
              </div>
            )}

            {/* ROUTE CORRECTION PANEL */}
            <div className="glass-panel" style={{ padding: '1.15rem', background: '#fafaf9' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.45rem' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={15} color="var(--primary)" />
                  Routing Governance & Override
                </span>
                <span style={{ fontSize: '0.73rem', color: 'var(--text-dim)' }}>
                  Automated Suggestion: <strong>{recordState.analysis.suggested_route}</strong>
                </span>
              </div>

              <form onSubmit={handleSaveRoute} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 700 }}>
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
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 700 }}>
                      Manager Override Rationale
                    </label>
                    <input 
                      type="text"
                      className="input"
                      style={{ width: '100%' }}
                      placeholder="e.g. Hostile pushback requires 1:1 coaching"
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                  <div style={{ fontSize: '0.75rem' }}>
                    {saveSuccess && <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>Route correction saved & active!</span>}
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
                        Reset to Suggested
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
            <div className="glass-panel" style={{ padding: '1.15rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                  What Happened
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                  {recordState.analysis.what_happened}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                  Why It Matters
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                  {recordState.analysis.why_it_matters}
                </p>
              </div>
            </div>

            {/* CITATIONS & EVIDENCE (With Jump-to-Turn) */}
            <div className="glass-panel" style={{ padding: '1.15rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Quote size={13} color="var(--primary)" />
                Verifiable Transcript Citations & Evidence
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {recordState.analysis.citations.map((c, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: 'var(--bg-tertiary)',
                      borderLeft: '3px solid var(--primary)',
                      padding: '0.75rem 0.95rem',
                      borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                      fontSize: '0.8125rem'
                    }}
                  >
                    <div style={{ fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '0.4rem', lineHeight: '1.55' }}>
                      "{c.passage}"
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                      <span>Location: {c.location} {c.turn_number ? `(Turn ${c.turn_number})` : ''}</span>
                      {c.turn_number && turns.length > 0 && (
                        <button 
                          onClick={() => handleJumpToTurn(c.turn_number)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.15rem 0.45rem', fontSize: '0.68rem', color: 'var(--primary)' }}
                        >
                          View Turn {c.turn_number} in Transcript <ArrowRight size={10} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONABLE NEXT STEPS */}
            <div className="glass-panel" style={{ padding: '1.15rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ListChecks size={13} color="var(--primary)" />
                Actionable Next Steps & Stated Owners
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {recordState.analysis.next_steps.map((ns, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.55rem',
                      padding: '0.65rem 0.85rem',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8125rem'
                    }}
                  >
                    <CheckCircle size={15} color="var(--status-success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 800, color: 'var(--primary)' }}>[{ns.owner}]</span> {ns.action}
                      {ns.deadline && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginLeft: '0.45rem', fontWeight: 600 }}>
                          (Deadline: {ns.deadline})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HONEST UNCERTAINTY */}
            <div className="glass-panel" style={{ padding: '1.15rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.55rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <HelpCircle size={13} color="var(--text-muted)" />
                Honest Uncertainty (What Data Does NOT Establish)
              </h4>
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {recordState.analysis.honest_uncertainty.map((u, idx) => (
                  <li key={idx}>{u}</li>
                ))}
              </ul>
            </div>

            {/* SALES COACHING NOTE */}
            {recordState.analysis.coaching_note && (
              <div className="glass-panel" style={{ padding: '1.15rem', borderLeft: '4px solid var(--cat-coaching)' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--cat-coaching)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <GraduationCap size={15} />
                  Practical Sales Coaching Observation
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: '1.55' }}>
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
                <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                      Verbatim Call Transcript ({callPayload.rep_name})
                    </h3>
                    <span className="badge badge-call">
                      Duration: {callPayload.duration_seconds}s
                    </span>
                  </div>
                  {callPayload.transcript}
                </div>
              ) : (
                <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <HelpCircle size={32} color="var(--text-dim)" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>No Speech Transcript Supplied</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.35rem', maxWidth: '380px', margin: '0.35rem auto 0' }}>
                    This background call record has null transcript text in the delivery package. Telephony status: <code>{callPayload?.observed_outcome}</code>, Duration: <code>{callPayload?.duration_seconds}s</code>.
                  </p>
                </div>
              )
            ) : (
              turns.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.2rem' }}>
                    <span>Displaying <strong>{turns.length}</strong> sequential conversation turns:</span>
                    {highlightedTurn && (
                      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                        Turn {highlightedTurn} Selected
                      </span>
                    )}
                  </div>
                  {turns.map((t, idx) => {
                    const turnNum = idx + 1;
                    const isTargetTurn = highlightedTurn === turnNum;
                    const isInternal = t.speaker.toLowerCase().includes('spendnest') || t.speaker.toLowerCase().includes('team member');

                    return (
                      <div 
                        key={idx}
                        id={`turn-${turnNum}`}
                        className="glass-panel"
                        style={{
                          padding: '0.85rem 1.1rem',
                          background: isTargetTurn ? '#fef9c3' : (isInternal ? '#f0fdf4' : '#ffffff'),
                          borderColor: isTargetTurn ? '#eab308' : (isInternal ? '#bbf7d0' : 'var(--border-subtle)'),
                          boxShadow: isTargetTurn ? '0 0 0 2px #eab308' : 'var(--shadow-sm)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.72rem' }}>
                          <span style={{ fontWeight: 800, color: isInternal ? 'var(--primary)' : 'var(--text-main)' }}>
                            Turn {turnNum}: {t.speaker}
                          </span>
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                            {t.timecode} ({t.starts_at_seconds.toFixed(1)}s)
                          </span>
                        </div>
                        <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                          {t.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <HelpCircle size={32} color="var(--text-dim)" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>Transcript Unavailable</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.35rem', maxWidth: '380px', margin: '0.35rem auto 0' }}>
                    {rec.transcript_payload?.unavailable_reason || meetingPayload?.recording_detail || 'No speech turns captured for this calendar record.'}
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* TAB 3: RAW JSON */}
        {activeTab === 'raw' && (
          <div className="glass-panel" style={{ padding: '1rem', background: '#f8fafc', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', overflowX: 'auto', border: '1px solid var(--border-subtle)' }}>
            <pre style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
              {JSON.stringify(rec, null, 2)}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
};
