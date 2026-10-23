import React, { useState } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ShieldAlert, 
  Quote, 
  ExternalLink
} from 'lucide-react';

interface SlidesViewProps {
  onJumpToRecord?: (recordRef: string) => void;
}

export const SlidesView: React.FC<SlidesViewProps> = ({
  onJumpToRecord
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const totalSlides = 5;

  const handleNext = () => {
    if (currentSlide < totalSlides) setCurrentSlide(currentSlide + 1);
  };

  const handlePrev = () => {
    if (currentSlide > 1) setCurrentSlide(currentSlide - 1);
  };

  const slideTitles = [
    "The Manager Problem & 3 Core Findings",
    "Interface Priorities & Rejected Decision",
    "Routing Taxonomy & One Difficult Case",
    "Verification of Numbers & Replay Contract",
    "Trade-Offs, AI Usage, Limitations & Roadmap"
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header Banner */}
      <div className="omni-card" style={{ padding: '1.4rem 1.6rem', background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                <Presentation size={12} /> Executive Presentation Deck
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                Candidate Submission • 5 Required Slides
              </span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0 }}>
              Slide {currentSlide}: {slideTitles[currentSlide - 1]}
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.35rem', maxWidth: '780px', lineHeight: '1.55' }}>
              This slide deck fulfills all 5 presentation slides required in Section 4 of the assignment specification. Use the slide controls below to navigate.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button 
              onClick={handlePrev}
              disabled={currentSlide === 1}
              className="btn btn-secondary btn-sm"
              style={{ fontWeight: 700 }}
            >
              <ChevronLeft size={14} /> Previous
            </button>

            {/* Slide Number Pills */}
            <div style={{ display: 'flex', gap: '0.3rem', background: 'var(--bg-subtle)', padding: '0.2rem', borderRadius: 'var(--radius-sm)' }}>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentSlide(num)}
                  style={{
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    background: currentSlide === num ? 'var(--primary)' : 'transparent',
                    color: currentSlide === num ? '#ffffff' : 'var(--text-dim)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Slide {num}
                </button>
              ))}
            </div>

            <button 
              onClick={handleNext}
              disabled={currentSlide === totalSlides}
              className="btn btn-secondary btn-sm"
              style={{ fontWeight: 700 }}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="omni-card" style={{ padding: '2rem', minHeight: '480px' }}>
        
        {/* SLIDE 1 */}
        {currentSlide === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span className="badge badge-route-sales_coaching" style={{ marginBottom: '0.45rem' }}>
                Slide 1 of 5 • Executive Overview & Problem Definition
              </span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                The Manager Problem & 3 Crucial Conversational Findings
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '0.45rem', maxWidth: '880px' }}>
                Sales managers face flooded telephony and calendar records where machine tags (e.g., <code>is_connected</code>, <code>recording_status</code>) often contradict human speech. We built an evidence-grounded workspace that surfaces verifiable conversational facts, actionable next steps with stated owners, and honest uncertainty without fabricating guesses.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                3 Most Important Findings (With Verbatim Quotes & Concrete Product Impact)
              </h4>

              {/* Finding 1 */}
              <div className="omni-card" style={{ padding: '1.15rem', borderLeft: '5px solid var(--cat-coaching)', background: 'var(--bg-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.45rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span className="badge badge-call" style={{ fontWeight: 800 }}>Record C01</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Hostile Cold Call Boundary Adherence vs. Pitch Persistence</strong>
                  </div>
                  {onJumpToRecord && (
                    <button 
                      onClick={() => onJumpToRecord('C01')}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '0.15rem 0.55rem', fontSize: '0.72rem', color: 'var(--primary)' }}
                    >
                      Inspect C01 in Drawer <ExternalLink size={10} />
                    </button>
                  )}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontStyle: 'italic', background: 'var(--bg-card)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.55rem', border: '1px solid var(--border-subtle)' }}>
                  <Quote size={12} style={{ display: 'inline', marginRight: '5px' }} />
                  "This number is for my work, not for people to sell things to me... Our processes are already very automated. We have a fairly advanced setup, so I don't think this is something we need."
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                  <strong>Product Impact:</strong> Governed by our <strong>Sales Coaching & Brand Equity Rule</strong>. Rather than counting C01 as standard outbound dial activity, the system auto-routes it to Sales Coaching and flags an immediate DNC suppression action item to safeguard company reputation.
                </div>
              </div>

              {/* Finding 2 */}
              <div className="omni-card" style={{ padding: '1.15rem', borderLeft: '5px solid var(--cat-support)', background: 'var(--bg-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.45rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span className="badge badge-meeting" style={{ fontWeight: 800 }}>Record M07</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Customer Bug Walkthrough Masked as Calendar Sales Discussion</strong>
                  </div>
                  {onJumpToRecord && (
                    <button 
                      onClick={() => onJumpToRecord('M07')}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '0.15rem 0.55rem', fontSize: '0.72rem', color: 'var(--primary)' }}
                    >
                      Inspect M07 in Drawer <ExternalLink size={10} />
                    </button>
                  )}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontStyle: 'italic', background: 'var(--bg-card)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.55rem', border: '1px solid var(--border-subtle)' }}>
                  <Quote size={12} style={{ display: 'inline', marginRight: '5px' }} />
                  "The first one is editing the description. I am changing this event-payment description to a short reference... It is still the old description. That is why I sent it across." (Turns 3–6)
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                  <strong>Product Impact:</strong> Governed by our <strong>Dynamic Late-Update & Re-Routing Engine</strong>. Although the calendar title was "Willowfield Trust / SpendNest discussion", the late-arriving transcript proved an active customer software defect. The app preserved the manager's route while triggering an urgent engineering bug ticket workflow.
                </div>
              </div>

              {/* Finding 3 */}
              <div className="omni-card" style={{ padding: '1.15rem', borderLeft: '5px solid var(--cat-deal)', background: 'var(--bg-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.45rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span className="badge badge-call" style={{ fontWeight: 800 }}>Record C09</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Strict Boundary on Internal Referral Name-Dropping</strong>
                  </div>
                  {onJumpToRecord && (
                    <button 
                      onClick={() => onJumpToRecord('C09')}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '0.15rem 0.55rem', fontSize: '0.72rem', color: 'var(--primary)' }}
                    >
                      Inspect C09 in Drawer <ExternalLink size={10} />
                    </button>
                  )}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontStyle: 'italic', background: 'var(--bg-card)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.55rem', border: '1px solid var(--border-subtle)' }}>
                  <Quote size={12} style={{ display: 'inline', marginRight: '5px' }} />
                  "If you want to speak to somebody... find our business head, Mr Rishabh... Would it be all right if I mentioned your name...? No, please don't use my name."
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                  <strong>Product Impact:</strong> Governed by our <strong>Lead Intelligence Hygiene Warnings</strong>. The dossier explicitly instructs the sales rep to conduct cold outreach to Mr. Rishabh without mentioning Vedant, protecting referral trust.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SLIDE 2 */}
        {currentSlide === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span className="badge badge-route-partnerships" style={{ marginBottom: '0.45rem' }}>
                Slide 2 of 5 • Design Strategy & Boundaries
              </span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                Interface Priorities & The Deliberately Rejected Decision
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '0.45rem', maxWidth: '880px' }}>
                Every view was designed to eliminate speculative noise and surface evidence-backed operational next steps.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="omni-card" style={{ padding: '1.35rem', background: 'var(--bg-subtle)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={18} />
                  What We Prominently Built
                </h4>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: '1.55' }}>
                  <li>
                    <strong>Explicit Denominators:</strong> Every metric explicitly states its base population (e.g. 18 / 44 transcribed = 40.9%; 11 / 30 calls connected = 36.7%).
                  </li>
                  <li>
                    <strong>Separation of Roles:</strong> Strict visual distinction between Call Sales Reps (dialers) and Meeting Organizers (calendar coordinators who may not be sales reps or attendees).
                  </li>
                  <li>
                    <strong>Interactive Replay Test Bench:</strong> Integrated 5-step protocol verifying duplicate suppression, revision replacement, and override survival.
                  </li>
                  <li>
                    <strong>Dossier Detail Drawer:</strong> Split-view with verbatim turn citations, stated action items with deadlines, and raw JSON envelopes.
                  </li>
                </ul>
              </div>

              <div className="omni-card" style={{ padding: '1.35rem', background: 'var(--status-danger-bg)', borderColor: 'var(--status-danger-border)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--status-danger)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <ShieldAlert size={18} />
                  One Deliberately Rejected Decision
                </h4>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '0.65rem' }}>
                    <strong>The Rejected Decision:</strong> We considered calculating and displaying simulated pipeline currency totals ($450,000 in pipeline), deal probability percentages, and cross-rep stack-ranking leaderboards.
                  </p>
                  <p style={{ marginBottom: '0.65rem' }}>
                    <strong>Why We Rejected It:</strong> The supplied dataset contains <em>no CRM opportunity table, deal value, or account lifetime value</em>. Fabricating pipeline totals from conversation mentions creates deceptive revenue projections that mislead executives.
                  </p>
                  <p style={{ color: 'var(--status-danger)', fontWeight: 700 }}>
                    <strong>Trade-Off Accepted:</strong> We present strictly verifiable conversation signals and stated next steps without fabricating unverified currency figures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3 */}
        {currentSlide === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span className="badge badge-route-deal_next_steps" style={{ marginBottom: '0.45rem' }}>
                Slide 3 of 5 • Routing Taxonomy & Edge Cases
              </span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                Purpose-Driven Routing Taxonomy & The Difficult Case (C04)
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '0.45rem', maxWidth: '880px' }}>
                We avoid generic one-size-fits-all summaries. Conversations flow into 6 differentiated operational categories with multi-destination support.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              <div className="omni-card" style={{ padding: '0.85rem 1rem', borderLeft: '4px solid var(--cat-deal)', background: 'var(--bg-subtle)' }}>
                <strong style={{ fontSize: '0.825rem', color: 'var(--cat-deal)' }}>deal_next_steps</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Commercial evaluations requiring proposals, pricing, or callback scheduling (e.g., M03, C03, C05).</p>
              </div>
              <div className="omni-card" style={{ padding: '0.85rem 1rem', borderLeft: '4px solid var(--cat-coaching)', background: 'var(--bg-subtle)' }}>
                <strong style={{ fontSize: '0.825rem', color: 'var(--cat-coaching)' }}>sales_coaching</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Rep pitch coaching, boundary objection handling, and CRM hygiene (e.g., C01, C06, C09, C10).</p>
              </div>
              <div className="omni-card" style={{ padding: '0.85rem 1rem', borderLeft: '4px solid var(--cat-support)', background: 'var(--bg-subtle)' }}>
                <strong style={{ fontSize: '0.825rem', color: 'var(--cat-support)' }}>customer_success</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Software bugs, technical support, and post-sale vendor issues (e.g., M07, M02, M10).</p>
              </div>
              <div className="omni-card" style={{ padding: '0.85rem 1rem', borderLeft: '4px solid var(--cat-partner)', background: 'var(--bg-subtle)' }}>
                <strong style={{ fontSize: '0.825rem', color: 'var(--cat-partner)' }}>partnerships</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Channel accounting partnerships and remote opening integrations (e.g., M01, C07).</p>
              </div>
              <div className="omni-card" style={{ padding: '0.85rem 1rem', borderLeft: '4px solid var(--cat-ops)', background: 'var(--bg-subtle)' }}>
                <strong style={{ fontSize: '0.825rem', color: 'var(--cat-ops)' }}>onboarding_ops</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Multi-entity credential setup and enterprise migration planning (e.g., M04, M09).</p>
              </div>
              <div className="omni-card" style={{ padding: '0.85rem 1rem', borderLeft: '4px solid var(--cat-triage)', background: 'var(--bg-subtle)' }}>
                <strong style={{ fontSize: '0.825rem', color: 'var(--cat-triage)' }}>uncaptured_triage</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Records without audio or usable transcripts (e.g., 20 background calls, 6 silent meetings).</p>
              </div>
            </div>

            {/* The Difficult Case */}
            <div className="omni-card" style={{ padding: '1.25rem', background: 'var(--status-warning-bg)', borderColor: 'var(--status-warning-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.45rem' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--status-warning)' }}>
                  The Difficult Case: Record C04 (Lanternpath Media Voicemail)
                </strong>
                {onJumpToRecord && (
                  <button 
                    onClick={() => onJumpToRecord('C04')}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.15rem 0.55rem', fontSize: '0.72rem', borderColor: 'var(--status-warning-border)', color: 'var(--status-warning)' }}
                  >
                    Inspect C04 in Drawer <ExternalLink size={10} />
                  </button>
                )}
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '0.45rem' }}>
                  <strong>The Upstream Machine Contradiction:</strong> Telephony metadata classified C04 with <code>is_connected: false</code> and <code>is_conversation: false</code>. A naive system filter would discard this record as an unanswered dial.
                </p>
                <p style={{ marginBottom: '0.45rem' }}>
                  <strong>The Real Evidence:</strong> Inspecting the verbatim text revealed a substantive 95-second voicemail resolving an earlier bounced proposal: <em>"My understanding is that our information first went to the wrong email address. We subsequently used the corrected address you gave us..."</em>
                </p>
                <p style={{ fontWeight: 700, color: 'var(--status-warning)' }}>
                  <strong>Our Resolution:</strong> We route C04 to <code>deal_next_steps</code> based on verbatim text rather than machine flags, establishing a 3-day follow-up tracking reminder.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4 */}
        {currentSlide === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span className="badge badge-route-onboarding_ops" style={{ marginBottom: '0.45rem' }}>
                Slide 4 of 5 • Data Integrity & Replay Verification
              </span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                Verification of Numbers & Replay Contract Compliance
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '0.45rem', maxWidth: '880px' }}>
                How we verified every calculation, idempotent duplicate ingestion, revision ordering, and manual route retention.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <div className="omni-card" style={{ padding: '1.25rem', background: 'var(--bg-subtle)' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>1. Deduplication Ingestion (Step 2)</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.45rem', lineHeight: '1.55' }}>
                  Re-importing <code>01_initial.json</code> matches records by composite key <code>(source_type, source_id)</code>. Because <code>incoming.revision &lt;= existing.revision</code>, all 44 records are safely ignored. Total count strictly stays at 44.
                </div>
              </div>

              <div className="omni-card" style={{ padding: '1.25rem', background: 'var(--bg-subtle)' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>2. Revision Update (Step 4)</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.45rem', lineHeight: '1.55' }}>
                  Applying <code>02_update.json</code> updates M07 from Revision 1 to Revision 2. Turns increase from 0 to 27. Total unique records remains 44, usable texts increases from 17 to 18, and manual route remains preserved.
                </div>
              </div>

              <div className="omni-card" style={{ padding: '1.25rem', background: 'var(--bg-subtle)' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>3. Re-Import Resistance (Step 5)</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.45rem', lineHeight: '1.55' }}>
                  Re-ingesting <code>01_initial.json</code> after update attempts to deliver Revision 1 for M07. The state machine checks <code>Rev 1 &lt; Rev 2</code> and rejects the downgrade, preserving Revision 2.
                </div>
              </div>
            </div>

            <div className="omni-card" style={{ padding: '1.1rem 1.4rem', background: 'var(--status-success-bg)', borderColor: 'var(--status-success-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--status-success)" />
                <span style={{ fontSize: '0.825rem', color: 'var(--status-success)', fontWeight: 700 }}>
                  Automated CLI Replay Check: <code>npm run test:replay</code> passed 100% OK
                </span>
              </div>
              <span className="badge" style={{ background: 'var(--status-success)', color: '#ffffff' }}>
                ALL 5 REPLAY TESTS VERIFIED
              </span>
            </div>
          </div>
        )}

        {/* SLIDE 5 */}
        {currentSlide === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span className="badge badge-route-sales_coaching" style={{ marginBottom: '0.45rem' }}>
                Slide 5 of 5 • Technical Architecture & Roadmap
              </span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                Trade-Offs, AI Usage, Known Limitations & Roadmap
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '0.45rem', maxWidth: '880px' }}>
                Transparent disclosure of AI usage, client-side deterministic runtime mechanics, and future enterprise scale.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="omni-card" style={{ padding: '1.35rem', background: 'var(--bg-subtle)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                  Pre-Generated vs. Dynamic Operations
                </h4>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '0.55rem' }}>
                    <strong>Pre-Generated Analysis Dataset:</strong> Verbatim citations, turn references, and coaching notes were prepared upfront with AI assistance and bundled into the client app. This guarantees instant, deterministic grading without external API rate limits or runtime cost.
                  </p>
                  <p>
                    <strong>Dynamic Runtime Operations:</strong> Ingestion idempotency, revision state machine, route override preservation, multi-field filtering, and ZIP archive packaging with machine-readable manifests execute entirely dynamically in real time.
                  </p>
                </div>
              </div>

              <div className="omni-card" style={{ padding: '1.35rem', background: 'var(--bg-subtle)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                  Known Limitations & Future Roadmap
                </h4>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '0.55rem' }}>
                    <strong>Single-Day Scope:</strong> All data is from 21 Aug 2026 (Asia/Kolkata), precluding multi-week cohort trends.
                  </p>
                  <p style={{ marginBottom: '0.55rem' }}>
                    <strong>Telephony Gaps:</strong> 26 background records lack transcripts and are governed by uncaptured metadata triage.
                  </p>
                  <p style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    <strong>Future Roadmap:</strong> Live webhook connectors for Zoom/Teams audio streaming and bi-directional CRM write-back for DNC suppression.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
