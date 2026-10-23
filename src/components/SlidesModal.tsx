import React, { useState } from 'react';
import { 
  X, 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ShieldAlert, 
  ExternalLink, 
  Quote
} from 'lucide-react';

interface SlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToRecord?: (recordRef: string) => void;
}

export const SlidesModal: React.FC<SlidesModalProps> = ({
  isOpen,
  onClose,
  onJumpToRecord
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  if (!isOpen) return null;

  const totalSlides = 5;

  const handleNext = () => {
    if (currentSlide < totalSlides) setCurrentSlide(currentSlide + 1);
  };

  const handlePrev = () => {
    if (currentSlide > 1) setCurrentSlide(currentSlide - 1);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '960px', height: '90vh' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ padding: '0.35rem', borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Presentation size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Submission Presentation Slides (5 Slides Deck)
                </h3>
                <span className="badge badge-rev" style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700 }}>
                  Slide {currentSlide} of {totalSlides}
                </span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', margin: 0 }}>
                Revenue Intelligence Inbox Candidate Assignment • 21 August 2026
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Slide Navigation Buttons */}
            <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-tertiary)', padding: '0.15rem', borderRadius: 'var(--radius-sm)' }}>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentSlide(num)}
                  style={{
                    padding: '0.2rem 0.55rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    background: currentSlide === num ? 'var(--primary)' : 'transparent',
                    color: currentSlide === num ? '#ffffff' : 'var(--text-muted)'
                  }}
                >
                  {num}
                </button>
              ))}
            </div>

            <button onClick={onClose} className="btn btn-outline btn-sm" style={{ padding: '0.3rem', borderRadius: '50%' }}>
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Modal Body / Slide Canvas */}
        <div className="modal-body" style={{ background: '#fafaf9', padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          
          {/* SLIDE 1: Problem & 3 Core Findings */}
          {currentSlide === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <span className="badge badge-route-sales_coaching" style={{ marginBottom: '0.4rem' }}>
                  Slide 1 of 5 • Executive Overview
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                  The Manager Problem & 3 Crucial Evidence Findings
                </h2>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.55', marginTop: '0.35rem' }}>
                  Sales managers receive flooded call and meeting records from uncoordinated telephony and calendar feeds. Machine labels (e.g., <code>is_connected</code>, <code>recording_status</code>) often contradict real human speech. We built an evidence-grounded workspace that turns raw records into actionable next steps with idempotent replay and preserved human overrides.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Top 3 Analytical Findings (With Verbatim Citations & Product Impacts)
                </h4>

                {/* Finding 1 */}
                <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--cat-coaching)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-call" style={{ fontWeight: 800 }}>Record C01</span>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Hostile Cold Call Boundary Adherence vs. Pitch Persistence</strong>
                    </div>
                    {onJumpToRecord && (
                      <button 
                        onClick={() => { onJumpToRecord('C01'); onClose(); }}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.15rem 0.5rem', fontSize: '0.68rem' }}
                      >
                        Inspect C01 <ExternalLink size={10} />
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', background: '#f5f5f4', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.45rem' }}>
                    <Quote size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    "This number is for my work, not for people to sell things to me... Our processes are already very automated. We have a fairly advanced setup, so I don't think this is something we need."
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-main)' }}>
                    <strong>Product Impact:</strong> Governed by our <strong>Sales Coaching & Brand Equity Rule</strong>. Rather than counting C01 as standard outbound dial activity, the system auto-routes it to Sales Coaching and flags an immediate DNC suppression task to protect company reputation.
                  </div>
                </div>

                {/* Finding 2 */}
                <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--cat-support)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-meeting" style={{ fontWeight: 800 }}>Record M07</span>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Customer Bug Walkthrough Masked as Calendar Sales Discussion</strong>
                    </div>
                    {onJumpToRecord && (
                      <button 
                        onClick={() => { onJumpToRecord('M07'); onClose(); }}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.15rem 0.5rem', fontSize: '0.68rem' }}
                      >
                        Inspect M07 <ExternalLink size={10} />
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', background: '#f5f5f4', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.45rem' }}>
                    <Quote size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    "The first one is editing the description. I am changing this event-payment description to a short reference... It is still the old description. That is why I sent it across." (Turns 3–6)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-main)' }}>
                    <strong>Product Impact:</strong> Governed by our <strong>Dynamic Late-Update & Re-Routing Engine</strong>. Although the calendar title was "Willowfield Trust / SpendNest discussion", the late-arriving transcript proved an active customer software defect. The app preserved the manager's route while triggering an urgent engineering bug ticket workflow.
                  </div>
                </div>

                {/* Finding 3 */}
                <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--cat-deal)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-call" style={{ fontWeight: 800 }}>Record C09</span>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Strict Boundary on Internal Referral Name-Dropping</strong>
                    </div>
                    {onJumpToRecord && (
                      <button 
                        onClick={() => { onJumpToRecord('C09'); onClose(); }}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.15rem 0.5rem', fontSize: '0.68rem' }}
                      >
                        Inspect C09 <ExternalLink size={10} />
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', background: '#f5f5f4', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.45rem' }}>
                    <Quote size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    "If you want to speak to somebody... find our business head, Mr Rishabh... Would it be all right if I mentioned your name...? No, please don't use my name."
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-main)' }}>
                    <strong>Product Impact:</strong> Governed by our <strong>Lead Intelligence Hygiene Warnings</strong>. The dossier explicitly instructs the sales rep to conduct cold outreach to Mr. Rishabh without mentioning Vedant, protecting the referral trust.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SLIDE 2: Interface Choices & Deliberately Rejected Decision */}
          {currentSlide === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <span className="badge badge-route-partnerships" style={{ marginBottom: '0.4rem' }}>
                  Slide 2 of 5 • Design Strategy
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                  Interface Priorities & One Deliberately Rejected Decision
                </h2>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.55', marginTop: '0.35rem' }}>
                  Every UI element was chosen to reduce manager cognitive load, establish honest uncertainty, and make data contracts auditable.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="glass-panel" style={{ padding: '1.1rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={16} />
                    What We Prominently Built
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                    <li>
                      <strong>Explicit Denominators:</strong> Every metric card displays what was counted and the exact base population (e.g. 18 / 44 transcribed, 11 / 30 calls connected).
                    </li>
                    <li>
                      <strong>Separation of Roles:</strong> Visual separation between Call Sales Reps (Jane Patel, Marcus Vance) and Meeting Organizers (Calendar hosts who are not necessarily sales reps or attendees).
                    </li>
                    <li>
                      <strong>Interactive Replay Modal:</strong> One-click automated verification of batch idempotency, revision ordering, and override preservation.
                    </li>
                    <li>
                      <strong>Evidence Dossier Drawer:</strong> Side-by-side view of verbatim citations, stated action items with owners, and raw source payloads.
                    </li>
                  </ul>
                </div>

                <div className="glass-panel" style={{ padding: '1.1rem', background: '#fef2f2', borderColor: '#fecaca' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--status-danger)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ShieldAlert size={16} />
                    One Deliberately Rejected Decision
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                    <p style={{ marginBottom: '0.5rem' }}>
                      <strong>The Rejected Option:</strong> We considered displaying simulated pipeline revenue totals ($450,000 in pipeline), deal close probabilities, and rep leaderboard rankings.
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      <strong>Why We Rejected It:</strong> The supplied dataset contains <em>no CRM opportunity table, deal value, or account lifetime value</em>. Fabricating pipeline totals from conversation keywords produces dangerous, unverified revenue signals.
                    </p>
                    <p style={{ color: 'var(--status-danger)', fontWeight: 600 }}>
                      <strong>Trade-off Accepted:</strong> The workspace provides strictly verifiable conversational evidence and stated next steps, preserving manager trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: Routing & Difficult Case */}
          {currentSlide === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <span className="badge badge-route-deal_next_steps" style={{ marginBottom: '0.4rem' }}>
                  Slide 3 of 5 • Routing Architecture
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                  Purpose-Driven Routing Taxonomy & One Difficult Case
                </h2>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.55', marginTop: '0.35rem' }}>
                  Conversations are not routed to a single generic summary. They flow to purpose-driven destinations with multi-route support and human override governance.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
                <div className="glass-panel" style={{ padding: '0.75rem', borderLeft: '3px solid var(--cat-deal)' }}>
                  <strong style={{ fontSize: '0.78rem', color: 'var(--cat-deal)' }}>deal_next_steps</strong>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Commercial evaluations requiring proposals, pricing, or callback scheduling (e.g., M03, C03, C05).</p>
                </div>
                <div className="glass-panel" style={{ padding: '0.75rem', borderLeft: '3px solid var(--cat-coaching)' }}>
                  <strong style={{ fontSize: '0.78rem', color: 'var(--cat-coaching)' }}>sales_coaching</strong>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Rep pitch coaching, objection handling, and CRM call hygiene (e.g., C01, C06, C09, C10).</p>
                </div>
                <div className="glass-panel" style={{ padding: '0.75rem', borderLeft: '3px solid var(--cat-support)' }}>
                  <strong style={{ fontSize: '0.78rem', color: 'var(--cat-support)' }}>customer_success</strong>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Software bugs, technical support, and post-sale vendor issues (e.g., M07, M02, M10).</p>
                </div>
                <div className="glass-panel" style={{ padding: '0.75rem', borderLeft: '3px solid var(--cat-partner)' }}>
                  <strong style={{ fontSize: '0.78rem', color: 'var(--cat-partner)' }}>partnerships</strong>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Accounting channel partnerships and remote integration discussions (e.g., M01, C07).</p>
                </div>
                <div className="glass-panel" style={{ padding: '0.75rem', borderLeft: '3px solid var(--cat-ops)' }}>
                  <strong style={{ fontSize: '0.78rem', color: 'var(--cat-ops)' }}>onboarding_ops</strong>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Multi-entity credential setup and enterprise data migration planning (e.g., M04, M09).</p>
                </div>
                <div className="glass-panel" style={{ padding: '0.75rem', borderLeft: '3px solid var(--cat-triage)' }}>
                  <strong style={{ fontSize: '0.78rem', color: 'var(--cat-triage)' }}>uncaptured_triage</strong>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Records without audio or usable transcripts (e.g., 20 background calls, 6 silent meetings).</p>
                </div>
              </div>

              {/* The Difficult Case */}
              <div className="glass-panel" style={{ padding: '1.1rem', background: '#fffbeb', borderColor: '#fef08a' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#92400e' }}>
                    The Difficult Case: Record C04 (Lanternpath Media Voicemail)
                  </strong>
                  {onJumpToRecord && (
                    <button 
                      onClick={() => { onJumpToRecord('C04'); onClose(); }}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '0.15rem 0.5rem', fontSize: '0.68rem', borderColor: '#d97706', color: '#92400e' }}
                    >
                      Inspect C04 <ExternalLink size={10} />
                    </button>
                  )}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#78350f', lineHeight: '1.5' }}>
                  <p style={{ marginBottom: '0.35rem' }}>
                    <strong>The Upstream Machine Contradiction:</strong> Telephony metadata classified C04 with <code>is_connected: false</code> and <code>is_conversation: false</code>. A naive filter would discard this record as an unanswered dial.
                  </p>
                  <p style={{ marginBottom: '0.35rem' }}>
                    <strong>The Real Evidence:</strong> Inspecting the text revealed a 95-second substantive voicemail resolving an earlier bounced proposal: <em>"My understanding is that our information first went to the wrong email address. We subsequently used the corrected address you gave us..."</em>
                  </p>
                  <p style={{ fontWeight: 600 }}>
                    <strong>Our Resolution:</strong> We route C04 to <code>deal_next_steps</code> based on verbatim text rather than machine tags, establishing a 3-day follow-up tracking reminder.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 4: Numbers Verification & Replay */}
          {currentSlide === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <span className="badge badge-route-onboarding_ops" style={{ marginBottom: '0.4rem' }}>
                  Slide 4 of 5 • Data Integrity
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                  Verification of Numbers & 5-Step Replay Contract
                </h2>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.55', marginTop: '0.35rem' }}>
                  How we verified every headline number, idempotent duplicate ingestion, revision ordering, and override preservation.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                <div className="glass-panel" style={{ padding: '1rem' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>1. Deduplication Ingestion (Step 2)</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: '1.45' }}>
                    Re-importing <code>01_initial.json</code> matches records by composite key <code>(source_type, source_id)</code>. Because <code>incoming.revision &lt;= existing.revision</code>, all 44 records are safely ignored. Record count stays strictly at 44.
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '1rem' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>2. Revision Update & Transcript (Step 4)</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: '1.45' }}>
                    Applying <code>02_update.json</code> updates M07 from Revision 1 to Revision 2. Turns increase from 0 to 27. Total unique records remains 44, usable texts increases from 17 to 18, and manual route remains preserved.
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '1rem' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>3. Re-Import Resistance (Step 5)</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: '1.45' }}>
                    Re-ingesting <code>01_initial.json</code> after the update attempts to provide Revision 1 for M07. The state machine checks <code>Rev 1 &lt; Rev 2</code> and rejects the downgrade, preserving Revision 2.
                  </div>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '0.85rem 1rem', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  Automated CLI Replay Check: <code>npm run test:replay</code> (All 5 acceptance tests passed 100% OK)
                </span>
                <span className="badge" style={{ background: 'var(--status-success-bg)', color: 'var(--status-success)', border: '1px solid var(--status-success-border)' }}>
                  TESTS VERIFIED
                </span>
              </div>
            </div>
          )}

          {/* SLIDE 5: Trade-offs, AI Usage & Limitations */}
          {currentSlide === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <span className="badge badge-route-sales_coaching" style={{ marginBottom: '0.4rem' }}>
                  Slide 5 of 5 • Technical Architecture
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                  Trade-Offs, AI Usage, Known Limitations & Roadmap
                </h2>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.55', marginTop: '0.35rem' }}>
                  Transparent declaration of AI usage, deterministic runtime mechanics, and future enterprise scalability.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="glass-panel" style={{ padding: '1rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.55rem' }}>
                    Pre-Generated vs. Dynamic Runtime
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    <p style={{ marginBottom: '0.45rem' }}>
                      <strong>Pre-Generated Analysis Dataset:</strong> Conversational dossiers, verbatim citations, and coaching observations were generated upfront with AI assistance and packaged into the client bundle. This guarantees instant evaluation without external API keys or rate limits.
                    </p>
                    <p>
                      <strong>Dynamic Runtime Operations:</strong> Ingestion idempotency, revision state machine, route override preservation, multi-field filtering, and ZIP archive packaging with machine-readable manifests execute entirely dynamically.
                    </p>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '1rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.55rem' }}>
                    Known Limitations & Roadmap
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    <p style={{ marginBottom: '0.45rem' }}>
                      <strong>Single-Day Scope:</strong> All data is from 21 Aug 2026 (Asia/Kolkata), precluding multi-week cohort trends.
                    </p>
                    <p style={{ marginBottom: '0.45rem' }}>
                      <strong>Telephony Gaps:</strong> 26 background records lack transcripts and are governed by uncaptured metadata triage.
                    </p>
                    <p style={{ color: 'var(--primary)', fontWeight: 600 }}>
                      <strong>Future Roadmap:</strong> Live webhook connectors for Zoom/Teams audio streaming and bi-directional CRM write-back for DNC suppression.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={handlePrev}
              disabled={currentSlide === 1}
              className="btn btn-secondary btn-sm"
            >
              <ChevronLeft size={14} /> Previous Slide
            </button>
            <button 
              onClick={handleNext}
              disabled={currentSlide === totalSlides}
              className="btn btn-secondary btn-sm"
            >
              Next Slide <ChevronRight size={14} />
            </button>
          </div>

          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Slides
          </button>
        </div>

      </div>
    </div>
  );
};
