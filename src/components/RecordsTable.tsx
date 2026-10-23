import React from 'react';
import { 
  Phone, 
  Video, 
  Clock, 
  User, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle
} from 'lucide-react';
import { ManagedRecordState } from '../types';
import { makeRecordKey } from '../utils/dataEngine';

interface RecordsTableProps {
  records: ManagedRecordState[];
  selectedKey: string | null;
  onSelectRecord: (key: string) => void;
}

export const RecordsTable: React.FC<RecordsTableProps> = ({
  records,
  selectedKey,
  onSelectRecord
}) => {
  const formatTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return isoString;
    }
  };

  const getRouteLabel = (category: string) => {
    switch (category) {
      case 'deal_next_steps': return 'Deal Next Steps';
      case 'sales_coaching': return 'Sales Coaching';
      case 'customer_success': return 'Customer Success';
      case 'partnerships': return 'Partnerships';
      case 'onboarding_ops': return 'Onboarding / Ops';
      case 'uncaptured_triage': return 'Uncaptured Triage';
      default: return category;
    }
  };

  if (records.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.3rem' }}>No matching records found</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Try adjusting your search query, person filter, or category filters.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="records-table">
        <thead>
          <tr>
            <th style={{ width: '120px' }}>Reference</th>
            <th style={{ minWidth: '260px' }}>Interaction Title / Snippet</th>
            <th style={{ minWidth: '170px' }}>Person</th>
            <th style={{ width: '120px' }}>Time (IST)</th>
            <th style={{ width: '140px' }}>Source Status</th>
            <th style={{ width: '170px' }}>Assigned Route</th>
            <th style={{ width: '130px' }}>Governance</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item) => {
            const rec = item.source_record;
            const key = makeRecordKey(rec.source_type, rec.source_id);
            const isSelected = selectedKey === key;
            const isCall = rec.source_type === 'call';
            const callPayload = isCall ? (rec.payload as any) : null;
            const meetingPayload = !isCall ? (rec.payload as any) : null;

            const timeStr = isCall ? callPayload?.started_at : meetingPayload?.starts_at;
            const durationSec = isCall ? callPayload?.duration_seconds : meetingPayload?.duration_seconds;

            const activeRoute = item.is_manually_overridden && item.manual_route 
              ? item.manual_route 
              : item.analysis.suggested_route;

            const hasUsableTranscript = isCall 
              ? Boolean(callPayload?.transcript?.trim())
              : Boolean(rec.transcript_payload?.turns?.length);

            // Display title
            let displayTitle = '';
            if (isCall) {
              if (callPayload?.transcript) {
                displayTitle = callPayload.transcript.slice(0, 95) + '...';
              } else {
                displayTitle = `Call (${callPayload?.direction || 'outbound'}) to ${callPayload?.to_number || 'prospect'} [Outcome: ${callPayload?.observed_outcome || 'none'}]`;
              }
            } else {
              displayTitle = meetingPayload?.title || 'Meeting';
            }

            return (
              <tr 
                key={key}
                onClick={() => onSelectRecord(key)}
                className={isSelected ? 'selected' : ''}
              >
                {/* Reference & Type */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span className="badge badge-call" style={{ fontWeight: 700 }}>
                      {isCall ? <Phone size={10} color="var(--text-muted)" /> : <Video size={10} color="var(--text-muted)" />}
                      {rec.record_ref}
                    </span>
                    <span className="badge-rev" title={`Applied Delivery Revision: ${item.applied_revision}`}>
                      r{item.applied_revision}
                    </span>
                  </div>
                </td>

                {/* Title / Snippet */}
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.8125rem', marginBottom: '0.15rem' }}>
                    {isCall ? (callPayload?.transcript ? 'Call Conversation' : 'Background Call') : (meetingPayload?.title)}
                  </div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '380px' }}>
                    {displayTitle}
                  </div>
                </td>

                {/* Person & Role */}
                <td>
                  {isCall ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600, fontSize: '0.78rem', color: 'var(--text-main)' }}>
                        <User size={12} color="var(--text-muted)" />
                        Rep: {callPayload?.rep_name || 'Unassigned'}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginLeft: '0.9rem' }}>
                        {callPayload?.rep_email || 'No email'}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600, fontSize: '0.78rem', color: 'var(--text-main)' }}>
                        <Calendar size={12} color="var(--text-muted)" />
                        Host: {meetingPayload?.organizer_email?.split('@')[0] || 'Unknown'}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginLeft: '0.9rem' }}>
                        Calendar organizer
                      </div>
                    </div>
                  )}
                </td>

                {/* Time & Duration */}
                <td>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                    {formatTime(timeStr)}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Clock size={10} />
                    {durationSec ? (durationSec > 60 ? `${Math.round(durationSec / 60)} min` : `${durationSec}s`) : '0s'}
                  </div>
                </td>

                {/* Source Status */}
                <td>
                  {isCall ? (
                    <div>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 600,
                        color: callPayload?.is_connected ? 'var(--status-success)' : 'var(--text-dim)'
                      }}>
                        {callPayload?.is_connected ? 'Connected' : 'Not Connected'}
                      </span>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        {callPayload?.observed_outcome || 'No outcome'}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 600,
                        color: meetingPayload?.recording_status === 'recorded' ? 'var(--text-main)' : 'var(--text-dim)'
                      }}>
                        {meetingPayload?.recording_status}
                      </span>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        {meetingPayload?.provider}
                      </div>
                    </div>
                  )}
                </td>

                {/* Route Badge */}
                <td>
                  <div>
                    <span className={`badge badge-route-${activeRoute}`}>
                      {getRouteLabel(activeRoute)}
                    </span>
                    {item.is_manually_overridden && (
                      <div style={{ marginTop: '0.2rem' }}>
                        <span className="badge badge-override">
                          Manual Override
                        </span>
                      </div>
                    )}
                  </div>
                </td>

                {/* Governance / Review State */}
                <td>
                  {item.analysis.needs_review || item.review_status === 'needs_review' ? (
                    <span className="badge badge-stale" title="New transcript arrived in update-002 while manual route active">
                      <AlertTriangle size={10} />
                      Needs Review
                    </span>
                  ) : hasUsableTranscript ? (
                    <span style={{ fontSize: '0.75rem', color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle size={12} />
                      Transcribed
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <HelpCircle size={12} />
                      Uncaptured
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
