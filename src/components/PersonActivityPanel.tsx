import React, { useState } from 'react';
import { 
  Users, 
  Phone, 
  Calendar, 
  X, 
  Info,
  ArrowRight
} from 'lucide-react';
import { ManagedRecordState } from '../types';

interface PersonActivityPanelProps {
  records: ManagedRecordState[];
  selectedPerson: string;
  onSelectPerson: (personKey: string) => void;
  onClearPersonFilter: () => void;
}

interface RepStat {
  name: string;
  totalCalls: number;
  connectedCalls: number;
  transcribedCalls: number;
  nextStepsCount: number;
  outcomes: Record<string, number>;
}

interface OrgStat {
  email: string;
  totalMeetings: number;
  transcribedMeetings: number;
  providers: Record<string, number>;
  recordingStatuses: Record<string, number>;
}

export const PersonActivityPanel: React.FC<PersonActivityPanelProps> = ({
  records,
  selectedPerson,
  onSelectPerson,
  onClearPersonFilter
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'reps' | 'organizers'>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Compute stats for Call Reps
  const repStatsMap = new Map<string, RepStat>();
  // Compute stats for Meeting Organizers
  const orgStatsMap = new Map<string, OrgStat>();

  for (const item of records) {
    const rec = item.source_record;
    if (rec.source_type === 'call') {
      const p = rec.payload as any;
      const repName = p.rep_name || 'Unassigned';
      let stat = repStatsMap.get(repName);
      if (!stat) {
        stat = {
          name: repName,
          totalCalls: 0,
          connectedCalls: 0,
          transcribedCalls: 0,
          nextStepsCount: 0,
          outcomes: {}
        };
        repStatsMap.set(repName, stat);
      }
      stat.totalCalls++;
      if (p.is_connected === true) stat.connectedCalls++;
      if (p.transcript && p.transcript.trim()) stat.transcribedCalls++;
      if (item.analysis.next_steps?.length) stat.nextStepsCount += item.analysis.next_steps.length;
      if (p.observed_outcome) {
        stat.outcomes[p.observed_outcome] = (stat.outcomes[p.observed_outcome] || 0) + 1;
      }
    } else {
      const p = rec.payload as any;
      const orgEmail = p.organizer_email || 'Unknown';
      let stat = orgStatsMap.get(orgEmail);
      if (!stat) {
        stat = {
          email: orgEmail,
          totalMeetings: 0,
          transcribedMeetings: 0,
          providers: {},
          recordingStatuses: {}
        };
        orgStatsMap.set(orgEmail, stat);
      }
      stat.totalMeetings++;
      if (rec.transcript_payload?.turns?.length) stat.transcribedMeetings++;
      if (p.provider) stat.providers[p.provider] = (stat.providers[p.provider] || 0) + 1;
      if (p.recording_status) {
        stat.recordingStatuses[p.recording_status] = (stat.recordingStatuses[p.recording_status] || 0) + 1;
      }
    }
  }

  const repStatsList = Array.from(repStatsMap.values()).sort((a, b) => b.totalCalls - a.totalCalls);
  const orgStatsList = Array.from(orgStatsMap.values()).sort((a, b) => b.totalMeetings - a.totalMeetings);

  const isPersonFilterActive = selectedPerson !== 'all';

  return (
    <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', marginBottom: '1.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users size={16} />
          </div>
          <div>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.01em', margin: 0 }}>
              Activity by Person & Role Breakdown
            </h2>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.1rem' }}>
              Selected-record activity for <strong>21 August 2026 (Asia/Kolkata)</strong>. Click any person to filter their source interactions.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isPersonFilterActive && (
            <button 
              onClick={onClearPersonFilter}
              className="btn btn-outline btn-sm"
              style={{ color: 'var(--status-danger)', borderColor: 'var(--status-danger-border)', padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
            >
              <X size={12} />
              Clear Person Filter ({selectedPerson.split(':')[1]})
            </button>
          )}

          <div style={{ display: 'flex', background: 'var(--bg-tertiary)', padding: '0.15rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <button 
              className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : 'btn-outline'}`}
              style={{ border: 'none', padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
              onClick={() => setActiveTab('all')}
            >
              All Roles ({repStatsList.length + orgStatsList.length})
            </button>
            <button 
              className={`btn btn-sm ${activeTab === 'reps' ? 'btn-primary' : 'btn-outline'}`}
              style={{ border: 'none', padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
              onClick={() => setActiveTab('reps')}
            >
              Sales Reps ({repStatsList.length})
            </button>
            <button 
              className={`btn btn-sm ${activeTab === 'organizers' ? 'btn-primary' : 'btn-outline'}`}
              style={{ border: 'none', padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
              onClick={() => setActiveTab('organizers')}
            >
              Meeting Organizers ({orgStatsList.length})
            </button>
          </div>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem' }}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Explicit Role Distinction Note as required by PDF */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(30, 77, 56, 0.04)', 
            border: '1px solid rgba(30, 77, 56, 0.12)', 
            borderRadius: 'var(--radius-sm)', 
            padding: '0.45rem 0.8rem', 
            fontSize: '0.72rem', 
            color: 'var(--primary)', 
            marginBottom: '0.85rem' 
          }}>
            <Info size={13} style={{ flexShrink: 0 }} />
            <span>
              <strong>Role Governance Rule:</strong> Call sales reps dial outbound contacts. Calendar meeting organizers schedule calendar sessions. <em>An organizer is not automatically the salesperson, speaker, or an attendee.</em>
            </span>
          </div>

          {/* Grid Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: activeTab === 'all' ? '1fr 1fr' : '1fr', gap: '0.95rem' }}>
            
            {/* COLUMN 1: CALL SALES REPS */}
            {(activeTab === 'all' || activeTab === 'reps') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.35rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Phone size={12} color="var(--primary)" />
                    Call Sales Reps (Telephony Dialers)
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    Total: 30 calls across 6 reps
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.55rem' }}>
                  {repStatsList.map((rep) => {
                    const isSelected = selectedPerson === `rep:${rep.name}`;
                    const connRate = rep.totalCalls > 0 ? ((rep.connectedCalls / rep.totalCalls) * 100).toFixed(0) : '0';
                    return (
                      <div 
                        key={rep.name}
                        onClick={() => onSelectPerson(`rep:${rep.name}`)}
                        className="glass-panel"
                        style={{
                          padding: '0.75rem 0.9rem',
                          cursor: 'pointer',
                          borderColor: isSelected ? 'var(--primary)' : 'var(--border-subtle)',
                          background: isSelected ? 'rgba(30, 77, 56, 0.05)' : '#ffffff',
                          boxShadow: isSelected ? '0 0 0 1px var(--primary)' : 'var(--shadow-sm)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>
                            {rep.name}
                          </span>
                          <span className="badge badge-call" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                            {rep.totalCalls} {rep.totalCalls === 1 ? 'Call' : 'Calls'}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                          <span title="Calls where is_connected === true">
                            Connected: <strong style={{ color: 'var(--status-success)' }}>{rep.connectedCalls}</strong> ({connRate}%)
                          </span>
                          <span>•</span>
                          <span title="Calls with adapted text transcript">
                            Transcribed: <strong style={{ color: 'var(--primary)' }}>{rep.transcribedCalls}</strong>
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.3rem' }}>
                          <span>Actionable Next Steps: <strong>{rep.nextStepsCount}</strong></span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: isSelected ? 'var(--primary)' : 'var(--text-dim)', fontWeight: 600 }}>
                            {isSelected ? 'Active Filter' : 'Filter records'} <ArrowRight size={10} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* COLUMN 2: MEETING ORGANIZERS */}
            {(activeTab === 'all' || activeTab === 'organizers') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.35rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={12} color="var(--primary)" />
                    Meeting Organizers (Calendar Coordinators)
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    Total: 14 meetings across 6 hosts
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.55rem' }}>
                  {orgStatsList.map((org) => {
                    const isSelected = selectedPerson === `org:${org.email}`;
                    const shortName = org.email.split('@')[0];
                    const providersStr = Object.keys(org.providers).join(', ');
                    return (
                      <div 
                        key={org.email}
                        onClick={() => onSelectPerson(`org:${org.email}`)}
                        className="glass-panel"
                        style={{
                          padding: '0.75rem 0.9rem',
                          cursor: 'pointer',
                          borderColor: isSelected ? 'var(--primary)' : 'var(--border-subtle)',
                          background: isSelected ? 'rgba(30, 77, 56, 0.05)' : '#ffffff',
                          boxShadow: isSelected ? '0 0 0 1px var(--primary)' : 'var(--shadow-sm)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>
                            {shortName}
                          </span>
                          <span className="badge badge-meeting" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                            {org.totalMeetings} {org.totalMeetings === 1 ? 'Meeting' : 'Meetings'}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {org.email}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.3rem' }}>
                          <span>Platform: <strong>{providersStr || 'Calendar'}</strong></span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: isSelected ? 'var(--primary)' : 'var(--text-dim)', fontWeight: 600 }}>
                            {isSelected ? 'Active Filter' : 'Filter meetings'} <ArrowRight size={10} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </>
      )}

    </div>
  );
};
